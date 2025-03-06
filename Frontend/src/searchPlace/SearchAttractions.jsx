export const SearchAttractions = (userCoords, map, setAttractionsCoords) => {
    if (!userCoords || !map) return;

    console.log("🔎 Ищем ближайшую достопримечательность...");

    map.controls.each((control) => {
        if (control instanceof window.ymaps.control.SearchControl) {
            map.controls.remove(control);
        }
    });
    
    const searchControl = new window.ymaps.control.SearchControl({
        options: { 
            provider: "yandex#search",
            results: 1,
            boundedBy: [
                [userCoords[0] - 0.01, userCoords[1] - 0.01],
                [userCoords[0] + 0.01, userCoords[1] + 0.01]
            ]
        },
    });

    map.controls.add(searchControl);

    searchControl.search("достопримечательность").then(() => {
        const results = searchControl.getResultsArray();
        if (!results || results.length === 0) {
            console.warn("❌ Достопримечательность не найдено!");
            return;
        }

        const nearestAttractionsCoordsCoords = results[0].geometry.getCoordinates();

        console.log("✅ Найдена ближайшая достопримечательность", nearestAttractionsCoordsCoords);
        setAttractionsCoords(nearestAttractionsCoordsCoords);
    })
    .catch((error) => {
        console.error('Ошибка при поиске достопримечательности', error)
    })
};