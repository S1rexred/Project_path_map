import { useEffect } from 'react';

const UserLocation = ({ map }) => {
    useEffect(() => {
        if (!map) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = [position.coords.latitude, position.coords.longitude];
                    map.setCenter(userCoords, 14);

                    // ✅ Добавляем метку правильно
                    const userPlacemark = new window.ymaps.Placemark(userCoords, {
                        hintContent: 'Вы здесь',
                        balloonContent: 'Ваше местоположение',
                    }, {
                        preset: 'islands#redDotIcon', // Красная точка
                    });

                    map.geoObjects.add(userPlacemark); // ✅ Добавляем метку на карту
                },
                (error) => console.log('Ошибка геолокации:', error.message)
            );
        } else {
            console.log('Геолокация не поддерживается');
        }
    }, [map]);

    return null;
};

export default UserLocation;