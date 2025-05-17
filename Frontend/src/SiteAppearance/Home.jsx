import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import photo_profile from '../img/photo_profile.jpg'
const Home = () => {
    const navigate = useNavigate()
    const [openIndex, setOpenIndex] = useState(null)

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme')

        if (currentTheme === 'dark-quest') {
            document.body.classList.add('dark-quest')
        }

        return () => {
            document.body.classList.remove('dark-quest')
        }
    }, [])

    const handleClick = () => {
        navigate('/registration')
    }

    const toggleFAQ = index => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
    <main>
        <div className='welcome'>
            <div className="overlay">
                <section className='content'>
                    <h1>Не гуляй один... Гуляй с нами</h1>
                    <button onClick={handleClick}>Создать анкету</button>
                </section>
            </div>
        </div>

        <section className='info-section'>
            <div className="info-block with-images">
                <div className="text">
                    <h2>Что это за сайт?</h2>
                    <p>Этот сайт помогает найти напарника/компанию для прогулок, 
                    с которыми можно погулять по городу, если одиноко</p>
                </div>
                <div className="images">
                    <img src={photo_profile} alt="" />
                    <img src={photo_profile} alt="" />
                    <img src={photo_profile} alt="" />
                </div>
            </div>
        </section>

        <section className='info-section light'>
            <h2>Почему это удобно и самое главное безопасно?</h2>
            <p>Вопрос безопасности является очень важным в нашей жизни, так что
                каждая анкета проходит качественную и ежедневную проверку, с умной аутентификацией
                <br /> А удобно это потому что вам не нужно будет стесняться и долго искать напарника/компанию
                для прогулки, так как у всех других такая же цель, как и у вас, весело провести время.
            </p>
        </section>

        <section className="card-section">
            <h2>Как это работает?</h2>
            <div className="card-grid">
                <div className="card">
                    <h3>1. Заполни анкету</h3>
                    <p>Добавь фото, расскажи о себе, своих интересах, когда гулять хочешь и тп</p>
                </div>
                <div className="card">
                    <h3>2. Найди людей рядом</h3>
                    <p>Смотри анкеты дугих людей, которые тоже ищут себе напарника для прогулки</p>
                </div>
                <div className="card">
                    <h3>3. Назначи встречу и гуляйте</h3>
                    <p>Связывайся, договаривайся и проводите время вместе</p>
                </div>
            </div>
        </section>

        <section className="faq">
            <h2>FAQ (Часто задаваемые вопросы)</h2>
            <div className="faq-item" onClick={() => toggleFAQ(0)}>
                <h4>Это бесплатно?</h4>
                { openIndex === 0 &&<p>Да, поиск и тп абсолютно бесплатно.</p> }
            </div>
            <div className="faq-item" onClick={() => toggleFAQ(1)}>
                <h4>Как вы гарантируете безопастность, что придет именно нужный человек?</h4>
                { openIndex === 1 && <p>Каждый день человек проходит аутентификацию личности, что это именно он, отправляя
                    определенную фотку на проверку
                </p> }
            </div>
            <div className="faq-item" onClick={() => toggleFAQ(2)}>
                <h4>Как скачать приложение?</h4>
                { openIndex === 2 && <p>После регистрации нажмите три полоски и добавьте сайт на главный экран
                    мобильного телефона, тогда у вас будет полноценное приложение.
                </p> }
            </div>
        </section>
    </main>
    )
} 

export default Home