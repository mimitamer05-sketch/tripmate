import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { CreditCard, Wallet, Smartphone, Check, ArrowRight } from 'lucide-react';

const PaymentSlide = ({ onNext, onBack }) => {
    const { paymentInfo, setPaymentInfo, calculateTotalCost } = useTrip();
    const [selectedMethod, setSelectedMethod] = useState(paymentInfo.method);
    const totalCost = calculateTotalCost();

    const paymentMethods = [
        { id: 'credit_card', name: 'Kreditkarte', icon: <CreditCard size={24} />, description: 'Visa, Mastercard, Amex' },
        { id: 'paypal', name: 'PayPal', icon: <Wallet size={24} />, description: 'Sicher und schnell' },
        { id: 'apple_google_pay', name: 'Apple / Google Pay', icon: <Smartphone size={24} />, description: 'Einfach mit dem Handy' },
    ];

    const handleSelect = (methodId) => {
        setSelectedMethod(methodId);
    };

    const handleConfirm = () => {
        if (selectedMethod) {
            setPaymentInfo({ method: selectedMethod, details: 'Bestätigt' });
            onNext();
        }
    };

    return (
        <div className="slide-container animate-fade-in">
            <div className="container slide-content" style={{ maxWidth: '600px' }}>
                <div className="slide-header">
                    <h2 className="slide-title">Zahlungsmethode</h2>
                    <p className="slide-subtitle">Wählen Sie Ihre bevorzugte Zahlungsart</p>
                </div>

                <div className="card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                        {paymentMethods.map((method) => (
                            <div
                                key={method.id}
                                onClick={() => handleSelect(method.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    padding: '1.5rem',
                                    borderRadius: '16px',
                                    border: `2px solid ${selectedMethod === method.id ? 'var(--primary)' : 'var(--border)'}`,
                                    background: selectedMethod === method.id ? 'rgba(37, 99, 235, 0.05)' : 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{
                                    color: selectedMethod === method.id ? 'var(--primary)' : 'var(--text-muted)',
                                    background: selectedMethod === method.id ? 'white' : 'var(--background)',
                                    padding: '0.75rem',
                                    borderRadius: '12px',
                                    boxShadow: selectedMethod === method.id ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                                }}>
                                    {method.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{method.name}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{method.description}</div>
                                </div>
                                {selectedMethod === method.id && (
                                    <div style={{ color: 'var(--primary)' }}>
                                        <Check size={24} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Gesamtbetrag</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>€{totalCost}</span>
                        </div>
                        <button
                            onClick={handleConfirm}
                            disabled={!selectedMethod}
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', borderRadius: '16px', fontWeight: '700', fontSize: '1.1rem', opacity: !selectedMethod ? 0.5 : 1 }}
                        >
                            Zahlung bestätigen <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <button onClick={onBack} className="btn btn-secondary">Zurück</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSlide;
