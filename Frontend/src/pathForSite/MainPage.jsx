import React, { useEffect, useState } from "react"
import FindWalkPartner from "../findFriendToWalk/FindWalkPartner"
import Home from "../SiteAppearance/Home"

const MainPage = () => {
    const [profiles, setProfiles] = useState([])
    const [isAuth, setIsAuth] = useState(false)


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/users/me', {
                    method: 'GET',
                    credentials: 'include'
                })

                if (res.ok) {
                    setIsAuth(true)
                } else {
                    setIsAuth(false)
                }
            } catch (error) {
                console.error('Ошибка проверки авторизации', error)
                setIsAuth(false)
            }
        }

        checkAuth()
    }, [])

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/users', {
                    method: 'GET',
                    credentials: 'include'
                })
                const data = await response.json()

                // Обновим данные, добавив путь к фото
                const updatedData = data.map(user => ({
                    ...user,
                    img: `http://localhost:3001/uploads/${user.photo}`
                }))

                setProfiles(updatedData)
            } catch (err) {
                console.error('Ошибка загрузки анкет:', err)
            }
        }

        fetchProfiles()
    }, [])

    return (
        <div>
            
            
            {isAuth ? (
                <>
                <h2>Найди себе человека для гулянки</h2>
                 <FindWalkPartner profiles={profiles} />
                </>
            ) : (
               <div>
                <Home/>
               </div>
            )}
            
        </div>
    )
}

export default MainPage