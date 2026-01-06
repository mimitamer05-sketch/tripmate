export const flights = [
    // ===== OUTBOUND FLIGHTS =====

    // Frankfurt to New York
    {
        id: 1,
        airline: 'Lufthansa',
        flightNumber: 'LH400',
        departureTime: '10:00',
        arrivalTime: '14:00',
        duration: '8h 00m',
        origin: 'Frankfurt',
        destination: 'New York',
        price: 450,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },
    {
        id: 2,
        airline: 'United Airlines',
        flightNumber: 'UA961',
        departureTime: '11:30',
        arrivalTime: '15:45',
        duration: '8h 15m',
        origin: 'Frankfurt',
        destination: 'New York',
        price: 420,
        type: 'Direct',
        logo: '/images/airlines/united.png'
    },
    {
        id: 3,
        airline: 'British Airways',
        flightNumber: 'BA903',
        departureTime: '07:00',
        arrivalTime: '13:00',
        duration: '12h 00m',
        origin: 'Frankfurt',
        destination: 'New York',
        price: 380,
        type: '1 Stop',
        stops: [{ airport: 'London Heathrow (LHR)', duration: '2h 30m' }],
        logo: '/images/airlines/ba.png'
    },
    {
        id: 4,
        airline: 'Air France',
        flightNumber: 'AF1019',
        departureTime: '09:00',
        arrivalTime: '14:30',
        duration: '11h 30m',
        origin: 'Frankfurt',
        destination: 'New York',
        price: 390,
        type: '1 Stop',
        stops: [{ airport: 'Paris Charles de Gaulle (CDG)', duration: '1h 45m' }],
        logo: '/images/airlines/airfrance.png'
    },

    // München to New York
    {
        id: 11,
        airline: 'Lufthansa',
        flightNumber: 'LH410',
        departureTime: '11:00',
        arrivalTime: '15:00',
        duration: '9h 00m',
        origin: 'München',
        destination: 'New York',
        price: 470,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },
    {
        id: 12,
        airline: 'Delta Air Lines',
        flightNumber: 'DL131',
        departureTime: '12:30',
        arrivalTime: '16:45',
        duration: '9h 15m',
        origin: 'München',
        destination: 'New York',
        price: 460,
        type: 'Direct',
        logo: '/images/airlines/delta.png'
    },
    {
        id: 13,
        airline: 'KLM',
        flightNumber: 'KL1792',
        departureTime: '08:00',
        arrivalTime: '14:00',
        duration: '12h 00m',
        origin: 'München',
        destination: 'New York',
        price: 410,
        type: '1 Stop',
        stops: [{ airport: 'Amsterdam Schiphol (AMS)', duration: '2h 10m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/KLM_logo.svg/200px-KLM_logo.svg.png'
    },
    {
        id: 14,
        airline: 'Swiss',
        flightNumber: 'LX1101',
        departureTime: '09:30',
        arrivalTime: '15:30',
        duration: '12h 00m',
        origin: 'München',
        destination: 'New York',
        price: 430,
        type: '1 Stop',
        stops: [{ airport: 'Zurich (ZRH)', duration: '1h 50m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Swiss_International_Air_Lines_Logo_2011.svg/200px-Swiss_International_Air_Lines_Logo_2011.svg.png'
    },

    // Berlin to New York
    {
        id: 21,
        airline: 'United Airlines',
        flightNumber: 'UA963',
        departureTime: '09:00',
        arrivalTime: '13:00',
        duration: '9h 00m',
        origin: 'Berlin',
        destination: 'New York',
        price: 440,
        type: 'Direct',
        logo: '/images/airlines/united.png'
    },
    {
        id: 22,
        airline: 'Norse Atlantic',
        flightNumber: 'N0601',
        departureTime: '18:00',
        arrivalTime: '21:00',
        duration: '9h 00m',
        origin: 'Berlin',
        destination: 'New York',
        price: 320,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Norse_Atlantic_Airways_logo.svg/200px-Norse_Atlantic_Airways_logo.svg.png'
    },
    {
        id: 23,
        airline: 'British Airways',
        flightNumber: 'BA991',
        departureTime: '07:30',
        arrivalTime: '13:30',
        duration: '12h 00m',
        origin: 'Berlin',
        destination: 'New York',
        price: 390,
        type: '1 Stop',
        stops: [{ airport: 'London Heathrow (LHR)', duration: '2h 15m' }],
        logo: '/images/airlines/ba.png'
    },
    {
        id: 24,
        airline: 'Lufthansa',
        flightNumber: 'LH175',
        departureTime: '08:00',
        arrivalTime: '14:00',
        duration: '12h 00m',
        origin: 'Berlin',
        destination: 'New York',
        price: 410,
        type: '1 Stop',
        stops: [{ airport: 'Frankfurt (FRA)', duration: '1h 30m' }],
        logo: '/images/airlines/lufthansa.png'
    },

    // Hamburg to New York
    {
        id: 31,
        airline: 'Lufthansa',
        flightNumber: 'LH420',
        departureTime: '13:00',
        arrivalTime: '17:00',
        duration: '8h 00m',
        origin: 'Hamburg',
        destination: 'New York',
        price: 460,
        type: '1 Stop',
        logo: '/images/airlines/lufthansa.png'
    },

    // Wien to New York
    {
        id: 41,
        airline: 'Austrian Airlines',
        flightNumber: 'OS87',
        departureTime: '10:30',
        arrivalTime: '14:45',
        duration: '9h 15m',
        origin: 'Wien',
        destination: 'New York',
        price: 480,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // Frankfurt to Paris
    {
        id: 31,
        airline: 'Lufthansa',
        flightNumber: 'LH1030',
        departureTime: '08:00',
        arrivalTime: '09:15',
        duration: '1h 15m',
        origin: 'Frankfurt',
        destination: 'Paris',
        price: 150,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },
    {
        id: 32,
        airline: 'Air France',
        flightNumber: 'AF1519',
        departureTime: '14:00',
        arrivalTime: '15:20',
        duration: '1h 20m',
        origin: 'Frankfurt',
        destination: 'Paris',
        price: 160,
        type: 'Direct',
        logo: '/images/airlines/airfrance.png'
    },
    {
        id: 33,
        airline: 'KLM',
        flightNumber: 'KL1762',
        departureTime: '07:00',
        arrivalTime: '10:30',
        duration: '3h 30m',
        origin: 'Frankfurt',
        destination: 'Paris',
        price: 130,
        type: '1 Stop',
        stops: [{ airport: 'Amsterdam Schiphol (AMS)', duration: '1h 10m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/KLM_logo.svg/200px-KLM_logo.svg.png'
    },
    {
        id: 34,
        airline: 'Swiss',
        flightNumber: 'LX1069',
        departureTime: '09:00',
        arrivalTime: '13:00',
        duration: '4h 00m',
        origin: 'Frankfurt',
        destination: 'Paris',
        price: 140,
        type: '1 Stop',
        stops: [{ airport: 'Zurich (ZRH)', duration: '1h 30m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Swiss_International_Air_Lines_Logo_2011.svg/200px-Swiss_International_Air_Lines_Logo_2011.svg.png'
    },

    // München to Paris
    {
        id: 41,
        airline: 'Air France',
        flightNumber: 'AF1123',
        departureTime: '07:30',
        arrivalTime: '09:00',
        duration: '1h 30m',
        origin: 'München',
        destination: 'Paris',
        price: 170,
        type: 'Direct',
        logo: '/images/airlines/airfrance.png'
    },
    {
        id: 42,
        airline: 'Lufthansa',
        flightNumber: 'LH2228',
        departureTime: '16:00',
        arrivalTime: '17:30',
        duration: '1h 30m',
        origin: 'München',
        destination: 'Paris',
        price: 180,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },
    {
        id: 43,
        airline: 'Eurowings',
        flightNumber: 'EW1922',
        departureTime: '10:00',
        arrivalTime: '11:40',
        duration: '1h 40m',
        origin: 'München',
        destination: 'Paris',
        price: 140,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Eurowings_Logo.svg/200px-Eurowings_Logo.svg.png'
    },
    {
        id: 44,
        airline: 'KLM',
        flightNumber: 'KL1790',
        departureTime: '06:30',
        arrivalTime: '10:00',
        duration: '3h 30m',
        origin: 'München',
        destination: 'Paris',
        price: 150,
        type: '1 Stop',
        stops: [{ airport: 'Amsterdam Schiphol (AMS)', duration: '1h 00m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/KLM_logo.svg/200px-KLM_logo.svg.png'
    },

    // Berlin to Paris
    {
        id: 51,
        airline: 'Air France',
        flightNumber: 'AF1235',
        departureTime: '10:30',
        arrivalTime: '12:15',
        duration: '1h 45m',
        origin: 'Berlin',
        destination: 'Paris',
        price: 160,
        type: 'Direct',
        logo: '/images/airlines/airfrance.png'
    },
    {
        id: 52,
        airline: 'EasyJet',
        flightNumber: 'U24562',
        departureTime: '14:00',
        arrivalTime: '15:50',
        duration: '1h 50m',
        origin: 'Berlin',
        destination: 'Paris',
        price: 110,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/EasyJet_logo.svg/200px-EasyJet_logo.svg.png'
    },
    {
        id: 53,
        airline: 'Lufthansa',
        flightNumber: 'LH189',
        departureTime: '08:00',
        arrivalTime: '11:30',
        duration: '3h 30m',
        origin: 'Berlin',
        destination: 'Paris',
        price: 140,
        type: '1 Stop',
        stops: [{ airport: 'Frankfurt (FRA)', duration: '1h 15m' }],
        logo: '/images/airlines/lufthansa.png'
    },
    {
        id: 54,
        airline: 'Brussels Airlines',
        flightNumber: 'SN2582',
        departureTime: '09:30',
        arrivalTime: '13:00',
        duration: '3h 30m',
        origin: 'Berlin',
        destination: 'Paris',
        price: 130,
        type: '1 Stop',
        stops: [{ airport: 'Brussels (BRU)', duration: '1h 00m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Brussels_Airlines_logo.svg/200px-Brussels_Airlines_logo.svg.png'
    },

    // Hamburg to Paris
    {
        id: 32,
        airline: 'Lufthansa',
        flightNumber: 'LH2040',
        departureTime: '08:30',
        arrivalTime: '10:00',
        duration: '1h 30m',
        origin: 'Hamburg',
        destination: 'Paris',
        price: 135,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },

    // Wien to Paris
    {
        id: 42,
        airline: 'Austrian Airlines',
        flightNumber: 'OS411',
        departureTime: '09:00',
        arrivalTime: '10:45',
        duration: '1h 45m',
        origin: 'Wien',
        destination: 'Paris',
        price: 145,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // Frankfurt to London
    {
        id: 121,
        airline: 'Lufthansa',
        flightNumber: 'LH900',
        departureTime: '07:00',
        arrivalTime: '07:45',
        duration: '1h 45m',
        origin: 'Frankfurt',
        destination: 'London',
        price: 180,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },
    {
        id: 122,
        airline: 'British Airways',
        flightNumber: 'BA903',
        departureTime: '10:30',
        arrivalTime: '11:15',
        duration: '1h 45m',
        origin: 'Frankfurt',
        destination: 'London',
        price: 190,
        type: 'Direct',
        logo: '/images/airlines/ba.png'
    },
    {
        id: 123,
        airline: 'Ryanair',
        flightNumber: 'FR1502',
        departureTime: '14:00',
        arrivalTime: '14:40',
        duration: '1h 40m',
        origin: 'Frankfurt',
        destination: 'London',
        price: 60,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Ryanair_Logo.svg/200px-Ryanair_Logo.svg.png'
    },
    {
        id: 124,
        airline: 'KLM',
        flightNumber: 'KL1762',
        departureTime: '08:00',
        arrivalTime: '10:30',
        duration: '3h 30m',
        origin: 'Frankfurt',
        destination: 'London',
        price: 150,
        type: '1 Stop',
        stops: [{ airport: 'Amsterdam Schiphol (AMS)', duration: '1h 15m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/KLM_logo.svg/200px-KLM_logo.svg.png'
    },

    // München to London
    {
        id: 131,
        airline: 'Lufthansa',
        flightNumber: 'LH2472',
        departureTime: '09:00',
        arrivalTime: '10:00',
        duration: '2h 00m',
        origin: 'München',
        destination: 'London',
        price: 190,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },
    {
        id: 132,
        airline: 'British Airways',
        flightNumber: 'BA949',
        departureTime: '12:00',
        arrivalTime: '13:00',
        duration: '2h 00m',
        origin: 'München',
        destination: 'London',
        price: 200,
        type: 'Direct',
        logo: '/images/airlines/ba.png'
    },
    {
        id: 133,
        airline: 'EasyJet',
        flightNumber: 'U28452',
        departureTime: '15:30',
        arrivalTime: '16:30',
        duration: '2h 00m',
        origin: 'München',
        destination: 'London',
        price: 90,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/EasyJet_logo.svg/200px-EasyJet_logo.svg.png'
    },
    {
        id: 134,
        airline: 'Swiss',
        flightNumber: 'LX1101',
        departureTime: '08:00',
        arrivalTime: '11:00',
        duration: '4h 00m',
        origin: 'München',
        destination: 'London',
        price: 170,
        type: '1 Stop',
        stops: [{ airport: 'Zurich (ZRH)', duration: '1h 30m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Swiss_International_Air_Lines_Logo_2011.svg/200px-Swiss_International_Air_Lines_Logo_2011.svg.png'
    },

    // Berlin to London
    {
        id: 141,
        airline: 'British Airways',
        flightNumber: 'BA991',
        departureTime: '07:30',
        arrivalTime: '08:30',
        duration: '2h 00m',
        origin: 'Berlin',
        destination: 'London',
        price: 160,
        type: 'Direct',
        logo: '/images/airlines/ba.png'
    },
    {
        id: 142,
        airline: 'Ryanair',
        flightNumber: 'FR146',
        departureTime: '11:00',
        arrivalTime: '12:00',
        duration: '2h 00m',
        origin: 'Berlin',
        destination: 'London',
        price: 70,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Ryanair_Logo.svg/200px-Ryanair_Logo.svg.png'
    },
    {
        id: 143,
        airline: 'EasyJet',
        flightNumber: 'U24566',
        departureTime: '16:00',
        arrivalTime: '17:00',
        duration: '2h 00m',
        origin: 'Berlin',
        destination: 'London',
        price: 85,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/EasyJet_logo.svg/200px-EasyJet_logo.svg.png'
    },
    {
        id: 144,
        airline: 'Lufthansa',
        flightNumber: 'LH175',
        departureTime: '09:00',
        arrivalTime: '12:30',
        duration: '4h 30m',
        origin: 'Berlin',
        destination: 'London',
        price: 150,
        type: '1 Stop',
        stops: [{ airport: 'Frankfurt (FRA)', duration: '1h 45m' }],
        logo: '/images/airlines/lufthansa.png'
    },

    // Hamburg to London
    {
        id: 33,
        airline: 'Lufthansa',
        flightNumber: 'LH910',
        departureTime: '09:30',
        arrivalTime: '10:30',
        duration: '2h 00m',
        origin: 'Hamburg',
        destination: 'London',
        price: 165,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },

    // Wien to London
    {
        id: 43,
        airline: 'Austrian Airlines',
        flightNumber: 'OS451',
        departureTime: '10:00',
        arrivalTime: '11:30',
        duration: '2h 30m',
        origin: 'Wien',
        destination: 'London',
        price: 170,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // Frankfurt to Tokyo
    {
        id: 61,
        airline: 'Lufthansa',
        flightNumber: 'LH716',
        departureTime: '13:30',
        arrivalTime: '09:00',
        duration: '12h 30m',
        origin: 'Frankfurt',
        destination: 'Tokio',
        price: 950,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },
    {
        id: 62,
        airline: 'JAL',
        flightNumber: 'JL408',
        departureTime: '19:00',
        arrivalTime: '14:30',
        duration: '12h 30m',
        origin: 'Frankfurt',
        destination: 'Tokio',
        price: 1000,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Japan_Airlines_Logo_%282011%29.svg/200px-Japan_Airlines_Logo_%282011%29.svg.png'
    },
    {
        id: 63,
        airline: 'ANA',
        flightNumber: 'NH204',
        departureTime: '11:30',
        arrivalTime: '06:50',
        duration: '12h 20m',
        origin: 'Frankfurt',
        destination: 'Tokio',
        price: 980,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/All_Nippon_Airways_Logo.svg/200px-All_Nippon_Airways_Logo.svg.png'
    },
    {
        id: 64,
        airline: 'Emirates',
        flightNumber: 'EK46',
        departureTime: '15:00',
        arrivalTime: '17:30',
        duration: '19h 30m',
        origin: 'Frankfurt',
        destination: 'Tokio',
        price: 850,
        type: '1 Stop',
        stops: [{ airport: 'Dubai (DXB)', duration: '3h 00m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png'
    },

    // München to Tokyo
    {
        id: 71,
        airline: 'Lufthansa',
        flightNumber: 'LH714',
        departureTime: '15:30',
        arrivalTime: '11:00',
        duration: '12h 30m',
        origin: 'München',
        destination: 'Tokio',
        price: 960,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },
    {
        id: 72,
        airline: 'ANA',
        flightNumber: 'NH218',
        departureTime: '20:00',
        arrivalTime: '15:30',
        duration: '12h 30m',
        origin: 'München',
        destination: 'Tokio',
        price: 990,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/All_Nippon_Airways_Logo.svg/200px-All_Nippon_Airways_Logo.svg.png'
    },
    {
        id: 73,
        airline: 'Finnair',
        flightNumber: 'AY1402',
        departureTime: '12:00',
        arrivalTime: '09:00',
        duration: '14h 00m',
        origin: 'München',
        destination: 'Tokio',
        price: 880,
        type: '1 Stop',
        stops: [{ airport: 'Helsinki (HEL)', duration: '2h 00m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Finnair_Logo.svg/200px-Finnair_Logo.svg.png'
    },
    {
        id: 74,
        airline: 'Qatar Airways',
        flightNumber: 'QR58',
        departureTime: '16:30',
        arrivalTime: '18:00',
        duration: '18h 30m',
        origin: 'München',
        destination: 'Tokio',
        price: 820,
        type: '1 Stop',
        stops: [{ airport: 'Doha (DOH)', duration: '2h 45m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Qatar_Airways_Logo.svg/200px-Qatar_Airways_Logo.svg.png'
    },

    // Berlin to Tokyo
    {
        id: 81,
        airline: 'Finnair',
        flightNumber: 'AY1432',
        departureTime: '13:00',
        arrivalTime: '10:00',
        duration: '14h 00m',
        origin: 'Berlin',
        destination: 'Tokio',
        price: 890,
        type: '1 Stop',
        stops: [{ airport: 'Helsinki (HEL)', duration: '2h 15m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Finnair_Logo.svg/200px-Finnair_Logo.svg.png'
    },
    {
        id: 82,
        airline: 'Lufthansa',
        flightNumber: 'LH195',
        departureTime: '10:00',
        arrivalTime: '09:00',
        duration: '16h 00m',
        origin: 'Berlin',
        destination: 'Tokio',
        price: 920,
        type: '1 Stop',
        stops: [{ airport: 'Frankfurt (FRA)', duration: '2h 30m' }],
        logo: '/images/airlines/lufthansa.png'
    },
    {
        id: 83,
        airline: 'British Airways',
        flightNumber: 'BA983',
        departureTime: '11:00',
        arrivalTime: '11:00',
        duration: '17h 00m',
        origin: 'Berlin',
        destination: 'Tokio',
        price: 900,
        type: '1 Stop',
        stops: [{ airport: 'London Heathrow (LHR)', duration: '3h 00m' }],
        logo: '/images/airlines/ba.png'
    },
    {
        id: 84,
        airline: 'Turkish Airlines',
        flightNumber: 'TK1722',
        departureTime: '12:30',
        arrivalTime: '14:00',
        duration: '18h 30m',
        origin: 'Berlin',
        destination: 'Tokio',
        price: 850,
        type: '1 Stop',
        stops: [{ airport: 'Istanbul (IST)', duration: '3h 15m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Turkish_Airlines_logo_2019.svg/200px-Turkish_Airlines_logo_2019.svg.png'
    },

    // Hamburg to Tokyo
    {
        id: 34,
        airline: 'Lufthansa',
        flightNumber: 'LH716',
        departureTime: '14:00',
        arrivalTime: '09:30',
        duration: '11h 30m',
        origin: 'Hamburg',
        destination: 'Tokio',
        price: 990,
        type: '1 Stop',
        logo: '/images/airlines/lufthansa.png'
    },

    // Wien to Tokyo
    {
        id: 44,
        airline: 'Austrian Airlines',
        flightNumber: 'OS51',
        departureTime: '11:00',
        arrivalTime: '06:45',
        duration: '11h 45m',
        origin: 'Wien',
        destination: 'Tokio',
        price: 1000,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // Frankfurt to Sydney
    {
        id: 91,
        airline: 'Qantas',
        flightNumber: 'QF6',
        departureTime: '10:00',
        arrivalTime: '18:00',
        duration: '22h 00m',
        origin: 'Frankfurt',
        destination: 'Sydney',
        price: 1200,
        type: '1 Stop',
        stops: [{ airport: 'Singapore (SIN)', duration: '2h 30m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Qantas_Airways_logo_2016.svg/200px-Qantas_Airways_logo_2016.svg.png'
    },
    {
        id: 92,
        airline: 'Emirates',
        flightNumber: 'EK48',
        departureTime: '15:00',
        arrivalTime: '22:00',
        duration: '23h 00m',
        origin: 'Frankfurt',
        destination: 'Sydney',
        price: 1150,
        type: '1 Stop',
        stops: [{ airport: 'Dubai (DXB)', duration: '3h 00m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png'
    },
    {
        id: 93,
        airline: 'Singapore Airlines',
        flightNumber: 'SQ25',
        departureTime: '12:00',
        arrivalTime: '19:30',
        duration: '22h 30m',
        origin: 'Frankfurt',
        destination: 'Sydney',
        price: 1180,
        type: '1 Stop',
        stops: [{ airport: 'Singapore (SIN)', duration: '2h 00m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Singapore_Airlines_Logo.svg/200px-Singapore_Airlines_Logo.svg.png'
    },
    {
        id: 94,
        airline: 'Qatar Airways',
        flightNumber: 'QR68',
        departureTime: '17:00',
        arrivalTime: '21:00',
        duration: '21h 00m',
        origin: 'Frankfurt',
        destination: 'Sydney',
        price: 1100,
        type: '1 Stop',
        stops: [{ airport: 'Doha (DOH)', duration: '2h 15m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Qatar_Airways_Logo.svg/200px-Qatar_Airways_Logo.svg.png'
    },

    // München to Sydney
    {
        id: 101,
        airline: 'Emirates',
        flightNumber: 'EK52',
        departureTime: '14:30',
        arrivalTime: '21:30',
        duration: '23h 00m',
        origin: 'München',
        destination: 'Sydney',
        price: 1160,
        type: '1 Stop',
        stops: [{ airport: 'Dubai (DXB)', duration: '2h 45m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png'
    },
    {
        id: 102,
        airline: 'Qatar Airways',
        flightNumber: 'QR58',
        departureTime: '16:30',
        arrivalTime: '20:30',
        duration: '21h 00m',
        origin: 'München',
        destination: 'Sydney',
        price: 1120,
        type: '1 Stop',
        stops: [{ airport: 'Doha (DOH)', duration: '2h 30m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Qatar_Airways_Logo.svg/200px-Qatar_Airways_Logo.svg.png'
    },
    {
        id: 103,
        airline: 'Singapore Airlines',
        flightNumber: 'SQ327',
        departureTime: '13:00',
        arrivalTime: '19:00',
        duration: '22h 00m',
        origin: 'München',
        destination: 'Sydney',
        price: 1190,
        type: '1 Stop',
        stops: [{ airport: 'Singapore (SIN)', duration: '1h 45m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Singapore_Airlines_Logo.svg/200px-Singapore_Airlines_Logo.svg.png'
    },
    {
        id: 104,
        airline: 'Etihad Airways',
        flightNumber: 'EY4',
        departureTime: '11:00',
        arrivalTime: '18:30',
        duration: '23h 30m',
        origin: 'München',
        destination: 'Sydney',
        price: 1080,
        type: '1 Stop',
        stops: [{ airport: 'Abu Dhabi (AUH)', duration: '3h 00m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Etihad_Airways_Logo.svg/200px-Etihad_Airways_Logo.svg.png'
    },

    // Berlin to Sydney
    {
        id: 111,
        airline: 'Qatar Airways',
        flightNumber: 'QR80',
        departureTime: '15:00',
        arrivalTime: '20:00',
        duration: '22h 00m',
        origin: 'Berlin',
        destination: 'Sydney',
        price: 1140,
        type: '1 Stop',
        stops: [{ airport: 'Doha (DOH)', duration: '2h 45m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Qatar_Airways_Logo.svg/200px-Qatar_Airways_Logo.svg.png'
    },
    {
        id: 112,
        airline: 'Scoot',
        flightNumber: 'TR735',
        departureTime: '10:00',
        arrivalTime: '19:00',
        duration: '25h 00m',
        origin: 'Berlin',
        destination: 'Sydney',
        price: 850,
        type: '1 Stop',
        stops: [{ airport: 'Singapore (SIN)', duration: '4h 00m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Scoot_Logo_2018.svg/200px-Scoot_Logo_2018.svg.png'
    },
    {
        id: 113,
        airline: 'British Airways',
        flightNumber: 'BA991',
        departureTime: '07:30',
        arrivalTime: '18:00',
        duration: '26h 30m',
        origin: 'Berlin',
        destination: 'Sydney',
        price: 1250,
        type: '2 Stops',
        stops: [{ airport: 'London Heathrow (LHR)', duration: '2h 00m' }, { airport: 'Singapore (SIN)', duration: '1h 30m' }],
        logo: '/images/airlines/ba.png'
    },
    {
        id: 114,
        airline: 'Turkish Airlines',
        flightNumber: 'TK1722',
        departureTime: '12:30',
        arrivalTime: '21:00',
        duration: '24h 30m',
        origin: 'Berlin',
        destination: 'Sydney',
        price: 1050,
        type: '1 Stop',
        stops: [{ airport: 'Istanbul (IST)', duration: '3h 30m' }],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Turkish_Airlines_logo_2019.svg/200px-Turkish_Airlines_logo_2019.svg.png'
    },

    // Hamburg to Sydney
    {
        id: 35,
        airline: 'Lufthansa',
        flightNumber: 'LH778',
        departureTime: '11:00',
        arrivalTime: '20:00',
        duration: '24h 00m',
        origin: 'Hamburg',
        destination: 'Sydney',
        price: 1250,
        type: '2 Stops',
        logo: '/images/airlines/lufthansa.png'
    },

    // Wien to Sydney
    {
        id: 45,
        airline: 'Austrian Airlines',
        flightNumber: 'OS803',
        departureTime: '12:00',
        arrivalTime: '21:30',
        duration: '23h 30m',
        origin: 'Wien',
        destination: 'Sydney',
        price: 1240,
        type: '1 Stop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // ===== RETURN FLIGHTS =====

    // New York to Frankfurt
    {
        id: 101,
        airline: 'Lufthansa',
        flightNumber: 'LH401',
        departureTime: '18:00',
        arrivalTime: '08:00',
        duration: '8h 00m',
        origin: 'New York',
        destination: 'Frankfurt',
        price: 460,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },
    {
        id: 102,
        airline: 'United Airlines',
        flightNumber: 'UA960',
        departureTime: '20:30',
        arrivalTime: '10:15',
        duration: '7h 45m',
        origin: 'New York',
        destination: 'Frankfurt',
        price: 430,
        type: 'Direct',
        logo: '/images/airlines/united.png'
    },

    // New York to München
    {
        id: 111,
        airline: 'Lufthansa',
        flightNumber: 'LH411',
        departureTime: '19:00',
        arrivalTime: '09:30',
        duration: '8h 30m',
        origin: 'New York',
        destination: 'München',
        price: 480,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },

    // New York to Berlin
    {
        id: 121,
        airline: 'United Airlines',
        flightNumber: 'UA961',
        departureTime: '21:00',
        arrivalTime: '11:15',
        duration: '8h 15m',
        origin: 'New York',
        destination: 'Berlin',
        price: 450,
        type: 'Direct',
        logo: '/images/airlines/united.png'
    },

    // New York to Hamburg
    {
        id: 131,
        airline: 'Lufthansa',
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },

    // Berlin to Tokyo
    {
        id: 21,
        airline: 'United Airlines',
        flightNumber: 'UA960',
        departureTime: '12:00',
        arrivalTime: '16:15',
        duration: '8h 15m',
        origin: 'Berlin',
        destination: 'New York',
        price: 440,
        type: 'Direct',
        logo: '/images/airlines/united.png'
    },

    // Hamburg to New York
    {
        id: 31,
        airline: 'Lufthansa',
        flightNumber: 'LH420',
        departureTime: '13:00',
        arrivalTime: '17:00',
        duration: '8h 00m',
        origin: 'Hamburg',
        destination: 'New York',
        price: 460,
        type: '1 Stop',
        logo: '/images/airlines/lufthansa.png'
    },

    // Wien to New York
    {
        id: 41,
        airline: 'Austrian Airlines',
        flightNumber: 'OS87',
        departureTime: '10:30',
        arrivalTime: '14:45',
        duration: '9h 15m',
        origin: 'Wien',
        destination: 'New York',
        price: 480,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // Frankfurt to Paris
    {
        id: 3,
        airline: 'Air France',
        flightNumber: 'AF101',
        departureTime: '07:00',
        arrivalTime: '08:15',
        duration: '1h 15m',
        origin: 'Frankfurt',
        destination: 'Paris',
        price: 120,
        type: 'Direct',
        logo: '/images/airlines/airfrance.png'
    },
    {
        id: 4,
        airline: 'Lufthansa',
        flightNumber: 'LH1030',
        departureTime: '09:00',
        arrivalTime: '10:15',
        duration: '1h 15m',
        origin: 'Frankfurt',
        destination: 'Paris',
        price: 140,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },

    // München to Paris
    {
        id: 12,
        airline: 'Air France',
        flightNumber: 'AF1823',
        departureTime: '08:00',
        arrivalTime: '09:30',
        duration: '1h 30m',
        origin: 'München',
        destination: 'Paris',
        price: 130,
        type: 'Direct',
        logo: '/images/airlines/airfrance.png'
    },

    // Berlin to Paris
    {
        id: 22,
        airline: 'Air France',
        flightNumber: 'AF1235',
        departureTime: '07:30',
        arrivalTime: '09:15',
        duration: '1h 45m',
        origin: 'Berlin',
        destination: 'Paris',
        price: 125,
        type: 'Direct',
        logo: '/images/airlines/airfrance.png'
    },

    // Hamburg to Paris
    {
        id: 32,
        airline: 'Lufthansa',
        flightNumber: 'LH2040',
        departureTime: '08:30',
        arrivalTime: '10:00',
        duration: '1h 30m',
        origin: 'Hamburg',
        destination: 'Paris',
        price: 135,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },

    // Wien to Paris
    {
        id: 42,
        airline: 'Austrian Airlines',
        flightNumber: 'OS411',
        departureTime: '09:00',
        arrivalTime: '10:45',
        duration: '1h 45m',
        origin: 'Wien',
        destination: 'Paris',
        price: 145,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // Frankfurt to London
    {
        id: 5,
        airline: 'British Airways',
        flightNumber: 'BA903',
        departureTime: '08:30',
        arrivalTime: '09:15',
        duration: '1h 45m',
        origin: 'Frankfurt',
        destination: 'London',
        price: 150,
        type: 'Direct',
        logo: '/images/airlines/ba.png'
    },
    {
        id: 6,
        airline: 'Lufthansa',
        flightNumber: 'LH900',
        departureTime: '10:00',
        arrivalTime: '10:45',
        duration: '1h 45m',
        origin: 'Frankfurt',
        destination: 'London',
        price: 160,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },

    // München to London
    {
        id: 13,
        airline: 'British Airways',
        flightNumber: 'BA963',
        departureTime: '09:00',
        arrivalTime: '10:00',
        duration: '2h 00m',
        origin: 'München',
        destination: 'London',
        price: 155,
        type: 'Direct',
        logo: '/images/airlines/ba.png'
    },

    // Berlin to London
    {
        id: 23,
        airline: 'British Airways',
        flightNumber: 'BA983',
        departureTime: '08:00',
        arrivalTime: '09:00',
        duration: '2h 00m',
        origin: 'Berlin',
        destination: 'London',
        price: 145,
        type: 'Direct',
        logo: '/images/airlines/ba.png'
    },

    // Hamburg to London
    {
        id: 33,
        airline: 'Lufthansa',
        flightNumber: 'LH910',
        departureTime: '09:30',
        arrivalTime: '10:30',
        duration: '2h 00m',
        origin: 'Hamburg',
        destination: 'London',
        price: 165,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },

    // Wien to London
    {
        id: 43,
        airline: 'Austrian Airlines',
        flightNumber: 'OS451',
        departureTime: '10:00',
        arrivalTime: '11:30',
        duration: '2h 30m',
        origin: 'Wien',
        destination: 'London',
        price: 170,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // Frankfurt to Tokyo
    {
        id: 7,
        airline: 'ANA',
        flightNumber: 'NH204',
        departureTime: '11:30',
        arrivalTime: '06:55',
        duration: '11h 25m',
        origin: 'Frankfurt',
        destination: 'Tokio',
        price: 950,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/All_Nippon_Airways_Logo.svg/200px-All_Nippon_Airways_Logo.svg.png'
    },
    {
        id: 8,
        airline: 'JAL',
        flightNumber: 'JL408',
        departureTime: '19:40',
        arrivalTime: '14:55',
        duration: '11h 15m',
        origin: 'Frankfurt',
        destination: 'Tokio',
        price: 980,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Japan_Airlines_Logo_%282011%29.svg/200px-Japan_Airlines_Logo_%282011%29.svg.png'
    },

    // München to Tokyo
    {
        id: 14,
        airline: 'ANA',
        flightNumber: 'NH218',
        departureTime: '12:00',
        arrivalTime: '07:30',
        duration: '11h 30m',
        origin: 'München',
        destination: 'Tokio',
        price: 970,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/All_Nippon_Airways_Logo.svg/200px-All_Nippon_Airways_Logo.svg.png'
    },

    // Berlin to Tokyo
    {
        id: 24,
        airline: 'JAL',
        flightNumber: 'JL412',
        departureTime: '13:00',
        arrivalTime: '08:15',
        duration: '11h 15m',
        origin: 'Berlin',
        destination: 'Tokio',
        price: 960,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Japan_Airlines_Logo_%282011%29.svg/200px-Japan_Airlines_Logo_%282011%29.svg.png'
    },

    // Hamburg to Tokyo
    {
        id: 34,
        airline: 'Lufthansa',
        flightNumber: 'LH716',
        departureTime: '14:00',
        arrivalTime: '09:30',
        duration: '11h 30m',
        origin: 'Hamburg',
        destination: 'Tokio',
        price: 990,
        type: '1 Stop',
        logo: '/images/airlines/lufthansa.png'
    },

    // Wien to Tokyo
    {
        id: 44,
        airline: 'Austrian Airlines',
        flightNumber: 'OS51',
        departureTime: '11:00',
        arrivalTime: '06:45',
        duration: '11h 45m',
        origin: 'Wien',
        destination: 'Tokio',
        price: 1000,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // Frankfurt to Sydney
    {
        id: 9,
        airline: 'Qantas',
        flightNumber: 'QF6',
        departureTime: '09:50',
        arrivalTime: '17:55',
        duration: '22h 05m',
        origin: 'Frankfurt',
        destination: 'Sydney',
        price: 1200,
        type: '1 Stop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Qantas_Airways_logo_2016.svg/200px-Qantas_Airways_logo_2016.svg.png'
    },
    {
        id: 10,
        airline: 'Emirates',
        flightNumber: 'EK48',
        departureTime: '15:15',
        arrivalTime: '06:05',
        duration: '23h 50m',
        origin: 'Frankfurt',
        destination: 'Sydney',
        price: 1150,
        type: '1 Stop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png'
    },

    // München to Sydney
    {
        id: 15,
        airline: 'Qantas',
        flightNumber: 'QF10',
        departureTime: '10:00',
        arrivalTime: '18:30',
        duration: '22h 30m',
        origin: 'München',
        destination: 'Sydney',
        price: 1220,
        type: '1 Stop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Qantas_Airways_logo_2016.svg/200px-Qantas_Airways_logo_2016.svg.png'
    },

    // Berlin to Sydney
    {
        id: 25,
        airline: 'Emirates',
        flightNumber: 'EK52',
        departureTime: '16:00',
        arrivalTime: '07:00',
        duration: '23h 00m',
        origin: 'Berlin',
        destination: 'Sydney',
        price: 1180,
        type: '1 Stop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png'
    },

    // Hamburg to Sydney
    {
        id: 35,
        airline: 'Lufthansa',
        flightNumber: 'LH778',
        departureTime: '11:00',
        arrivalTime: '20:00',
        duration: '24h 00m',
        origin: 'Hamburg',
        destination: 'Sydney',
        price: 1250,
        type: '2 Stops',
        logo: '/images/airlines/lufthansa.png'
    },

    // Wien to Sydney
    {
        id: 45,
        airline: 'Austrian Airlines',
        flightNumber: 'OS803',
        departureTime: '12:00',
        arrivalTime: '21:30',
        duration: '23h 30m',
        origin: 'Wien',
        destination: 'Sydney',
        price: 1240,
        type: '1 Stop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // ===== RETURN FLIGHTS =====

    // New York to Frankfurt
    {
        id: 101,
        airline: 'Lufthansa',
        flightNumber: 'LH401',
        departureTime: '18:00',
        arrivalTime: '08:00',
        duration: '8h 00m',
        origin: 'New York',
        destination: 'Frankfurt',
        price: 460,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },
    {
        id: 102,
        airline: 'United Airlines',
        flightNumber: 'UA960',
        departureTime: '20:30',
        arrivalTime: '10:15',
        duration: '7h 45m',
        origin: 'New York',
        destination: 'Frankfurt',
        price: 430,
        type: 'Direct',
        logo: '/images/airlines/united.png'
    },

    // New York to München
    {
        id: 111,
        airline: 'Lufthansa',
        flightNumber: 'LH411',
        departureTime: '19:00',
        arrivalTime: '09:30',
        duration: '8h 30m',
        origin: 'New York',
        destination: 'München',
        price: 480,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },

    // New York to Berlin
    {
        id: 121,
        airline: 'United Airlines',
        flightNumber: 'UA961',
        departureTime: '21:00',
        arrivalTime: '11:15',
        duration: '8h 15m',
        origin: 'New York',
        destination: 'Berlin',
        price: 450,
        type: 'Direct',
        logo: '/images/airlines/united.png'
    },

    // New York to Hamburg
    {
        id: 131,
        airline: 'Lufthansa',
        flightNumber: 'LH421',
        departureTime: '22:00',
        arrivalTime: '12:00',
        duration: '8h 00m',
        origin: 'New York',
        destination: 'Hamburg',
        price: 470,
        type: '1 Stop',
        logo: '/images/airlines/lufthansa.png'
    },

    // New York to Wien
    {
        id: 141,
        airline: 'Austrian Airlines',
        flightNumber: 'OS88',
        departureTime: '19:30',
        arrivalTime: '10:00',
        duration: '8h 30m',
        origin: 'New York',
        destination: 'Wien',
        price: 490,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // Paris to Frankfurt
    {
        id: 103,
        airline: 'Air France',
        flightNumber: 'AF102',
        departureTime: '19:00',
        arrivalTime: '20:15',
        duration: '1h 15m',
        origin: 'Paris',
        destination: 'Frankfurt',
        price: 125,
        type: 'Direct',
        logo: '/images/airlines/airfrance.png'
    },
    {
        id: 104,
        airline: 'Lufthansa',
        flightNumber: 'LH1031',
        departureTime: '21:00',
        arrivalTime: '22:15',
        duration: '1h 15m',
        origin: 'Paris',
        destination: 'Frankfurt',
        price: 135,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },

    // Paris to München
    {
        id: 112,
        airline: 'Air France',
        flightNumber: 'AF1824',
        departureTime: '20:00',
        arrivalTime: '21:30',
        duration: '1h 30m',
        origin: 'Paris',
        destination: 'München',
        price: 140,
        type: 'Direct',
        logo: '/images/airlines/airfrance.png'
    },

    // Paris to Berlin
    {
        id: 122,
        airline: 'Air France',
        flightNumber: 'AF1236',
        departureTime: '18:30',
        arrivalTime: '20:15',
        duration: '1h 45m',
        origin: 'Paris',
        destination: 'Berlin',
        price: 130,
        type: 'Direct',
        logo: '/images/airlines/airfrance.png'
    },

    // Paris to Hamburg
    {
        id: 132,
        airline: 'Lufthansa',
        flightNumber: 'LH2041',
        departureTime: '19:30',
        arrivalTime: '21:00',
        duration: '1h 30m',
        origin: 'Paris',
        destination: 'Hamburg',
        price: 145,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },

    // Paris to Wien
    {
        id: 142,
        airline: 'Austrian Airlines',
        flightNumber: 'OS412',
        departureTime: '20:00',
        arrivalTime: '21:45',
        duration: '1h 45m',
        origin: 'Paris',
        destination: 'Wien',
        price: 150,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // London to Frankfurt
    {
        id: 105,
        airline: 'British Airways',
        flightNumber: 'BA902',
        departureTime: '17:30',
        arrivalTime: '20:15',
        duration: '1h 45m',
        origin: 'London',
        destination: 'Frankfurt',
        price: 155,
        type: 'Direct',
        logo: '/images/airlines/ba.png'
    },
    {
        id: 106,
        airline: 'Lufthansa',
        flightNumber: 'LH901',
        departureTime: '19:00',
        arrivalTime: '21:45',
        duration: '1h 45m',
        origin: 'London',
        destination: 'Frankfurt',
        price: 165,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },

    // London to München
    {
        id: 113,
        airline: 'British Airways',
        flightNumber: 'BA964',
        departureTime: '18:00',
        arrivalTime: '21:00',
        duration: '2h 00m',
        origin: 'London',
        destination: 'München',
        price: 160,
        type: 'Direct',
        logo: '/images/airlines/ba.png'
    },

    // London to Berlin
    {
        id: 123,
        airline: 'British Airways',
        flightNumber: 'BA984',
        departureTime: '17:00',
        arrivalTime: '20:00',
        duration: '2h 00m',
        origin: 'London',
        destination: 'Berlin',
        price: 150,
        type: 'Direct',
        logo: '/images/airlines/ba.png'
    },

    // London to Hamburg
    {
        id: 133,
        airline: 'Lufthansa',
        flightNumber: 'LH911',
        departureTime: '18:30',
        arrivalTime: '21:30',
        duration: '2h 00m',
        origin: 'London',
        destination: 'Hamburg',
        price: 170,
        type: 'Direct',
        logo: '/images/airlines/lufthansa.png'
    },

    // London to Wien
    {
        id: 143,
        airline: 'Austrian Airlines',
        flightNumber: 'OS452',
        departureTime: '19:00',
        arrivalTime: '22:30',
        duration: '2h 30m',
        origin: 'London',
        destination: 'Wien',
        price: 175,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // Tokyo to Frankfurt
    {
        id: 107,
        airline: 'ANA',
        flightNumber: 'NH203',
        departureTime: '09:30',
        arrivalTime: '15:55',
        duration: '12h 25m',
        origin: 'Tokio',
        destination: 'Frankfurt',
        price: 970,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/All_Nippon_Airways_Logo.svg/200px-All_Nippon_Airways_Logo.svg.png'
    },
    {
        id: 108,
        airline: 'JAL',
        flightNumber: 'JL407',
        departureTime: '17:40',
        arrivalTime: '22:55',
        duration: '11h 15m',
        origin: 'Tokio',
        destination: 'Frankfurt',
        price: 990,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Japan_Airlines_Logo_%282011%29.svg/200px-Japan_Airlines_Logo_%282011%29.svg.png'
    },

    // Tokyo to München
    {
        id: 114,
        airline: 'ANA',
        flightNumber: 'NH219',
        departureTime: '10:00',
        arrivalTime: '16:30',
        duration: '12h 30m',
        origin: 'Tokio',
        destination: 'München',
        price: 980,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/All_Nippon_Airways_Logo.svg/200px-All_Nippon_Airways_Logo.svg.png'
    },

    // Tokyo to Berlin
    {
        id: 124,
        airline: 'JAL',
        flightNumber: 'JL413',
        departureTime: '11:00',
        arrivalTime: '17:15',
        duration: '12h 15m',
        origin: 'Tokio',
        destination: 'Berlin',
        price: 970,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Japan_Airlines_Logo_%282011%29.svg/200px-Japan_Airlines_Logo_%282011%29.svg.png'
    },

    // Tokyo to Hamburg
    {
        id: 134,
        airline: 'Lufthansa',
        flightNumber: 'LH717',
        departureTime: '12:00',
        arrivalTime: '18:30',
        duration: '12h 30m',
        origin: 'Tokio',
        destination: 'Hamburg',
        price: 1000,
        type: '1 Stop',
        logo: '/images/airlines/lufthansa.png'
    },

    // Tokyo to Wien
    {
        id: 144,
        airline: 'Austrian Airlines',
        flightNumber: 'OS52',
        departureTime: '09:00',
        arrivalTime: '15:45',
        duration: '12h 45m',
        origin: 'Tokio',
        destination: 'Wien',
        price: 1010,
        type: 'Direct',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    },

    // Sydney to Frankfurt
    {
        id: 109,
        airline: 'Qantas',
        flightNumber: 'QF5',
        departureTime: '20:50',
        arrivalTime: '05:55',
        duration: '23h 05m',
        origin: 'Sydney',
        destination: 'Frankfurt',
        price: 1220,
        type: '1 Stop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Qantas_Airways_logo_2016.svg/200px-Qantas_Airways_logo_2016.svg.png'
    },
    {
        id: 110,
        airline: 'Emirates',
        flightNumber: 'EK49',
        departureTime: '22:15',
        arrivalTime: '06:05',
        duration: '21h 50m',
        origin: 'Sydney',
        destination: 'Frankfurt',
        price: 1180,
        type: '1 Stop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png'
    },

    // Sydney to München
    {
        id: 115,
        airline: 'Qantas',
        flightNumber: 'QF11',
        departureTime: '21:00',
        arrivalTime: '07:30',
        duration: '22h 30m',
        origin: 'Sydney',
        destination: 'München',
        price: 1240,
        type: '1 Stop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Qantas_Airways_logo_2016.svg/200px-Qantas_Airways_logo_2016.svg.png'
    },

    // Sydney to Berlin
    {
        id: 125,
        airline: 'Emirates',
        flightNumber: 'EK53',
        departureTime: '23:00',
        arrivalTime: '08:00',
        duration: '23h 00m',
        origin: 'Sydney',
        destination: 'Berlin',
        price: 1190,
        type: '1 Stop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png'
    },

    // Sydney to Hamburg
    {
        id: 135,
        airline: 'Lufthansa',
        flightNumber: 'LH779',
        departureTime: '22:00',
        arrivalTime: '09:00',
        duration: '25h 00m',
        origin: 'Sydney',
        destination: 'Hamburg',
        price: 1260,
        type: '2 Stops',
        logo: '/images/airlines/lufthansa.png'
    },

    // Sydney to Wien
    {
        id: 145,
        airline: 'Austrian Airlines',
        flightNumber: 'OS804',
        departureTime: '21:30',
        arrivalTime: '08:00',
        duration: '24h 30m',
        origin: 'Sydney',
        destination: 'Wien',
        price: 1250,
        type: '1 Stop',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Austrian_Airlines_logo_2018.svg/200px-Austrian_Airlines_logo_2018.svg.png'
    }
];

export const baggageOptions = [
    { id: 'carry-on', name: 'Handgepäck', size: '55x40x23 cm', price: 0 },
    { id: 'checked-23', name: 'Aufgabegepäck 23kg', size: 'Summe der Maße max. 158 cm', price: 50 },
    { id: 'checked-32', name: 'Aufgabegepäck 32kg', size: 'Summe der Maße max. 158 cm', price: 80 },
];

export const seatOptions = [
    { id: 'no-seat', name: 'Kein Sitzplatz', description: 'Zufällige Zuweisung beim Check-in', price: 0 },
    { id: 'standard', name: 'Standard-Sitzplatz', description: 'Wählen Sie Ihren bevorzugten Sitz', price: 15 },
    { id: 'extra-legroom', name: 'Extra Beinfreiheit', description: 'Mehr Platz und Komfort', price: 35 },
    { id: 'business', name: 'Business Class Upgrade', description: 'Premium-Komfort und Service', price: 150 },
];
