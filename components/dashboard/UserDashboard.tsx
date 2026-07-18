import React from "react";
import Navbar from "../user-page/Navbar";
import Category from "../user/Category";
import ShopByCity from "../user/ShopByCity";

const UserDashboard = () => {
  return (
    <div>
      <Navbar />
      <Category />
      <ShopByCity />
    </div>
  );
};

export default UserDashboard;
