import React from 'react';
import { useTrip } from '../context/TripContext';
import { Plane, Hotel, MapPin, Calendar, CreditCard, Activity, Car, Trash2 } from 'lucide-react';

const MyBookingSlide = () => {
    const { tripDetails, selectedFlights, selectedHotel, itinerary, calculateTotalCost, standaloneTransports, standaloneActivities, removeStandaloneTransport, removeStandaloneActivity } = useTrip();
    const totalCost = calculateTotalCost();

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('de-DE', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="slide-container animate-fade-in">
            <div className="container" style={{ paddingBottom: '80px' }}>
                <div className="slide-header">
                    <h2 className="slide-title">Meine Buchungen</h2>
                    <p className="slide-subtitle">Übersicht Ihrer geplanten Reise</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Trip Overview Card */}
                    <div className="card">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin size={20} className="text-primary" /> Reiseziel
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Von</p>
                                <p style={{ fontWeight: '600' }}>{tripDetails.origin || 'Nicht ausgewählt'}</p>
                            </div>
                            <div>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Nach</p>
                                <p style={{ fontWeight: '600' }}>{tripDetails.destination || 'Nicht ausgewählt'}</p>
                            </div>
                            <div>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Hinreise</p>
                                <p>{formatDate(tripDetails.startDate)}</p>
                            </div>
                            <div>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Rückreise</p>
                                <p>{formatDate(tripDetails.endDate)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Flights Card */}
                    <div className="card">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plane size={20} className="text-primary" /> Flüge
                        </h3>
                        {selectedFlights.outbound ? (
                            <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                                <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Hinflug</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{selectedFlights.outbound.airline}</span>
                                    <span style={{ fontWeight: '600' }}>€{selectedFlights.outbound.price}</span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                    {selectedFlights.outbound.departureTime} - {selectedFlights.outbound.arrivalTime}
                                </p>
                            </div>
                        ) : (
                            <p className="text-muted">Kein Hinflug ausgewählt</p>
                        )}

                        {selectedFlights.return ? (
                            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                                <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Rückflug</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{selectedFlights.return.airline}</span>
                                    <span style={{ fontWeight: '600' }}>€{selectedFlights.return.price}</span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                    {selectedFlights.return.departureTime} - {selectedFlights.return.arrivalTime}
                                </p>
                            </div>
                        ) : (
                            <p className="text-muted" style={{ marginTop: '0.5rem' }}>Kein Rückflug ausgewählt</p>
                        )}
                    </div>

                    {/* Hotel Card */}
                    <div className="card">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Hotel size={20} className="text-primary" /> Unterkunft
                        </h3>
                        {selectedHotel ? (
                            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: '600' }}>{selectedHotel.name}</span>
                                    <span style={{ fontWeight: '600' }}>€{selectedHotel.price}</span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{selectedHotel.rating} Sterne • {selectedHotel.location}</p>
                            </div>
                        ) : (
                            <p className="text-muted">Kein Hotel ausgewählt</p>
                        )}
                    </div>

                    {/* Activities Card */}
                    <div className="card">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Activity size={20} className="text-primary" /> Aktivitäten
                        </h3>
                        {itinerary.length > 0 && itinerary.some(day => day.activities.length > 0) ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {itinerary.map((day) => (
                                    day.activities.length > 0 && (
                                        <div key={day.day} style={{ padding: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
                                            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b', marginBottom: '0.25rem' }}>
                                                Tag {day.day + 1}
                                            </p>
                                            {day.activities.map((activity, index) => (
                                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                                    <span>{activity.name}</span>
                                                    <span>{activity.price ? `€${activity.price}` : 'Kostenlos'}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">Keine Aktivitäten geplant</p>
                        )}
                    </div>

                    {/* Standalone Transports Card */}
                    {standaloneTransports.length > 0 && (
                        <div className="card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Car size={20} className="text-primary" /> Meine Transporte
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Unabhängig gebuchte Transporte</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {standaloneTransports.map((transport) => (
                                    <div key={transport.id} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>
                                                    {transport.from} → {transport.to}
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                                    {transport.type} • {transport.provider}
                                                </div>
                                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                                                    <span>📅 {transport.date}</span>
                                                    <span>🕐 {transport.time}</span>
                                                    <span>👥 {transport.passengers} {transport.passengers === 1 ? 'Person' : 'Personen'}</span>
                                                    <span>⏱️ {transport.duration} min</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <span style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--primary)' }}>€{transport.cost}</span>
                                                <button
                                                    onClick={() => removeStandaloneTransport(transport.id)}
                                                    style={{ padding: '0.5rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                                    title="Löschen"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Standalone Activities Card */}
                    {standaloneActivities.length > 0 && (
                        <div className="card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Activity size={20} className="text-primary" /> Meine Aktivitäten
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Unabhängig gebuchte Aktivitäten</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {standaloneActivities.map((activity) => (
                                    <div key={activity.id} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>{activity.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                    {activity.date && `📅 ${activity.date}`}
                                                    {activity.passengers && ` • 👥 ${activity.passengers} ${activity.passengers === 1 ? 'Person' : 'Personen'}`}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <span style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--primary)' }}>€{activity.cost || activity.price || 0}</span>
                                                <button
                                                    onClick={() => removeStandaloneActivity(activity.id)}
                                                    style={{ padding: '0.5rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                                    title="Löschen"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Total Cost Card */}
                    <div className="card" style={{ background: 'var(--gradient-blue)', color: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Gesamtkosten</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>€{totalCost}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyBookingSlide;
