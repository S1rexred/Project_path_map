import React, { useEffect, useRef } from 'react';

const MapComponent = () => {
    const mapRef = useRef(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        if (!mapContainer.current || mapRef.current) return;
 
        console.log("Создание карты");
        window.ymaps.ready(() => {
            mapRef.current = new window.ymaps.Map(mapContainer.current, {
                center: [46.200000, 48.000002], 
                zoom: 12,
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

    return <div ref={mapContainer} style={{ width: '100%', height: '900px' }} />;
};

export default MapComponent;