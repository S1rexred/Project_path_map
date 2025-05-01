import React from "react";
import { useState } from "react";

const Authorisation = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.prevenDefault()
    }
    return (
        <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Вход</h2>
            <input name="mail" placeholder="Введите свою почту" onChange={(e) => setEmail(e.target.value)} />
            <input name="password" placeholder="Введите пароль" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Войти в аккаунт</button>
            <p className="register-link">Нет аккаунта? <a href="Регистрация">Зарегистрироваться</a></p>
         </form>
        </div>
    )
}

export default Authorisation