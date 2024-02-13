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
  const [started, setStarted] = useState(false);

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
    <div className="relative h-full">
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
              style={{
                filter: started
                  ? "drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))"
                  : "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
              }}
            >
              <div className="rounded-full bg-sky-600 p-1.5">
                <BikeIcon size={32} color="#fff" />
              </div>
            </Marker>
          )}
          {currentZoom > 10 &&
            waterData.map((item) => {
              return (
                <div key={item.title}>
                  <Marker
                    longitude={item.lng}
                    latitude={item.lat}
                    anchor="center"
                  >
                    <GlassWater
                      size={currentZoom > 14 ? 48 : currentZoom > 13 ? 30 : 18}
                    />
                  </Marker>
                </div>
              );
            })}
        </Map>
      )}

      {!started && (
        <div className="absolute bottom-20 z-50 flex w-full items-center justify-center">
          <button
            className="h-32 w-32 rounded-full bg-slate-950 px-4 py-2 font-mono text-2xl font-bold text-white shadow-xl"
            onClick={() => setStarted(true)}
          >
            スタート
          </button>
        </div>
      )}
      {started && (
        <div>
          <div className="absolute bottom-16 left-1 z-50">
            <div className="rounded-md border border-gray-200 bg-gray-50 bg-opacity-85 p-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <p className="font-mono text-sm font-bold">18.54</p>
                  <p className="font-mono text-xs text-gray-400">km</p>
                </div>
                <div className="flex items-center">
                  <p className="text-md font-mono font-bold">2’01”</p>
                  <p className="font-mono text-xs text-gray-400">平均ペース</p>
                </div>
                <div className="flex items-center">
                  <p className="text-md font-mono font-bold">37’27”</p>
                  <p className="font-mono text-xs text-gray-400">時間</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-16 right-2 z-50 flex w-full justify-end">
            <button
              className="rounded-full bg-red-600 px-6 py-4 font-mono text-2xl font-bold text-white shadow-lg"
              onClick={() => {
                setStarted(false);
                setCurrentZoom(18);
              }}
            >
              終了
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
