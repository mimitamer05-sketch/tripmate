import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { X, Navigation, Clock, MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MapController = ({ start, end }) => {
    const map = useMap();
    useEffect(() => {
        if (start && end) {
            const bounds = L.latLngBounds([start, end]);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [start, end, map]);
    return null;
};

const RouteView = ({ startCoords, endCoords, startName, endName, transportMode, duration, onClose }) => {
    // Generate simulated GPS instructions
    const instructions = [
        { icon: '📍', text: `Start bei ${startName}` },
        { icon: transportMode === 'Zu Fuß' ? '🚶' : transportMode === 'Bus' ? '🚌' : '🚇', text: `${transportMode} nehmen Richtung Zentrum` },
        { icon: '⬆️', text: 'Geradeaus für 500m' },
        { icon: '➡️', text: 'Rechts abbiegen in die Hauptstraße' },
        { icon: '🏁', text: `Ankunft bei ${endName}` }
    ];

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in">
            {/* Header */}
            <div className="bg-white shadow-md p-4 flex items-center justify-between z-10">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Navigation className="text-blue-600" /> Route
                    </h2>
                    <p className="text-sm text-gray-500">
                        {startName} ➔ {endName}
                    </p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                    <X size={24} />
                </button>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative">
                <MapContainer center={endCoords} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapController start={startCoords} end={endCoords} />

                    {/* Start Marker */}
                    <Marker position={startCoords}>
                        <Popup>Start: {startName}</Popup>
                    </Marker>

                    {/* End Marker */}
                    <Marker position={endCoords}>
                        <Popup>Ziel: {endName}</Popup>
                    </Marker>

                    {/* Route Line */}
                    <Polyline positions={[startCoords, endCoords]} color="blue" weight={4} dashArray="10, 10" />
                </MapContainer>

                {/* Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-lg z-[1000] border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                {transportMode === 'Zu Fuß' ? <MapPin /> : <Navigation />}
                            </div>
                            <div>
                                <div className="font-bold text-lg">{duration} Min</div>
                                <div className="text-sm text-gray-500">{transportMode}</div>
                            </div>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-blue-700">
                            Starten
                        </button>
                    </div>

                    {/* Instructions List */}
                    <div className="space-y-3 max-h-[150px] overflow-y-auto pr-2">
                        {instructions.map((inst, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-gray-700 border-b border-gray-50 pb-2 last:border-0">
                                <span className="text-lg">{inst.icon}</span>
                                <span>{inst.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RouteView;
