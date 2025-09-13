'use client';

import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';
import { GOOGLE_MAPS_API_KEY } from '@/app/config';
import type { MapMarkerData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const severityColors = {
  Critical: '#ef4444', // red-500
  High: '#f97316',     // orange-500
  Medium: '#eab308',   // yellow-500
  Low: '#22c55e',      // green-500
};

export function RiskMap({ markers }: { markers: MapMarkerData[] }) {
  const [activeMarker, setActiveMarker] = useState<MapMarkerData | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (markers.length > 0) {
      if (markers.length === 1) {
        setMapCenter(markers[0].position);
        setZoomLevel(4);
      } else {
        // Simple average for multi-marker centering, can be improved with bounds calculation
        const avgLat = markers.reduce((acc, m) => acc + m.position.lat, 0) / markers.length;
        const avgLng = markers.reduce((acc, m) => acc + m.position.lng, 0) / markers.length;
        setMapCenter({ lat: avgLat, lng: avgLng });
        setZoomLevel(2); // A more zoomed-out view for multiple markers
      }
    } else {
        setMapCenter({ lat: 20, lng: 0 });
        setZoomLevel(1);
    }
  }, [markers]);


  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <Card className="h-full shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <MapPin className="text-primary" />
            Geographic Risk Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full text-center text-muted-foreground">
          <div>
            <p className="font-semibold">Map not available.</p>
            <p className="text-sm">Please provide a Google Maps API key.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col shadow-lg rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <MapPin className="text-primary" />
          Geographic Risk Visualization
        </CardTitle>
        <CardDescription>Risk hot-spots based on event location and severity.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <Map
            key={`${mapCenter.lat}-${mapCenter.lng}-${zoomLevel}`}
            mapId="pharmachain-resilience-map"
            style={{ width: '100%', height: '100%' }}
            center={mapCenter}
            zoom={zoomLevel}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            {markers.map((marker) => (
              <AdvancedMarker
                key={marker.id}
                position={marker.position}
                onClick={() => setActiveMarker(marker)}
              >
                <div className="relative">
                  <MapPin
                    size={32}
                    style={{ color: severityColors[marker.severity], fill: severityColors[marker.severity] }}
                    className="opacity-70"
                  />
                   <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </AdvancedMarker>
            ))}
            {activeMarker && (
              <InfoWindow
                position={activeMarker.position}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div className="p-2 max-w-xs">
                  <h4 className="font-bold text-sm text-foreground">{activeMarker.severity} Risk Event</h4>
                  <p className="text-xs text-muted-foreground mt-1">{activeMarker.summary}</p>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </CardContent>
    </Card>
  );
}
