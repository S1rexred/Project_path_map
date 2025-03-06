import { SearchCafes } from "../searchPlace/SearchCafes";
import { SearchParks } from "../searchPlace/SearchParks";
import { SearchAttractions } from "../searchPlace/SearchAttractions";

export const FindOptimalRoute = (userCoords, map, setCafeCoords, setParkCoords, setAttractionsCoords) => {
    if (!userCoords || !map) return;

    console.log("🚀 Начинаем поиск оптимального маршрута...");

    Promise.all([
        new Promise((resolve, reject) => {
            console.log("🔍 Запускаем поиск кафе...");
            try {
                SearchCafes(userCoords, map, (cafes) => {
                    console.log("✅ Найденные кафе:", cafes);
                    if (!cafes || cafes.length === 0) {
                        console.warn("❌ Кафе не найдены!");
                        reject("Кафе не найдены");
                        return;
                    }
                    resolve(cafes);
                });
            } catch (error) {
                console.error("❌ Ошибка в SearchCafes:", error);
                reject(error);
            }
        }),
        new Promise((resolve, reject) => {
            console.log("🔍 Запускаем поиск парков...");
            try {
                SearchParks(userCoords, map, (parks) => {
                    console.log("✅ Найденные парки:", parks);
                    if (!parks || parks.length === 0) {
                        console.warn("❌ Парки не найдены!");
                        reject("Парки не найдены");
                        return;
                    }
                    resolve(parks);
                });
            } catch (error) {
                console.error("❌ Ошибка в SearchParks:", error);
                reject(error);
            }
        })
    ])
    .then(([foundCafes, foundParks]) => {
        console.log("🔎 Начинаем анализ маршрута...");
        let bestCafe = null;
        let bestPark = null;
        let minDistance = Infinity;

        foundCafes.forEach((cafe) => {
            foundParks.forEach((park) => {
                const distance = calculateDistance(cafe, park);
                if (distance < minDistance) {
                    minDistance = distance;
                    bestCafe = cafe;
                    bestPark = park;
                }
            });
        });

        if (bestCafe && bestPark) {
            console.log(`✅ Выбрано кафе: ${JSON.stringify(bestCafe)}, парк: ${JSON.stringify(bestPark)}`);
            setCafeCoords(bestCafe);
            setParkCoords(bestPark);

            SearchAttractions(bestPark, map, (attraction) => {
                if (attraction) {
                    console.log(`🏛️ Выбрана достопримечательность: ${JSON.stringify(attraction)}`);
                    setAttractionsCoords(attraction);
                } else {
                    console.warn("❌ Достопримечательности не найдены!");
                }
            });
        } else {
            console.warn("⚠️ Не удалось выбрать оптимальное кафе и парк!");
        }
    })
    .catch((error) => console.error("❌ Ошибка при поиске кафе или парков:", error));
};

/**
 * Функция расчета расстояния между двумя точками (по формуле Хаверсина)
 */
const calculateDistance = (point1, point2) => {
    const toRad = (deg) => deg * (Math.PI / 180);
    const R = 6371; // Радиус Земли в км

    const dLat = toRad(point2[0] - point1[0]);
    const dLon = toRad(point2[1] - point1[1]);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(point1[0])) * Math.cos(toRad(point2[0])) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Возвращает расстояние в км
};
