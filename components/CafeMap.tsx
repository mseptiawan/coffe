"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ScaleControl,
  useMap,
  Circle,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";
import LeafletConfig from "./LeafletConfig";
import { cafeImage } from "@/lib/cafeImage";

// 📡 Komponen Locate Me dengan Marker Lokasi User
function LocateButton({
  setUserPos,
}: {
  setUserPos: (pos: [number, number]) => void;
}) {
  const map = useMap();

  const handleLocate = () => {
    map.locate().on("locationfound", (e) => {
      setUserPos([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, 16, { animate: true, duration: 1.5 });
    });
  };

  return (
    // Menggunakan margin-top (!mt-[110px]) agar berada di bawah zoom control
    <div className="leaflet-top leaflet-left !mt-[110px]">
      <div className="leaflet-control leaflet-bar !border-none">
        <button
          onClick={handleLocate}
          type="button"
          title="Cari Lokasi Saya"
          className="flex items-center justify-center bg-zinc-900/80 backdrop-blur-md border border-white/10 text-zinc-400 hover:bg-amber-500 hover:text-black transition-all duration-300 w-[36px] h-[36px] rounded-xl shadow-2xl"
        >
          <Navigation size={16} fill="currentColor" className="rotate-45" />
        </button>
      </div>
    </div>
  );
}

export default function CafeMap({ cafes }: { cafes: any[] }) {
  const [coffeeIcon, setCoffeeIcon] = useState<any>(null);
  const [userIcon, setUserIcon] = useState<any>(null);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    import("leaflet").then((L) => {
      // Icon untuk Cafe
      setCoffeeIcon(
        new L.Icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/924/924514.png",
          className: "marker-amber-filter",
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        })
      );

      // Icon untuk User (Titik Biru GPS)
      setUserIcon(
        new L.Icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/1275/1275502.png", // Icon Blue Dot GPS
          iconSize: [25, 25],
          iconAnchor: [12, 12],
        })
      );
    });
  }, []);

  if (!isClient || !coffeeIcon) return null;

  return (
    <div className="group relative h-[450px] w-full overflow-hidden rounded-2xl border-[1px] border-white/10 shadow-2xl custom-map-cursor">
      <LeafletConfig />

      <MapContainer
        center={[-2.9761, 104.7754]}
        zoom={13}
        scrollWheelZoom
        preferCanvas={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; CARTO"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />

        <LocateButton setUserPos={setUserPos} />
        <ScaleControl position="bottomleft" imperial={false} />

        {/* 🔵 Marker Lokasi User & Akurasi (Circle) */}
        {userPos && userIcon && (
          <>
            <Marker position={userPos} icon={userIcon}>
              <Popup>Kamu di sini</Popup>
            </Marker>
            <Circle
              center={userPos}
              radius={100}
              pathOptions={{
                fillColor: "#3b82f6",
                color: "#3b82f6",
                weight: 1,
                opacity: 0.3,
                fillOpacity: 0.1,
              }}
            />
          </>
        )}

        <MarkerClusterGroup chunkedLoading maxClusterRadius={50}>
          {cafes.map((cafe) => (
            <Marker
              key={cafe.id}
              position={[cafe.coordinates.lat, cafe.coordinates.lng]}
              icon={coffeeIcon}
            >
              <Popup className="premium-popup">
                <div className="w-[180px] overflow-hidden bg-zinc-950 text-white rounded-xl border border-white/10 shadow-2xl">
                  <div className="relative h-24 w-full bg-zinc-900">
                    <Image
                      src={cafeImage(cafe.slug, "cover", "cover")}
                      alt={cafe.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                  </div>
                  <div className="p-3">
                    <h4 className="font-black text-[10px] uppercase italic text-zinc-100 truncate">
                      {cafe.name}
                    </h4>
                    <Link
                      href={`/cafe/${cafe.slug}`}
                      className="mt-2 block text-center bg-white text-black font-black text-[8px] uppercase py-2 rounded-lg hover:bg-amber-500 transition-colors"
                    >
                      Open Detail
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      <style jsx global>{`
        /* 🖱️ Custom Cursor */
        .custom-map-cursor .leaflet-container {
          cursor: crosshair !important;
        }

        /* 📏 Scale Control */
        .leaflet-control-scale-line {
          background: rgba(18, 18, 18, 0.7) !important;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-top: none !important;
          color: #71717a !important;
          font-size: 9px !important;
          font-weight: 800;
          text-transform: uppercase;
        }

        /* 🔘 Zoom Control & Locate Button Alignment */
        .leaflet-bar {
          border: none !important;
          margin-left: 20px !important;
          margin-top: 20px !important;
          display: flex;
          flex-direction: column;
          gap: 8px; /* Memberi jarak antar tombol */
        }

        .leaflet-bar a,
        .leaflet-control button {
          background-color: rgba(18, 18, 18, 0.8) !important;
          backdrop-filter: blur(8px);
          color: #71717a !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          width: 36px !important;
          height: 36px !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        /* Merapikan border radius tombol zoom karena dipisah gap */
        .leaflet-control-zoom-in {
          border-radius: 12px !important;
        }
        .leaflet-control-zoom-out {
          border-radius: 12px !important;
          margin-top: 0px !important;
        }

        .leaflet-bar a:hover,
        .leaflet-control button:hover {
          background-color: #f59e0b !important;
          color: #000000 !important;
          transform: translateY(-2px);
        }

        /* --- Style Existing --- */
        .marker-cluster-small div,
        .marker-cluster-medium div,
        .marker-cluster-large div {
          background-color: rgba(245, 158, 11, 0.8) !important;
          color: black !important;
          font-weight: 900 !important;
        }
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-popup-tip-container {
          display: none !important;
        }
        .marker-amber-filter {
          filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.4));
        }
      `}</style>
    </div>
  );
}
