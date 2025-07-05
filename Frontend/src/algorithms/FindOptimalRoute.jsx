import ymaps from "ymaps";
/**
 * Функция поиска ближайшего места.
 * @param {Array} userCoords - Координаты пользователя [lat, lon].
 * @param {Array} places - Массив координат мест [[lat, lon], ...].
 * @returns {Array} - Координаты ближайшего места.
 */
export const getNearestPlace = (userCoords, places) => {
    if (!userCoords || !Array.isArray(places) || places.length === 0) return null;
    let nearestPlace = null;
    let minDistance = Infinity;
    places.forEach(place => {
        if (!place || place.length < 2) return; // Проверяем валидность координат
        const distance = Math.hypot(
            userCoords[0] - place[0],
            userCoords[1] - place[1]
        );
        if (distance < minDistance) {
            minDistance = distance;
            nearestPlace = place;
        }
    });
    return nearestPlace;
};
/**
 * Функция построения оптимального маршрута.
 * @param {Array} userCoords - Координаты пользователя.
 * @param {Array} places - Массив координат мест.
 * @returns {Array} - Оптимизированный маршрут.
 */
export const getOptimizedRoute = (userCoords, places) => {
    if (!Array.isArray(places) || places.length === 0) return [];
    let route = [];
    let currentCoords = userCoords;
    let remainingPlaces = [...places];
    while (remainingPlaces.length > 0) {
        let nearest = getNearestPlace(currentCoords, remainingPlaces);
        if (!nearest) break;
        route.push(nearest);
        currentCoords = nearest;
        // Удаляем посещённое место по координатам, а не по ссылке
        remainingPlaces = remainingPlaces.filter(place =>
            place[0] !== nearest[0] || place[1] !== nearest[1]
        );
    }
    return route;
};
/**
 * Функция построения маршрута на карте.
 * @param {Array} userCoords - Координаты пользователя.
 * @param {Array} places - Оптимизированный маршрут.
 * @param {Object} map - Объект карты Яндекс.
 */
export const FindOptimalRoute = (userCoords, places, map) => {
    if (!map || !userCoords || !Array.isArray(places) || places.length === 0) {
        console.warn("⚠️ Невозможно построить маршрут. Недостаточно данных.");
        return;
    }

    // ✅ Исправлено: проверяем `places`, а не `optimizedRoute`
    if (!Array.isArray(places) || places.length === 0) {
        console.warn("⚠️ Оптимизированный маршрут пуст. Маршрут не строится.");
        return;
    }

    console.log("🛤️ Строим маршрут через:", places);

    ymaps.load()
        .then((ymapsInstance) => {
            const multiRoute = new ymapsInstance.multiRouter.MultiRoute(
                {
                    referencePoints: [userCoords, ...places],
                    params: { routingMode: "pedestrian" },
                },
                { boundsAutoApply: true }
            );

            console.log("✅ Маршрут построен");
            map.geoObjects.removeAll();
            map.geoObjects.add(multiRoute);
        })
        .catch((err) => console.error("❌ Ошибка загрузки маршрута:", err));
};
