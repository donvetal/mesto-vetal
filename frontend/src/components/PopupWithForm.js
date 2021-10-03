import React from "react";

function PopupWithForm({name, isOpen, onClose, onSubmit, title, children, buttonName}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button onClick={onClose} type="button"
                        className={`popup__close popup__close_type_${name}`}></button>
                <form onSubmit={onSubmit} action="#" name="popup-form"
                      className={`popup__form popup__form_type_${name}`}
                      noValidate>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button type="submit" className="popup__btn">{buttonName}</button>
                </form>

            </div>
        </div>

    );
}

export default PopupWithForm;