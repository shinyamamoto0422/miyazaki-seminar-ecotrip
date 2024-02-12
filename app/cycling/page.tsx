"use client";

import { useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CustomMap } from "./map/CustomMap";

export default function Cycling() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  return (
    <div className="h-full">
      <CustomMap
        mapContainer={mapContainer}
        map={map as unknown as mapboxgl.Map}
        setMap={
          setMap as unknown as React.Dispatch<
            React.SetStateAction<mapboxgl.Map>
          >
        }
        latitude={latitude}
        setLatitude={setLatitude}
        longitude={longitude}
        setLongitude={setLongitude}
      />
    </div>
  );
}
