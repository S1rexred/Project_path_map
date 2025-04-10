import React, { useEffect, useState } from 'react';
import SingleRoute from './pathForSite/SingleRoute';
import MainPage from './pathForSite/MainPage';
import UserLocation from './components/UserLocation';
import Headers from './SiteAppearance/Headers'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {

  const [map, setMap] = useState(null)

  return (
    <>
    <Router>
    <div className="App">
      
      {map && <UserLocation map = {map}/>}
      <Headers/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='single-route' element={<SingleRoute/>}/>
      </Routes>
    </div>
    </Router>
    </>
  );
}
export default App;