import React from "react";
import penAvatar from '../images/pen-only.svg';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, cards, handleCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile page__container">
                <div className="profile__container">
                    <img src={currentUser.avatar} alt="аватар профайла" className="profile__avatar"/>
                    <div className="profile__overlay">
                        <img onClick={onEditAvatar} src={penAvatar} alt="редактор аватара"
                             className="profile__avatar-pen"/>
                    </div>
                </div>
                <div className="profile__info">
                    <div className="profile__title">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={onEditProfile} type="button" className="profile__button"></button>
                    </div>

                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__add-button"></button>


            </section>
            <section className="elements page__container">
                <ul className="elements-cards">
                    {
                        cards.map((card, i) =>
                            <Card
                                key={card._id}
                                onCardClick={handleCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                                cardLink={card.link}
                                cardName={card.name}
                                alt={card.name}
                                cardLikes={card.likes.length}
                                card={card}

                            />
                        )
                    }


                </ul>
            </section>
        </main>


    );

}


export default Main;