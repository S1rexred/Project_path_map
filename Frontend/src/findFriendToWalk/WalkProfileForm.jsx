import React, { useState } from "react";

const WalkProfileForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        sity: '',
        time: '',
        interests: '',
        about: ''
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onsubmit(formData)
    }

      return (
        <form onSubmit={handleSubmit} className="walk-form">
            <input name="mail" placeholder="Введите свою почту" onChange={handleChange} className="form-input" />
            <input name="password" placeholder="Введите пароль" onChange={handleChange} className="form-input" />
            <input name="name" placeholder="Имя" onChange={handleChange} className="form-input" />
            <input name="age" placeholder="Возраст" onChange={handleChange} className="form-input" />
            <input name="sity/neighbourhood" placeholder="Город/район" onChange={handleChange} className="form-input" />
            <input name="time" placeholder="Во сколько готов гулять?" onChange={handleChange} className="form-input" />
            <input name="interests" placeholder="Интересы" onChange={handleChange} className="form-input" />
            <textarea name="about" placeholder="Расскажи о себе" className="form-textarea"></textarea>
            <button type="submit" className="form-button">Создать анкету</button>
         </form>
    )
}

export default WalkProfileForm