import React, { useEffect, useState } from "react"
import homie_logo from '../img/homie_logo.png'

const Headers = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    )
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.body.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])

    const toggleMenu = () => setMenuOpen(!menuOpen)

    return (
        <header className="header">
            <div className="logo-container">
                <img className="logo-photo" src={homie_logo} alt="Лого" />
                <div className="logo">Гуляй везде</div>
            </div>
            <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <a href="">Создать маршрут</a>
                <a href="">Зарегестрироваться</a>
                <a href="">Войти</a>
            </nav>

            <div className="burger" onClick={toggleMenu}>
                <div className={`line ${menuOpen ? 'open' : ''}`}></div>
                <div className={`line ${menuOpen ? 'open' : ''}`}></div>
                <div className={`line ${menuOpen ? 'open' : ''}`}></div>
            </div>
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