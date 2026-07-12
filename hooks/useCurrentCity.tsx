"use client";

import { useEffect, useState } from "react";

const useCurrentCity = () => {
  const [city, setCity] = useState("Detecting...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setCity("Location not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          );

          const data = await res.json();

          const address = data.address;

          const area =
            address.suburb ||
            address.neighbourhood ||
            address.residential ||
            address.quarter ||
            address.city_district ||
            address.hamlet;

          const city =
            address.city || address.town || address.village || address.state;

          setCity(area ? `${area}, ${city}` : city || "Unknown");
        } catch (error) {
          console.error(error);
          setCity("Unknown");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setCity("Permission denied");
        setLoading(false);
      },
    );
  }, []);

  return {
    city,

    loading,
  };
};

export default useCurrentCity;
