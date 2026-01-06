
import React from 'react';
import { useTrip } from '../context/TripContext';
import { ArrowRight, User, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const SummarySlide = ({ onNext, onBack }) => {
    const { tripDetails, selectedFlights, selectedHotel, itinerary, calculateTotalCost, passengers, setPassengers } = useTrip();
    const totalCost = calculateTotalCost();
    const isOverBudget = totalCost > tripDetails.budget;

    // Initialize passengers if empty
    if (passengers.length === 0) {
        const initialPassengers = [];
        for (let i = 0; i < parseInt(tripDetails.adults); i++) {
            initialPassengers.push({ type: 'Erwachsener', id: `adult - ${i} `, name: '', dob: '' });
        }
        for (let i = 0; i < parseInt(tripDetails.children); i++) {
            initialPassengers.push({ type: 'Kind', id: `child - ${i} `, name: '', dob: '' });
        }
        setPassengers(initialPassengers);
    }

    const handlePassengerChange = (index, field, value) => {
        const newPassengers = [...passengers];
        newPassengers[index][field] = value;
        setPassengers(newPassengers);
    };

    const isFormValid = passengers.every(p => p.name && p.dob);

    return (
        <div className="slide-container animate-fade-in">
            <div className="container slide-content">
                <div className="slide-header">
                    <h2 className="slide-title">Zusammenfassung</h2>
                    <p className="slide-subtitle">Überprüfen Sie Ihre Buchung und geben Sie Passagierdaten ein</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Passenger Form */}
                        <div className="card">
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={20} /> Reisende
                            </h3>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {passengers.map((p, i) => (
                                    <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="input-group">
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
                                                Name ({p.type})
                                            </label>
                                            <input
                                                type="text"
                                                value={p.name}
                                                onChange={(e) => handlePassengerChange(i, 'name', e.target.value)}
                                                placeholder="Max Mustermann"
                                                className="form-input"
                                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                                required
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
                                                Geburtsdatum
                                            </label>
                                            <input
                                                type="date"
                                                value={p.dob}
                                                onChange={(e) => handlePassengerChange(i, 'dob', e.target.value)}
                                                className="form-input"
                                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                                required
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Itinerary Summary */}
                        <div className="card">
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={20} /> Reiseplan
                            </h3>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Flug (Hin)</h4>
                                {selectedFlights.outbound ? (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                                        <span>{selectedFlights.outbound.airline} ({selectedFlights.outbound.flightNumber})</span>
                                        <span>€{selectedFlights.outbound.price}</span>
                                    </div>
                                ) : <span style={{ color: '#e53e3e' }}>Kein Hinflug ausgewählt</span>}
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Flug (Rück)</h4>
                                {selectedFlights.return ? (
                                    <div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary)' }}>Rückflug</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                                            <span>{selectedFlights.return.airline} ({selectedFlights.return.flightNumber})</span>
                                            <span>€{selectedFlights.return.price}</span>
                                        </div>
                                    </div>
                                ) : <span style={{ color: '#e53e3e' }}>Kein Rückflug ausgewählt</span>}
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Hotel</h4>
                                {selectedHotel ? (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                                        <span>{selectedHotel.name}</span>
                                        <span>€{selectedHotel.price} / Nacht</span>
                                    </div>
                                ) : <span style={{ color: '#e53e3e' }}>Kein Hotel ausgewählt</span>}
                            </div>

                            <div>
                                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Aktivitäten</h4>
                                {itinerary.map((day, i) => (
                                    day && day.activities.length > 0 && (
                                        <div key={i} style={{ marginBottom: '0.5rem' }}>
                                            <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>Tag {i + 1}</div>
                                            {day.activities.map((act, j) => (
                                                <div key={j} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                                                    <span>{act.name}</span>
                                                    <span>{act.price === 0 ? 'Kostenlos' : `€${act.price} `}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cost Summary */}
                    <div>
                        <div className="card" style={{ position: 'sticky', top: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Kostenübersicht</h3>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Budget</span>
                                <span style={{ fontWeight: '600' }}>€{tripDetails.budget}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Gesamtkosten</span>
                                <span style={{ fontWeight: '700', fontSize: '1.2rem', color: isOverBudget ? '#e53e3e' : 'var(--primary)' }}>
                                    €{totalCost}
                                </span>
                            </div>

                            {isOverBudget ? (
                                <div style={{ display: 'flex', gap: '0.5rem', padding: '1rem', background: '#fff5f5', color: '#c53030', borderRadius: 'var(--radius)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                    <AlertCircle size={20} style={{ flexShrink: 0 }} />
                                    <p>Sie haben Ihr Budget um €{totalCost - tripDetails.budget} überschritten.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '0.5rem', padding: '1rem', background: '#f0fff4', color: '#2f855a', borderRadius: 'var(--radius)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                    <CheckCircle size={20} style={{ flexShrink: 0 }} />
                                    <p>Sie sind €{tripDetails.budget - totalCost} unter Ihrem Budget.</p>
                                </div>
                            )}

                            <button
                                onClick={onNext}
                                disabled={!isFormValid}
                                className="btn btn-primary"
                                style={{ width: '100%', opacity: !isFormValid ? 0.5 : 1 }}
                            >
                                Weiter zur Zahlung
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <button onClick={onBack} className="btn btn-secondary">Zurück</button>
                </div>
            </div>
        </div>
    );
};

export default SummarySlide;
