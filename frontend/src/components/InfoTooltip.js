import React from "react";


function InfoTooltip({isOpen, onClose, title, image}) {
    return (
        <div className={`popup popup_type_info-tooltip ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button onClick={onClose} type="button"
                        className={`popup__close popup__close_type_info-tooltip`}></button>
                <img src={image} alt="изображение" className="popup__info-tooltip-image"/>
                <p className="popup__info-tooltip-title">{title}</p>
            </div>
        </div>

    );
}

export default InfoTooltip;