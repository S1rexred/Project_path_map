import React, { useEffect, useState } from "react";
import ymaps from "ymaps";
import BuildRoute from "../routes/BuildRoute";
import { SearchCafes } from "../searchPlace/SearchCafes";
import { BuildWalkingRoute } from "../routes/BuildRouteWalking";
import { SearchParks } from "../searchPlace/SearchParks";

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [userCoords, setUserCoords] = useState(null);
    const [cafeCoords, setCafeCoords] = useState(null);
    const [parkCoords, setParkCoords] = useState(null);
    const [userPlacemark, setUserPlacemark] = useState(null);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [routeReady, setRouteReady] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [manualMove, setManualMove] = useState(false);

    useEffect(() => {
        if (map) return;

        console.log("🌍 Создается карта...");
        ymaps
            .load(
                "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=3e97ca53-6fe6-4f83-92e8-625dc2b8f2c4"
            )
            .then((ymapsInstance) => {
                const newMap = new ymapsInstance.Map("map", {
                    center: [46.200000, 48.000002],
                    zoom: 16,
                });

                newMap.events.add("boundsChange", () => {
                    const newCenter = newMap.getCenter();
                    console.log("📌 Центр карты изменился:", newCenter);
                    searchNearestCafe(newCenter, newMap);
                });

                setMap(newMap);
            })
            .catch((err) => console.error("❌ Ошибка загрузки Яндекс.Карт:", err));
    }, []);

    // 🔍 Функция поиска ближайшего кафе и парка
    const searchNearestCafe = (coords, map) => {
        if (isSearching) return;
        setIsSearching(true);

        SearchCafes(coords, map, (newCafeCoords) => {
            setCafeCoords(newCafeCoords);
            
            // Теперь ищем парк после поиска кафе
            SearchParks(newCafeCoords, map, (newParkCoords) => {
                setParkCoords(newParkCoords);
                setIsSearching(false);
            });
        });
    };

    // 🔄 Обновление местоположения пользователя и поиск кафе/парка
    useEffect(() => {
        if (map && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = [position.coords.latitude, position.coords.longitude];
                setUserCoords(coords);
                console.log("📍 Геопозиция получена:", coords);

                ymaps.load().then((ymapsInstance) => {
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
                        setManualMove(true);
                        searchNearestCafe(newCoords, map);
                    });

                    map.geoObjects.add(placemark);
                    setUserPlacemark(placemark);

                    if (isFirstLoad) {
                        map.setCenter(coords, 15);
                        setIsFirstLoad(false);
                    }

                    searchNearestCafe(coords, map);
                });
            });
        }
    }, [map]);

    // 🔄 Автоматическое обновление метки при движении пользователя
    useEffect(() => {
        if (!map || !userPlacemark || !"geolocation" in navigator) return;

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                if (manualMove) return; // Если пользователь двигал вручную — не обновляем
                const newCoords = [position.coords.latitude, position.coords.longitude];

                setUserCoords(newCoords);
                if (userPlacemark) {
                    userPlacemark.geometry.setCoordinates(newCoords);
                }

                console.log("📍 Пользователь движется:", newCoords);
                searchNearestCafe(newCoords, map);
            },
            (error) => console.log("⚠️ Ошибка получения геопозиции:", error),
            { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [map, userPlacemark, manualMove]);

    // 🚀 Построение маршрута к кафе и парку
    useEffect(() => {
        if (map && userCoords && cafeCoords && parkCoords && routeReady) {
            console.log("🛤️ Строим маршрут к кафе:", cafeCoords, "и парку:", parkCoords);
            BuildWalkingRoute(map, userCoords, cafeCoords, parkCoords);
        }
    }, [map, userCoords, cafeCoords, parkCoords, routeReady]);

    // 🔘 Нажатие кнопки "Построить маршрут"
    const handleRouteReady = () => {
        setRouteReady(true);
    };

    return (
        <div>
            <div id="map" style={{ width: "100%", height: "400px" }} />
            <button
                onClick={handleRouteReady}
                style={{ marginTop: "10px", cursor: "pointer", padding: "10px" }}
            >
                Построить маршрут
            </button>
        </div>
    );
};

export default MapComponent;
