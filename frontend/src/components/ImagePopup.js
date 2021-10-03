import React from "react";

function ImagePopup({isOpen, onClose, card}) {
    return (
        <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button onClick={onClose} type="button" className="popup__close popup__close_type_image"></button>
                <img src={card.link} alt={card.name} className="popup__image"/>
                <p className="popup__description">{card.name}</p>
            </div>

        </div>
    );
}

export default ImagePopup;