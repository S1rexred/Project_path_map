import React, { useEffect, useRef, useState } from "react"
import homie_logo from '../img/homie_logo.png'
import '../styles/Headers/headers.css'

const Headers = ({ img }) => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    )
    const [menuOpen, setMenuOpen] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)
    const profileRef = useRef(null)

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.body.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])
    
    useEffect(() => {
        const checkAuth = () => {
            setIsAuth(localStorage.getItem('auth') === 'true')
        }

        checkAuth()
        window.addEventListener('storage', checkAuth)

        return () => window.removeEventListener('storage', checkAuth)
    }, [])
    
    useEffect(() => {
        setIsAuth(localStorage.getItem('auth') === 'true')

        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleMenu = () => setMenuOpen(!menuOpen)

    const handleLogout = () => {
        localStorage.removeItem('auth')
        window.location.reload()
    }

    const toogleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen)
    }

    return (
        <header className="header">
            <div className="logo-container">
                <img className="logo-photo" src={homie_logo} alt="Лого" />
                <a href="/" className="logo-text">Гуляй везде</a>
            </div>

            <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                
                {!isAuth && (
                    <div>
                        <label className="theme-switch" style={{marginRight: '30px'}}>
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
                    <a style={{marginRight: '27px'}} href="/single-route">Создать маршрут</a>
                    <a style={{marginRight: '27px'}} href="/registration">Зарегистрироваться</a>
                    <a style={{marginRight: '27px'}} href="/login">Войти</a>
                    </div>
                )}
            </nav>

                {isAuth && (
                    <div className="profile-wrapper" ref={profileRef}>
                        <a style={{marginRight: '27px'}} href="/single-route">Создать маршрут</a>
                    { img && <img src={img} alt="иконка-профиля" className="profile-icon"onClick={toogleProfileMenu}/>}
                    {profileMenuOpen && (
                        <div className="profile-menu">
                            <a href="/edit">Редактировать профиль</a>
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
                            <button onClick={handleLogout}>Выйти</button>
                        </div>
                    )}
                    </div>
                )}

            <div className="burger" onClick={toggleMenu}>
                <div className={`line ${menuOpen ? 'open' : ''}`}></div>
                <div className={`line ${menuOpen ? 'open' : ''}`}></div>
                <div className={`line ${menuOpen ? 'open' : ''}`}></div>
            </div>
        </header>
    )
}

export default Headers