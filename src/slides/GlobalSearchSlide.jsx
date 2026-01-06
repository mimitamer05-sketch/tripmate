import React, { useState, useEffect } from 'react';
import { useTrip } from '../context/TripContext';
import { activities } from '../data/activities';
import { Search, MapPin, Navigation, Clock, Plus, Filter, ArrowRight, X, Calendar, User, Bus, Car, Bike, Train, Check } from 'lucide-react';

const GlobalSearchSlide = () => {
    const { tripDetails, selectedHotel } = useTrip();
    const [activeCategory, setActiveCategory] = useState('Attraction');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState(tripDetails.destination || 'New York');
    const [startPoint, setStartPoint] = useState('hotel'); // 'hotel' or activity ID

    // Modal State
    const [selectedItem, setSelectedItem] = useState(null);
    const [bookingStep, setBookingStep] = useState(1); // 1: Activity, 2: Transport
    const [bookingData, setBookingData] = useState({
        date: '',
        passengers: 1,
        transportMode: null,
        transportDate: '',
        transportTime: '',
        transportPassengers: 1
    });

    // Update selected city if trip destination changes
    useEffect(() => {
        if (tripDetails.destination) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedCity(tripDetails.destination);
        }
    }, [tripDetails.destination]);

    // Filter activities
    const filteredActivities = activities.filter(act => {
        if (selectedCity && act.city !== selectedCity) return false;
        if (activeCategory && act.type !== activeCategory) return false;
        if (searchTerm && !act.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    // --- Transport Logic ---
    const deg2rad = (deg) => deg * (Math.PI / 180);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (R * c).toFixed(2);
    };

    const getTransportOptions = (targetActivity) => {
        let startCoords = null;
        let startName = '';

        if (startPoint === 'hotel') {
            if (selectedHotel && selectedHotel.coordinates && selectedCity === tripDetails.destination) {
                startCoords = selectedHotel.coordinates;
                startName = selectedHotel.name;
            } else {
                return null;
            }
        } else {
            const startAct = activities.find(a => a.id.toString() === startPoint);
            if (startAct) {
                startCoords = [startAct.lat, startAct.lng];
                startName = startAct.name;
            }
        }

        if (!startCoords) return null;

        const dist = parseFloat(calculateDistance(startCoords[0], startCoords[1], targetActivity.lat, targetActivity.lng));

        // Calculate options
        const options = [
            {
                mode: 'ÖPNV (Bus/Bahn)',
                icon: <Bus size={20} />,
                time: Math.ceil(dist * 4) + 5, // Base wait time + travel
                cost: 2.90,
                action: 'Ticket kaufen',
                color: '#3b82f6'
            },
            {
                mode: 'Taxi / Uber',
                icon: <Car size={20} />,
                time: Math.ceil(dist * 2) + 2, // Faster + wait time
                cost: (3.50 + (dist * 2.00)).toFixed(2), // Base + km price
                action: 'Taxi bestellen',
                color: '#f59e0b'
            },
            {
                mode: 'Auto',
                icon: <Car size={20} />,
                time: Math.ceil(dist * 2),
                cost: (dist * 0.30 + 2.00).toFixed(2), // Fuel + Parking estimate
                action: null,
                color: '#64748b'
            },
            {
                mode: 'Fahrrad',
                icon: <Bike size={20} />,
                time: Math.ceil(dist * 4),
                cost: 0, // Assuming own bike or low rental
                action: null,
                color: '#10b981'
            },
            {
                mode: 'Zu Fuß',
                icon: <User size={20} />,
                time: Math.ceil(dist * 12),
                cost: 0,
                action: null,
                color: '#64748b'
            }
        ];

        return { distance: dist.toFixed(2), startName, options };
    };

    const handleCardClick = (activity) => {
        setSelectedItem(activity);
        setBookingStep(1);
        setBookingData({
            date: '',
            passengers: 1,
            transportMode: null,
            transportDate: '',
            transportTime: '',
            transportPassengers: 1
        });
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        if (!selectedItem) return;

        const activityCost = selectedItem.price * bookingData.passengers;
        // If step 3 is active and transport selected, calculate transport cost
        const isTransportBooking = bookingStep === 3 && bookingData.transportMode;
        const transportCost = isTransportBooking ? (bookingData.transportMode.cost * bookingData.transportPassengers) : 0;
        const totalCost = (activityCost + transportCost).toFixed(2);

        let message = `Buchung erfolgreich!\n\n`;
        message += `📍 Aktivität: ${selectedItem.name}\n`;
        message += `📅 Datum: ${bookingData.date}\n`;
        message += `👥 Personen: ${bookingData.passengers}\n`;

        if (isTransportBooking) {
            message += `\n🚗 Transport: ${bookingData.transportMode.mode}\n`;
            message += `📅 Datum: ${bookingData.transportDate}\n`;
            message += `🕒 Abfahrt: ${bookingData.transportTime}\n`;
            message += `👥 Personen (Fahrt): ${bookingData.transportPassengers}\n`;
        }

        message += `\n💰 Gesamtpreis: €${totalCost}`;

        alert(message);
        setSelectedItem(null);
        setBookingStep(1);
    };

    // const handleTransportAction = (action, mode) => {
    //     alert(`${action} für ${mode} erfolgreich!`);
    // };

    return (
        <div className="slide-container animate-fade-in" style={{ paddingBottom: '100px' }}>
            <div className="container">
                <div className="slide-header">
                    <h2 className="slide-title">Entdecken & Buchen</h2>
                    <p className="slide-subtitle">Erkunde {selectedCity}</p>
                </div>

                {/* Search & Filter */}
                <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div className="input-group">
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
                                <MapPin size={16} /> Stadt
                            </label>
                            <select
                                value={selectedCity}
                                onChange={(e) => { setSelectedCity(e.target.value); setStartPoint(''); }}
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                            >
                                <option value="New York">New York</option>
                                <option value="Paris">Paris</option>
                                <option value="Tokio">Tokio</option>
                                <option value="Sydney">Sydney</option>
                                <option value="London">London</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
                                <Search size={16} /> Suche
                            </label>
                            <input
                                type="text"
                                placeholder="z.B. Sushi..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                        {[
                            { id: 'Attraction', label: 'Aktivitäten', icon: '🎡' },
                            { id: 'Restaurant', label: 'Restaurants', icon: '🍽️' },
                            { id: 'Hidden Spot', label: 'Hidden Spots', icon: '🤫' }
                        ].map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    border: activeCategory === cat.id ? 'none' : '1px solid var(--border)',
                                    background: activeCategory === cat.id ? 'var(--primary)' : 'transparent',
                                    color: activeCategory === cat.id ? 'white' : 'var(--text-main)',
                                    fontWeight: '600',
                                    whiteSpace: 'nowrap',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {cat.icon} {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Transport Settings (Global) */}
                <div className="card" style={{ marginBottom: '2rem', padding: '1rem', background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Navigation size={18} /> Startpunkt für Routen
                    </h3>
                    <select
                        value={startPoint}
                        onChange={(e) => setStartPoint(e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '0.9rem', minWidth: '250px' }}
                    >
                        <option value="">-- Bitte wählen --</option>
                        {selectedCity === tripDetails.destination && (
                            <option value="hotel">Mein Hotel ({selectedHotel ? selectedHotel.name : 'Nicht gewählt'})</option>
                        )}
                        {activities.filter(a => a.city === selectedCity).map(a => (
                            <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                    </select>
                </div>

                {/* Results Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {filteredActivities.map(activity => (
                        <div
                            key={activity.id}
                            className="card"
                            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                            onClick={() => handleCardClick(activity)}
                        >
                            <div style={{ position: 'relative', height: '200px' }}>
                                <img src={activity.image} alt={activity.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 'var(--radius)', borderTopRightRadius: 'var(--radius)' }} />
                                <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                                    {activity.price === 0 ? 'Kostenlos' : `€${activity.price}`}
                                </span>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{activity.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{activity.description}</p>
                                <div style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    Details & Buchung <ArrowRight size={16} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Three-Step Booking Bottom Sheet */}
            {selectedItem && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                    zIndex: 2000, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
                }} onClick={() => setSelectedItem(null)}>

                    <div
                        className="animate-slide-up"
                        style={{
                            background: 'white',
                            borderTopLeftRadius: '24px',
                            borderTopRightRadius: '24px',
                            height: '90vh',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header Image & Close */}
                        <div style={{ height: '200px', position: 'relative', flexShrink: 0 }}>
                            <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent, rgba(0,0,0,0.8))' }} />

                            <button
                                onClick={() => setSelectedItem(null)}
                                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', padding: '0.5rem', border: 'none', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
                            >
                                <X size={24} className="text-main" />
                            </button>

                            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', color: 'white' }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: '600', opacity: 0.9, marginBottom: '0.25rem' }}>{selectedItem.type}</div>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', lineHeight: 1.2 }}>{selectedItem.name}</h2>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.95rem' }}>
                                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
                                        {selectedItem.price === 0 ? 'Kostenlos' : `€${selectedItem.price} p.P.`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* STEP 1: ACTIVITY BOOKING */}
                        {bookingStep === 1 && (
                            <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Calendar size={22} className="text-primary" /> Aktivität buchen
                                    </h3>

                                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                                        <div>
                                            <label style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Datum wählen</label>
                                            <input
                                                type="date"
                                                value={bookingData.date}
                                                onChange={e => setBookingData(prev => ({
                                                    ...prev,
                                                    date: e.target.value,
                                                    transportDate: e.target.value // Auto-sync transport date
                                                }))}
                                                className="form-input"
                                                style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Anzahl Personen</label>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                                                <button
                                                    onClick={() => setBookingData(prev => ({
                                                        ...prev,
                                                        passengers: Math.max(1, prev.passengers - 1),
                                                        transportPassengers: Math.max(1, prev.passengers - 1) // Auto-sync
                                                    }))}
                                                    style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'white', border: '1px solid var(--border)', fontSize: '1.2rem', fontWeight: 'bold' }}
                                                >-</button>
                                                <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>{bookingData.passengers}</span>
                                                <button
                                                    onClick={() => setBookingData(prev => ({
                                                        ...prev,
                                                        passengers: prev.passengers + 1,
                                                        transportPassengers: prev.passengers + 1 // Auto-sync
                                                    }))}
                                                    style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'white', border: '1px solid var(--border)', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}
                                                >+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Step 1 */}
                                <div style={{ borderTop: '1px solid var(--border)', padding: '1.5rem', background: 'white', boxShadow: '0 -4px 10px rgba(0,0,0,0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Preis für {bookingData.passengers} Personen</span>
                                        <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>€{(selectedItem.price * bookingData.passengers).toFixed(2)}</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1rem' }}>
                                        <button
                                            onClick={handleBookingSubmit} // Submit Activity Only
                                            disabled={!bookingData.date}
                                            className="btn btn-secondary"
                                            style={{ padding: '0.6rem 1rem', borderRadius: '12px', fontWeight: '500', fontSize: '0.85rem', opacity: !bookingData.date ? 0.5 : 1 }}
                                        >
                                            Nur Aktivität
                                        </button>
                                        <button
                                            onClick={() => setBookingStep(2)}
                                            disabled={!bookingData.date}
                                            className="btn btn-primary"
                                            style={{ padding: '1rem', borderRadius: '16px', fontWeight: '700', opacity: !bookingData.date ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                        >
                                            Anreise hinzufügen <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: TRANSPORT SELECTION */}
                        {bookingStep === 2 && (
                            <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                                    <button onClick={() => setBookingStep(1)} style={{ marginBottom: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                        <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Zurück zur Aktivität
                                    </button>

                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Navigation size={22} className="text-primary" /> Transportmittel wählen
                                    </h3>

                                    {/* Start Point Info */}
                                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <MapPin size={20} className="text-primary" />
                                        <div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Startpunkt</div>
                                            <div style={{ fontWeight: '600' }}>{startPoint ? (getTransportOptions(selectedItem)?.startName || 'Unbekannt') : 'Bitte im Menü wählen'}</div>
                                        </div>
                                    </div>

                                    {/* Transport Options List */}
                                    {startPoint && getTransportOptions(selectedItem) ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {getTransportOptions(selectedItem).options.map((opt, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => {
                                                        if (opt.action) {
                                                            setBookingData(prev => ({
                                                                ...prev,
                                                                transportMode: opt,
                                                                transportTime: prev.transportTime || '10:00'
                                                            }));
                                                            setBookingStep(3); // Go to Detail Slide
                                                        }
                                                    }}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                        padding: '1rem',
                                                        background: 'white',
                                                        borderRadius: '16px',
                                                        border: '1px solid var(--border)',
                                                        cursor: opt.action ? 'pointer' : 'default',
                                                        opacity: opt.action ? 1 : 0.6,
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ color: opt.color, background: '#f8fafc', padding: '0.6rem', borderRadius: '50%' }}>
                                                            {opt.icon}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: '600', fontSize: '1rem' }}>{opt.mode}</div>
                                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                                {opt.time} Min • {opt.cost > 0 ? `~€${opt.cost} p.P.` : 'Kostenlos'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {opt.action && (
                                                        <button
                                                            style={{
                                                                background: 'var(--primary)',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '12px',
                                                                padding: '0.5rem 1rem',
                                                                fontWeight: '600',
                                                                fontSize: '0.9rem',
                                                                cursor: 'pointer',
                                                                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)'
                                                            }}
                                                        >
                                                            Buchen
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div style={{ padding: '1rem', background: '#fff7ed', borderRadius: '12px', color: '#c2410c' }}>Startpunkt fehlt.</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* STEP 3: TRANSPORT DETAILS & CONFIRMATION */}
                        {bookingStep === 3 && bookingData.transportMode && (
                            <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                                    <button onClick={() => setBookingStep(2)} style={{ marginBottom: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                        <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Zurück zur Auswahl
                                    </button>

                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {bookingData.transportMode.icon} {bookingData.transportMode.mode} buchen
                                    </h3>

                                    <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                                        <div style={{ display: 'grid', gap: '1.5rem' }}>

                                            {/* Date & Time */}
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                <div>
                                                    <label style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem', display: 'block' }}>Datum</label>
                                                    <input
                                                        type="date"
                                                        value={bookingData.transportDate}
                                                        onChange={e => setBookingData(prev => ({ ...prev, transportDate: e.target.value }))}
                                                        className="form-input"
                                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '12px' }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem', display: 'block' }}>Uhrzeit</label>
                                                    <input
                                                        type="time"
                                                        value={bookingData.transportTime}
                                                        onChange={e => setBookingData(prev => ({ ...prev, transportTime: e.target.value }))}
                                                        className="form-input"
                                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '12px' }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Passengers */}
                                            <div>
                                                <label style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem', display: 'block' }}>Reisende</label>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                                    <button onClick={() => setBookingData(prev => ({ ...prev, transportPassengers: Math.max(1, prev.transportPassengers - 1) }))} style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', border: 'none', fontWeight: 'bold' }}>-</button>
                                                    <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{bookingData.transportPassengers}</span>
                                                    <button onClick={() => setBookingData(prev => ({ ...prev, transportPassengers: prev.transportPassengers + 1 }))} style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', border: 'none', fontWeight: 'bold', color: 'var(--primary)' }}>+</button>
                                                </div>
                                            </div>

                                            {/* Cost Breakdown */}
                                            <div style={{ marginTop: '0.5rem', padding: '1rem', background: '#fff', borderRadius: '12px', border: '1px dashed var(--border)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                    <span style={{ color: 'var(--text-muted)' }}>Aktivität ({bookingData.passengers}x)</span>
                                                    <span>€{(selectedItem.price * bookingData.passengers).toFixed(2)}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                                    <span style={{ color: 'var(--text-muted)' }}>Transport ({bookingData.transportPassengers}x)</span>
                                                    <span>€{(bookingData.transportMode.cost * bookingData.transportPassengers).toFixed(2)}</span>
                                                </div>
                                                <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.1rem' }}>
                                                    <span>Gesamt</span>
                                                    <span style={{ color: 'var(--primary)' }}>€{((selectedItem.price * bookingData.passengers) + (bookingData.transportMode.cost * bookingData.transportPassengers)).toFixed(2)}</span>
                                                </div>
                                                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                                                    <button
                                                        onClick={handleBookingSubmit}
                                                        className="btn btn-primary"
                                                        style={{
                                                            width: '100%',
                                                            padding: '1rem',
                                                            borderRadius: '16px',
                                                            fontWeight: '700',
                                                            fontSize: '1rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '0.75rem',
                                                            transition: 'background-color 0.2s',
                                                            cursor: 'pointer'
                                                        }}
                                                        onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(0.9)'}
                                                        onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}
                                                    >
                                                        Transportmittel buchen <Check size={20} />
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        )}

                        {/* STEP 4: CONFIRMATION */}
                        {bookingStep === 4 && (
                            <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                                <div style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#16a34a' }}>
                                    <Check size={48} strokeWidth={3} />
                                </div>

                                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Buchung bestätigt!</h2>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem' }}>Viel Spaß bei deinem Erlebnis.</p>

                                <div style={{ width: '100%', background: '#f8fafc', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border)', marginBottom: '2rem', textAlign: 'left' }}>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                        <img src={selectedItem.image} alt="" style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{selectedItem.name}</div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{bookingData.date} • {bookingData.passengers} Personen</div>
                                        </div>
                                    </div>

                                    {bookingData.transportMode && (
                                        <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ background: 'white', padding: '0.5rem', borderRadius: '50%', border: '1px solid var(--border)' }}>
                                                {bookingData.transportMode.icon}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600' }}>{bookingData.transportMode.mode} gebucht</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                    {bookingData.transportDate} um {bookingData.transportTime}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedItem(null);
                                        setBookingStep(1);
                                    }}
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '1rem', borderRadius: '16px', fontWeight: '700', fontSize: '1.1rem' }}
                                >
                                    Fertig
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalSearchSlide;
