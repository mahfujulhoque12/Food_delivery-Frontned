import React, { useEffect } from "react";

import Category from "../user/Category";

import useUpdateLocation from "@/hooks/useUpdateLocation";

const UserDashboard = () => {
  const { updateCurrentLocation, isPending } = useUpdateLocation();

  useEffect(() => {
    updateCurrentLocation();
  }, []);
  return (
    <div>
      <Category />
    </div>
  );
};

export default UserDashboard;
