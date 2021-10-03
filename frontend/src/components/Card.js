import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Card({onCardClick, onCardDelete, onCardLike, cardLink, cardName, cardLikes, card}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__trash ${isOwn ? 'card__trash_visible' : 'card__trash_hidden'}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : 'card__like_disabled'}`
    );
    const handleLikeClick = () => {
        onCardLike(card);

    };
    const handleDeleteClick = () => {
        onCardDelete(card);
    };

    return (
        <li className="card">
            <button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName}></button>
            <img onClick={() => onCardClick(card)} src={cardLink} alt={cardName} className="card__image"/>
            <div className="card__conteiner">
                <h2 className="card__name">{cardName}</h2>
                <div className="card__like-conteiner">
                    <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
                    <p className="card__like-number">{cardLikes}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;