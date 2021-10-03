import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (e) => {

        e.preventDefault();
        this.props.onRegister(this.state.password, this.state.email);

    };

    render() {
        return (
            <div className="register">
                <p className="register__title">
                    Регистрация
                </p>
                <form onSubmit={this.handleSubmit} className="register__form">

                    <input onChange={this.handleChange} value={this.state.email} id="email" type="email" name="email"
                           placeholder="Email"
                           className="register__input register__input_type_email"
                           minLength="5" maxLength="40" required
                    />


                    <input onChange={this.handleChange} value={this.state.password} id="password" type="password"
                           name="password"
                           placeholder="Пароль"
                           className="register__input register__input_password"
                           minLength="8" maxLength="200" required/>


                    <button type="submit"
                            className="register__btn">Зарегистрироваться
                    </button>
                    <p className="register__signin">Уже зарегистрированы?
                        <Link to="/signin" className="register__signin-link"> Войти</Link>
                    </p>

                </form>

            </div>
        );
    }

}

export default withRouter(Register);
