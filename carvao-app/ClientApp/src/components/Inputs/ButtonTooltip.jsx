import React, { useState } from 'react';

const ButtonTooltip = ({ text, textButton, className, onClick, top = false, disabled = false }) => {
    const [show, setShow] = useState(false);

    const handleMouseEnter = () => {
        setShow(true);
    };

    const handleMouseLeave = () => {
        setShow(false);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
                disabled={disabled}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer' }}
                className={className}
                onClick={onClick}
            >
                {textButton}
            </button>
            <div
                id="tooltip"
                style={{
                    visibility: show ? 'visible' : 'hidden',
                    position: 'absolute',
                    top: top ? '-50px' : '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: '#fff',
                    padding: '5px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                }}
            >
                {text}
            </div>
        </div>
    );
};

export default ButtonTooltip;
