import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onAddPlaceSubmit, isOpen, onClose}) {

    const cardNameRef = React.createRef();
    const cardLinkRef = React.createRef();


    function handleSubmit(e) {
        e.preventDefault();
        onAddPlaceSubmit(e, {
            link: cardNameRef.current.value,
            name: cardLinkRef.current.value
        });
    }

    React.useEffect(() => {
        cardNameRef.current.value = '';
        cardLinkRef.current.value = '';
    }, [cardNameRef, cardLinkRef, isOpen]);

    return (
        <PopupWithForm name="mesto" title="Новое место"
                       onSubmit={handleSubmit}
                       isOpen={isOpen}
                       onClose={onClose}
                       buttonName="Создать">


            <input ref={cardLinkRef} id="mesto-name" type="text" name="mesto-name" placeholder="Название"
                   className="popup__input popup__input_type_mesto-name"
                   minLength="2" maxLength="30" required/>
            <span className="popup__input-error" id="mesto-name-error"></span>
            <input ref={cardNameRef} id="mesto-image-link" type="url" name="mesto-image-link"
                   placeholder="Ссылка на картинку"
                   className="popup__input popup__input_type_mesto-image-link"
                   required/>
            <span className="popup__input-error" id="mesto-image-link-error"></span>


        </PopupWithForm>
    );
}

export default AddPlacePopup;