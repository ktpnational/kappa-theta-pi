'use client';

import {
  type ChapterInfo,
  // MapStyles,
  chapters,
} from '@/data/map';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';
import { APIProvider, AdvancedMarker, InfoWindow, Map, useMap } from '@vis.gl/react-google-maps';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

/**
 * Geographic boundaries for North America.
 * Used to restrict map panning and marker placement.
 * @typedef {Object} NorthAmericaBounds 
 * @property {number} north - Northern limit (Northern Canada) in decimal degrees
 * @property {number} south - Southern limit (Southern Mexico) in decimal degrees
 * @property {number} west - Western limit (Alaska westernmost point) in decimal degrees
 * @property {number} east - Eastern limit (Newfoundland easternmost point) in decimal degrees
 */
const NORTH_AMERICA_BOUNDS = {
  /** Northern limit (Northern Canada) */
  north: 71.5388001,
  /** Southern limit (Southern Mexico) */
  south: 15.7835, 
  /** Western limit (Alaska westernmost point) */
  west: -167.2764,
  /** Eastern limit (Newfoundland easternmost point) */
  east: -52.648
};

/**
 * Approximate center coordinates of North America
 * @typedef {Object} MapCenter
 * @property {number} lat - Latitude in decimal degrees
 * @property {number} lng - Longitude in decimal degrees
 */
const DEFAULT_CENTER = { lat: 48.1667, lng: -100.1667 };

/**
 * Main Google Maps component that renders the map and chapter markers.
 * Uses the Google Maps JavaScript API to display an interactive map of North America
 * with chapter locations marked and clustered.
 * 
 * @component
 * @returns {JSX.Element} React component containing the Google Map implementation with markers
 * @example
 * return (
 *   <GoogleMaps />
 * )
 */
export const GoogleMaps = memo(() => {
  return (
    <section className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative rounded-lg overflow-hidden shadow-lg">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={3}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          restriction={{
            latLngBounds: NORTH_AMERICA_BOUNDS,
            strictBounds: true,
          }}
          minZoom={2}
          maxZoom={15}
        >
          <Markers chapters={chapters} />
        </Map>
      </APIProvider>
    </section>
  );
});

/** 
 * Props interface for Markers component
 * @typedef {Object} MarkersProps
 * @property {Object} chapters - Object containing arrays of chapter information
 * @property {ChapterInfo[]} chapters.active - Array of active chapters
 * @property {ChapterInfo[]} chapters.colony - Array of colony chapters
 * @property {ChapterInfo[]} chapters.inactive - Array of inactive chapters
 */
type Props = { chapters: typeof chapters };

/**
 * Component that handles the rendering and management of map markers.
 * Implements marker clustering and interactive info windows.
 * 
 * @component
 * @param {MarkersProps} props - Component props
 * @param {Object} props.chapters - Object containing arrays of chapter information
 * @returns {JSX.Element} React component containing marker and info window elements
 */
const Markers: React.FC<Props> = ({ chapters }) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const clusterer = useRef<MarkerClusterer | null>(null);

  /**
   * Combines all chapter types and filters to include only those within North America bounds.
   * Uses memoization to prevent unnecessary recalculations.
   * 
   * @type {ChapterInfo[]}
   */
  const allChapters = useMemo(() => {
    const combined = [...chapters.active, ...chapters.colony, ...chapters.inactive];
    return combined.filter((chapter) => {
      const [lat, lng] = chapter.coordinates;
      return (
        lat <= NORTH_AMERICA_BOUNDS.north &&
        lat >= NORTH_AMERICA_BOUNDS.south &&
        lng >= NORTH_AMERICA_BOUNDS.west &&
        lng <= NORTH_AMERICA_BOUNDS.east
      );
    });
  }, [chapters]);

  /**
   * Initializes the marker clusterer when map is ready.
   * Configures cluster appearance and behavior.
   * 
   * @effect
   */
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({
        map,
        renderer: {
          render: ({ count, position }) =>
            new google.maps.Marker({
              label: {
                text: String(count),
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 'bold',
              },
              position,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 22,
                fillColor: '#234c8b',
                fillOpacity: 0.9,
                strokeColor: '#8bb9ff',
                strokeWeight: 2,
              },
              zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
            }),
        },
      });
    }
  }, [map]);

  /**
   * Updates clusterer when markers change.
   * Clears existing markers and adds updated ones.
   * 
   * @effect
   */
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  /**
   * Manages marker references for clustering.
   * Updates marker state while avoiding unnecessary re-renders.
   * 
   * @param {Marker | null} marker - The marker instance to manage
   * @param {string} key - Unique identifier for the marker
   */
  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {allChapters.map((chapter) => (
        <AdvancedMarker
          position={{ lat: chapter.coordinates[0], lng: chapter.coordinates[1] }}
          key={chapter.name}
          ref={(marker) => setMarkerRef(marker, chapter.name)}
          onClick={() => setActiveMarker(chapter.name)}
        >
          <motion.div
            style={{
              backgroundColor: getMarkerColor(chapter.status).split(' ')[0],
              color: getMarkerColor(chapter.status).split(' ')[1],
              padding: '0.5rem',
              borderRadius: '50%',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaMapMarkerAlt size={20} />
          </motion.div>
        </AdvancedMarker>
      ))}
      <AnimatePresence>
        {activeMarker && (
          <InfoWindow
            position={{
              lat:
                allChapters.find((chapter) => chapter.name === activeMarker)?.coordinates[0] || 0,
              lng:
                allChapters.find((chapter) => chapter.name === activeMarker)?.coordinates[1] || 0,
            }}
            onCloseClick={() => setActiveMarker(null)}
          >
            <ChapterInfo chapter={allChapters.find((chapter) => chapter.name === activeMarker)!} />
          </InfoWindow>
        )}
      </AnimatePresence>
    </>
  );
};

/**
 * Determines marker color based on chapter status.
 * Returns Tailwind CSS classes for styling markers.
 * 
 * @param {ChapterInfo['status']} status - Chapter status (Active, Colony, or Inactive)
 * @returns {string} Space-separated string of Tailwind CSS classes for background and text colors
 */
const getMarkerColor = (status: ChapterInfo['status']) => {
  switch (status) {
    case 'Active':
      return 'bg-[#234c8b] text-[#8bb9ff]';
    case 'Colony':
      return 'bg-[#8bb9ff] text-[#234c8b]';
    case 'Inactive':
      return 'bg-gray-400 text-white';
  }
};

/**
 * Component that displays detailed chapter information in an info window.
 * Uses Framer Motion for animations.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {ChapterInfo} props.chapter - Chapter information object containing details to display
 * @returns {JSX.Element} Animated div containing formatted chapter information
 */
const ChapterInfo: React.FC<{ chapter: ChapterInfo }> = ({ chapter }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    style={{
      backgroundColor: '#234c8b',
      color: '#8bb9ff',
      padding: '1rem',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      maxWidth: '20rem',
    }}
  >
    <h3 className="text-lg font-bold mb-2">
      {chapter.greekName} - {chapter.name} Chapter
    </h3>
    <p className="text-sm mb-1">
      <strong>University:</strong> {chapter.university}
    </p>
    <p className="text-sm mb-1">
      <strong>Location:</strong> {chapter.location}
    </p>
    <p className="text-sm mb-1">
      <strong>Founded:</strong> {chapter.foundingDate}
    </p>
    <p className="text-sm mb-1">
      <strong>Status:</strong> {chapter.status}
    </p>
    {chapter.notes && <p className="text-sm mt-2 italic">{chapter.notes}</p>}
  </motion.div>
);
