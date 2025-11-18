import { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

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
  }, [locations]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default GoogleMap;
