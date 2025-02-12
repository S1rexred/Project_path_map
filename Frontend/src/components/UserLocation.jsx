import { useEffect } from 'react';

const UserLocation = ({ map }) => {
    useEffect(() => {
        if (!map) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = [position.coords.latitude, position.coords.longitude];
                    console.log('Координаты пользователя:', userCoords); // ✅ Проверяем координаты

                    map.setCenter(userCoords, 14);

                    const userPlacemark = new window.ymaps.Placemark(userCoords, {
                        hintContent: 'Вы здесь',
                        balloonContent: 'Ваше местоположение',
                    }, {
                        preset: 'islands#redDotIcon',
                    });

                    map.geoObjects.add(userPlacemark);
                    console.log('Метка добавлена на карту'); // ✅ Проверяем добавление метки
                },
                (error) => console.error('Ошибка геолокации:', error)
            );
        } else {
            console.log('Геолокация не поддерживается');
        }
    }, [map]);

    return null;
};

export default UserLocation;