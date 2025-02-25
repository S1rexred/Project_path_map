export const BuildWalkingRoute = (map, userCoords, destinationCoords) => {
    if (!map || !userCoords || !destinationCoords) return

    console.log('Строим маршрут')

    map.geoObjects.each((geoObject) => {
        if (geoObject.properties.get("type") === "route") {
            map.geoObjects.remove(geoObject);
        }
    });

    const multiRoute = new window.ymaps.multiRouter.MultiRoute(
        {
            referencePoints: [userCoords, destinationCoords],
            params: {routingMode: "pedestrian"}
        },
        {
            wayPointVisible: false,
            routeActiveStrokeWidth: 6,
            routeActiveStrokeColor: "blue"
        }
    )

    map.geoObjects.add(multiRoute)

    console.log('Маршрут построен')
}