export const SearchParks = (userCoords, map, setParkCoords) => {
    if (!userCoords || !map) return;

    console.log("🔎 Ищем ближайший парк..");

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

    searchControl.search("парк").then(() => {
        const results = searchControl.getResultsArray();
        if (!results || results.length === 0) {
            console.warn("❌ Парк не найдено!");
            return;
        }

        const nearestParkCoords = results[0].geometry.getCoordinates();

        console.log("✅ Найден ближайший парк", nearestParkCoords);
        setParkCoords(nearestParkCoords);
    })
    .catch((error) => {
        console.error('Ошибка при поиске парка', error)
    })
};