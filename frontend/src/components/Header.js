import React from "react";
import logo from "../images/header-logo.svg";
import {Link, Route, Switch} from 'react-router-dom';

function Header(props) {
    let {email} = props.userData;
    return (
        <header className="header page__container">
            <img src={logo} alt="логотип" className="header__logo"/>
            <Switch>
                <Route path={'/signup'}><Link to="/signin" className="header__link">Войти</Link></Route>
                <Route path={'/signin'}><Link to="/signup" className="header__link">Регистрация</Link></Route>
                <Route path={'/'}>
                    <div className="header__logged">
                        <p className="header__email">{email}</p>
                        <Link onClick={props.onSignOut} to="/signin" className="header__link">Выйти</Link>
                    </div>
                </Route>

            </Switch>
        </header>
    );
}

export default Header;