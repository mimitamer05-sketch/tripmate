import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useTrip } from '../context/TripContext';
import { activities } from '../data/activities';
import { ArrowRight, Plus, X, Calendar, Users, User, AlertTriangle, Navigation } from 'lucide-react';
import L from 'leaflet';
import RouteView from '../components/RouteView';

// Fix for default marker icon in React-Leaflet with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Reset the default icon state
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component to handle map resizing and centering
const MapController = ({ center }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(center, 12);
        // Force a resize calculation after a short delay to ensure container is ready
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [center, map]);

    return null;
};

const MapSlide = ({ onNext, onBack }) => {
    const { addToItinerary, tripDetails, selectedHotel, itinerary } = useTrip();
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(0);
    const [viewMode, setViewMode] = useState('explore'); // 'explore' or 'plan'

    // Route View State
    const [showRouteView, setShowRouteView] = useState(false);
    const [routeInfo, setRouteInfo] = useState(null);
    const [selectedRouteActivity, setSelectedRouteActivity] = useState(null);

    const [filters, setFilters] = useState({
        Restaurant: true,
        'Hidden Spot': true,
        Attraction: true,
        free: true,
        paid: true
    });

    // Booking form state
    const [bookingData, setBookingData] = useState({
        date: '',
        numberOfPeople: tripDetails.adults + tripDetails.children,
        name: ''
    });

    const toggleFilter = (type) => {
        setFilters(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const filteredActivities = activities.filter(act => {
        // Filter by city
        if (!tripDetails?.destination || act.city !== tripDetails.destination) return false;

        // Filter by type
        if (!filters[act.type]) return false;

        // Filter by price (free/paid)
        if (act.price === 0 && !filters.free) return false;
        if (act.price > 0 && !filters.paid) return false;

        return true;
    });

    const cityCoordinates = {
        'New York': [40.7128, -74.0060],
        'Paris': [48.8566, 2.3522],
        'Tokio': [35.6762, 139.6503],
        'Sydney': [-33.8688, 151.2093],
        'London': [51.5074, -0.1278]
    };

    const mapCenter = cityCoordinates[tripDetails?.destination] || [48.8566, 2.3522];

    // Calculate distance between two points in km
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d.toFixed(2);
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    // Get transport recommendation based on distance
    const getTransportRecommendation = (distance) => {
        if (distance <= 2) {
            return {
                mode: 'Zu Fuß',
                icon: '🚶',
                color: '#10b981',
                time: Math.ceil(distance * 12) // ~12 min per km walking
            };
        } else if (distance <= 5) {
            return {
                mode: 'Bus',
                icon: '🚌',
                color: '#f59e0b',
                time: Math.ceil(distance * 4) // ~4 min per km by bus
            };
        } else {
            return {
                mode: 'U-Bahn',
                icon: '🚇',
                color: '#3b82f6',
                time: Math.ceil(distance * 3) // ~3 min per km by subway
            };
        }
    };

    const handleShowRoute = (activity) => {
        if (selectedHotel && selectedHotel.coordinates) {
            const hotelCoords = selectedHotel.coordinates;
            const dist = calculateDistance(hotelCoords[0], hotelCoords[1], activity.lat, activity.lng);
            const transport = getTransportRecommendation(parseFloat(dist));

            setRouteInfo({
                startCoords: hotelCoords,
                startName: selectedHotel.name,
                mode: transport.mode,
                duration: transport.time,
                distance: dist
            });
            setSelectedRouteActivity(activity);
            setShowRouteView(true);
        } else {
            alert("Bitte wähle zuerst ein Hotel aus, um die Route zu berechnen.");
        }
    };

    const handleAddActivity = (activity) => {
        setSelectedActivity(activity);
        setBookingData({
            date: '',
            numberOfPeople: tripDetails.adults + tripDetails.children,
            name: ''
        });
        setBookingModalOpen(true);
    };

    const handleMarkerClick = (activity) => {
        setSelectedActivity(activity);
    };

    const handleBookingSubmit = () => {
        if (!selectedActivity) return;

        // For Hidden Spots, no additional data needed, but we add a default time
        if (selectedActivity.type === 'Hidden Spot') {
            const activityWithTime = {
                ...selectedActivity,
                time: '12:00' // Default time for hidden spots
            };
            addToItinerary(activityWithTime, selectedDay);
            setBookingModalOpen(false);
            setSelectedActivity(null);
            return;
        }

        // For Restaurants and Attractions, validate required fields
        if (!bookingData.date || !bookingData.numberOfPeople || !bookingData.name) {
            alert('Bitte füllen Sie alle Felder aus.');
            return;
        }

        // Add activity with booking details
        const activityWithBooking = {
            ...selectedActivity,
            time: bookingData.time || '10:00',
            bookingDetails: {
                date: bookingData.date,
                numberOfPeople: bookingData.numberOfPeople,
                name: bookingData.name
            }
        };

        addToItinerary(activityWithBooking, selectedDay);
        setBookingModalOpen(false);
        setSelectedActivity(null);
    };

    const currentDayItinerary = itinerary[selectedDay]?.activities || [];

    return (
        <div className="slide-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            {/* Route View Overlay */}
            {showRouteView && selectedRouteActivity && routeInfo && (
                <RouteView
                    startCoords={routeInfo.startCoords}
                    endCoords={[selectedRouteActivity.lat, selectedRouteActivity.lng]}
                    startName={routeInfo.startName}
                    endName={selectedRouteActivity.name}
                    transportMode={routeInfo.mode}
                    duration={routeInfo.duration}
                    onClose={() => setShowRouteView(false)}
                />
            )}

            <div className="p-4 bg-white shadow-sm z-10" style={{ flex: '0 0 auto', paddingBottom: '1rem' }}>

                <div className="slide-header" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 className="slide-title">Entdecken & Planen</h2>
                        <p className="slide-subtitle">Finde Aktivitäten in {tripDetails?.destination || 'deiner Stadt'}.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button onClick={onBack} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)' }}>Zurück</button>
                        <select
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(Number(e.target.value))}
                            style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                        >
                            {[0, 1, 2, 3, 4, 5, 6].map(day => (
                                <option key={day} value={day}>Tag {day + 1}</option>
                            ))}
                        </select>
                        <button onClick={onNext} className="btn btn-primary">Weiter <ArrowRight size={18} /></button>
                    </div>
                </div>

                {/* View Mode Tabs */}
                <div className="flex gap-4 mb-4 border-b">
                    <button
                        className={`pb-2 px-4 font-semibold ${viewMode === 'explore' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        onClick={() => setViewMode('explore')}
                    >
                        Entdecken
                    </button>
                    <button
                        className={`pb-2 px-4 font-semibold ${viewMode === 'plan' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        onClick={() => setViewMode('plan')}
                    >
                        Mein Plan ({currentDayItinerary.length})
                    </button>
                </div>

                {viewMode === 'explore' && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        {['Restaurant', 'Hidden Spot', 'Attraction'].map(type => (
                            <button
                                key={type}
                                onClick={() => toggleFilter(type)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    border: '1px solid var(--primary)',
                                    background: filters[type] ? 'var(--primary)' : 'transparent',
                                    color: filters[type] ? 'white' : 'var(--primary)',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {type}
                            </button>
                        ))}
                        <button
                            onClick={() => toggleFilter('free')}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                border: '1px solid #10b981',
                                background: filters.free ? '#10b981' : 'transparent',
                                color: filters.free ? 'white' : '#10b981',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                        >
                            Kostenlos
                        </button>
                        <button
                            onClick={() => toggleFilter('paid')}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                border: '1px solid #f59e0b',
                                background: filters.paid ? '#f59e0b' : 'transparent',
                                color: filters.paid ? 'white' : '#f59e0b',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                        >
                            Kostenpflichtig
                        </button>
                    </div>
                )}
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0 2rem 2rem 2rem', overflow: 'auto' }}>
                {/* Map View - Top */}
                <div style={{ height: '500px', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
                    <MapContainer center={mapCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
                        <MapController center={mapCenter} />
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* Hotel Marker */}
                        {selectedHotel && selectedHotel.coordinates && (
                            <Marker position={selectedHotel.coordinates} icon={new L.Icon({
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41]
                            })}>
                                <Popup>
                                    <div className="p-2">
                                        <h3 className="font-bold text-lg">{selectedHotel.name}</h3>
                                        <p className="text-sm text-gray-600">Dein Hotel</p>
                                    </div>
                                </Popup>
                            </Marker>
                        )}

                        {filteredActivities.map(activity => (
                            <Marker
                                key={activity.id}
                                position={[activity.lat, activity.lng]}
                                eventHandlers={{
                                    click: () => handleMarkerClick(activity),
                                }}
                            >
                                <Popup>
                                    <div style={{ width: '200px' }}>
                                        <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{activity.name}</h3>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{activity.description}</p>

                                        <p style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                                            {activity.price === 0 ? 'Kostenlos' : `€${activity.price}`}
                                        </p>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleShowRoute(activity)}
                                                style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', background: 'white', border: '1px solid var(--primary)', color: 'var(--primary)', borderRadius: 'var(--radius)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                                            >
                                                <Navigation size={14} /> Route anzeigen
                                            </button>
                                            <button
                                                onClick={() => handleAddActivity(activity)}
                                                className="btn btn-primary"
                                                style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }}
                                            >
                                                Hinzufügen
                                            </button>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                {/* List View - Bottom 40% */}
                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                        {viewMode === 'explore' ? (
                            filteredActivities.map(activity => (
                                <div key={activity.id} className="card" style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
                                    <img src={activity.image} alt={activity.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                            <h3 style={{ fontWeight: '600' }}>{activity.name}</h3>
                                            <span style={{ fontSize: '0.8rem', background: 'var(--background)', padding: '0.25rem 0.5rem', borderRadius: '10px' }}>{activity.type}</span>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {activity.description}
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{activity.price === 0 ? 'Kostenlos' : `€${activity.price}`}</span>
                                            <button
                                                onClick={() => handleAddActivity(activity)}
                                                className="btn btn-primary"
                                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                            >
                                                <Plus size={16} /> Hinzufügen
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            currentDayItinerary.length > 0 ? (
                                currentDayItinerary.map((activity, index) => (
                                    <div key={`${activity.id}-${index}`} className="card" style={{ display: 'flex', gap: '1rem', padding: '1rem', borderLeft: '4px solid var(--primary)' }}>
                                        <img src={activity.image} alt={activity.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                                <h3 style={{ fontWeight: '600' }}>{activity.name}</h3>
                                                <span style={{ fontSize: '0.8rem', background: 'var(--background)', padding: '0.25rem 0.5rem', borderRadius: '10px' }}>{activity.time || '10:00'}</span>
                                            </div>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                                {activity.type}
                                            </p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{activity.price === 0 ? 'Kostenlos' : `€${activity.price}`}</span>
                                                <button
                                                    onClick={() => handleShowRoute(activity)}
                                                    className="text-blue-600 text-sm hover:underline"
                                                >
                                                    Route anzeigen
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center p-8 text-gray-500 bg-gray-50 rounded-lg">
                                    <p>Noch keine Aktivitäten für Tag {selectedDay + 1} geplant.</p>
                                    <button onClick={() => setViewMode('explore')} className="text-blue-600 font-semibold mt-2 hover:underline">
                                        Jetzt Aktivitäten entdecken
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {bookingModalOpen && selectedActivity && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="card" style={{ width: '90%', maxWidth: '500px', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Buchungsdetails</h3>
                            <button onClick={() => setBookingModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{selectedActivity.name}</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{selectedActivity.type}</p>
                            <p style={{ fontWeight: '700', color: 'var(--primary)', marginTop: '0.5rem' }}>
                                {selectedActivity.price === 0 ? 'Kostenlos' : `€${selectedActivity.price}`}
                            </p>
                        </div>

                        {selectedActivity.type !== 'Hidden Spot' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                                        <Calendar size={18} /> Datum & Uhrzeit
                                    </label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="date"
                                            value={bookingData.date}
                                            onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                                            style={{ flex: 2, padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                            required
                                        />
                                        <input
                                            type="time"
                                            value={bookingData.time || '10:00'}
                                            onChange={(e) => setBookingData(prev => ({ ...prev, time: e.target.value }))}
                                            style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                                        <Users size={18} /> Anzahl Personen
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={bookingData.numberOfPeople}
                                        onChange={(e) => setBookingData(prev => ({ ...prev, numberOfPeople: Number(e.target.value) }))}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                        required
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                                        <User size={18} /> Name
                                    </label>
                                    <input
                                        type="text"
                                        value={bookingData.name}
                                        onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="Ihr Name"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {selectedActivity.type === 'Hidden Spot' && (
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                                Für Hidden Spots sind keine zusätzlichen Buchungsdetails erforderlich.
                            </p>
                        )}

                        <button
                            onClick={handleBookingSubmit}
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
                        >
                            Bestätigen & Hinzufügen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapSlide;
