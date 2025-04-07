import React, { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent';
import UserLocation from './components/UserLocation';
import Headers from './SiteAppearance/Headers'
import './index.css'
const App = () => {

  const [map, setMap] = useState(null)

  return (
    <>
    <div className="App">
      <Headers/>
      <h2>Приложение с картой</h2>
      <MapComponent onMapReady = {setMap}/>
      {map && <UserLocation map = {map}/>}
    </div>
    </>
  );
}
export default App;