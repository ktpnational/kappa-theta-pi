import {
  Body,
  Button,
  Container,
  Head,
  Html,'use client';
  
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
  
  /** Approximate center coordinates of North America */
  const DEFAULT_CENTER = { lat: 48.1667, lng: -100.1667 };
  
  /**
   * Main Google Maps component that renders the map and chapter markers
   * @returns React component containing the Google Map implementation
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
  
  /** Props interface for Markers component */
  type Props = { chapters: typeof chapters };
  
  /**
   * Component that handles the rendering and management of map markers
   * @param chapters - Object containing arrays of active, colony and inactive chapters
   */
  const Markers: React.FC<Props> = ({ chapters }) => {
    const map = useMap();
    const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
    const [activeMarker, setActiveMarker] = useState<string | null>(null);
    const clusterer = useRef<MarkerClusterer | null>(null);
  
    /**
     * Combines and filters chapters to only include those within North America bounds
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
     * Initializes the marker clusterer when map is ready
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
     * Updates clusterer when markers change
     */
    useEffect(() => {
      clusterer.current?.clearMarkers();
      clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);
  
    /**
     * Manages marker references for clustering
     * @param marker - The marker instance to manage
     * @param key - Unique identifier for the marker
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
   * Determines marker color based on chapter status
   * @param status - Chapter status (Active, Colony, or Inactive)
   * @returns Tailwind CSS classes for background and text colors
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
   * Component that displays chapter information in an info window
   * @param chapter - Chapter information to display
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

  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { siteConfig } from '@/config/site';
import { env } from '@/env.mjs';

/**
 * Props interface for the EmailVerificationEmail component
 * @interface EmailVerificationEmailProps
 * @property {string} email - The email address to be verified
 * @property {string} emailVerificationToken - The verification token used to validate the email address
 */
interface EmailVerificationEmailProps {
  email: string;
  emailVerificationToken: string;
}

/**
 * Renders an email verification email template using React Email components
 * @component
 * @param {object} props - Component props
 * @param {string} props.email - The recipient's email address that needs verification
 * @param {string} props.emailVerificationToken - Unique token used to verify the email address
 * @returns {JSX.Element} A React Email template for email verification
 * @description This component generates a standardized email verification template that includes:
 * - A greeting
 * - Information about the signup attempt
 * - A verification button
 * - A disclaimer for unintended recipients
 * - Uses Tailwind for styling
 */
export function EmailVerificationEmail({
  email,
  emailVerificationToken,
}: Readonly<EmailVerificationEmailProps>): JSX.Element {
  const previewText = `${siteConfig.name} email verification.`;
  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Text className="text-xl">Hi,</Text>
              <Text className="text-base">
                Your email address, {email}, was recently used to sign up at{' '}
                <span className="font-semibold tracking-wide">{siteConfig.name}</span>.
              </Text>
              <Text className="text-base">
                Please verify this address by clicking the button below
              </Text>
              <Button
                href={`${env.NEXT_PUBLIC_APP_URL}/signup/verify-email?token=${emailVerificationToken}`}
              >
                Verify email now
              </Button>
            </Section>

            <Section>
              <Text className="text-xs">
                If you didn&apos;t sign up at {siteConfig.name}, just ignore and delete this
                message.
              </Text>
              <Text className="text-base font-medium">
                Enjoy <span className="font-semibold tracking-wide">{siteConfig.name}</span> and
                have a nice day!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
