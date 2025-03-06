import React, { useEffect, useState } from "react";
import ymaps from "ymaps";
import BuildRoute from "../routes/BuildRoute";
import { BuildWalkingRoute } from "../routes/BuildRouteWalking";
import { SearchCafes } from "../searchPlace/SearchCafes";
import { SearchParks } from "../searchPlace/SearchParks";
import { SearchAttractions } from "../searchPlace/SearchAttractions";
import { FindOptimalRoute } from '../algoritms/FindOptimalRoute'

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [userCoords, setUserCoords] = useState(null);
    const [cafeCoords, setCafeCoords] = useState(null);
    const [parkCoords, setParkCoords] = useState(null);
    const [attractionsCoords, setAttractionsCoords] = useState(null);
    const [userPlacemark, setUserPlacemark] = useState(null);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [routeReady, setRouteReady] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [firstLocationUpdate, setFirstLocationUpdate] = useState(true);
    const [hasCenteredMap, setHasCenteredMap] = useState(false)

    useEffect(() => {
        if (map !== null) return;

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

                setMap(newMap);
            })
            .catch((err) => console.error("❌ Ошибка загрузки Яндекс.Карт:", err));
    }, []);

    // 🔍 Функция поиска ближайшего кафе/парка/достоприм.
    const searchNearestCafe = (coords, map) => {
        if (isSearching) return;
        setIsSearching(true);

        SearchCafes(coords, map, (newCafeCoords) => {
            setCafeCoords(newCafeCoords);
           
            SearchParks(newCafeCoords, map, (newParkCoords) => {
                setParkCoords(newParkCoords);
                
                SearchAttractions(newParkCoords, map, (newAttractionsCoords) => {
                    setAttractionsCoords(newAttractionsCoords)
                    setIsSearching(false);
                })
            });
        });
    };

    // 🔄 Обновление местоположения пользователя
    useEffect(() => {
        if (map && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
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
                            FindOptimalRoute(newCoords, map);
                        });

                        map.geoObjects.add(placemark);
                        setUserPlacemark(placemark);

                        if (!hasCenteredMap && userCoords) {
                            map.setCenter(coords, 15)
                            setHasCenteredMap(true)
                        }

                        FindOptimalRoute(coords, map);
                    });
                },
                (error) => console.log("⚠️ Ошибка получения геопозиции:", error),
                { enableHighAccuracy: true, timeout: 30000, maximumAge: 5000 }
            );
        }
    }, [map]);

    // 🔄 Автоматическое обновление метки при движении пользователя
    useEffect(() => {
        if (!map || !userPlacemark || !"geolocation" in navigator) return;
   
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const newCoords = [position.coords.latitude, position.coords.longitude];

                if (JSON.stringify(newCoords) === JSON.stringify(userCoords)) return;

                console.log("📍 Пользователь движется:", newCoords);
                setUserCoords(newCoords);

                if (userPlacemark) {
                    userPlacemark.geometry.setCoordinates(newCoords);
                }

                FindOptimalRoute(newCoords, map);
            },
            (error) => {
                console.warn("Ошибка обновления координат", error.message);

                if (error.code === 3) {
                    console.log("Таймаут прошел... Пробуем снова");

                    setTimeout(() => {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const newCoords = [position.coords.latitude, position.coords.longitude];
                                console.log("Кешир координаты");
                                setUserCoords(newCoords);
                            },
                            (err) => console.log("Опять не удалось получить (таймаут)", err.message),
                            { enableHighAccuracy: true, timeout: 20000, maximumAge: 60000 }
                        );
                    }, 5000);
                }
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 60000 }
        );
   
        return () => navigator.geolocation.clearWatch(watchId);
    }, [map, userPlacemark, userCoords]);
   
    // 🚀 Построение маршрута
    useEffect(() => {
        if (map && userCoords && cafeCoords && parkCoords && attractionsCoords && routeReady) {
            console.log("🛤️ Строим маршрут к кафе:", cafeCoords, "и к парку:", parkCoords, "и к достопримечательности", attractionsCoords);
            BuildWalkingRoute(map, userCoords, cafeCoords, parkCoords, attractionsCoords);
        }
    }, [map, userCoords, cafeCoords, parkCoords, attractionsCoords, routeReady]);

    // 🔘 Кнопка "Построить маршрут"
    const handleRouteReady = () => {
        setRouteReady(true);
    };

    return (
        <div>
            <div id="map" style={{ width: "100%", height: "400px" }} />
            <button
                onClick={handleRouteReady}
                disabled = {routeReady}
                style = {{
                    marginTop: '10px',
                    cursor: routeReady ? 'not-allowed' : 'pointer',
                    padding: "10px"
                }}
            >
                Построить маршрут
            </button>
        </div>
    );
};

export default MapComponent;
