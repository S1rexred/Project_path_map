export const BuildWalkingRoute = (map, userCoords, places, userPlacemark, answers, cafeCoords, parkCoords, attractionsCoords) => {
    if (!map || !userCoords || !places) return;

    ymaps.load().then((ymapsInstance) => {
        map.geoObjects.removeAll();

        let referencePoints = [userCoords];

        if (answers.cafe && answers.cafe !== "no") {
            referencePoints.push(places.cafeCoords);
        }

        if (answers.preference === "parks") {
            referencePoints.push(places.parkCoords);
        } else {
            referencePoints.push(places.street);
        }

        if (answers.routeLength === "long") {
            referencePoints.push(places.attractionsCoords);
        }

        const multiRoute = new ymapsInstance.multiRouter.MultiRoute(
            {
                referencePoints: referencePoints,
                params: { routingMode: "pedestrian" }
            },
            {
                boundsAutoApply: true,
                routeActiveStrokeWidth: 6,
                routeActiveStrokeColor: "#FF0000"
            }
        );

        map.geoObjects.add(multiRoute);

        navigator.geolocation.watchPosition(
            (position) => {
                const newCoords = [position.coords.latitude, position.coords.longitude];

                const distance = ymapsInstance.coordSystem.geo.getDistance(userCoords, newCoords);
                if (distance > 10) {
                    console.log("Перестраиваем маршрут, пользователь сдвинулся:", newCoords);
                    userCoords = newCoords;
                    referencePoints[0] = newCoords;
                    multiRoute.model.setReferencePoints(referencePoints);
                }

                if (userPlacemark) {
                    userPlacemark.geometry.setCoordinates(newCoords);
                }
            },
            (error) => console.error("Ошибка обновления координат:", error),
            { enableHighAccuracy: true, maximumAge: 30000, timeout: 30000 }
        );
    });
};
