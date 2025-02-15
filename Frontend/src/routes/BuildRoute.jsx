import { useEffect } from "react";

const BuildRoute = ({ map, userCoords, cafeCoords}) => {
    useEffect(() => {
        if (!map || !userCoords || cafeCoords) return

        console.log('Начинаем строить маршрут', userCoords, 'Дальше', cafeCoords)

        window.ymaps.route([ userCoords, cafeCoords])
            .then((route) => {
                map.geoObjects.add(route)
                console.log('Маршрут готов')
            })
            .catch((error) => console.error('Ошибка при построении маршрута'))
    }, [map, userCoords, cafeCoords])
    
    return null
}

export default BuildRoute