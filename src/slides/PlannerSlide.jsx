import React from 'react';
import { useTrip } from '../context/TripContext';
import { ArrowRight, Clock, Trash2, MapPin } from 'lucide-react';

const PlannerSlide = ({ onNext, onBack }) => {
    const { itinerary, removeFromItinerary, updateItineraryItem } = useTrip();

    // Helper to sort activities by time
    const getSortedActivities = (activities) => {
        return [...activities].sort((a, b) => (a.time || '00:00').localeCompare(b.time || '00:00'));
    };

    const handleTimeChange = (e, activityId, dayIndex) => {
        updateItineraryItem(activityId, dayIndex, { time: e.target.value });
    };

    return (
        <div className="slide-container animate-fade-in">
            <div className="container slide-content">
                <div className="card" style={{ position: 'relative', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="slide-header" style={{ padding: 0, boxShadow: 'none', background: 'transparent', marginBottom: '1rem' }}>
                        <h2 className="slide-title">Tagesplaner</h2>
                        <p className="slide-subtitle">Organisieren Sie Ihre Aktivitäten</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {itinerary.map((day, index) => (
                            day && day.activities.length > 0 && (
                                <div key={index}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', color: 'var(--primary)' }}>
                                        Tag {index + 1}
                                    </h3>

                                    <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                                        {/* Timeline line */}
                                        <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '2px', background: 'var(--border)' }}></div>

                                        {getSortedActivities(day.activities).map((activity, actIndex) => (
                                            <div key={actIndex} style={{ marginBottom: '1.5rem', position: 'relative' }}>
                                                {/* Timeline dot */}
                                                <div style={{
                                                    position: 'absolute', left: '-2.4rem', top: '0.5rem',
                                                    width: '1rem', height: '1rem', borderRadius: '50%',
                                                    background: 'var(--primary)', border: '3px solid white',
                                                    boxShadow: 'var(--shadow-sm)'
                                                }}></div>

                                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                                    <div style={{ minWidth: '80px', paddingTop: '0.2rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                                                            <Clock size={16} />
                                                            <input
                                                                type="time"
                                                                value={activity.time || '10:00'}
                                                                onChange={(e) => handleTimeChange(e, activity.id, index)}
                                                                style={{ border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: '1rem', color: 'inherit', cursor: 'pointer', width: '60px' }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div style={{ flex: 1, background: 'var(--background)', padding: '1.25rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                                            <div>
                                                                <h4 style={{ fontWeight: '700', fontSize: '1.05rem', marginBottom: '0.25rem' }}>{activity.name}</h4>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                                                    <MapPin size={14} />
                                                                    <span>{activity.type}</span>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => removeFromItinerary(activity.id, index)}
                                                                style={{ color: '#e53e3e', background: 'none', border: 'none', padding: '0.25rem', cursor: 'pointer', transition: 'transform 0.2s' }}
                                                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-start' }}>
                                                            <span style={{
                                                                fontWeight: '700',
                                                                color: activity.price === 0 ? '#10b981' : 'var(--primary)',
                                                                fontSize: '0.95rem'
                                                            }}>
                                                                {activity.price === 0 ? 'Kostenlos' : `€${activity.price}`}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}

                        {itinerary.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                                <p>Noch keine Aktivitäten geplant. Gehen Sie zurück zur Karte, um Aktivitäten hinzuzufügen.</p>
                            </div>
                        )}
                    </div>

                    <div style={{
                        marginTop: '1rem',
                        paddingTop: '2rem',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        <button onClick={onBack} className="btn btn-secondary" style={{ flex: '1 1 auto', maxWidth: '200px' }}>Zurück</button>
                        <button onClick={onNext} className="btn btn-primary" style={{ flex: '1 1 auto', maxWidth: '300px' }}>
                            Weiter zur Zusammenfassung <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlannerSlide;
