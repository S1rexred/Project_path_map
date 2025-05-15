import React, { useState } from "react";
import '../styles/Headers/Registration.css'
const WalkProfileForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        age: '',
        sity: '',
        time: '',
        interests: '',
        about: ''
    })

    const [selectedFile, setSelectedFile] = useState(null)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('photo', selectedFile)
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key])
        })
        
        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                body: data
            })

            const result = await response.json();
            if (response.ok) {
                alert("Анкета успешно создана!");
            } else {
                alert("Ошибка при создании анкеты: " + result.message);
            }
        } catch (error) {
            console.error('Ошибка при создании формы', error)
            alert('Ошибка')
        }
    }

      return (
        <form onSubmit={handleSubmit} className="walk-form">
            <h2>Регистрация</h2>
            <input type="email" name="email" placeholder="Введите свою почту" onChange={handleChange} className="form-input" />
            <input type="password" name="password" placeholder="Введите пароль" onChange={handleChange} className="form-input" />
            <input type="name" name="name" placeholder="Имя" onChange={handleChange} className="form-input" />
            <input type="age" name="age" placeholder="Возраст" onChange={handleChange} className="form-input" />
            <input name="sity" placeholder="Город/район" onChange={handleChange} className="form-input" />
            <input name="time" placeholder="Во сколько готов гулять?" onChange={handleChange} className="form-input" />
            <input name="interests" placeholder="Интересы" onChange={handleChange} className="form-input" />
            <textarea name="about" placeholder="Расскажи о себе" onChange={handleChange} className="form-textarea"></textarea>
            <p>Ваша фотография</p>
            <input type="file" name="file" placeholder="Ваше фото" onChange={handleFileChange} className="form-input"/>
            <button type="submit" className="form-button">Создать анкету</button>
         </form>
    )
}

export default WalkProfileForm