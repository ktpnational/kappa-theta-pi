"use client";

/**
 * @file google-map.tsx
 * @fileoverview A comprehensive Google Maps component for displaying chapter locations with clustering, filtering, and interactive markers.
 * The component includes features like:
 * - Marker clustering for better visualization of dense areas
 * - Status-based filtering (Active, Colony, Inactive chapters)
 * - Interactive info windows with chapter details
 * - Custom map styling and restricted bounds
 * - Responsive design and loading states
 * - Scroll lock when interacting with map
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type ChapterInfo, chapters } from "@/data/map";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/providers";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import {
  APIProvider,
  InfoWindow,
  Map,
  useMap,
} from "@vis.gl/react-google-maps";
import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

/**
 * Color configurations for different chapter statuses.
 * Each status has associated background, text, and badge colors.
 *
 * @type {Object.<string, {bg: string, text: string, badge: string}>}
 * @property {Object} Active - Colors for active chapters (primary blue)
 * @property {Object} Colony - Colors for colony chapters (light blue)
 * @property {Object} Inactive - Colors for inactive chapters (gray)
 * @property {string} *.bg - Background color in hex format
 * @property {string} *.text - Text color in hex format
 * @property {string} *.badge - Tailwind CSS class for badge background
 */
const MARKER_COLORS = {
  Active: { bg: "#234c8b", text: "#ffffff", badge: "bg-[#234c8b]" },
  Colony: { bg: "#8bb9ff", text: "#234c8b", badge: "bg-[#8bb9ff]" },
  Inactive: { bg: "#9ca3af", text: "#ffffff", badge: "bg-gray-400" },
};

/**
 * Geographic bounds for North America to restrict map panning.
 * These coordinates create a bounding box that prevents users from panning too far outside North America.
 *
 * @type {{north: number, south: number, west: number, east: number}}
 * @property {number} north - Northern boundary (71.5388001°N)
 * @property {number} south - Southern boundary (15.7835°N)
 * @property {number} west - Western boundary (167.2764°W)
 * @property {number} east - Eastern boundary (52.648°W)
 */
const NORTH_AMERICA_BOUNDS = {
  north: 71.5388001,
  south: 15.7835,
  west: -167.2764,
  east: -52.648,
};

/**
 * Default center coordinates for the map (center of USA).
 * These coordinates represent the geographic center of the contiguous United States.
 *
 * @type {{lat: number, lng: number}}
 * @property {number} lat - Latitude (39.8283°N)
 * @property {number} lng - Longitude (98.5795°W)
 */
const DEFAULT_CENTER = { lat: 39.8283, lng: -98.5795 };

/**
 * Custom styling for the Google Map.
 * Defines visual appearance of map features like water bodies, landscape, and administrative labels.
 *
 * @type {Array<google.maps.MapTypeStyle>}
 * @property {Object[]} styles - Array of style rules
 * @property {string} styles[].featureType - The map feature to style
 * @property {string} styles[].elementType - The element within the feature to style
 * @property {Object[]} styles[].stylers - Array of style operations to apply
 */
const MAP_STYLES = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{ color: "#234c8b" }],
  },
];

/**
 * Color configurations for different filter button statuses.
 * Defines the visual appearance of filter buttons in different states.
 *
 * @type {Object.<string, {bg: string, text: string}>}
 * @property {Object} All - Colors for "All Chapters" filter
 * @property {Object} Active - Colors for "Active Chapters" filter
 * @property {Object} Colony - Colors for "Colony Chapters" filter
 * @property {Object} Inactive - Colors for "Inactive Chapters" filter
 * @property {string} *.bg - Tailwind CSS classes for button background
 * @property {string} *.text - Tailwind CSS classes for button text color
 */
const BUTTON_COLORS = {
  All: {
    bg: "bg-white hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-[#234c8b] focus-visible:ring-offset-2",
    text: "text-gray-900",
    ariaLabel: "Show all chapters",
  },
  Active: {
    bg: "bg-white hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-[#234c8b] focus-visible:ring-offset-2",
    text: "text-[#234c8b]",
    ariaLabel: "Filter to show only active chapters",
  },
  Colony: {
    bg: "bg-white hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-[#234c8b] focus-visible:ring-offset-2",
    text: "text-[#8bb9ff]",
    ariaLabel: "Filter to show only colony chapters",
  },
  Inactive: {
    bg: "bg-white hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-[#234c8b] focus-visible:ring-offset-2",
    text: "text-gray-400",
    ariaLabel: "Filter to show only inactive chapters",
  },
};

/**
 * Main Google Maps component that displays chapter locations with filtering capabilities.
 * This component serves as the container for the entire map interface, including:
 * - Filter buttons for different chapter statuses
 * - Loading states with skeleton UI
 * - Map container with scroll lock behavior
 * - Chapter markers and clustering
 * - Info windows for chapter details
 *
 * @component
 * @example
 * ```tsx
 * <GoogleMaps />
 * ```
 *
 * @returns {JSX.Element} Rendered Google Maps component with all interactive features
 */
export const GoogleMaps = memo(() => {
  const { toast } = useToast();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapZoom, setMapZoom] = useState(3);
  const [stats, setStats] = useState({ active: 0, colony: 0, inactive: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const activeFilters = useGlobalStore((state) => state.map.activeFilters);
  const toggleFilter = useGlobalStore((state) => state.map.toggleFilter);
  const setActiveFilters = useGlobalStore(
    (state) => state.map.setActiveFilters
  );

  /**
   * Disables page scrolling when mouse enters map container.
   * This prevents the page from scrolling while users are interacting with the map.
   *
   * @function
   * @memberof GoogleMaps
   */
  const disableScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  /**
   * Enables page scrolling when mouse leaves map container.
   * Restores normal page scrolling behavior when map interaction ends.
   *
   * @function
   * @memberof GoogleMaps
   */
  const enableScroll = useCallback(() => {
    document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    container.addEventListener("mouseenter", disableScroll);
    container.addEventListener("mouseleave", enableScroll);

    return () => {
      container.removeEventListener("mouseenter", disableScroll);
      container.removeEventListener("mouseleave", enableScroll);
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
   * Memoized map options for Google Maps configuration.
   * Defines the map's behavior, controls, and visual settings.
   *
   * @type {google.maps.MapOptions}
   * @property {string} gestureHandling - Controls how the map handles gestures
   * @property {Object} restriction - Defines map boundaries
   * @property {boolean} disableDefaultUI - Controls visibility of default UI elements
   * @property {boolean} zoomControl - Controls visibility of zoom controls
   * @property {boolean} mapTypeControl - Controls visibility of map type selector
   * @property {boolean} streetViewControl - Controls visibility of Street View
   * @property {boolean} fullscreenControl - Controls visibility of fullscreen button
   * @property {Array} styles - Custom map styles
   * @property {number} minZoom - Minimum zoom level
   * @property {number} maxZoom - Maximum zoom level
   */
  const mapOptions = useMemo(
    () => ({
      gestureHandling: "cooperative",
      restriction: {
        latLngBounds: NORTH_AMERICA_BOUNDS,
        strictBounds: false,
      },
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: MAP_STYLES,
      minZoom: 3,
      maxZoom: 18,
    }),
    []
  );

  useEffect(() => {
    if (!isLoading) {
      toast({
        title: "Map Controls",
        description: "Use keyboard +/- or left click to zoom",
        duration: 5000,
      });
    }
  }, [isLoading, toast]);

  return (
    <Card className="w-full bg-white shadow-none p-0 m-0 border-none">
      <CardContent className="p-0 space-y-6">
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
            <div
              className="flex flex-wrap justify-center gap-4"
              role="toolbar"
              aria-label="Chapter filter options"
            >
              <Button
                onClick={() =>
                  setActiveFilters(["Active", "Colony", "Inactive"])
                }
                className={cn(
                  "rounded-full transition-colors",
                  BUTTON_COLORS.All.bg,
                  BUTTON_COLORS.All.text,
                  activeFilters.length === 3
                    ? "ring-2 ring-[#234c8b] ring-offset-2"
                    : ""
                )}
                variant="outline"
                aria-label={BUTTON_COLORS.All.ariaLabel}
                aria-pressed={activeFilters.length === 3}
                role="switch"
              >
                <span className="sr-only">Show </span>
                All Chapters
                {activeFilters.length === 3 && (
                  <span className="sr-only"> (currently selected)</span>
                )}
              </Button>
              {(["Active", "Colony", "Inactive"] as const).map((filter) => {
                const count = stats[filter.toLowerCase() as keyof typeof stats];
                const buttonText = `${filter} Chapters (${count})`;

                return (
                  <Button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className={cn(
                      "rounded-full transition-colors",
                      BUTTON_COLORS[filter].bg,
                      BUTTON_COLORS[filter].text,
                      activeFilters.includes(filter)
                        ? "ring-2 ring-[#234c8b] ring-offset-2"
                        : ""
                    )}
                    variant="outline"
                    aria-label={BUTTON_COLORS[filter].ariaLabel}
                    aria-pressed={activeFilters.includes(filter)}
                    role="switch"
                  >
                    <span className="sr-only">Show </span>
                    {buttonText}
                    {activeFilters.includes(filter) && (
                      <span className="sr-only"> (currently selected)</span>
                    )}
                  </Button>
                );
              })}
            </div>
            <div className="relative">
              <div
                ref={mapContainerRef}
                className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl border border-gray-200"
              >
                <APIProvider
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                >
                  <Map
                    defaultCenter={DEFAULT_CENTER}
                    zoom={mapZoom}
                    onCameraChanged={(ev) => setMapZoom(ev.detail.zoom)}
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
                    {...mapOptions}
                  >
                    <Markers
                      chapters={chapters}
                      activeFilters={activeFilters}
                      mapZoom={mapZoom}
                    />
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
 * Props interface for Markers component.
 * Defines the expected properties for the Markers component.
 *
 * @interface
 * @property {typeof chapters} chapters - Chapter data containing active, colony, and inactive chapters
 * @property {string[]} activeFilters - Current active filters
 * @property {number} mapZoom - Current zoom level of the map
 */
type MarkersProps = {
  chapters: typeof chapters;
  activeFilters: string[];
  mapZoom: number;
};

/**
 * Component that handles the rendering and management of map markers and clustering.
 * Responsible for:
 * - Creating and managing markers for each chapter
 * - Implementing marker clustering
 * - Handling marker click events
 * - Managing info windows
 *
 * @component
 * @param {MarkersProps} props - Component props
 * @param {typeof chapters} props.chapters - Chapter data
 * @param {string[]} props.activeFilters - Current active filters
 * @param {number} props.mapZoom - Current map zoom level
 * @returns {JSX.Element} Rendered markers and info windows
 */
const Markers: React.FC<MarkersProps> = memo(
  ({ chapters, activeFilters, mapZoom }) => {
    const map = useMap();
    const [activeMarker, setActiveMarker] = useState<string | null>(null);
    const clusterer = useRef<MarkerClusterer | null>(null);

    /**
     * Filtered and processed chapters based on status filter and geographic bounds.
     * Combines all chapter types and filters them based on:
     * - Current status filter
     * - Geographic boundaries
     *
     * @type {ChapterInfo[]}
     */
    const allChapters = useMemo(() => {
      const combined = [
        ...chapters.active,
        ...chapters.colony,
        ...chapters.inactive,
      ];
      return combined.filter((chapter) => {
        const [lat, lng] = chapter.coordinates;
        const matchesFilter = activeFilters.includes(chapter.status);
        return (
          lat <= NORTH_AMERICA_BOUNDS.north &&
          lat >= NORTH_AMERICA_BOUNDS.south &&
          lng >= NORTH_AMERICA_BOUNDS.west &&
          lng <= NORTH_AMERICA_BOUNDS.east &&
          matchesFilter
        );
      });
    }, [chapters, activeFilters]);

    /**
     * Handles marker click events and toggles the active marker state.
     * When a marker is clicked:
     * - If it's not active, it becomes the active marker
     * - If it's already active, it becomes inactive
     *
     * @function
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

            google.maps.event.addListener(clusterMarker, "click", () => {
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
          position: {
            lat: chapter.coordinates[0],
            lng: chapter.coordinates[1],
          },
          content: createMarkerContent(bg),
        });
        google.maps.event.addListener(marker, "click", () =>
          handleMarkerClick(chapter.name)
        );
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
                  allChapters.find((chapter) => chapter.name === activeMarker)
                    ?.coordinates[0] || 0,
                lng:
                  allChapters.find((chapter) => chapter.name === activeMarker)
                    ?.coordinates[1] || 0,
              }}
              onCloseClick={() => setActiveMarker(null)}
            >
              <ChapterInfo
                chapter={
                  allChapters.find((chapter) => chapter.name === activeMarker)!
                }
              />
            </InfoWindow>
          )}
        </AnimatePresence>
      </>
    );
  }
);

/**
 * Component that displays detailed information about a chapter in an info window.
 * Shows comprehensive chapter details including:
 * - Chapter status badge
 * - Founding date
 * - Chapter name and Greek name
 * - University and location
 * - Additional notes
 * - Link to Google Maps
 *
 * @component
 * @param {Object} props - Component props
 * @param {ChapterInfo} props.chapter - Chapter information to display
 * @returns {JSX.Element} Rendered chapter information card with animation
 */
const ChapterInfo: React.FC<{ chapter: ChapterInfo }> = memo(({ chapter }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="bg-white text-gray-800 p-6 rounded-xl border-none max-w-sm"
  >
    <div className="flex items-center gap-2 mb-4">
      <Badge
        className={`${
          MARKER_COLORS[chapter.status as keyof typeof MARKER_COLORS].badge
        } text-sm px-3 py-1`}
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
    {chapter.notes && (
      <p className="text-sm mt-2 italic text-gray-600">{chapter.notes}</p>
    )}
    <Button
      className="mt-4 w-full"
      onClick={() =>
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${chapter.coordinates[0]},${chapter.coordinates[1]}`,
          "_blank"
        )
      }
    >
      View on Google Maps
    </Button>
  </motion.div>
));

/**
 * Creates a custom marker element with specified background color.
 * Generates a DOM element representing a map marker with:
 * - Custom background color
 * - Drop shadow
 * - Map pin icon
 *
 * @function
 * @param {string} bgColor - Background color for the marker
 * @returns {Element} Custom marker DOM element
 */
function createMarkerContent(bgColor: string) {
  const div = document.createElement("div");
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

/**
 * Creates a custom cluster marker element with a count.
 * Generates a DOM element representing a cluster marker with:
 * - Circle background
 * - Count of clustered markers
 * - Custom styling
 *
 * @function
 * @param {number} count - Number of markers in the cluster
 * @returns {Element} Custom cluster marker DOM element
 */
function createClusterMarkerContent(count: number) {
  const div = document.createElement("div");
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
