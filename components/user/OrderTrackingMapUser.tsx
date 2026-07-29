"use client";

import { useMemo, useEffect, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  customer: { lat: number; lon: number };
  deliveryBoy: { lat: number; lon: number };
}

function MapRecenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

export default function OrderTrackingMapUser({ customer, deliveryBoy }: Props) {
  // 1. Force a strict client-mounted checklist check
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const customerIcon = useMemo(
    () =>
      L.divIcon({
        html: `<div style="font-size:28px; display:flex; align-items:center; justify-content:center;">🏠</div>`,
        className: "",
        iconSize: [35, 35],
        iconAnchor: [17, 17],
      }),
    [],
  );

  const deliveryIcon = useMemo(
    () =>
      L.divIcon({
        html: `<div style="font-size:28px; display:flex; align-items:center; justify-content:center;">🛵</div>`,
        className: "",
        iconSize: [35, 35],
        iconAnchor: [17, 17],
      }),
    [],
  );

  const currentCenter: [number, number] = useMemo(
    () => [
      (customer.lat + deliveryBoy.lat) / 2,
      (customer.lon + deliveryBoy.lon) / 2,
    ],
    [customer.lat, customer.lon, deliveryBoy.lat, deliveryBoy.lon],
  );
  console.log(
    {
      customer,
      deliveryBoy,
    },
    "ttttttt",
  );
  // Keep the container initialization target absolutely frozen
  const initialCenter = useMemo<[number, number]>(() => currentCenter, []);

  // 2. Return a safe DOM placeholder until mounting is verified
  if (!isMounted) {
    return (
      <div
        style={{ height: "450px" }}
        className="w-full bg-bg-main rounded-3xl flex items-center justify-center text-text-light text-sm"
      >
        Initializing Map System...
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-3xl isolation-fix"
      style={{ position: "relative", zIndex: 1 }}
    >
      <MapContainer
        center={initialCenter}
        zoom={17}
        scrollWheelZoom
        style={{ height: "450px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />

        <MapRecenter center={currentCenter} />

        <Marker position={[customer.lat, customer.lon]} icon={customerIcon}>
          <Popup>Customer</Popup>
        </Marker>

        <Marker
          position={[deliveryBoy.lat, deliveryBoy.lon]}
          icon={deliveryIcon}
        >
          <Popup>Delivery Boy</Popup>
        </Marker>

        <Polyline
          positions={[
            [deliveryBoy.lat, deliveryBoy.lon],
            [customer.lat, customer.lon],
          ]}
          pathOptions={{ color: "#f97316", weight: 5 }}
        />
      </MapContainer>
    </div>
  );
}
