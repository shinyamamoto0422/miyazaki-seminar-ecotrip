import { useEffect } from "react";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import mapboxgl from "mapbox-gl";
import Map, { Marker } from "react-map-gl";
import { Pin } from "lucide-react";

type Props = {
  mapContainer: any;
  map: mapboxgl.Map;
  setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map>>;
  latitude: number;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  longitude: number;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
};

export const CustomMap = ({
  mapContainer,
  map,
  setMap,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
}: Props) => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log(latitude, longitude);
        },
        (error) => {
          console.error(error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, [latitude, longitude, setLatitude, setLongitude]);

  useEffect(() => {
    const initializeMap = ({
      setMap,
      mapContainer,
    }: {
      setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map>>;
      mapContainer: React.MutableRefObject<null>;
    }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current ?? "",
        center: [longitude, latitude],
        zoom: 15,
        style: "mapbox://styles/mapbox/streets-v12",
      });
      // 言語変更設定参考
      // defaultLanguageとしてjaを指定
      const language = new MapboxLanguage({ defaultLanguage: "ja" });
      map.addControl(language);

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map && latitude && longitude) initializeMap({ setMap, mapContainer });
  }, [latitude, longitude, map, mapContainer, setMap]);

  return <div ref={mapContainer} style={{ width: "100%", height: "92vh" }} />;
};
