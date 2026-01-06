import React from 'react';
import { useTrip } from '../context/TripContext';
import { CheckCircle, Download, Home } from 'lucide-react';
import jsPDF from 'jspdf';

const ConfirmationSlide = () => {
    const { tripDetails, selectedFlights, selectedHotel, passengers, calculateTotalCost, paymentInfo } = useTrip();

    const generatePDF = () => {
        const doc = new jsPDF();
        let y = 20;

        // Header
        doc.setFontSize(24);
        doc.setTextColor(0, 102, 204);
        doc.text('Tripmate Buchungsbestätigung', 20, y);
        y += 15;

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Datum: ${new Date().toLocaleDateString()}`, 20, y);
        y += 20;

        // Trip Details
        doc.setFontSize(16);
        doc.text('Reisedaten', 20, y);
        y += 10;
        doc.setFontSize(12);
        doc.text(`Von: ${tripDetails.origin}`, 20, y);
        doc.text(`Nach: ${tripDetails.destination}`, 100, y);
        y += 10;
        doc.text(`Zeitraum: ${new Date(tripDetails.startDate).toLocaleDateString()} - ${new Date(tripDetails.endDate).toLocaleDateString()}`, 20, y);
        y += 20;

        // Flight
        if (selectedFlights.outbound) {
            doc.setFontSize(16);
            doc.text('Hinflug', 20, y);
            y += 10;
            doc.setFontSize(12);
            doc.text(`${selectedFlights.outbound.airline} (${selectedFlights.outbound.flightNumber})`, 20, y);
            doc.text(`${selectedFlights.outbound.departureTime} - ${selectedFlights.outbound.arrivalTime}`, 20, y + 7);
            y += 20;
        }
        if (selectedFlights.return) {
            doc.setFontSize(16);
            doc.text('Rückflug', 20, y);
            y += 10;
            doc.setFontSize(12);
            doc.text(`${selectedFlights.return.airline} (${selectedFlights.return.flightNumber})`, 20, y);
            doc.text(`${selectedFlights.return.departureTime} - ${selectedFlights.return.arrivalTime}`, 20, y + 7);
            y += 20;
        }

        // Hotel
        if (selectedHotel) {
            doc.setFontSize(16);
            doc.text('Hotel', 20, y);
            y += 10;
            doc.setFontSize(12);
            doc.text(selectedHotel.name, 20, y);
            y += 20;
        }

        // Passengers
        doc.setFontSize(16);
        doc.text('Reisende', 20, y);
        y += 10;
        doc.setFontSize(12);
        passengers.forEach(p => {
            doc.text(`${p.name} (${p.type})`, 20, y);
            y += 7;
        });
        y += 13;

        // Payment
        if (paymentInfo && paymentInfo.method) {
            doc.setFontSize(16);
            doc.text('Zahlung', 20, y);
            y += 10;
            doc.setFontSize(12);
            const methodName = paymentInfo.method === 'credit_card' ? 'Kreditkarte' :
                paymentInfo.method === 'paypal' ? 'PayPal' : 'Apple / Google Pay';
            doc.text(`Zahlungsart: ${methodName}`, 20, y);
            y += 15;
        }

        // Total
        doc.setDrawColor(0, 0, 0);
        doc.line(20, y, 190, y);
        y += 10;
        doc.setFontSize(16);
        doc.text(`Gesamtpreis: €${calculateTotalCost()}`, 20, y);

        doc.save('tripmate-buchung.pdf');
    };

    return (
        <div className="slide-container animate-fade-in" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div className="card" style={{ maxWidth: '600px', padding: '4rem 2rem' }}>
                <div style={{ display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', background: '#f0fff4', color: '#2f855a', marginBottom: '2rem' }}>
                    <CheckCircle size={64} />
                </div>

                <h1 className="slide-title" style={{ marginBottom: '1rem' }}>Buchung erfolgreich!</h1>
                <p className="slide-subtitle" style={{ marginBottom: '1rem' }}>
                    Vielen Dank für Ihre Buchung bei Tripmate. Ihre Reise nach {tripDetails.destination} wurde bestätigt.
                </p>
                {paymentInfo && paymentInfo.method && (
                    <div style={{ marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Bezahlt mit: <strong>{paymentInfo.method === 'credit_card' ? 'Kreditkarte' : paymentInfo.method === 'paypal' ? 'PayPal' : 'Apple / Google Pay'}</strong>
                    </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={() => window.location.reload()} className="btn btn-secondary">
                        <Home size={18} /> Neue Reise planen
                    </button>
                    <button onClick={generatePDF} className="btn btn-primary">
                        <Download size={18} /> Ticket herunterladen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationSlide;
