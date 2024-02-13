"use client";

import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker } from "react-map-gl";
import { LatLng } from "types/LatLng";
import { BikeIcon, GlassWater } from "lucide-react";
import { waterData } from "@/lib/waterData";

const defaultPosition = { lng: 139.7673068, lat: 35.6809591 };

export default function Cycling() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

  const [currentUserPosition, setCurrentUserPosition] =
    useState<LatLng>(defaultPosition);
  const [isGetLocation, setIsGetLocation] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(18);

  const getCurrentPosition = (): Promise<{ lat: number; lng: number }> => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
          setIsGetLocation(true);
        },
        (error) => {
          reject(defaultPosition);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    });
  };

  useEffect(() => {
    getCurrentPosition()
      .then(setCurrentUserPosition)
      .catch(setCurrentUserPosition);
  }, []);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentUserPosition({ lat: latitude, lng: longitude });
        setIsGetLocation(true);
      },
      (error) => {
        setCurrentUserPosition(defaultPosition);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="h-full">
      {isGetLocation && (
        <Map
          id="myMap"
          initialViewState={{
            longitude: currentUserPosition.lng,
            latitude: currentUserPosition.lat,
            zoom: currentZoom,
          }}
          onZoom={(e) => {
            setCurrentZoom(e.viewState.zoom);
          }}
          localFontFamily="Inter"
          style={{ width: "100%", height: "100vh" }}
          mapStyle={"mapbox://styles/mapbox/streets-v12"}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}
        >
          {currentUserPosition && (
            <Marker
              key={"currentPosition"}
              longitude={currentUserPosition.lng}
              latitude={currentUserPosition.lat}
              anchor="center"
            >
              <BikeIcon size={40} />
            </Marker>
          )}
          {currentZoom > 11.5 &&
            waterData.map((item) => {
              return (
                <div key={item.title}>
                  <Marker
                    longitude={item.lng}
                    latitude={item.lat}
                    anchor="center"
                  >
                    <GlassWater size={24} />
                  </Marker>
                </div>
              );
            })}
        </Map>
      )}
    </div>
  );
}
