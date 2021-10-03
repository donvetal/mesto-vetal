import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}) {
    const avatarInputRef = React.createRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarInputRef.current.value);
    }

    React.useEffect(() => {
        avatarInputRef.current.value = '';
    }, [avatarInputRef, isOpen]);

    return (
        <PopupWithForm name="update-avatar" title="Обновить аватар" buttonName="Сохранить"
                       onSubmit={handleSubmit}
                       isOpen={isOpen}
                       onClose={onClose}>

            <input ref={avatarInputRef} id="avatar-link" type="url" name="avatar-link"
                   placeholder="Ссылка на аватар"
                   className="popup__input popup__input_type_avatar-link"
                   required/>
            <span className="popup__input-error" id="avatar-link-error"></span>


        </PopupWithForm>
    );
}

export default EditAvatarPopup;