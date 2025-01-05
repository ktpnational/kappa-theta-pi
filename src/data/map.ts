export type RawPlace = [string, string, number, number];

/**
 * @description The places on the map.
 * @param {string} title
 * @param {string} description
 * @param {number} lat
 * @param {number} lng
 */
const places: RawPlace[] = [['<title>', '<description>', 0, 0]];

/**
 * @description The styles for the map.
 * @returns {google.maps.MapTypeStyle[]}
 */
const MapStyles: google.maps.MapTypeStyle[] = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#e8f0ff' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#a3d1ff' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#d1e5ff' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#ffd580' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#fff0b3' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#c1d9ff' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#b3ccff' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#90b3ff' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#234c8b' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#ffffff' }],
  },
];

export { places, MapStyles };

export type ChapterInfo = {
  name: string;
  greekName: string;
  foundingDate: string;
  university: string;
  location: string;
  status: 'Active' | 'Colony' | 'Inactive';
  notes?: string;
  coordinates: [number, number];
};

export type ChapterGroup = {
  active: ChapterInfo[];
  colony: ChapterInfo[];
  inactive: ChapterInfo[];
};

/**
 * @description The chapters on the map.
 * @returns {ChapterGroup}
 */
export const chapters: ChapterGroup = {
  active: [
    {
      name: 'Alpha',
      greekName: 'Α',
      foundingDate: 'January 10, 2012',
      university: 'University of Michigan',
      location: 'Ann Arbor, Michigan',
      status: 'Active',
      notes: 'Founding chapter',
      coordinates: [42.2808, -83.743],
    },
    {
      name: 'Beta',
      greekName: 'Β',
      foundingDate: 'pre-2016',
      university: 'University of Pittsburgh',
      location: 'Pittsburgh, Pennsylvania',
      status: 'Active',
      coordinates: [40.4444, -79.9609],
    },
    {
      name: 'Gamma',
      greekName: 'Γ',
      foundingDate: 'pre-2016',
      university: 'Rose-Hulman Institute of Technology',
      location: 'Terre Haute, Indiana',
      status: 'Active',
      coordinates: [39.4827, -87.3236],
    },
    {
      name: 'Delta',
      greekName: 'Δ',
      foundingDate: 'November 9, 2017',
      university: 'Syracuse University',
      location: 'Syracuse, New York',
      status: 'Active',
      coordinates: [43.0392, -76.1351],
    },
    {
      name: 'Epsilon',
      greekName: 'Ε',
      foundingDate: 'November 8, 2017',
      university: 'University of Maryland',
      location: 'College Park, Maryland',
      status: 'Active',
      coordinates: [38.9869, -76.9426],
    },
    {
      name: 'Zeta',
      greekName: 'Ζ',
      foundingDate: 'November 7, 2019',
      university: 'The College of New Jersey',
      location: 'Ewing, New Jersey',
      status: 'Active',
      coordinates: [40.2695, -74.7819],
    },
    {
      name: 'Eta',
      greekName: 'Η',
      foundingDate: 'June 2020',
      university: 'University of North Carolina at Chapel Hill',
      location: 'Chapel Hill, North Carolina',
      status: 'Active',
      coordinates: [35.9049, -79.0469],
    },
    {
      name: 'Theta',
      greekName: 'Θ',
      foundingDate: 'November 7, 2020',
      university: 'University of Chicago',
      location: 'Chicago, Illinois',
      status: 'Active',
      coordinates: [41.7886, -87.5987],
    },
    {
      name: 'Iota',
      greekName: 'Ι',
      foundingDate: 'March 9, 2022',
      university: 'University of Texas at Austin',
      location: 'Austin, Texas',
      status: 'Active',
      coordinates: [30.2849, -97.7341],
    },
    {
      name: 'Kappa',
      greekName: 'Κ',
      foundingDate: 'August 2, 2022',
      university: 'Northwestern University',
      location: 'Evanston, Illinois',
      status: 'Active',
      coordinates: [42.0565, -87.6753],
    },
    {
      name: 'Lambda',
      greekName: 'Λ',
      foundingDate: 'October 27, 2022',
      university: 'Boston University',
      location: 'Boston, Massachusetts',
      status: 'Active',
      coordinates: [42.3505, -71.1054],
    },
    {
      name: 'Mu',
      greekName: 'Μ',
      foundingDate: 'April 30, 2023',
      university: 'University of Texas at Dallas',
      location: 'Richardson, Texas',
      status: 'Active',
      coordinates: [32.9854, -96.7501],
    },
    {
      name: 'Nu',
      greekName: 'Ν',
      foundingDate: 'March 20, 2023',
      university: 'University of Colorado Boulder',
      location: 'Boulder, Colorado',
      status: 'Active',
      coordinates: [40.0076, -105.2659],
    },
    {
      name: 'Rho',
      greekName: 'Ρ',
      foundingDate: 'April 26, 2023',
      university: 'Vanderbilt University',
      location: 'Nashville, Tennessee',
      status: 'Active',
      coordinates: [36.1447, -86.8027],
    },
    {
      name: 'Sigma',
      greekName: 'Σ',
      foundingDate: 'August 30, 2023',
      university: 'University of Miami',
      location: 'Coral Gables, Florida',
      status: 'Active',
      coordinates: [25.7214, -80.2788],
    },
    {
      name: 'Tau',
      greekName: 'Τ',
      foundingDate: 'April 6, 2023',
      university: 'University of Southern California',
      location: 'Los Angeles, California',
      status: 'Active',
      coordinates: [34.0224, -118.2851],
    },
    {
      name: 'Upsilon',
      greekName: 'Υ',
      foundingDate: 'Colony Status',
      university: 'Lewis University',
      location: 'Romeoville, Illinois',
      status: 'Active',
      coordinates: [41.6056, -88.0823],
    },
    {
      name: 'Phi',
      greekName: 'Φ',
      foundingDate: 'Colony Status',
      university: 'University of Georgia',
      location: 'Athens, Georgia',
      status: 'Active',
      coordinates: [33.948, -83.3773],
    },
    {
      name: 'Chi',
      greekName: 'Χ',
      foundingDate: 'Colony Status',
      university: 'Nova Southeastern University',
      location: 'Fort Lauderdale, Florida',
      status: 'Active',
      coordinates: [26.0797, -80.2406],
    },
    {
      name: 'Psi',
      greekName: 'Ψ',
      foundingDate: 'Colony Status',
      university: 'Cameron University',
      location: 'Lawton, Oklahoma',
      status: 'Active',
      coordinates: [34.6145, -98.439],
    },
    {
      name: 'Omega',
      greekName: 'Ω',
      foundingDate: 'Colony Status',
      university: 'Northeastern University',
      location: 'Boston, Massachusetts',
      status: 'Active',
      coordinates: [42.3398, -71.0892],
    },
    {
      name: 'Alpha Alpha',
      greekName: 'ΑΑ',
      foundingDate: 'Colony Status',
      university: 'University of Central Arkansas',
      location: 'Conway, Arkansas',
      status: 'Active',
      coordinates: [35.0787, -92.4588],
    },
    {
      name: 'Alpha Beta',
      greekName: 'ΑΒ',
      foundingDate: 'Colony Status',
      university: 'Rutgers University',
      location: 'New Brunswick, New Jersey',
      status: 'Active',
      coordinates: [40.5008, -74.4474],
    },
    {
      name: 'Alpha Gamma',
      greekName: 'ΑΓ',
      foundingDate: 'Colony Status',
      university: 'Virginia Tech',
      location: 'Blacksburg, Virginia',
      status: 'Active',
      coordinates: [37.2284, -80.4234],
    },
  ],
  colony: [],
  inactive: [],
};
