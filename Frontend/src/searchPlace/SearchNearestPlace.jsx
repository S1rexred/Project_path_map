import { SearchCafes } from "./SearchCafes";
import { SearchParks } from "./SearchParks";
import { SearchAttractions } from "./SearchAttractions";
import { getOptimizedRoute } from "../algorithms/FindOptimalRoute";

export const searchNearestPlaces = async (coords, map, setIsSearching, FindOptimalRoute, setCafeCoords, setParkCoords, setAttractionsCoords) => {
    if (!coords || !map) {
        console.warn("⚠️ Не переданы координаты или карта!");
        return;
    }

    setIsSearching(true);
    console.log("🚀 Начинаем последовательный поиск мест...");

    try {
        // 1️⃣ Ищем ближайшее кафе
        const cafeCoords = await SearchCafes(coords, map, setCafeCoords);
        if (!cafeCoords) {
            console.warn("❌ Кафе не найдено. Поиск остановлен.");
            setIsSearching(false);
            return;
        }

        // 2️⃣ Ищем ближайший парк от найденного кафе
        const parkCoords = await SearchParks(cafeCoords, map, setParkCoords);
        if (!parkCoords) {
            console.warn("❌ Парк не найден. Поиск остановлен.");
            setIsSearching(false);
            return;
        }

        // 3️⃣ Ищем ближайшую достопримечательность от найденного парка
        const attractionCoords = await SearchAttractions(parkCoords, map, setAttractionsCoords);
        if (!attractionCoords) {
            console.warn("❌ Достопримечательность не найдена. Поиск остановлен.");
            setIsSearching(false);
            return;
        }

        // ✅ Все места найдены, строим маршрут
        const places = [cafeCoords, parkCoords, attractionCoords];
        console.log("📍 Найденные места:", places);

        const optimizedRoute = getOptimizedRoute(coords, places);
        console.log("✅ Оптимизированный маршрут:", optimizedRoute);

        FindOptimalRoute(coords, optimizedRoute, map);
    } catch (error) {
        console.error("❌ Ошибка поиска точек:", error);
    } finally {
        setIsSearching(false);
    }
};
