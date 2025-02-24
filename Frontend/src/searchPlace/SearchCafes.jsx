export const SearchCafes = (userCoords, map, setCafeCoords) => {
    if (!userCoords || !map) return;

    console.log("🔎 Ищем ближайшее кафе...");

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

    searchControl.search("кафе").then(() => {
        const results = searchControl.getResultsArray();
        if (!results || results.length === 0) {
            console.warn("❌ Кафе не найдено!");
            return;
        }

        const nearestCafeCoords = results[0].geometry.getCoordinates();

        console.log("✅ Найдено ближайшее кафе", nearestCafeCoords);
        setCafeCoords(nearestCafeCoords);
    })
    .catch((error) => {
        console.error('Ошибка при поиске кафе', error)
    })
};