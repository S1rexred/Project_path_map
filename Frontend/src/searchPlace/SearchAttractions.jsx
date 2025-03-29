export const SearchAttractions = (userCoords, map, setAttractionCoords) => {
    return new Promise((resolve, reject) => {

    if (!userCoords || !map) {
        reject('Не переданы координаты или карта')
        return
    };

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
            console.warn("❌ Достопримечательность не найдена!");
            reject("❌ Достопримечательность не найдена!");
            return;
        }

        const nearestAttractionCoords = results[0].geometry.getCoordinates();

        console.log("✅ Найдена ближайшая достопримечательность", nearestAttractionCoords);
        setAttractionCoords(nearestAttractionCoords);
        resolve(nearestAttractionCoords)
    })
    .catch((error) => {
        console.error('Ошибка при поиске достопримечательности', error)
        })
    })
};