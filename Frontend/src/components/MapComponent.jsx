import React, { useEffect, useState } from "react";
import ymaps from "ymaps";
import { BuildWalkingRoute } from "../routes/BuildRouteWalking";
import { FindOptimalRoute } from '../algoritms/FindOptimalRoute';
import { searchNearestPlaces } from "../searchPlace/SearchNearestPlace";
import OriginalTest from "../algoritms/tests/OriginalTest";

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [userCoords, setUserCoords] = useState(null);
    const [cafeCoords, setCafeCoords] = useState(null);
    const [parkCoords, setParkCoords] = useState(null);
    const [attractionsCoords, setAttractionsCoords] = useState(null);
    const [userPlacemark, setUserPlacemark] = useState(null);
    const [routeReady, setRouteReady] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [hasCenteredMap, setHasCenteredMap] = useState(false);
    const [watchId, setWatchId] = useState(null); // ID отслеживания геопозиции
    const [isTestOpen, setIstestOpen] = useState(false)

    useEffect(() => {
        if (map !== null) return;

        console.log("🌍 Создается карта...");
        ymaps
            .load(
                "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=3e97ca53-6fe6-4f83-92e8-625dc2b8f2c4",
            )
            .then((ymapsInstance) => {
                const newMap = new ymapsInstance.Map("map", {
                    center: [46.200000, 48.000002],
                    zoom: 16,
                });

                setMap(newMap);
            })
            .catch((err) => console.error("❌ Ошибка загрузки Яндекс.Карт:", err));

    }, []);

    // 🔄 Обновление местоположения пользователя (до нажатия кнопки "Построить маршрут")
    useEffect(() => {
        if (!map || !"geolocation" in navigator || routeReady) return;
    
        const id = navigator.geolocation.watchPosition(
            (position) => {
                const coords = [position.coords.latitude, position.coords.longitude];
                setUserCoords(coords);
                console.log("📍 Геопозиция обновлена:", coords);
    
                ymaps.load().then((ymapsInstance) => {
                    if (!userPlacemark) {
                        map.geoObjects.remove(userPlacemark);
                    
    
                    const placemark = new ymapsInstance.Placemark(
                        coords,
                        { balloonContent: "Вы здесь!" }
                    );
    
                    map.geoObjects.add(placemark);
                    setUserPlacemark(placemark);
                    } else {
                        userPlacemark.geometry.setCoordinates(coords)
                    }
                    if (!hasCenteredMap) {
                        map.setCenter(coords, 15);
                        setHasCenteredMap(true);
                    }
                });
            },
            (error) => console.log("⚠️ Ошибка получения геопозиции:", error),
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 5000 }
        );
    
        setWatchId((prevId) => {
            if (prevId) navigator.geolocation.clearWatch(prevId);
            return id;
        });
    
        return () => {
            navigator.geolocation.clearWatch(id);
        };
    }, [map, routeReady, userPlacemark]);
    

    // 🚀 Построение маршрута
    useEffect(() => {
        if (map && userCoords && cafeCoords && parkCoords && attractionsCoords && routeReady) {
            console.log("🛤️ Строим маршрут к кафе:", cafeCoords, "и к парку:", parkCoords, "и к достопримечательности", attractionsCoords);
            BuildWalkingRoute(map, userCoords, cafeCoords, parkCoords, attractionsCoords);
        }
    }, [map, userCoords, cafeCoords, parkCoords, attractionsCoords, routeReady]);

    return (
        <div>
            <div id="map" style={{ width: "100%", height: "400px" }} />
            <button
                onClick={() => {
                    searchNearestPlaces(userCoords, map, setIsSearching, FindOptimalRoute, setCafeCoords, setParkCoords, setAttractionsCoords);
                    setRouteReady(true); // Фиксируем положение пользователя
                    if (watchId) navigator.geolocation.clearWatch(watchId); // Отключаем автообновление
                }}
                disabled={routeReady}
                style={{
                    marginTop: '10px',
                    cursor: routeReady ? 'not-allowed' : 'pointer',
                    padding: "10px"
                }}
            >
                Построить маршрут
            </button>

            <button onClick={() => setIstestOpen(true)} style={{marginLeft: '6px'}}>
                Создать собственный маршрут
            </button>
            
            {isTestOpen && <OriginalTest onClose={() => setIstestOpen(false)} />}
        </div>
    );
};

export default MapComponent;
