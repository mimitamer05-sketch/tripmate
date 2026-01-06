import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { useTrip } from '../context/TripContext';
import { activities } from '../data/activities';
import { hotels } from '../data/hotels';
import { GasTransportService } from '../services/GasTransportService';
import { Navigation, MapPin, Clock, Users, Bus, Car, Bike, Train, ArrowRight, Crosshair, Calendar, AlertCircle, Loader, Check, Zap, ChevronRight } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Error Boundary
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("TransportSlide Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 m-4 border border-red-500 rounded bg-red-50 text-red-700">
                    <h3 className="font-bold">Ein Fehler ist aufgetreten</h3>
                    <p>{this.state.error?.message}</p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Erneut versuchen
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

// Leaflet icon fix
const fixLeafletIcon = () => {
    try {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    } catch (e) {
        console.warn("Leaflet icon fix failed:", e);
    }
};

if (typeof window !== 'undefined') {
    fixLeafletIcon();
}

const MapController = ({ center, route }) => {
    const map = useMap();
    useEffect(() => {
        if (route) {
            const bounds = L.latLngBounds(route);
            map.fitBounds(bounds, { padding: [50, 50] });
        } else {
            map.setView(center, 13);
        }
    }, [center, route, map]);
    return null;
};

const TransportSlideContent = () => {
    const { tripDetails, addStandaloneTransport } = useTrip();

    // Steps: 1 = Locations, 2 = Transport Selection, 3 = Booking Details
    const [step, setStep] = useState(1);

    // State
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [startCoords, setStartCoords] = useState(null);
    const [endCoords, setEndCoords] = useState(null);

    const [routeData, setRouteData] = useState(null);
    const [selectedTransport, setSelectedTransport] = useState(null);

    const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
    const [bookingTime, setBookingTime] = useState('10:00');
    const [passengers, setPassengers] = useState(1);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mapCenter, setMapCenter] = useState([52.5200, 13.4050]); // Berlin

    // Locations
    const allLocations = [
        ...(activities || []).map(a => ({ ...a, label: a.name, type: 'Activity' })),
        ...(hotels || []).map(h => ({ ...h, label: h.name, type: 'Hotel' }))
    ];

    // Transport modes
    const transportModes = [
        { id: 'ride_hailing', name: 'Uber/Bolt', icon: <Car size={32} />, color: '#000000', bgColor: '#f3f4f6' },
        { id: 'public_transport', name: 'ÖPNV', icon: <Train size={32} />, color: '#3b82f6', bgColor: '#dbeafe' },
        { id: 'bike_share', name: 'Bike', icon: <Bike size={32} />, color: '#10b981', bgColor: '#d1fae5' },
        { id: 'scooter', name: 'E-Scooter', icon: <Zap size={32} />, color: '#f59e0b', bgColor: '#fef3c7' }
    ];

    const selectLocation = (locationId, type) => {
        const loc = allLocations.find(l => l.id === parseInt(locationId));
        if (!loc) return;

        if (type === 'start') {
            setStartLocation(loc.label);
            setStartCoords([loc.lat, loc.lng]);
            setMapCenter([loc.lat, loc.lng]);
        } else {
            setEndLocation(loc.label);
            setEndCoords([loc.lat, loc.lng]);
        }
    };

    const handleGPS = () => {
        if (navigator.geolocation) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setStartLocation('Aktueller Standort');
                    setStartCoords([latitude, longitude]);
                    setMapCenter([latitude, longitude]);
                    setIsLoading(false);
                },
                () => {
                    setError('Standort konnte nicht ermittelt werden.');
                    setIsLoading(false);
                }
            );
        }
    };

    const proceedToTransportSelection = async () => {
        if (!startCoords || !endCoords) {
            setError('Bitte wähle Start- und Zielort aus.');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const data = await GasTransportService.fetchRoutes(
                startCoords,
                endCoords,
                bookingDate,
                bookingTime,
                1 // Default passenger for price calculation
            );
            setRouteData(data);
            setStep(2);
        } catch (err) {
            setError(err.message || "Fehler beim Laden der Routen.");
        } finally {
            setIsLoading(false);
        }
    };

    const selectTransportAndProceed = (transportId) => {
        setSelectedTransport(transportId);
        setStep(3);
    };

    const confirmBooking = () => {
        const selectedOption = routeData.options.find(opt => opt.id === selectedTransport);

        // Save to context
        addStandaloneTransport({
            from: startLocation,
            to: endLocation,
            date: bookingDate,
            time: bookingTime,
            passengers: passengers,
            type: selectedOption.type,
            provider: selectedOption.provider,
            duration: selectedOption.duration,
            cost: selectedOption.cost,
            distance: routeData.distance
        });

        alert(`Buchung bestätigt!\n${startLocation} → ${endLocation}\n${selectedOption.type} - €${selectedOption.cost}\nDatum: ${bookingDate}, ${bookingTime}\nPersonen: ${passengers}`);

        // Reset
        setStep(1);
        setStartLocation('');
        setEndLocation('');
        setStartCoords(null);
        setEndCoords(null);
        setRouteData(null);
        setSelectedTransport(null);
        setBookingDate(new Date().toISOString().split('T')[0]);
        setBookingTime('10:00');
        setPassengers(1);
    };

    if (!tripDetails) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader className="animate-spin" size={32} />
            </div>
        );
    }

    // STEP 1: Location Input
    if (step === 1) {
        return (
            <div className="slide-container animate-fade-in" style={{ paddingBottom: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Transport buchen
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Wohin möchtest du fahren?</p>
                    </div>

                    {error && (
                        <div style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={20} /> {error}
                        </div>
                    )}

                    <div className="card" style={{ padding: '2.5rem' }}>
                        {/* Start Location */}
                        <div style={{ marginBottom: '2rem', position: 'relative' }}>
                            <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.75rem', fontSize: '1rem' }}>
                                <MapPin size={18} style={{ display: 'inline', marginRight: '0.5rem', color: 'var(--primary)' }} />
                                Abfahrtsort
                            </label>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <select
                                    onChange={(e) => selectLocation(e.target.value, 'start')}
                                    className="form-input"
                                    style={{ flex: 1, fontSize: '1rem', padding: '0.875rem', cursor: 'pointer' }}
                                    value=""
                                >
                                    <option value="" disabled>Wähle einen Startpunkt...</option>
                                    <optgroup label="Hotels">
                                        {allLocations.filter(l => l.type === 'Hotel').map(loc => (
                                            <option key={loc.id} value={loc.id}>{loc.label} ({loc.city})</option>
                                        ))}
                                    </optgroup>
                                    <optgroup label="Aktivitäten">
                                        {allLocations.filter(l => l.type === 'Activity').map(loc => (
                                            <option key={loc.id} value={loc.id}>{loc.label} ({loc.city})</option>
                                        ))}
                                    </optgroup>
                                </select>
                                <button onClick={handleGPS} className="btn btn-secondary" style={{ padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} title="Standort verwenden">
                                    <Crosshair size={20} />
                                    GPS
                                </button>
                            </div>
                            {startLocation && (
                                <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', fontSize: '0.9rem' }}>
                                    <strong>Gewählt:</strong> {startLocation}
                                </div>
                            )}
                        </div>

                        {/* End Location */}
                        <div style={{ marginBottom: '2.5rem', position: 'relative' }}>
                            <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.75rem', fontSize: '1rem' }}>
                                <Navigation size={18} style={{ display: 'inline', marginRight: '0.5rem', color: 'var(--primary)' }} />
                                Ankunftsort
                            </label>
                            <select
                                onChange={(e) => selectLocation(e.target.value, 'end')}
                                className="form-input"
                                style={{ width: '100%', fontSize: '1rem', padding: '0.875rem', cursor: 'pointer' }}
                                value=""
                            >
                                <option value="" disabled>Wähle ein Ziel...</option>
                                <optgroup label="Hotels">
                                    {allLocations.filter(l => l.type === 'Hotel').map(loc => (
                                        <option key={loc.id} value={loc.id}>{loc.label} ({loc.city})</option>
                                    ))}
                                </optgroup>
                                <optgroup label="Aktivitäten">
                                    {allLocations.filter(l => l.type === 'Activity').map(loc => (
                                        <option key={loc.id} value={loc.id}>{loc.label} ({loc.city})</option>
                                    ))}
                                </optgroup>
                            </select>
                            {endLocation && (
                                <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', fontSize: '0.9rem' }}>
                                    <strong>Gewählt:</strong> {endLocation}
                                </div>
                            )}
                        </div>

                        {/* Map Preview */}
                        {startCoords && endCoords && (
                            <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem', height: '250px', border: '1px solid var(--border)' }}>
                                <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                                    <MapController center={mapCenter} route={[startCoords, endCoords]} />
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={startCoords}><Popup>{startLocation}</Popup></Marker>
                                    <Marker position={endCoords}><Popup>{endLocation}</Popup></Marker>
                                    <Polyline positions={[startCoords, endCoords]} color="var(--primary)" weight={4} opacity={0.7} />
                                </MapContainer>
                            </div>
                        )}

                        <button
                            onClick={proceedToTransportSelection}
                            disabled={isLoading || !startCoords || !endCoords}
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', opacity: (!startCoords || !endCoords) ? 0.5 : 1 }}
                        >
                            {isLoading ? (
                                <>
                                    <Loader className="animate-spin" size={20} />
                                    Lade Transportoptionen...
                                </>
                            ) : (
                                <>
                                    Transportmittel anzeigen
                                    <ChevronRight size={20} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // STEP 2: Transport Selection
    if (step === 2 && routeData) {
        return (
            <div className="slide-container animate-fade-in" style={{ paddingBottom: '100px', minHeight: '100vh' }}>
                <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem', maxWidth: '900px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>Wähle dein Transportmittel</h2>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                            <span>{startLocation}</span>
                            <ArrowRight size={16} />
                            <span>{endLocation}</span>
                            <span style={{ marginLeft: '1rem', fontSize: '0.9rem' }}>({routeData.distance} km)</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                        {routeData.options.map((option) => {
                            const mode = transportModes.find(m => m.id === option.id);
                            return (
                                <div
                                    key={option.id}
                                    onClick={() => selectTransportAndProceed(option.id)}
                                    className="card"
                                    style={{
                                        padding: '1.5rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        border: `2px solid var(--border)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1.5rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateX(4px)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                        e.currentTarget.style.borderColor = mode.color;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateX(0)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                        e.currentTarget.style.borderColor = 'var(--border)';
                                    }}
                                >
                                    {/* Icon and Title */}
                                    <div style={{ color: mode.color, background: mode.bgColor, padding: '1.25rem', borderRadius: '12px', flexShrink: 0 }}>
                                        {mode.icon}
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '800', fontSize: '1.25rem', marginBottom: '0.25rem' }}>{option.type}</div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{option.provider}</div>
                                        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
                                            <div>
                                                <span style={{ color: 'var(--text-muted)' }}>Dauer: </span>
                                                <span style={{ fontWeight: '600' }}>{option.duration} min</span>
                                            </div>
                                            <div>
                                                <span style={{ color: 'var(--text-muted)' }}>CO₂: </span>
                                                <span style={{ fontWeight: '600', color: option.co2 === 0 ? '#10b981' : 'inherit' }}>{option.co2}g</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Preis ab</div>
                                        <div style={{ fontSize: '2rem', fontWeight: '800', color: mode.color }}>€{option.cost}</div>
                                    </div>

                                    {/* Tags */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {option.tags.map((tag, idx) => (
                                            <span key={idx} style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setStep(1)}
                        className="btn btn-secondary"
                        style={{ display: 'block', margin: '0 auto', padding: '0.875rem 2rem' }}
                    >
                        ← Zurück zur Routeneingabe
                    </button>
                </div>
            </div>
        );
    }

    // STEP 3: Booking Details
    if (step === 3 && selectedTransport && routeData) {
        const selectedOption = routeData.options.find(opt => opt.id === selectedTransport);
        const mode = transportModes.find(m => m.id === selectedTransport);

        return (
            <div className="slide-container animate-fade-in" style={{ paddingBottom: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <div className="card" style={{ padding: '2.5rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>Buchungsdetails</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Vervollständige deine Buchung</p>
                        </div>

                        {/* Selected Transport Summary */}
                        <div style={{ background: mode.bgColor, padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: `2px solid ${mode.color}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ color: mode.color }}>
                                    {mode.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '800', fontSize: '1.25rem' }}>{selectedOption.type}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{selectedOption.provider}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.75rem', fontWeight: '800', color: mode.color }}>€{selectedOption.cost}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <span>{startLocation} → {endLocation}</span>
                                <span>{routeData.distance} km • {selectedOption.duration} min</span>
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                    <Calendar size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                    Datum
                                </label>
                                <input
                                    type="date"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    className="form-input"
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                    <Clock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                    Uhrzeit
                                </label>
                                <input
                                    type="time"
                                    value={bookingTime}
                                    onChange={(e) => setBookingTime(e.target.value)}
                                    className="form-input"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>

                        {/* Passengers */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                <Users size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                Personenanzahl
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                <button
                                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                    style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'white', border: '1px solid var(--border)', fontWeight: '700', fontSize: '1.5rem', cursor: 'pointer' }}
                                >
                                    −
                                </button>
                                <span style={{ flex: 1, textAlign: 'center', fontWeight: '800', fontSize: '1.5rem' }}>{passengers}</span>
                                <button
                                    onClick={() => setPassengers(passengers + 1)}
                                    style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'white', border: '1px solid var(--border)', fontWeight: '700', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--primary)' }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <button
                                onClick={confirmBooking}
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                                <Check size={20} />
                                Jetzt buchen
                            </button>
                            <button
                                onClick={() => setStep(2)}
                                className="btn btn-secondary"
                                style={{ width: '100%', padding: '1rem' }}
                            >
                                ← Zurück zur Auswahl
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

const TransportSlide = () => {
    return (
        <ErrorBoundary>
            <TransportSlideContent />
        </ErrorBoundary>
    );
};

export default TransportSlide;
