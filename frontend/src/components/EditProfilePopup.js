import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function EditProfilePopup({isOpen, onUpdateUser, onClose}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');


    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });

    }


    return (
        <PopupWithForm name="profile" title="Редактировать профиль" buttonName="Сохранить"
                       isOpen={isOpen}
                       onSubmit={handleSubmit}
                       onClose={onClose}>


            <input onChange={handleChangeName} value={name || ''} id="popup-name" type="text" name="popup-name"
                   placeholder="Имя"
                   className="popup__input popup__input_type_name"
                   minLength="2" maxLength="40" required
            />
            <span className="popup__input-error" id="popup-name-error"></span>
            <input onChange={handleChangeDescription} value={description || ''} id="popup-job" type="text"
                   name="popup-job"
                   placeholder="О себе"
                   className="popup__input popup__input_type_job"
                   minLength="2" maxLength="200" required/>
            <span className="popup__input-error" id="popup-job-error"></span>


        </PopupWithForm>
    );
}

export default EditProfilePopup;