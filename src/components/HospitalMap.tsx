import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchNearbyClinics, NearbyClinic } from '@/lib/api';
import { Hospital, MapPin, Search } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';

// Hospitals Verified By Blood Warriors - Hyderabad locations
const verifiedHospitals = [
  {
    id: 1,
    name: "Apollo Hospitals Jubilee Hills",
    address: "Road No. 72, Film Nagar, Jubilee Hills, Hyderabad",
    phone: "+91-40-2355-1066",
    coordinates: [78.4089, 17.4326] as [number, number],
    bloodTypes: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    verified: true,
    rating: 4.8
  },
  {
    id: 2,
    name: "CARE Hospitals Banjara Hills",
    address: "Road No. 1, Banjara Hills, Hyderabad",
    phone: "+91-40-6165-6565",
    coordinates: [78.4513, 17.4065] as [number, number],
    bloodTypes: ["O+", "O-", "A+", "B+", "AB+"],
    verified: true,
    rating: 4.7
  },
  {
    id: 3,
    name: "Continental Hospitals Gachibowli",
    address: "IT Park Rd, Nanakramguda, Gachibowli, Hyderabad",
    phone: "+91-40-6792-4444",
    coordinates: [78.3426, 17.4274] as [number, number],
    bloodTypes: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    verified: true,
    rating: 4.9
  },
  {
    id: 4,
    name: "Gandhi Hospital Secunderabad",
    address: "Musheerabad, Secunderabad, Hyderabad",
    phone: "+91-40-2770-1146",
    coordinates: [78.4983, 17.4399] as [number, number],
    bloodTypes: ["O+", "A+", "B+", "AB+"],
    verified: true,
    rating: 4.4
  },
  {
    id: 5,
    name: "Osmania General Hospital",
    address: "Afzal Gunj, Hyderabad",
    phone: "+91-40-2461-4877",
    coordinates: [78.4772, 17.3616] as [number, number],
    bloodTypes: ["O+", "O-", "A+", "A-", "B+", "B-"],
    verified: true,
    rating: 4.2
  },
  {
    id: 6,
    name: "Nizam's Institute of Medical Sciences",
    address: "Punjagutta, Hyderabad",
    phone: "+91-40-2348-8001",
    coordinates: [78.4482, 17.4239] as [number, number],
    bloodTypes: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    verified: true,
    rating: 4.6
  }
];

mapboxgl.accessToken = 'pk.eyJ1IjoiZGhhcmFuaTA0MTkiLCJhIjoiY21lcDhyZGlmMGN6OTJycTZ3ZHRzYW51eSJ9.C3_LPOySAtukZdxnBYWmhQ';

const HospitalMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [nearby, setNearby] = useState<NearbyClinic[]>([]);
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: userLocation || [78.4267, 17.4065], // Default Hyderabad
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right');

    verifiedHospitals.forEach((hospital) => {
      const markerEl = document.createElement('div');
      markerEl.className = 'hospital-marker';
      markerEl.innerHTML = `
        <div style="
          background: hsl(var(--primary));
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          cursor: pointer;
        ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M20 6 9 17l-5.5-5.5"/>
          </svg>
        </div>
      `;

      const popupContent = `
        <div style="padding:12px; max-width:250px;">
          <h3 style="margin:0 0 8px 0; font-weight:bold;">${hospital.name}</h3>
          <p style="margin:0 0 6px 0;">${hospital.address}</p>
          <p style="margin:0 0 6px 0;">${hospital.phone}</p>
          <div style="margin:8px 0; font-size:12px;">
            <span>✓ Verified</span> | <span>★ ${hospital.rating}</span>
            <div>Blood Types: ${hospital.bloodTypes.join(', ')}</div>
          </div>
        </div>
      `;
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);
      new mapboxgl.Marker(markerEl).setLngLat(hospital.coordinates).setPopup(popup).addTo(map.current!);
    });

    if (userLocation) {
      const userMarkerEl = document.createElement('div');
      userMarkerEl.innerHTML = `
        <div style="
          background: hsl(var(--destructive));
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        "></div>
      `;
      new mapboxgl.Marker(userMarkerEl).setLngLat(userLocation).addTo(map.current!);
    }

    // Render nearby clinics markers
    nearby.forEach((place) => {
      if (!place.location?.lng || !place.location?.lat) return;
      const el = document.createElement('div');
      el.className = 'clinic-marker';
      el.innerHTML = `
        <div style="
          background: #2563eb;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        ">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
        </div>
      `;
      const popup = new mapboxgl.Popup({ offset: 12 }).setHTML(`
        <div style="padding:8px; max-width:240px;">
          <div style="font-weight:600; margin-bottom:4px;">${place.name}</div>
          <div style="font-size:12px; color:#374151;">${place.vicinity || ''}</div>
          <div style="font-size:12px; margin-top:4px;">${place.rating ? `★ ${place.rating} (${place.user_ratings_total || 0})` : ''}</div>
        </div>
      `);
      new mapboxgl.Marker(el).setLngLat([place.location.lng!, place.location.lat!]).setPopup(popup).addTo(map.current!);
    });
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation([position.coords.longitude, position.coords.latitude]),
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location access.');
        }
      );
    } else alert('Geolocation is not supported by this browser.');
  };

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    initializeMap();
    return () => map.current?.remove();
  }, [userLocation, nearby]);

  const findNearby = async () => {
    if (!userLocation) return requestLocation();
    try {
      setLoading(true);
      const [lng, lat] = userLocation;
      const results = await fetchNearbyClinics(lat, lng, 6000);
      setNearby(results);
      if (!results || results.length === 0) {
        setHint(
          "No nearby places returned. Ensure GOOGLE_MAPS_API_KEY is set on backend and location allows search."
        );
      } else {
        setHint(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="card-healing">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hospital className="w-5 h-5" /> Hospitals Verified By Blood Warriors
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={requestLocation} className="text-secondary-foreground">
            <MapPin className="w-4 h-4 mr-2" /> Use My Location
          </Button>
          <Button size="sm" onClick={findNearby} disabled={loading}>
            <Search className="w-4 h-4 mr-2" /> {loading ? 'Finding...' : 'Nearby Clinics'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={mapContainer} className="w-full h-80 rounded-lg shadow-custom" style={{ minHeight: '320px' }} />
        <div className="mt-4 text-sm text-secondary-foreground/70">
          <p>✓ Showing {verifiedHospitals.length} verified hospitals • {nearby.length} nearby places</p>
          <p>Click markers to see details. Use Nearby Clinics for routine checkups.</p>
          {hint && <p className="text-destructive mt-1">{hint}</p>}
        </div>

        {nearby.length > 0 && (
          <div className="mt-4 space-y-2">
            {nearby.slice(0, 6).map((place) => (
              <div key={place.place_id} className="flex items-start justify-between bg-muted/20 rounded-md p-3">
                <div>
                  <div className="font-medium text-secondary-foreground">{place.name}</div>
                  <div className="text-xs text-secondary-foreground/70">{place.vicinity || ""}</div>
                  {typeof place.rating === 'number' && (
                    <div className="text-xs mt-1">★ {place.rating} ({place.user_ratings_total || 0})</div>
                  )}
                </div>
                <a
                  className="text-xs px-2 py-1 rounded bg-primary text-white h-7 inline-flex items-center"
                  href={
                    place.location?.lat && place.location?.lng
                      ? `https://www.google.com/maps/search/?api=1&query=${place.location.lat},${place.location.lng}`
                      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Directions
                </a>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HospitalMap;
