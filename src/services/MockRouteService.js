import { addMinutes, format } from 'date-fns';

// Helper to generate random delays
const getRandomDelay = () => {
    const r = Math.random();
    if (r > 0.8) return Math.floor(Math.random() * 10) + 1; // 1-10 min delay
    return 0; // On time
};

// Helper to generate a mock polyline (just a few points between start and end)
const generatePolyline = (start, end) => {
    const points = [start];
    // Add 2 intermediate points to simulate a route
    points.push([(start[0] + end[0]) / 2 + 0.001, (start[1] + end[1]) / 2 - 0.001]);
    points.push([(start[0] + end[0]) / 2 - 0.001, (start[1] + end[1]) / 2 + 0.001]);
    points.push(end);
    return points;
};

export const getRouteDetails = (startCoords, endCoords, mode, time, passengers = 1) => {
    // Basic distance calculation (Haversine)
    const R = 6371;
    const dLat = (endCoords[0] - startCoords[0]) * (Math.PI / 180);
    const dLon = (endCoords[1] - startCoords[1]) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(startCoords[0] * (Math.PI / 180)) * Math.cos(endCoords[0] * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = parseFloat((R * c).toFixed(2)); // km

    const startTime = new Date(); // Use current date + selected time in real app
    const delay = getRandomDelay();

    let durationMultiplier = 1;
    let co2Factor = 0;
    let costBase = 0;
    let steps = [];

    switch (mode) {
        case 'ÖPNV':
            durationMultiplier = 4; // min/km
            co2Factor = 40; // g/km
            costBase = 2.50;
            steps = [
                { type: 'WALK', instruction: 'Gehe zur Haltestelle "Hauptbahnhof"', duration: 5, distance: '300m' },
                { type: 'BUS', instruction: 'Nimm Bus 100 Richtung Zentrum', duration: Math.ceil(dist * 3), stops: 4, delay: delay },
                { type: 'WALK', instruction: 'Gehe zum Ziel', duration: 3, distance: '150m' }
            ];
            break;
        case 'Taxi / Uber':
            durationMultiplier = 2;
            co2Factor = 120;
            costBase = 3.00 + (dist * 2.00);
            steps = [
                { type: 'CAR', instruction: 'Fahrt zum Ziel', duration: Math.ceil(dist * 2), traffic: delay > 5 ? 'High' : 'Normal' }
            ];
            break;
        case 'Fahrrad':
            durationMultiplier = 4;
            co2Factor = 0;
            costBase = 0;
            steps = [
                { type: 'BIKE', instruction: 'Fahre über den Radweg', duration: Math.ceil(dist * 4), distance: `${dist}km` }
            ];
            break;
        case 'Zu Fuß':
            durationMultiplier = 12;
            co2Factor = 0;
            costBase = 0;
            steps = [
                { type: 'WALK', instruction: 'Folge der Route', duration: Math.ceil(dist * 12), distance: `${dist}km` }
            ];
            break;
        default:
            break;
    }

    const duration = Math.ceil(dist * durationMultiplier) + 10; // +10 buffer
    const arrivalTime = addMinutes(startTime, duration + delay);

    return {
        mode,
        distance: dist,
        duration: duration,
        cost: (costBase * (mode === 'ÖPNV' ? passengers : 1)).toFixed(2), // Taxi is per ride usually, but let's keep simple
        co2: Math.ceil(dist * co2Factor),
        departureTime: time,
        arrivalTime: format(arrivalTime, 'HH:mm'),
        delay: delay,
        steps: steps,
        path: generatePolyline(startCoords, endCoords)
    };
};
