'use client';

import { type ChapterInfo, MapStyles, chapters } from '@/data/map';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';
import { APIProvider, AdvancedMarker, InfoWindow, Map, useMap } from '@vis.gl/react-google-maps';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

export const GoogleMaps: React.FC = memo(() => {
  return (
    <section className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative rounded-lg overflow-hidden shadow-lg">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          defaultCenter={{ lat: 40.73061, lng: -73.935242 }}
          defaultZoom={4}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          styles={MapStyles}
        >
          <Markers chapters={chapters} />
        </Map>
      </APIProvider>
    </section>
  );
});

type Props = { chapters: typeof chapters };

const Markers: React.FC<Props> = ({ chapters }) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const clusterer = useRef<MarkerClusterer | null>(null);

  const allChapters = useMemo(
    () => [...chapters.active, ...chapters.colony, ...chapters.inactive],
    [chapters],
  );

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

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

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
