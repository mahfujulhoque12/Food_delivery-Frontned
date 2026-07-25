import React, { useEffect } from "react";
import Navbar from "../user-page/Navbar";
import Category from "../user/Category";
import ShopByCity from "../user/ShopByCity";
import useUpdateLocation from "@/hooks/useUpdateLocation";

const UserDashboard = () => {
  const { updateCurrentLocation, isPending } = useUpdateLocation();

  useEffect(() => {
    updateCurrentLocation();
  }, []);
  return (
    <div>
      <Navbar />
      <Category />
      <ShopByCity />
    </div>
  );
};

export default UserDashboard;
