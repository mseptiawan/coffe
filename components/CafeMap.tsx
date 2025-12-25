"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";
import LeafletConfig from "./LeafletConfig";
import L from "leaflet"; // Import Leaflet untuk icon custom
import "leaflet/dist/leaflet.css";

// Definisi Icon Kopi Custom
const coffeeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/924/924514.png", // Icon kopi estetik
  iconSize: [35, 35], // Ukuran icon
  iconAnchor: [17, 35], // Titik tumpu icon (tengah bawah)
  popupAnchor: [0, -35], // Posisi popup relatif terhadap icon
});

export default function CafeMap({ cafes }: { cafes: any[] }) {
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
            icon={coffeeIcon} // <--- GUNAKAN ICON DI SINI
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