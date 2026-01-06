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
                <div className="slide-header">
                    <h2 className="slide-title">Tagesplaner</h2>
                    <p className="slide-subtitle">Organisieren Sie Ihre Aktivitäten</p>
                </div>

                <div style={{ display: 'grid', gap: '2rem' }}>
                    {itinerary.map((day, index) => (
                        day && day.activities.length > 0 && (
                            <div key={index} className="card">
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                                    Tag {index + 1}
                                </h3>

                                <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                                    {/* Timeline line */}
                                    <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '2px', background: 'var(--border)' }}></div>

                                    {getSortedActivities(day.activities).map((activity, actIndex) => (
                                        <div key={actIndex} style={{ marginBottom: '2rem', position: 'relative' }}>
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
                                                            style={{ border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: '1rem', color: 'inherit', cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                </div>

                                                <div style={{ flex: 1, background: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                                        <div>
                                                            <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{activity.name}</h4>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                                <MapPin size={14} />
                                                                <span>{activity.type}</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromItinerary(activity.id, index)}
                                                            style={{ color: '#e53e3e', background: 'none', border: 'none', padding: '0.25rem' }}
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
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

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={onBack} className="btn btn-secondary">Zurück</button>
                    <button onClick={onNext} className="btn btn-primary">
                        Weiter zur Zusammenfassung <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlannerSlide;
