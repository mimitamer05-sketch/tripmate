
import React, { useState, useMemo } from 'react';
import { useTrip } from '../context/TripContext';
import { hotels } from '../data/hotels';
import { ArrowRight, Star, Wifi, Coffee, X, Check, Filter, AlertTriangle } from 'lucide-react';

const HotelSlide = ({ onNext, onBack }) => {
    const { selectedHotel, setSelectedHotel, tripDetails } = useTrip();
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [viewingHotel, setViewingHotel] = useState(null);
    const [zoomedImage, setZoomedImage] = useState(null);

    // Filter States
    const [minStars, setMinStars] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [showFilters, setShowFilters] = useState(false);

    // Derived values for filters
    const destinationHotels = useMemo(() =>
        hotels.filter(h => h.city === tripDetails.destination),
        [tripDetails.destination]
    );

    const maxHotelPrice = useMemo(() =>
        Math.max(...destinationHotels.map(h => h.price), 1000),
        [destinationHotels]
    );

    const filteredHotels = useMemo(() => {
        return destinationHotels.filter(h =>
            h.stars >= minStars &&
            h.price <= maxPrice
        );
    }, [destinationHotels, minStars, maxPrice]);

    const handleHotelClick = (hotel) => {
        setViewingHotel(hotel);
        setDetailModalOpen(true);
    };

    const handleSelectHotel = (hotel) => {
        setSelectedHotel(hotel);
        setDetailModalOpen(false);
    };

    const openZoom = (imgSrc, e) => {
        e.stopPropagation();
        setZoomedImage(imgSrc);
    };

    return (
        <div className="slide-container animate-fade-in">
            <div className="flex-1 overflow-y-auto p-6">


                <div className="slide-header flex justify-between items-center">
                    <div>
                        <h2 className="slide-title">Hotel Auswahl in {tripDetails.destination}</h2>
                        <p className="slide-subtitle">Wählen Sie Ihre Unterkunft.</p>
                    </div>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowFilters(!showFilters)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Filter size={18} /> Filter
                    </button>
                </div>

                {/* Filter Section */}
                {showFilters && (
                    <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                                Mindestbewertung: {minStars} Sterne
                            </label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {[0, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => setMinStars(star)}
                                        className={`btn ${minStars === star ? 'btn-primary' : 'btn-secondary'} `}
                                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.9rem' }}
                                    >
                                        {star === 0 ? 'Alle' : `${star} +`}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                                Max. Preis pro Nacht: €{maxPrice}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max={maxHotelPrice}
                                step="10"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                style={{ width: '100%' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                <span>€0</span>
                                <span>€{maxHotelPrice}</span>
                            </div>
                        </div>
                    </div>
                )}

                {filteredHotels.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <h3>Keine Hotels gefunden</h3>
                        <p>Bitte passen Sie Ihre Filter an oder wählen Sie ein anderes Reiseziel.</p>
                        <button
                            className="btn btn-secondary"
                            style={{ marginTop: '1rem' }}
                            onClick={() => { setMinStars(0); setMaxPrice(maxHotelPrice); }}
                        >
                            Filter zurücksetzen
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {filteredHotels.map(hotel => (
                            <div
                                key={hotel.id}
                                className="card"
                                style={{
                                    padding: 0, overflow: 'hidden',
                                    border: selectedHotel?.id === hotel.id ? '2px solid var(--primary)' : 'none',
                                    position: 'relative',
                                    transition: 'transform 0.2s',
                                }}
                                onClick={() => handleHotelClick(hotel)}
                            >
                                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onClick={(e) => openZoom(hotel.image, e)}
                                    />
                                    {selectedHotel?.id === hotel.id && (
                                        <div style={{
                                            position: 'absolute', top: '1rem', right: '1rem',
                                            background: 'var(--primary)', color: 'white',
                                            padding: '0.25rem 0.75rem', borderRadius: '20px',
                                            fontSize: '0.8rem', fontWeight: '600'
                                        }}>
                                            Ausgewählt
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontWeight: '700', fontSize: '1.1rem' }}>{hotel.name}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
                                            <Star size={16} fill="#fbbf24" />
                                            <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{hotel.stars}</span>
                                        </div>
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {hotel.description}
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                        {hotel.amenities.slice(0, 3).map((am, i) => (
                                            <span key={i} style={{ fontSize: '0.75rem', background: 'var(--background)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                                {am}
                                            </span>
                                        ))}
                                        {hotel.amenities.length > 3 && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+{hotel.amenities.length - 3}</span>}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>€{hotel.price}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>pro Nacht</span>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleSelectHotel(hotel); }}
                                        className={`btn ${selectedHotel?.id === hotel.id ? 'btn-secondary' : 'btn-primary'} `}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', fontWeight: '600' }}
                                    >
                                        {selectedHotel?.id === hotel.id ? 'Ausgewählt' : 'Hotel Buchen'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={onBack} className="btn btn-secondary">Zurück</button>
                    <button
                        onClick={onNext}
                        className="btn btn-primary"
                        disabled={!selectedHotel}
                        style={{ opacity: !selectedHotel ? 0.5 : 1, cursor: !selectedHotel ? 'not-allowed' : 'pointer' }}
                    >
                        Weiter zu Aktivitäten <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            {/* Detail Modal */}
            {detailModalOpen && viewingHotel && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="card" style={{ width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: 0, position: 'relative' }}>
                        <button
                            onClick={() => setDetailModalOpen(false)}
                            style={{
                                position: 'absolute', top: '1rem', right: '1rem',
                                background: 'white', border: 'none', borderRadius: '50%',
                                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', zIndex: 10
                            }}
                        >
                            <X size={20} />
                        </button>

                        <div style={{ height: '300px' }}>
                            <img
                                src={viewingHotel.image}
                                alt={viewingHotel.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in' }}
                                onClick={(e) => openZoom(viewingHotel.image, e)}
                            />
                        </div>

                        <div style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>{viewingHotel.name}</h2>
                                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                                        {[...Array(viewingHotel.stars)].map((_, i) => <Star key={i} size={20} fill="#fbbf24" color="#fbbf24" />)}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>€{viewingHotel.price}</div>
                                    <div style={{ color: 'var(--text-muted)' }}>pro Nacht</div>
                                </div>
                            </div>

                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>{viewingHotel.description}</p>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>Ausstattung</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                    {viewingHotel.amenities.map((am, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--background)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                                            <Check size={16} color="var(--primary)" />
                                            <span>{am}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>Galerie</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                                    {viewingHotel.images && viewingHotel.images.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            alt={`Gallery ${i} `}
                                            style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius)', cursor: 'zoom-in' }}
                                            onClick={(e) => openZoom(img, e)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>Bewertungen</h3>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {viewingHotel.reviews && viewingHotel.reviews.map((review, i) => (
                                        <div key={i} style={{ background: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontWeight: '600' }}>{review.user}</span>
                                                <div style={{ display: 'flex', gap: '2px' }}>
                                                    {[...Array(review.rating)].map((_, j) => <Star key={j} size={14} fill="#fbbf24" color="#fbbf24" />)}
                                                </div>
                                            </div>
                                            <p style={{ color: 'var(--text-muted)' }}>"{review.text}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button onClick={() => handleSelectHotel(viewingHotel)} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                                Dieses Hotel buchen
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Zoom Modal */}
            {zoomedImage && (
                <div
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
                        cursor: 'zoom-out'
                    }}
                    onClick={() => setZoomedImage(null)}
                >
                    <img src={zoomedImage} alt="Zoomed" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
                </div>
            )}
        </div>
    );
};

export default HotelSlide;
