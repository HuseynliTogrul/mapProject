import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SetMaxBounds = () => {

    const map = useMap();

    useEffect(() => {
        const southWest = L.latLng(-85, -180);
        const northEast = L.latLng(85, 180);
        const bounds = L.latLngBounds(southWest, northEast);

        map.setMaxBounds(bounds);

        map.on('drag', function () {
            map.panInsideBounds(bounds, { animate: false });
        });

        return () => {
            map.off('drag');
        };
    }, [map]);

    return null;
}

export default SetMaxBounds