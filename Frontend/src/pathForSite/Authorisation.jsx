import React from "react";
import { useState } from "react";
import '../styles/Headers/Login.css'

const Authorisation = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password}),
                credentials: 'include'
            })

            const data = await response.json()

            if (response.ok) {
                alert('Успешный вход')
                localStorage.setItem('auth', 'true')
                window.location.href = '/'
            } else {
                setError(data.message || 'Ошибка при входе')
            }
        } catch (error) {
            console.error(error)
            setError('Сервер недоступен')
        }
    }
    return (
        <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Вход</h2>
            <input name="email" placeholder="Введите свою почту" onChange={(e) => setEmail(e.target.value)} />
            <input name="password" placeholder="Введите пароль" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Войти в аккаунт</button>
            {error && <p>{error}</p>}
            <p className="register-link">Нет аккаунта? <a href="Регистрация">Зарегистрироваться</a></p>
         </form>
        </div>
    )
}

export default Authorisation