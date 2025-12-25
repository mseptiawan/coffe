"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";
import LeafletConfig from "./LeafletConfig";

type Cafe = {
  id: number;
  name: string;
  slug: string;
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export default function CafeMap({ cafes }: { cafes: Cafe[] }) {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-xl border">
      <LeafletConfig />

      <MapContainer
        center={[-2.9761, 104.7754]} // pusat Palembang
        zoom={13}
        scrollWheelZoom
        className="h-full w-full"
      >
    <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
/>

        {cafes.map((cafe) => (
          <Marker
            key={cafe.id}
            position={[cafe.coordinates.lat, cafe.coordinates.lng]}
          >
            <Popup>
              <div className="text-sm space-y-1">
                <strong>{cafe.name}</strong>
                <div>⭐ {cafe.rating}</div>
                <Link
                  href={`/cafe/${cafe.slug}`}
                  className="text-blue-600 underline"
                >
                  Lihat detail
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
