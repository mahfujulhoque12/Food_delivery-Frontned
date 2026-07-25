import useUpdateLocation from "@/hooks/useUpdateLocation";
import React, { useEffect } from "react";
import Navbar from "../user-page/Navbar";
import DeliveryBoyMain from "../delivery-boy/DeliveryBoyMain";
import CurrentOrder from "../delivery-boy/CurrentOrder";

const DeliveryBoyDashboard = () => {
  const { updateCurrentLocation, isPending } = useUpdateLocation();

  useEffect(() => {
    updateCurrentLocation();
  }, []);
  return (
    <div>
      <Navbar />
      <DeliveryBoyMain />
    </div>
  );
};

export default DeliveryBoyDashboard;
