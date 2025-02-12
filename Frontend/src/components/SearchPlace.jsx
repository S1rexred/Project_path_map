import { useEffect } from "react";

const SearchPlace = ({ map, query = 'кафе'}) => {
    useEffect(() => {
        if(!map) return

        window.ymaps.geocode(query, { results: 5}).then((res) => {
            res.geoObjects.each((geoObject) => {
                map.geoObjects.add(geoObject)
            })
        })
    }, [map, query])

    return null
}

export default SearchPlace