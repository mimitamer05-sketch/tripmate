import React from 'react';
import { useTrip } from '../context/TripContext';
import { Plane, Calendar, Users, MapPin, Wallet } from 'lucide-react';

const SearchSlide = ({ onNext }) => {
    const { tripDetails, setTripDetails } = useTrip();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <div className="slide-container animate-fade-in">
            <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 className="slide-title" style={{ marginBottom: '0.5rem' }}>
                            <span style={{
                                background: 'var(--gradient-text)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>Trip</span>
                            <span style={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                opacity: 0.8
                            }}>Mate</span>
                        </h1>
                        <p className="slide-subtitle">Planen Sie Ihre perfekte Reise</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        <div className="input-group">
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                                <Wallet size={18} /> Budget (€)
                            </label>
                            <input
                                type="number"
                                name="budget"
                                value={tripDetails.budget}
                                onChange={handleChange}
                                className="form-input"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="input-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                                    <MapPin size={18} /> Von
                                </label>
                                <select
                                    name="origin"
                                    value={tripDetails.origin}
                                    onChange={handleChange}
                                    className="form-input"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                    required
                                >
                                    <option value="">Wählen...</option>
                                    <option value="Frankfurt">Frankfurt</option>
                                    <option value="München">München</option>
                                    <option value="Berlin">Berlin</option>
                                    <option value="Hamburg">Hamburg</option>
                                    <option value="Wien">Wien</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                                    <MapPin size={18} /> Nach
                                </label>
                                <select
                                    name="destination"
                                    value={tripDetails.destination}
                                    onChange={handleChange}
                                    className="form-input"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                    required
                                >
                                    <option value="">Wählen...</option>
                                    <option value="New York">New York</option>
                                    <option value="Paris">Paris</option>
                                    <option value="Tokio">Tokio</option>
                                    <option value="Sydney">Sydney</option>
                                    <option value="London">London</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="input-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                                    <Calendar size={18} /> Hinreise
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={tripDetails.startDate instanceof Date ? tripDetails.startDate.toISOString().split('T')[0] : tripDetails.startDate}
                                    onChange={(e) => setTripDetails(prev => ({ ...prev, startDate: new Date(e.target.value) }))}
                                    className="form-input"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                                    <Calendar size={18} /> Rückreise
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={tripDetails.endDate instanceof Date ? tripDetails.endDate.toISOString().split('T')[0] : tripDetails.endDate}
                                    onChange={(e) => setTripDetails(prev => ({ ...prev, endDate: new Date(e.target.value) }))}
                                    className="form-input"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="input-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                                    <Users size={18} /> Erwachsene
                                </label>
                                <input
                                    type="number"
                                    name="adults"
                                    value={tripDetails.adults}
                                    onChange={handleChange}
                                    min="1"
                                    className="form-input"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                                    <Users size={18} /> Kinder
                                </label>
                                <input
                                    type="number"
                                    name="children"
                                    value={tripDetails.children}
                                    onChange={handleChange}
                                    min="0"
                                    className="form-input"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                            Reise Planen <Plane size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchSlide;
