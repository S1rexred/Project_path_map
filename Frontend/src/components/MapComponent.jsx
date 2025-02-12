import React, { useEffect, useRef } from 'react';

const MapComponent = () => {
    const mapRef = useRef(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        if (!mapContainer.current || mapRef.current) return;
 
        console.log("Создание карты");
        window.ymaps.ready(() => {
            mapRef.current = new window.ymaps.Map(mapContainer.current, {
                center: [55.751574, 37.573856], 
                zoom: 9,
            });
        });

        return () => {
            if (mapRef.current) {
                console.log("Уничтожение карты");
                mapRef.current.destroy();
                mapRef.current = null;
            }
        };
    }, []);

    return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;