import React, { createContext, useContext, useState, useCallback } from 'react';

const TripContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTrip = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
  const [tripDetails, setTripDetails] = useState({
    budget: 2000,
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    origin: '',
    destination: '',
    adults: 1,
    children: 0,
  });

  const [selectedFlights, setSelectedFlights] = useState({ outbound: null, return: null });
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [itinerary, setItinerary] = useState([]); // Array of { day, activities: [] }
  const [passengers, setPassengers] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({ method: null, details: null });

  // Standalone bookings (independent of trip)
  const [standaloneTransports, setStandaloneTransports] = useState([]);
  const [standaloneActivities, setStandaloneActivities] = useState([]);

  const addToItinerary = (activity, dayIndex) => {
    setItinerary(prev => {
      const newItinerary = [...prev];
      if (!newItinerary[dayIndex]) {
        newItinerary[dayIndex] = { day: dayIndex, activities: [] };
      }
      newItinerary[dayIndex].activities.push(activity);
      return newItinerary;
    });
  };

  const removeFromItinerary = (activityId, dayIndex) => {
    setItinerary(prev => {
      const newItinerary = [...prev];
      if (newItinerary[dayIndex]) {
        newItinerary[dayIndex].activities = newItinerary[dayIndex].activities.filter(a => a.id !== activityId);
      }
      return newItinerary;
    });
  };

  const updateItineraryItem = (activityId, dayIndex, updates) => {
    setItinerary(prev => {
      const newItinerary = [...prev];
      if (newItinerary[dayIndex]) {
        newItinerary[dayIndex].activities = newItinerary[dayIndex].activities.map(a =>
          a.id === activityId ? { ...a, ...updates } : a
        );
      }
      return newItinerary;
    });
  };

  const [budgetWarning, setBudgetWarning] = useState(false);

  const calculateTotalCost = useCallback(() => {
    let total = 0;
    if (selectedFlights.outbound) total += selectedFlights.outbound.price;
    if (selectedFlights.return) total += selectedFlights.return.price;
    if (selectedHotel) total += selectedHotel.price;
    itinerary.forEach(day => {
      if (day && day.activities) {
        day.activities.forEach(act => {
          total += act.price || 0;
        });
      }
    });
    return total;
  }, [selectedFlights, selectedHotel, itinerary]);

  // Update budget warning when cost or budget changes
  React.useEffect(() => {
    const total = calculateTotalCost();
    if (total > tripDetails.budget && !budgetWarning) {
      setBudgetWarning(true);
    } else if (total <= tripDetails.budget && budgetWarning) {
      setBudgetWarning(false);
    }
  }, [selectedFlights, selectedHotel, itinerary, tripDetails.budget, budgetWarning, calculateTotalCost]);

  const addStandaloneTransport = (transport) => {
    setStandaloneTransports(prev => [...prev, { ...transport, id: Date.now() }]);
  };

  const addStandaloneActivity = (activity) => {
    setStandaloneActivities(prev => [...prev, { ...activity, id: Date.now() }]);
  };

  const removeStandaloneTransport = (id) => {
    setStandaloneTransports(prev => prev.filter(t => t.id !== id));
  };

  const removeStandaloneActivity = (id) => {
    setStandaloneActivities(prev => prev.filter(a => a.id !== id));
  };

  return (
    <TripContext.Provider value={{
      tripDetails, setTripDetails,
      selectedFlights, setSelectedFlights,
      selectedHotel, setSelectedHotel,
      itinerary, setItinerary, addToItinerary, removeFromItinerary, updateItineraryItem,
      passengers, setPassengers,
      paymentInfo, setPaymentInfo,
      calculateTotalCost,
      budgetWarning, setBudgetWarning,
      // Standalone bookings
      standaloneTransports, addStandaloneTransport, removeStandaloneTransport,
      standaloneActivities, addStandaloneActivity, removeStandaloneActivity
    }}>
      {children}
    </TripContext.Provider>
  );
};
