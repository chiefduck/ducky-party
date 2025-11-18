import { useEffect, useRef, useState } from "react";

type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number | null;
  longitude: number | null;
};

type GoogleMapProps = {
  locations: Location[];
};

const GoogleMap = ({ locations }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  // Load Google Maps script dynamically
  useEffect(() => {
    if (window.google) {
      setMapsLoaded(true);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("Google Maps API key not found");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapsLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!mapsLoaded || !window.google || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 39.5501, lng: -105.7821 }, // Colorado center
      zoom: 6,
    });

    locations.forEach((location) => {
      if (location.latitude && location.longitude) {
        const marker = new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map,
          title: location.name,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <strong>${location.name}</strong><br>
            ${location.address}<br>
            ${location.city}, ${location.state} ${location.zipCode}
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      }
    });
  }, [locations, mapsLoaded]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default GoogleMap;
