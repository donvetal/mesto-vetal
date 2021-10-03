import React, {useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import fail from '../images/info-tooltip-fail.svg';
import successImg from '../images/info-tooltip-success.svg';
import * as auth from '../utils/auth.js';


function App(props) {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [registered, setRegistered] = React.useState(false);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [email, setEmail] = React.useState({});

    const onSignOut = () => {
        localStorage.removeItem('token');
        setRegistered(false);
    };

    const onLogin = (password, email) => {
        auth.authorize(password, email)
            .then((data) => {
                if (data && data.hasOwnProperty('token')) {
                    localStorage.setItem('token', data.token);
                    setEmail({email: email});
                    setLoggedIn(true);
                    props.history.push("/");
                } else {
                    setIsInfoTooltipOpen(true);
                }
            })
            .catch(err => {
                setIsInfoTooltipOpen(true);
                console.log(err);
            });
    };


    useEffect(() => {
        if (localStorage.getItem('token')) {
            const jwt = localStorage.getItem('token');
            // проверяем токен пользователя
            auth.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setEmail({email: res.data.email});
                        setLoggedIn(true);
                    }

                })
                .then(() => {
                    props.history.push("/");

                })
                .catch(error => {
                    console.log(error);
                });

        }
    }, [props.history]);




    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };


    const onInfoTooltipClose = () => {
        closeAllPopups();
        if (registered) {
            setTimeout(() => props.history.push("/signin"), 1000);
        }

    };

    const closeAllPopups = () => {
        setIsInfoTooltipOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    };


    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

    useEffect(() => {
        api.getCardList()
            .then(data => {
                setCards(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const [currentUser, setCurrentUser] = React.useState({});

    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setCurrentUser(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleRegister = (password, email) => {

        auth.register(password, email)
            .then((res) => {
                if (res.hasOwnProperty('error')) {
                    setRegistered(false);
                } else {
                    setRegistered(true);
                }
                setIsInfoTooltipOpen(true);
            })
            .catch((err) => console.log(err));
    };

    const handleUpdateUser = (currentUser) => {
        api.setUserInfo(currentUser.name, currentUser.about)
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();

            })
            .catch(error => {
                console.log(error);
            });

    };

    const handleUpdateAvatar = (avatar) => {
        api.setUserAvatar(avatar)
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(error => {
                console.log(error);
            });

    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(_ => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleAddPlace(e, card) {
        api.addNewCard(card)
            .then(card => {
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="App">
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <Header onSignOut={onSignOut} userData={email}/>
                    <Switch>
                        <Route path="/signin">

                            <InfoTooltip
                                isOpen={isInfoTooltipOpen}
                                onClose={closeAllPopups}
                                image={fail}
                                title={'Что-то пошло не так! Попробуйте ещё раз.'}

                            />
                            <Login handleLogin={onLogin}/>
                        </Route>
                        <Route path="/signup">

                            <InfoTooltip
                                isOpen={isInfoTooltipOpen}
                                onClose={onInfoTooltipClose}
                                image={registered ? successImg : fail}
                                title={registered ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}

                            />
                            <Register
                                onRegister={handleRegister}/>

                        </Route>

                        <Route>


                            <ProtectedRoute exact path="/"
                                            loggedIn={loggedIn}
                                            component={Main}
                                            onEditProfile={handleEditProfileClick}
                                            onAddPlace={handleAddPlaceClick}
                                            onEditAvatar={handleEditAvatarClick}
                                            cards={cards}
                                            handleCardClick={handleCardClick}
                                            setCards={setCards}
                                            onCardLike={handleCardLike}
                                            onCardDelete={handleCardDelete}

                            />
                            {loggedIn ? (<Redirect to="/"/>) : (<Redirect to="/signin"/>)}
                        </Route>


                    </Switch>
                    <Footer/>

                    <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                      onUpdateUser={handleUpdateUser}
                                      onClose={closeAllPopups}/>

                    <AddPlacePopup isOpen={isAddPlacePopupOpen}
                                   onAddPlaceSubmit={handleAddPlace}
                                   onClose={closeAllPopups}/>

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                                     onUpdateAvatar={handleUpdateAvatar}
                                     onClose={closeAllPopups}/>

                    <PopupWithForm name="delete-image" title="Вы уверены?" buttonName="Да"/>

                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                        isOpen={isImagePopupOpen}
                    />
                </div>
            </CurrentUserContext.Provider>
        </div>
    );
}


export default withRouter(App);

