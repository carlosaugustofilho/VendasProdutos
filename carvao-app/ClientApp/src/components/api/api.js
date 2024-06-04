import axios from "axios";

export default class Api {
    constructor(urlBase = "") {
        this.loginPage = "/login";
        this.urlBase = urlBase;

        this.access_token = window.localStorage.getItem("access_token");

        this.api = axios.create({
            baseURL: urlBase,
            headers: {
                "Authorization": `Bearer ${this.access_token ? this.access_token : ""}`
            }
        });
    }

    execute = (api, funcResult, funcError) => {

        if (window.Wait != undefined) window.Wait(true);
        var loader = document.getElementById("loadingpanel");
        if (loader)
            loader.style.display = 'block';

        api.then((response) => {
            if (funcResult != undefined)
                funcResult(response);
            if (window.Wait != undefined)
                window.Wait(false);
            if (loader)
                loader.style.display = 'none';
        })
            .catch((err) => {
                console.log({ error: err });
                if (err.response != null && err.response.status == 401) {
                    window.Wait(false);
                    if (loader)
                        loader.style.display = 'none';
                    window.location.href = this.loginPage;
                    return;
                }
                if (funcError != undefined)
                    funcError(err);
                if (window.Wait != undefined)
                    window.Wait(false);
                if (loader)
                    loader.style.display = 'none';
            });
    }

    get = (url, funcResult, funcError) => {
        this.execute(this.api.get(url), funcResult, funcError);
    }

    getSync = (url) => {
        return this.api.get(url);
    }

    getForm = (url, form, funcResult, funcError) => {
        if (url.indexOf('?') <= 0) url += "?";
        var first = true;
        for (var c in form) {
            if (!first) url += "&";
            url += c + "=" + form[c];
            first = false;
        }

        this.execute(this.api.get(url), funcResult, funcError);
    }

    delete = (url, funcResult, funcError) => {
        this.execute(this.api.delete(url), funcResult, funcError);
    }

    post = (url, form, funcResult, funcError) => {
        this.execute(this.api.post(url, form), funcResult, funcError);
    }

    put = (url, form, funcResult, funcError) => {
        this.execute(this.api.put(url, form), funcResult, funcError);
    }

    uploadFileForm(endpoint, funcResult, funcError) {
        var input = document.querySelector('input[type="file"]')

        var data = new FormData()
        for (const file of input.files) {
            data.append('files', file, file.name)
        }

        this.post(endpoint, data, funcResult, funcError)
    }
}

export const api = new Api(document.getElementsByTagName('base')[0].getAttribute('href'));