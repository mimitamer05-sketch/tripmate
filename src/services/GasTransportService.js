// import { addMinutes, format } from 'date-fns';

// Mock Data for "Live" updates
const TRAFFIC_CONDITIONS = ['Normal', 'Heavy', 'Accident', 'Clear'];
const SURGE_MULTIPLIERS = [1.0, 1.2, 1.5, 2.0];

// Helper to generate random delay
const getRandomDelay = () => {
    const r = Math.random();
    // 20% chance of delay
    if (r > 0.8) return Math.floor(Math.random() * 15) + 1;
    return 0;
};

// Helper to simulate API latency
const simulateLatency = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to simulate API errors
const simulateError = () => {
    const r = Math.random();
    // 5% chance of error
    if (r > 0.95) throw new Error("GAS Gateway Timeout: Service unavailable.");
};

// Calculate distance using Haversine formula
const calculateDistance = (startCoords, endCoords) => {
    const R = 6371; // Earth's radius in km
    const dLat = (endCoords[0] - startCoords[0]) * (Math.PI / 180);
    const dLon = (endCoords[1] - startCoords[1]) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(startCoords[0] * (Math.PI / 180)) * Math.cos(endCoords[0] * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(2)); // km
};

// Calculate ÖPNV pricing
const calculatePublicTransportPrice = (distance, passengers) => {
    // Base fare + distance-based pricing
    const baseFare = 2.50;
    const distanceFare = distance > 5 ? 1.00 : 0;
    const totalPerPerson = baseFare + distanceFare;
    return (totalPerPerson * passengers).toFixed(2);
};

// Calculate Ride Hailing pricing
const calculateRideHailingPrice = (distance, passengers, surge, isPeakHour) => {
    // Base fare + per km + surge + peak hour
    const baseFare = 3.50;
    const perKm = 2.00;
    let total = baseFare + (distance * perKm);

    // Apply surge pricing
    total *= surge;

    // Peak hour surcharge
    if (isPeakHour) {
        total *= 1.2;
    }

    // Ride hailing is usually per ride, not per person
    // But add small fee for extra passengers
    if (passengers > 2) {
        total += (passengers - 2) * 1.50;
    }

    return total.toFixed(2);
};

// Calculate E-Scooter pricing
const calculateScooterPrice = (distance) => {
    // Unlock fee + per km
    const unlockFee = 1.00;
    const perKm = 0.25;
    return (unlockFee + (distance * perKm)).toFixed(2);
};

// Calculate Bike Share pricing
const calculateBikePrice = (distance, duration) => {
    // Unlock fee + time-based pricing
    const unlockFee = 1.00;
    const per30Min = 0.50;
    const timeSlots = Math.ceil(duration / 30);
    return (unlockFee + (timeSlots * per30Min)).toFixed(2);
};

export const GasTransportService = {
    /**
     * Fetches transport routes from the simulated GAS API Gateway.
     * @param {Array} startCoords [lat, lng]
     * @param {Array} endCoords [lat, lng]
     * @param {string} date YYYY-MM-DD
     * @param {string} time HH:mm
     * @param {number} passengers
     * @returns {Promise<Object>} Route details and options
     */
    fetchRoutes: async (startCoords, endCoords, date, time, passengers = 1) => {
        await simulateLatency();
        simulateError();

        // Calculate distance
        const dist = calculateDistance(startCoords, endCoords);

        // Live Data Simulation
        const traffic = TRAFFIC_CONDITIONS[Math.floor(Math.random() * TRAFFIC_CONDITIONS.length)];
        const surge = SURGE_MULTIPLIERS[Math.floor(Math.random() * SURGE_MULTIPLIERS.length)];
        const isPeakHour = (parseInt(time.split(':')[0]) >= 7 && parseInt(time.split(':')[0]) <= 9) ||
            (parseInt(time.split(':')[0]) >= 16 && parseInt(time.split(':')[0]) <= 18);

        // Calculate durations (in minutes)
        const publicTransportDuration = Math.ceil(dist * 4) + 10 + getRandomDelay(); // ~4 min/km + stops
        const rideHailingDuration = Math.ceil(dist * 2) + (traffic === 'Heavy' ? 10 : 0); // ~2 min/km
        const scooterDuration = Math.ceil(dist * 3); // ~3 min/km
        const bikeDuration = Math.ceil(dist * 4); // ~4 min/km

        // Generate Options
        const options = [
            {
                id: 'public_transport',
                type: 'ÖPNV',
                provider: 'CityTransit',
                duration: publicTransportDuration,
                cost: calculatePublicTransportPrice(dist, passengers),
                co2: Math.ceil(dist * 40), // g per person
                delay: getRandomDelay(),
                frequency: 'Alle 10 Min',
                color: '#3b82f6',
                tags: ['Eco', 'Günstig'],
                description: `${passengers} ${passengers === 1 ? 'Ticket' : 'Tickets'} • 2-3 Umstiege`
            },
            {
                id: 'ride_hailing',
                type: 'Ride Hailing',
                provider: 'Uber/Bolt',
                duration: rideHailingDuration,
                cost: calculateRideHailingPrice(dist, passengers, surge, isPeakHour),
                co2: Math.ceil(dist * 120), // g total
                delay: traffic === 'Heavy' ? 15 : 0,
                surge: surge > 1.0,
                color: '#f59e0b',
                tags: ['Schnell', 'Komfort'],
                description: `Für ${passengers} ${passengers === 1 ? 'Person' : 'Personen'} • Direktfahrt`
            },
            {
                id: 'scooter',
                type: 'E-Scooter',
                provider: 'Lime/Tier',
                duration: scooterDuration,
                cost: calculateScooterPrice(dist),
                co2: 0,
                battery: Math.floor(Math.random() * 100),
                color: '#10b981',
                tags: ['Spaß', 'Flexibel'],
                description: 'Pro Person • Nur für kurze Strecken'
            },
            {
                id: 'bike_share',
                type: 'Bike Share',
                provider: 'CityBike',
                duration: bikeDuration,
                cost: calculateBikePrice(dist, bikeDuration),
                co2: 0,
                bikesAvailable: Math.floor(Math.random() * 10) + 1,
                color: '#84cc16',
                tags: ['Aktiv', 'Eco'],
                description: 'Pro Person • Gesund & umweltfreundlich'
            }
        ];

        return {
            distance: dist,
            trafficCondition: traffic,
            isPeakHour: isPeakHour,
            surge: surge,
            options: options
        };
    }
};
