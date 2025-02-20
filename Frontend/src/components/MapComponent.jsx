import React, { useEffect, useState } from 'react';
import ymaps from 'ymaps';
import BuildRoute from '../routes/BuildRoute';
import { SearchCafes } from '../searchPlace/SearchCafes'

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [userCoords, setUserCoords] = useState(null);
    const [cafeCoords, setCafeCoords] = useState(null);
    const [userPlacemark, setUserPlacemark] = useState(null);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [routeReady, setRouteReady] = useState(false)

    useEffect(() => {
        if (map) return

        console.log('Создается карта')
        ymaps
            .load("https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=3e97ca53-6fe6-4f83-92e8-625dc2b8f2c4")
            .then((ymapsInstance) => {
                const newMap = new ymapsInstance.Map("map", {
                    center: [46.200000, 48.000002],
                    zoom: 12,
                });

                newMap.events.add('boundsChange', () => {
                    const newCenter = newMap.getCenter()
                    console.log('центр карты изменился')
                    SearchCafes(newCenter, newMap, setCafeCoords)
                })

                setMap(newMap);
            })
            .catch((err) => console.error("Ошибка загрузки Яндекс.Карт:", err));
    }, []);

    useEffect(() => {
        if (map && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = [position.coords.latitude, position.coords.longitude];
                setUserCoords(coords);
                console.log("📍 Геопозиция получена:", coords);

                ymaps.load().then((ymapsInstance) => {
                    // Если уже есть метка пользователя — удаляем
                    if (userPlacemark) {
                        map.geoObjects.remove(userPlacemark);
                    }

                    const placemark = new ymapsInstance.Placemark(
                        coords,
                        { balloonContent: "Вы здесь!" },
                        { draggable: true }
                    );

                    placemark.events.add("dragend", function () {
                        const newCoords = placemark.geometry.getCoordinates();
                        setUserCoords(newCoords);
                        console.log("📍 Новые координаты:", newCoords);
                        setRouteReady(false)
                        SearchCafes(newCoords, map, setCafeCoords)
                    });

                    map.geoObjects.add(placemark);
                    setUserPlacemark(placemark); // Сохраняем новую метку

                    if (isFirstLoad) {
                        map.setCenter(coords, 15);
                        setIsFirstLoad(false);
                    }

                    SearchCafes(coords, map, setCafeCoords);
                });
            });
        }
    }, [map]);

    const handleRouteReady = () => {
        setRouteReady(true)
        console.log("новая позишин")
    }

    return (
        <div>
            <div id="map" style={{ width: "100%", height: "400px" }} />
            <button onClick={handleRouteReady} style={{marginTop: '10px', cursor: 'pointer', padding: '10px'}}>
                Построить маршрут
            </button>
            <button  style={{marginTop: '10px', cursor: 'pointer', padding: '10px'}}>
                Построить новый маршрут
            </button>
            {map && userCoords && cafeCoords && routeReady && (
                <BuildRoute map={map} userCoords={userCoords} cafeCoords={cafeCoords} />
            )}
        </div>
    );
};

export default MapComponent;