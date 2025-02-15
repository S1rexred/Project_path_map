import React, { useEffect, useState } from 'react';
import BuildRoute from '../routes/BuildRoute'

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [userCoords, setUserCoords] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=ТВОЙ_API_КЛЮЧ";
        script.async = true;
        script.onload = () => window.ymaps.ready(initMap);
        document.head.appendChild(script);

        const initMap = () => {
            const newMap = new window.ymaps.Map('map', {
                center: [46.200000, 48.000002],
                zoom: 12,
            });
            setMap(newMap);
        };

        return () => document.head.removeChild(script);
    }, []);

    // Определяем местоположение пользователя
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = [position.coords.latitude, position.coords.longitude];
                setUserCoords(coords); // Сохраняем координаты пользователя
                console.log('📍 Геопозиция получена:', coords);
            });
        }
    }, []);

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '400px' }} />
            {/* Показываем маршрут, если есть карта и геопозиция */}
            {map && userCoords && <BuildRoute map={map} userCoords={userCoords} />}
        </div>
    );
};

export default MapComponent;