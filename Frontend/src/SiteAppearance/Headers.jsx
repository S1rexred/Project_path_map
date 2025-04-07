import React, { useEffect, useState } from "react"
import homie_logo from '../img/homie_logo.png'

const Headers = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    )

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.body.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])

    return (
        <header className="header">
            <img className="logo-photo" src={homie_logo} alt="Лого" />
            <div className="logo">Гуляй везде</div>
            <nav className="nav-links">
                <a href="">Главная</a>
                <a href="">Создать маршрут</a>
                <a href="">Зарегестрироваться</a>
                <a href="">Войти</a>
            </nav>
            <label className="theme-switch">
                <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                />
                <span className="slider">
                    <span className="icon-moon">🌙</span>
                    <span className="icon-sun">☀️</span>
                </span>
            </label>
        </header>
    )
}

export default Headers