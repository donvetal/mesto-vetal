import React from "react";
import {withRouter} from "react-router-dom";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.password || !this.state.email) {

            return;
        }
        this.props.handleLogin(this.state.password, this.state.email);

    }

    render() {
        return (
            <div className="login">
                <p className="login__title">
                    Вход
                </p>
                <form onSubmit={this.handleSubmit} className="login__form">
                    <input onChange={this.handleChange} value={this.state.email} id="email" type="email" name="email"
                           placeholder="Email"
                           className="login__input login__input_type_email"
                           minLength="5" maxLength="40" required
                    />

                    <input onChange={this.handleChange} value={this.state.password} id="password" type="password"
                           name="password"
                           placeholder="Пароль"
                           className="login__input login__input_password"
                           minLength="8" maxLength="200" required/>

                    <button type="submit" className="login__btn">Войти</button>
                </form>

            </div>
        );
    }
}

export default withRouter(Login);