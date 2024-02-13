import type { AppProps } from "next/app";
import { MapProvider } from "react-map-gl";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MapProvider>
      <Component {...pageProps} />
    </MapProvider>
  );
}
