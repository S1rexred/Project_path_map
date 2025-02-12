import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import UserLocation from './components/UserLocation';
import SearchPlace from './components/SearchPlace';

const App = () => {

  const [map, setMap] = useState(null)

  return (
    <div className="App">
      <h1>Приложение с картой</h1>
      <MapComponent onMapReady = {setMap}/>
      {map && <UserLocation map = {map}/>}
      {map && <SearchPlace map = {map} query='парки'/>}
    </div>
  );
}

export default App;