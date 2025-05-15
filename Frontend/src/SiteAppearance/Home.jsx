import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
const Home = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/registration')
    }

    return (
    <main className='welcome'>
        <div className="overlay">
            <section className='content'>
                <h1>Не гуляй один... Гуляй с нами</h1>
                <button onClick={handleClick}>Создать анкету</button>
            </section>
        </div>

        <section className='info-section'>

        </section>
    </main>
    )
} 

export default Home