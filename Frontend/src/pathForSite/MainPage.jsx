import React from "react";
import FindWalkPartner from "../findFriendToWalk/FindWalkPartner";
import homie_logo from '../img/homie_logo.png'
import photo_profile from '../img/photo_profile.jpg'

const testProfile = [
    {
    img: photo_profile,
    name: 'Алекс',
    age: 22,
    city: "Москва",
    time: "Вечер",
    interests: "Зал, кино, программирование",
    about: "Меня зовут Саша, мне 20 лет блаблаблаблаблаблабла"
    },
    {
    img: photo_profile,
    name: 'Алекс',
    age: 22,
    city: "Москва",
    time: "Вечер",
    interests: "Зал, кино, программирование",
    about: "Меня зовут Саша, мне 20 лет блаблаблаблаблаблабла"
    },
    {
    img: photo_profile,
    name: 'Алекс',
    age: 22,
    city: "Москва",
    time: "Вечер",
    interests: "Зал, кино, программирование",
    about: "Меня зовут Саша, мне 20 лет блаблаблаблаблаблабла"
    }
]

const MainPage = () => {
    return (
    <div>
        <h2>Найди себе человека для гулянки</h2>
        <FindWalkPartner profiles={testProfile}/>
    </div>
    )
}

export default MainPage