import React, { useEffect, useState } from 'react';
import SingleRoute from './pathForSite/SingleRoute';
import Registration from './pathForSite/Registration'
import MainPage from './pathForSite/MainPage';
import UserLocation from './components/UserLocation';
import Headers from './SiteAppearance/Headers'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {

  const [map, setMap] = useState(null)
  const [profiles, setProfiles] = useState([])

  return (
    <>
    <Router>
    <div className="App">
      
      {map && <UserLocation map = {map}/>}
      <Headers/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='single-route' element={<SingleRoute/>}/>
        <Route path='регистрация' onSubmit={(data) => setProfiles([...profiles, data])} element={<Registration/>}/>
      </Routes>
    </div>
    </Router>
    </>
  );
}
export default App;