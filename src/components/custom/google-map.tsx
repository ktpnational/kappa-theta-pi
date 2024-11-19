'use client';

/**
 * @file google-map.tsx
 * @fileoverview A comprehensive Google Maps component for displaying chapter locations with clustering, filtering, and interactive markers.
 */

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { type ChapterInfo, chapters } from '@/data/map';
import { useToast } from '@/hooks/use-toast';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { APIProvider, InfoWindow, Map, useMap } from '@vis.gl/react-google-maps';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

/**
 * Color configurations for different chapter statuses
 * @type {Object.<string, {bg: string, text: string, badge: string}>}
 */
const MARKER_COLORS = {
  Active: { bg: '#234c8b', text: '#ffffff', badge: 'bg-[#234c8b]' },
  Colony: { bg: '#8bb9ff', text: '#234c8b', badge: 'bg-[#8bb9ff]' },
  Inactive: { bg: '#9ca3af', text: '#ffffff', badge: 'bg-gray-400' },
};

/**
 * Geographic bounds for North America to restrict map panning
 * @type {{north: number, south: number, west: number, east: number}}
 */
const NORTH_AMERICA_BOUNDS = {
  north: 71.5388001,
  south: 15.7835,
  west: -167.2764,
  east: -52.648,
};

/**
 * Default center coordinates for the map (center of USA)
 * @type {{lat: number, lng: number}}
 */
const DEFAULT_CENTER = { lat: 39.8283, lng: -98.5795 };

/**
 * Custom styling for the Google Map
 * @type {Array<google.maps.MapTypeStyle>}
 */
const MAP_STYLES = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#234c8b' }],
  },
];

/**
 * Main Google Maps component that displays chapter locations with filtering capabilities
 * @component
 * @returns {JSX.Element} Rendered Google Maps component
 */
export const GoogleMaps = memo(() => {
  const { toast } = useToast();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [mapZoom, setMapZoom] = useState(3);
  const [stats, setStats] = useState({ active: 0, colony: 0, inactive: 0 });
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Disables page scrolling when mouse enters map container
   */
  const disableScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  /**
   * Enables page scrolling when mouse leaves map container
   */
  const enableScroll = useCallback(() => {
    document.body.style.overflow = 'auto';
  }, []);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    container.addEventListener('mouseenter', disableScroll);
    container.addEventListener('mouseleave', enableScroll);

    return () => {
      container.removeEventListener('mouseenter', disableScroll);
      container.removeEventListener('mouseleave', enableScroll);
    };
  }, [disableScroll, enableScroll]);

  useEffect(() => {
    setStats({
      active: chapters.active.length,
      colony: chapters.colony.length,
      inactive: chapters.inactive.length,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Memoized map options for Google Maps configuration
   */
  const mapOptions = useMemo(
    () => ({
      gestureHandling: 'cooperative',
      scrollwheel: false,
      disableDefaultUI: true,
      styles: MAP_STYLES,
      restriction: {
        latLngBounds: NORTH_AMERICA_BOUNDS,
        strictBounds: true,
      },
      minZoom: 3,
      maxZoom: 15,
    }),
    [],
  );

  useEffect(() => {
    if (!isLoading) {
      toast({
        title: 'Map Controls',
        description: 'Use keyboard +/- or left click to zoom',
        duration: 5000,
      });
    }
  }, [isLoading, toast]);

  return (
    <Card className="w-full bg-white bg-opacity-80 backdrop-blur-md border-none">
      <CardContent className="p-6 space-y-6">
        {isLoading ? (
          <>
            <div className="flex flex-wrap justify-center gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-[150px] rounded-full" />
              ))}
            </div>
            <Skeleton className="w-full h-[600px] rounded-xl" />
          </>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'All Chapters', filter: 'All' },
                { label: 'Active Chapters', filter: 'Active' },
                { label: 'Colonies', filter: 'Colony' },
                { label: 'Inactive Chapters', filter: 'Inactive' },
              ].map((status) => (
                <motion.button
                  key={status.label}
                  className={`flex items-center px-4 py-2 rounded-full shadow-md ${
                    statusFilter === status.filter
                      ? 'bg-[#234c8b] text-white'
                      : 'bg-white text-[#234c8b]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStatusFilter(status.filter)}
                >
                  {status.filter !== 'All' && (
                    <span
                      className={`inline-block w-4 h-4 mr-2 rounded-full ${MARKER_COLORS[status.filter as keyof typeof MARKER_COLORS].badge}`}
                    ></span>
                  )}
                  {status.label} (
                  {status.filter === 'All'
                    ? stats.active + stats.colony + stats.inactive
                    : status.filter === 'Active'
                      ? stats.active
                      : status.filter === 'Colony'
                        ? stats.colony
                        : stats.inactive}
                  )
                </motion.button>
              ))}
            </div>
            <div className="relative">
              <div
                ref={mapContainerRef}
                className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl border border-gray-200"
              >
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                  <Map
                    defaultCenter={DEFAULT_CENTER}
                    zoom={mapZoom}
                    onCameraChanged={(ev) => setMapZoom(ev.detail.zoom)}
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
                    {...mapOptions}
                  >
                    <Markers chapters={chapters} statusFilter={statusFilter} mapZoom={mapZoom} />
                  </Map>
                </APIProvider>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
});

/**
 * Props interface for Markers component
 * @interface
 */
type MarkersProps = {
  chapters: typeof chapters;
  statusFilter: string;
  mapZoom: number;
};

/**
 * Component that handles the rendering and management of map markers and clustering
 * @component
 * @param {MarkersProps} props - Component props
 * @returns {JSX.Element} Rendered markers and info windows
 */
const Markers: React.FC<MarkersProps> = memo(({ chapters, statusFilter, mapZoom }) => {
  const map = useMap();
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const clusterer = useRef<MarkerClusterer | null>(null);

  /**
   * Filtered and processed chapters based on status filter and geographic bounds
   */
  const allChapters = useMemo(() => {
    const combined = [...chapters.active, ...chapters.colony, ...chapters.inactive];
    return combined.filter((chapter) => {
      const [lat, lng] = chapter.coordinates;
      const matchesFilter = statusFilter === 'All' || chapter.status === statusFilter;
      return (
        lat <= NORTH_AMERICA_BOUNDS.north &&
        lat >= NORTH_AMERICA_BOUNDS.south &&
        lng >= NORTH_AMERICA_BOUNDS.west &&
        lng <= NORTH_AMERICA_BOUNDS.east &&
        matchesFilter
      );
    });
  }, [chapters, statusFilter]);

  /**
   * Handles marker click events and toggles the active marker state
   * @param {string} markerName - Name of the clicked marker
   */
  const handleMarkerClick = useCallback((markerName: string) => {
    setActiveMarker((prev) => (prev === markerName ? null : markerName));
  }, []);

  useEffect(() => {
    if (!map) return;

    clusterer.current = new MarkerClusterer({
      map,
      markers: [],
      renderer: {
        render: ({ count, position }) => {
          const clusterMarker = new google.maps.marker.AdvancedMarkerElement({
            position,
            content: createClusterMarkerContent(count),
          });

          google.maps.event.addListener(clusterMarker, 'click', () => {
            const zoom = map.getZoom() || 0;
            map.setZoom(zoom + 1);
            map.setCenter(position);
          });

          return clusterMarker;
        },
      },
    });

    return () => {
      if (clusterer.current) {
        clusterer.current.clearMarkers();
        clusterer.current = null;
      }
    };
  }, [map]);

  useEffect(() => {
    if (!clusterer.current) return;

    const markers = allChapters.map((chapter) => {
      const { bg } = MARKER_COLORS[chapter.status];
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: chapter.coordinates[0], lng: chapter.coordinates[1] },
        content: createMarkerContent(bg),
      });
      google.maps.event.addListener(marker, 'click', () => handleMarkerClick(chapter.name));
      return marker;
    });

    clusterer.current.clearMarkers();
    clusterer.current.addMarkers(markers);
  }, [allChapters, mapZoom, handleMarkerClick]);

  return (
    <>
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
});

/**
 * Component that displays detailed information about a chapter in an info window
 * @component
 * @param {Object} props - Component props
 * @param {ChapterInfo} props.chapter - Chapter information to display
 * @returns {JSX.Element} Rendered chapter information card
 */
const ChapterInfo: React.FC<{ chapter: ChapterInfo }> = memo(({ chapter }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="bg-white text-gray-800 p-6 rounded-xl shadow-2xl max-w-sm"
  >
    <div className="flex items-center gap-2 mb-4">
      <Badge
        className={`${MARKER_COLORS[chapter.status as keyof typeof MARKER_COLORS].badge} text-sm px-3 py-1`}
      >
        {chapter.status}
      </Badge>
      <span className="text-gray-500 text-sm">
        <FaCalendarAlt className="inline mr-1" />
        Founded {chapter.foundingDate}
      </span>
    </div>
    <h3 className="text-xl font-bold mb-2 text-[#234c8b]">
      {chapter.greekName} - {chapter.name} Chapter
    </h3>
    <p className="text-sm mb-1">
      <strong>University:</strong> {chapter.university}
    </p>
    <p className="text-sm mb-1">
      <strong>Location:</strong> {chapter.location}
    </p>
    {chapter.notes && <p className="text-sm mt-2 italic text-gray-600">{chapter.notes}</p>}
    <Button
      className="mt-4 w-full"
      onClick={() =>
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${chapter.coordinates[0]},${chapter.coordinates[1]}`,
          '_blank',
        )
      }
    >
      View on Google Maps
    </Button>
  </motion.div>
));

/**
 * Creates a custom marker element with specified background color
 * @param {string} bgColor - Background color for the marker
 * @returns {Element} Custom marker DOM element
 */
function createMarkerContent(bgColor: string) {
  const div = document.createElement('div');
  div.innerHTML = `
    <div style="
      background-color: ${bgColor};
      padding: 0.5rem;
      border-radius: 50%;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    ">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="20" height="20" fill="white">
        <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
      </svg>
    </div>
  `;
  return div.firstElementChild;
}

function createClusterMarkerContent(count: number) {
  const div = document.createElement('div');
  div.innerHTML = `
    <div style="
      background-color: #234c8b;
      color: white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    ">
      ${count}
    </div>
  `;
  return div.firstElementChild;
}

export default GoogleMaps;
