"use client";

import { useEffect, useState } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useLocationStore } from "@/store/useLocationStore";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Position = {
  lat: number;
  lng: number;
};

function ChangeView({ center }: { center: Position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 16);
  }, [center, map]);

  return null;
}

export default function LocationPicker() {
  const [search, setSearch] = useState("");
  const { setLocation } = useLocationStore();

  const [position, setPosition] = useState<Position>({
    lat: 23.8103,
    lng: 90.4125,
  });

  const [loading, setLoading] = useState(false);

  const searchLocation = async () => {
    if (!search.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search,
        )}`,
      );

      const data = await res.json();

      if (!data.length) return;

      const newPosition = {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      };

      setPosition(newPosition);

      await reverseGeocode(newPosition.lat, newPosition.lng);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      );

      const data = await res.json();

      const a = data.address;

      const fullAddress = [
        a.house_number,
        a.road,
        a.suburb,
        a.neighbourhood,
        a.city_district,
        a.city,
        a.state,
        a.country,
      ]
        .filter(Boolean)
        .join(", ");

      setSearch(fullAddress);
      setLocation(
        {
          lat,
          lng,
        },
        fullAddress,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const newPosition = {
          lat: coords.latitude,
          lng: coords.longitude,
        };

        setPosition(newPosition);

        await reverseGeocode(newPosition.lat, newPosition.lng);

        setLoading(false);
      },
      (error) => {
        console.error(error);
        alert("Unable to get your current location.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex relative  gap-3">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => e.key === "Enter" && searchLocation()}
          placeholder="Search your delivery area..."
          className="flex-1 rounded-xl border border-border-soft bg-bg-card px-4 py-3 text-text-dark outline-none transition focus:border-brand-primary"
        />

        <button
          onClick={searchLocation}
          disabled={loading}
          className="rounded-xl bg-brand-primary px-6 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>

        <button
          type="button"
          onClick={getCurrentLocation}
          title="Current Location"
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-white transition hover:opacity-90"
        >
          <FaLocationCrosshairs className="text-lg" />
        </button>
      </div>

      <MapContainer
        center={position}
        zoom={16}
        className="rounded-2xl h-[200px] md:h-[400px] w-full"
      >
        <ChangeView center={position} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          draggable
          position={position}
          eventHandlers={{
            dragend(e) {
              const marker = e.target;
              const latlng = marker.getLatLng();

              setPosition({
                lat: latlng.lat,
                lng: latlng.lng,
              });

              reverseGeocode(latlng.lat, latlng.lng);
            },
          }}
        />
      </MapContainer>
    </div>
  );
}
