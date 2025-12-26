"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import LeafletConfig from "./LeafletConfig";

export default function CafeMap({ cafes }: { cafes: any[] }) {
  const [coffeeIcon, setCoffeeIcon] = useState<any>(null);

  useEffect(() => {
    // ⬇️ IMPORT LEAFLET HANYA DI BROWSER
    import("leaflet").then((L) => {
      const icon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/924/924514.png",
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        popupAnchor: [0, -35],
      });

      setCoffeeIcon(icon);
    });
  }, []);

  // ⛔ Jangan render map sebelum icon siap
  if (!coffeeIcon) return null;

  return (
    <div className="h-[450px] w-full overflow-hidden rounded-3xl border-4 border-white shadow-lg">
      <LeafletConfig />

      <MapContainer
        center={[-2.9761, 104.7754]}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {cafes.map((cafe) => (
          <Marker
            key={cafe.id}
            position={[cafe.coordinates.lat, cafe.coordinates.lng]}
            icon={coffeeIcon}
          >
            <Popup className="custom-popup">
              <div className="p-1 space-y-2">
                <h4 className="font-bold text-gray-900">{cafe.name}</h4>

                <div className="flex items-center text-amber-600 font-bold text-xs">
                  ⭐ {cafe.rating}
                </div>

                <Link
                  href={`/cafe/${cafe.slug}`}
                  className="block text-center bg-gray-900 text-white text-[10px] py-1.5 px-3 rounded-lg hover:bg-amber-600 transition"
                >
                  Detail Cafe
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
