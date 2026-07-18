"use client";

import dynamic from "next/dynamic";
import PlaceOrder from "./PlaceOrder";

const LocationPicker = dynamic(
  () => import("@/components/checkout/LocationPicker"),
  {
    ssr: false,
  },
);

export default function Checkout() {
  return (
    <div className="wrapper my-10">
      <h1 className="mb-6 head-1">Delivery Location</h1>

      <LocationPicker />
      <PlaceOrder />
    </div>
  );
}
