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
 * @param {string} elementType
 * @param {string} color
 */
const MapStyles: {
  featureType?: string;
  elementType: string;
  stylers: { color: string }[];
}[] = [
  { elementType: 'geometry', stylers: [{ color: '#' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#' }],
  },
];

export { places, MapStyles };
