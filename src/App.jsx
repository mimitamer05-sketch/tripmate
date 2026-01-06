import React, { useState } from 'react';
import { TripProvider, useTrip } from './context/TripContext';
import SearchSlide from './slides/SearchSlide';
import FlightSlide from './slides/FlightSlide';
import HotelSlide from './slides/HotelSlide';
import MapSlide from './slides/MapSlide';
import PlannerSlide from './slides/PlannerSlide';
import SummarySlide from './slides/SummarySlide';
import ConfirmationSlide from './slides/ConfirmationSlide';
import MyBookingSlide from './slides/MyBookingSlide';
import GlobalSearchSlide from './slides/GlobalSearchSlide';
import TransportSlide from './slides/TransportSlide';
import PaymentSlide from './slides/PaymentSlide';

import { AlertTriangle, Home, Search, BookOpen, Car } from 'lucide-react';

const MainLayout = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const { tripDetails, calculateTotalCost } = useTrip();

  const nextSlide = () => setCurrentSlide(prev => prev + 1);
  const prevSlide = () => setCurrentSlide(prev => Math.max(0, prev - 1));

  const totalCost = calculateTotalCost();
  const remaining = tripDetails.budget - totalCost;
  const isOverBudget = remaining < 0;

  const renderHomeContent = () => {
    switch (currentSlide) {
      case 0: return <SearchSlide onNext={nextSlide} />;
      case 1: return <FlightSlide onNext={nextSlide} onBack={prevSlide} />;
      case 2: return <HotelSlide onNext={nextSlide} onBack={prevSlide} />;
      case 3: return <MapSlide onNext={nextSlide} onBack={prevSlide} />;
      case 4: return <PlannerSlide onNext={nextSlide} onBack={prevSlide} />;
      case 5: return <SummarySlide onNext={nextSlide} onBack={prevSlide} />;
      case 6: return <PaymentSlide onNext={nextSlide} onBack={prevSlide} />;
      case 7: return <ConfirmationSlide />;
      default: return <SearchSlide onNext={nextSlide} />;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeContent();
      case 'search': return <GlobalSearchSlide onSearch={() => setActiveTab('home')} />;
      case 'transport': return <TransportSlide />;
      case 'bookings': return <MyBookingSlide />;
      default: return renderHomeContent();
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-logo" onClick={() => { setActiveTab('home'); setCurrentSlide(0); }} style={{ cursor: 'pointer' }}>
          <span className="logo-trip">Trip</span>
          <span className="logo-mate">Mate</span>
        </h1>
        <div className="budget-display">
          <div className="budget-item">
            <span className="budget-label">Used:</span>
            <span className="budget-value">€{totalCost}</span>
          </div>
          <div className="budget-item">
            <span className="budget-label">{isOverBudget ? 'Exceeded:' : 'Remaining:'}</span>
            <span className={`budget-value ${isOverBudget ? 'text-red-500 font-bold' : 'remaining'}`}>
              {isOverBudget ? `€${Math.abs(remaining)}` : `€${remaining}`}
            </span>
          </div>
        </div>
      </header>

      {isOverBudget && (
        <div className="fixed top-[70px] left-0 right-0 z-50 bg-red-600 text-white p-3 shadow-lg flex items-center justify-center gap-3 animate-bounce-in">
          <AlertTriangle size={24} className="animate-pulse" />
          <div className="font-bold text-lg">
            ACHTUNG: Budget um €{Math.abs(remaining)} überschritten!
          </div>
        </div>
      )}

      <main className="slide-container" style={{ paddingBottom: '80px' }}>
        {renderContent()}
      </main>

      {/* Bottom Navigation Bar */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--surface)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '1rem',
        zIndex: 1000,
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <button
          onClick={() => setActiveTab('home')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'none',
            border: 'none',
            color: activeTab === 'home' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: activeTab === 'home' ? '600' : '400',
            transition: 'color 0.2s'
          }}
        >
          <Home size={24} />
          <span style={{ fontSize: '0.75rem' }}>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('search')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'none',
            border: 'none',
            color: activeTab === 'search' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: activeTab === 'search' ? '600' : '400',
            transition: 'color 0.2s'
          }}
        >
          <Search size={24} />
          <span style={{ fontSize: '0.75rem' }}>Suche</span>
        </button>

        <button
          onClick={() => setActiveTab('transport')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'none',
            border: 'none',
            color: activeTab === 'transport' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: activeTab === 'transport' ? '600' : '400',
            transition: 'color 0.2s'
          }}
        >
          <Car size={24} />
          <span style={{ fontSize: '0.75rem' }}>Transport</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'none',
            border: 'none',
            color: activeTab === 'bookings' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: activeTab === 'bookings' ? '600' : '400',
            transition: 'color 0.2s'
          }}
        >
          <BookOpen size={24} />
          <span style={{ fontSize: '0.75rem' }}>My Booking</span>
        </button>
      </nav>
    </div>
  );
};

const App = () => {
  return (
    <TripProvider>
      <MainLayout />
    </TripProvider>
  );
};

export default App;
