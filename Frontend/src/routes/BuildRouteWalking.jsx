export const BuildWalkingRoute = (map, userCoords, cafeCoords, parkCoords, attractionsCoords, userPlacemark) => {
    if (!map || !userCoords || !cafeCoords) return;

    ymaps.load().then((ymapsInstance) => {
        map.geoObjects.removeAll();

        // маршрут
        const multiRoute = new ymapsInstance.multiRouter.MultiRoute(
            {
                referencePoints: [userCoords, cafeCoords, parkCoords, attractionsCoords],
                params: { routingMode: "pedestrian" }
            },
            {
                boundsAutoApply: true,
                routeActiveStrokeWidth: 6,
                routeActiveStrokeColor: "#FF0000"
            }
        );

        map.geoObjects.add(multiRoute);

        // Отслеживание движения пользователя
        navigator.geolocation.watchPosition(
            (position) => {
                const newCoords = [position.coords.latitude, position.coords.longitude];

                // Если пользователь ушёл на 10+ метров, перестраиваем маршрут
                const distance = ymapsInstance.coordSystem.geo.getDistance(userCoords, newCoords);
                if (distance > 10) {
                    console.log("Перестраиваем маршрут, пользователь сдвинулся:", newCoords);
                    userCoords = newCoords;
                    multiRoute.model.setReferencePoints([newCoords, cafeCoords, parkCoords, attractionsCoords]);
                }

                // Обновляем метку пользователя
                if (userPlacemark) {
                    userPlacemark.geometry.setCoordinates(newCoords);
                }
            },
            (error) => console.error("Ошибка обновления координат:", error),
            { enableHighAccuracy: true, maximumAge: 30000, timeout: 30000 }
        );
    });
}