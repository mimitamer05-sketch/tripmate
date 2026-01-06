import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { CreditCard, Wallet, Apple, ArrowRight, Check } from 'lucide-react';

const PaymentSlide = ({ onNext, onBack }) => {
    const { paymentInfo, setPaymentInfo, calculateTotalCost } = useTrip();
    const [selectedMethod, setSelectedMethod] = useState(paymentInfo.method);
    const totalCost = calculateTotalCost();

    const paymentMethods = [
        { id: 'credit_card', name: 'Kreditkarte', icon: <CreditCard size={24} />, description: 'Visa, Mastercard, Amex' },
        { id: 'paypal', name: 'PayPal', icon: <Wallet size={24} />, description: 'Sicher und schnell bezahlen' },
        { id: 'apple_google_pay', name: 'Apple / Google Pay', icon: <Apple size={24} />, description: 'Einfach mit dem Smartphone' }
    ];

    const handleSelect = (methodId) => {
        setSelectedMethod(methodId);
        setPaymentInfo({ method: methodId, details: {} });
    };

    return (
        <div className="slide-container animate-fade-in">
            <div className="container slide-content">
                <div className="slide-header">
                    <h2 className="slide-title">Zahlungsmethode</h2>
                    <p className="slide-subtitle">Wählen Sie aus, wie Sie Ihre Reise bezahlen möchten</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {paymentMethods.map((method) => (
                            <div
                                key={method.id}
                                onClick={() => handleSelect(method.id)}
                                className="card"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    padding: '1.5rem',
                                    cursor: 'pointer',
                                    border: selectedMethod === method.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                                    background: selectedMethod === method.id ? '#f0f7ff' : 'white',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    background: selectedMethod === method.id ? 'var(--primary)' : '#f1f5f9',
                                    color: selectedMethod === method.id ? 'white' : 'var(--text-main)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {method.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{method.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{method.description}</p>
                                </div>
                                {selectedMethod === method.id && (
                                    <div style={{ color: 'var(--primary)' }}>
                                        <Check size={24} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="card">
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Zahlungsübersicht</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Gesamtbetrag</span>
                                <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--primary)' }}>€{totalCost}</span>
                            </div>
                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <p>Mit dem Klick auf "Buchung abschließen" akzeptieren Sie unsere AGB und Datenschutzbestimmungen.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={onBack} className="btn btn-secondary">Zurück</button>
                    <button
                        onClick={onNext}
                        disabled={!selectedMethod}
                        className="btn btn-primary"
                        style={{ opacity: !selectedMethod ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        Buchung abschließen <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSlide;
