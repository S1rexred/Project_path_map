export const SearchCafes = async (userCoords, map, setCafeCoords) => {
    if (!userCoords || !map) {
        console.warn("⚠️ Не переданы координаты или карта!");
        return null;
    }

    console.log("🔎 Ищем ближайшее кафе");

    // Удаляем старые поисковые контролы, если есть
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
        }
    });

    map.controls.add(searchControl);

    try {
        await searchControl.search("кафе");
        const results = searchControl.getResultsArray();

        if (!results || results.length === 0) {
            console.warn("❌ кафе не найдено!");
            return null;
        }

        const nearestCafeCoords = results[0].geometry.getCoordinates();
        console.log("✅ Найдено ближайшее кафе", nearestCafeCoords);

        setCafeCoords(nearestCafeCoords);
        return nearestCafeCoords;
    } catch (error) {
        console.error("❌ Ошибка при поиске кафе", error);
        return null;
    }
};
