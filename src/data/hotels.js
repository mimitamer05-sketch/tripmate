export const hotels = [
    // New York
    {
        id: 1,
        name: 'The Plaza',
        city: 'New York',
        stars: 5,
        price: 950,
        image: '/images/hotels/plaza-exterior.jpg',
        description: 'Ikonisches Luxushotel am Central Park.',
        amenities: ['Wlan', 'Spa', 'Afternoon Tea', 'Concierge'],
        coordinates: [40.7644, -73.9745],
        reviews: [
            { user: 'Anna S.', rating: 5, text: 'Ein absoluter Traum!' }
        ],
        images: [
            '/images/hotels/plaza-exterior.jpg',
            '/images/hotels/plaza-room.jpg',
            '/images/hotels/plaza-lounge.jpg',
            '/images/hotels/plaza-palm-court.jpg'
        ]
    },
    {
        id: 2,
        name: 'The Standard, High Line',
        city: 'New York',
        stars: 4,
        price: 450,
        image: '/images/hotels/standard-highline-exterior.jpg',
        description: 'Angesagtes Hotel im Meatpacking District mit toller Aussicht.',
        amenities: ['Wlan', 'Rooftop Bar', 'Fitnessstudio', 'Fahrradverleih'],
        coordinates: [40.7420, -74.0080],
        reviews: [
            { user: 'Lisa M.', rating: 5, text: 'Unglaubliche Aussicht!' }
        ],
        images: [
            '/images/hotels/standard-highline-exterior.jpg',
            '/images/hotels/standard-highline-room-1.jpg',
            '/images/hotels/standard-highline-room-2.jpg',
            '/images/hotels/standard-highline-bar.jpg'
        ]
    },
    {
        id: 3,
        name: 'Hyatt Place New York/Midtown-South',
        city: 'New York',
        stars: 3,
        price: 220,
        image: '/images/hotels/hyatt-nyc-exterior.jpg',
        description: 'Modernes Hotel in zentraler Lage, perfekt für Sightseeing.',
        amenities: ['Wlan', 'Frühstück', 'Fitnessstudio', 'Business Center'],
        coordinates: [40.7489, -73.9897],
        reviews: [
            { user: 'Max T.', rating: 4, text: 'Unschlagbare Lage.' }
        ],
        images: [
            '/images/hotels/hyatt-nyc-exterior.jpg',
            '/images/hotels/hyatt-nyc-room.jpg',
            '/images/hotels/hyatt-nyc-bathroom.jpg'
        ]
    },
    // Paris
    {
        id: 10,
        name: "ibis budget Paris Porte d'Aubervilliers",
        city: 'Paris',
        stars: 2,
        price: 65,
        image: '/images/hotels/ibis-aubervilliers-exterior.jpg',
        description: 'Günstiges Hotel im Norden von Paris, ideal für preisbewusste Reisende.',
        amenities: ['Wlan', 'Frühstück', 'Parkplatz', '24h Rezeption'],
        coordinates: [40.9145, 2.3823],
        reviews: [
            { user: 'Thomas M.', rating: 4, text: 'Sauber und praktisch.' }
        ],
        images: [
            '/images/hotels/ibis-aubervilliers-exterior.jpg',
            '/images/hotels/ibis-aubervilliers-room-bunk.jpg',
            '/images/hotels/ibis-aubervilliers-room-tv.jpg',
            '/images/hotels/ibis-aubervilliers-bathroom.jpg',
            '/images/hotels/ibis-aubervilliers-room-top.jpg'
        ]
    },
    {
        id: 11,
        name: 'Hotel Panache',
        city: 'Paris',
        stars: 4,
        price: 250,
        image: '/images/hotels/panache-exterior.jpg',
        description: 'Ein charmantes Boutique-Hotel im lebendigen 9. Arrondissement.',
        coordinates: [48.8750, 2.3422],
        amenities: ['Wlan', 'Bar', 'Restaurant'],
        reviews: [
            { user: 'Marc L.', rating: 4, text: 'Sehr stilvoll und gemütlich.' }
        ],
        images: [
            '/images/hotels/panache-exterior.jpg',
            '/images/hotels/panache-room-blue.jpg',
            '/images/hotels/panache-lounge.jpg',
            '/images/hotels/panache-room-pattern.jpg'
        ]
    },
    {
        id: 12,
        name: 'JO&JOE Paris Gentilly',
        city: 'Paris',
        stars: 3,
        price: 80,
        image: '/images/hotels/jojoe-exterior.jpg',
        description: 'Ein lebendiges Open House für alle, die das Miteinander lieben.',
        coordinates: [48.8156, 2.3522],
        amenities: ['Wlan', 'Bar', 'Garten', 'Küche'],
        reviews: [
            { user: 'Claire M.', rating: 5, text: 'Super cool und entspannt.' }
        ],
        images: [
            '/images/hotels/jojoe-exterior.jpg',
            '/images/hotels/jojoe-room.jpg',
            '/images/hotels/jojoe-dorm.jpg',
            '/images/hotels/jojoe-bar.jpg',
            '/images/hotels/jojoe-garden.jpg'
        ]
    },
    // London
    {
        id: 7,
        name: 'The Savoy',
        city: 'London',
        stars: 5,
        price: 650,
        image: '/images/hotels/savoy-user-1.jpg',
        description: 'Ein ikonisches Luxushotel direkt an der Themse.',
        coordinates: [51.5127, -0.1358],
        amenities: ['Wlan', 'Pool', 'Spa', 'Bar'],
        reviews: [
            { user: 'James B.', rating: 5, text: 'Exzellenter Service.' }
        ],
        images: [
            '/images/hotels/savoy-user-1.jpg',
            '/images/hotels/savoy-user-2.jpg',
            '/images/hotels/savoy-user-3.jpg',
            '/images/hotels/savoy-user-4.jpg',
            '/images/hotels/savoy-user-5.jpg'
        ]
    },
    {
        id: 8,
        name: 'The Zetter Townhouse Clerkenwell',
        city: 'London',
        stars: 4,
        price: 280,
        image: '/images/hotels/zetter-room.jpg',
        description: 'Ein exzentrisches Boutique-Hotel in Clerkenwell.',
        coordinates: [51.5152, -0.1201],
        amenities: ['Wlan', 'Bar', 'Frühstück'],
        reviews: [
            { user: 'Sarah L.', rating: 5, text: 'Einzigartiges Erlebnis.' }
        ],
        images: [
            '/images/hotels/zetter-room.jpg',
            '/images/hotels/zetter-dining.jpg',
            '/images/hotels/zetter-lounge.jpg'
        ]
    },
    {
        id: 9,
        name: 'ibis Styles London Gloucester Road',
        city: 'London',
        stars: 3,
        price: 120,
        image: '/images/hotels/ibis-gloucester-exterior.jpg',
        description: 'Modernes 3-Sterne-Hotel direkt an der U-Bahn-Station Gloucester Road.',
        coordinates: [51.5021, -0.1303],
        amenities: ['Wlan', 'Frühstück', 'Bar', '24h Rezeption'],
        reviews: [
            { user: 'Emma K.', rating: 4, text: 'Tolle Lage und gutes Preis-Leistungs-Verhältnis!' }
        ],
        images: [
            '/images/hotels/ibis-gloucester-exterior.jpg',
            '/images/hotels/ibis-gloucester-room.jpg',
            '/images/hotels/ibis-gloucester-lounge.jpg',
            '/images/hotels/ibis-gloucester-dining.jpg'
        ]
    },
    // Tokyo
    {
        id: 10,
        name: 'Park Hyatt Tokyo',
        city: 'Tokio',
        stars: 5,
        price: 800,
        image: '/images/hotels/park-hyatt-exterior.jpg',
        description: 'Luxus über den Wolken von Shinjuku.',
        coordinates: [35.6719, 139.6421],
        amenities: ['Wlan', 'Pool', 'Jazz Bar', 'Spa'],
        reviews: [{ user: 'Kenji T.', rating: 5, text: 'Unvergesslich.' }],
        images: [
            '/images/hotels/park-hyatt-exterior.jpg',
            '/images/hotels/park-hyatt-room.jpg',
            '/images/hotels/park-hyatt-lounge.jpg'
        ]
    },
    {
        id: 11,
        name: 'TRUNK (HOTEL)',
        city: 'Tokio',
        stars: 4,
        price: 350,
        image: '/images/hotels/trunk-room.jpg',
        description: 'Modernes, umweltbewusstes Design-Hotel in Shibuya.',
        coordinates: [35.6730, 139.6482],
        amenities: ['Wlan', 'Bar', 'Dachterrasse'],
        reviews: [{ user: 'Mike R.', rating: 5, text: 'Super stylisch.' }],
        images: [
            '/images/hotels/trunk-room.jpg',
            '/images/hotels/trunk-bathroom.jpg',
            '/images/hotels/trunk-terrace.jpg'
        ]
    },
    {
        id: 12,
        name: 'APA Hotel Yamanote Otsuka Ekimae Tower',
        city: 'Tokio',
        stars: 3,
        price: 90,
        image: '/images/hotels/apa-otsuka-exterior.jpg',
        description: 'Funktionales Hotel mit Onsen, direkt am Bahnhof Otsuka.',
        coordinates: [35.6716, 139.6574],
        amenities: ['Wlan', 'Onsen', 'Restaurant', '24h Rezeption'],
        reviews: [{ user: 'Yuki S.', rating: 4, text: 'Praktisch und sauber.' }],
        images: [
            '/images/hotels/apa-otsuka-exterior.jpg',
            '/images/hotels/apa-otsuka-lobby.jpg',
            '/images/hotels/apa-otsuka-room.jpg',
            '/images/hotels/apa-otsuka-bathroom.jpg'
        ]
    },
    // Sydney
    {
        id: 13,
        name: 'The Sydney Boulevard Hotel',
        city: 'Sydney',
        stars: 4,
        price: 180,
        image: '/images/hotels/boulevard-exterior.jpg',
        description: 'Komfortables Hotel mit herrlichem Blick auf den Hafen und die Skyline.',
        coordinates: [-33.8602, 151.2107],
        amenities: ['Wlan', 'Restaurant', 'Bar', 'Fitnessstudio'],
        reviews: [{ user: 'Emma W.', rating: 4, text: 'Tolle Aussicht.' }],
        images: [
            '/images/hotels/boulevard-exterior.jpg',
            '/images/hotels/boulevard-room-view.jpg',
            '/images/hotels/boulevard-room-twin.jpg',
            '/images/hotels/boulevard-bathroom.jpg'
        ]
    },
    {
        id: 14,
        name: 'Peppers Manly Beach',
        city: 'Sydney',
        stars: 4,
        price: 220,
        image: '/images/hotels/peppers-exterior.jpg',
        description: 'Stilvolles Hotel direkt am berühmten Manly Beach.',
        coordinates: [-33.8677, 151.2051],
        amenities: ['Wlan', 'Pool', 'Strandnähe', 'Balkon'],
        reviews: [{ user: 'Liam N.', rating: 5, text: 'Perfekter Strandurlaub.' }],
        images: [
            '/images/hotels/peppers-exterior.jpg',
            '/images/hotels/peppers-room-view.jpg',
            '/images/hotels/peppers-room-green.jpg',
            '/images/hotels/peppers-lounge.jpg'
        ]
    },
    {
        id: 15,
        name: 'Meriton Suites North Sydney',
        city: 'Sydney',
        stars: 5,
        price: 300,
        image: '/images/hotels/meriton-north-sydney-exterior.jpg',
        description: 'Moderne Suiten mit atemberaubendem Blick auf den Hafen.',
        coordinates: [-33.8640, 151.2170],
        amenities: ['Wlan', 'Pool', 'Fitnessstudio', 'Küche'],
        reviews: [{ user: 'Noah K.', rating: 5, text: 'Fantastische Aussicht und viel Platz.' }],
        images: [
            '/images/hotels/meriton-north-sydney-exterior.jpg',
            '/images/hotels/meriton-north-sydney-room.jpg',
            '/images/hotels/meriton-north-sydney-bathroom.jpg'
        ]
    }
];
