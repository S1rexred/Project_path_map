import React, { useEffect, useState } from 'react';
import SingleRoute from './pathForSite/SingleRoute';
import Registration from './pathForSite/Registration'
import Authorisation from './pathForSite/Authorisation';
import MainPage from './pathForSite/MainPage';
import UserLocation from './components/UserLocation';
import Headers from './siteAppearance/Headers'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () => {

  const [map, setMap] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3001/api/users/me", {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('Пользователь не авторизован')
        return res.json()
      })
      .then(data => {
        setCurrentUser(data)
        setIsAuth(true)
      })
      .catch(err => {
        console.log('Ошибка получения профиля', err.message)
        setIsAuth(false)
      })
  }, [])
 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/users/me', {
          method: 'GET', 
          credentials: 'include'
        })
        const data = await res.json()

        if (res.ok) {
          console.log('Профиль', data)
        }
      } catch (error) {
        console.error('Ошибка автризации пользователя', error)
      }
    }

    fetchProfile()
  }, [])
  
  return (
    <BrowserRouter>
    <div className="App">
      
      {map && <UserLocation map = {map}/>}
      <Headers img={currentUser?.photo}/>
      
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/single-route' element={<SingleRoute/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Authorisation/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}
export default App;