import { useEffect } from "react";

const BuildRoute = ({ map, userCoords, cafeCoords }) => {
    useEffect(() => {
        if (!map || !userCoords || !cafeCoords) {
            console.warn("⏳ Ожидаем данные для построения маршрута...");
            return;
        }

        console.log('🚀 Строим маршрут от', userCoords, 'к', cafeCoords);

        window.ymaps.route([userCoords, cafeCoords])
            .then((route) => {
                // Удаляем старые маршруты, чтобы не было наложений
                map.geoObjects.removeAll();
                map.geoObjects.add(route);
                console.log('✅ Маршрут построен');
            })
            .catch((error) => console.error('❌ Ошибка при построении маршрута:', error));
    }, [map, userCoords, cafeCoords]);

    return null;
};

export default BuildRoute;