"use client";

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";
import { Button } from "@radix-ui/themes";

interface MarkerData {
  latitude: number;
  longitude: number;
  magnitude: number;
}

export default function Map() {
  const mapPositions = [11.1271, 78.6569];
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const handleMapClick = (e:any) => {
    const newMarker = {
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
      magnitude: 1 // Default magnitude, you can change this as needed
    };
    setMarkers([...markers, newMarker]);
  };
  return (
      <MapContainer
        preferCanvas={true}
        center={[51.505, -0.09]}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%" }}
        
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            This Marker icon is displayed correctly with <i>leaflet-defaulticon-compatibility</i>.
            <Button onClick={()=>alert('asdf')}>Click me</Button>
          </Popup>
        </Marker>
      </MapContainer>
  );
}