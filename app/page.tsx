"use client";

import { useAuthStore } from "@/store/authStore";
import ProtectedRoute from "@/components/provider/ProtectedRoute";
import UserDashboard from "@/components/dashboard/UserDashboard";
import OwnerDashboard from "@/components/dashboard/OwnerDashboard";
import DeliveryBoyDashboard from "@/components/dashboard/DeliveryBoyDashboard";

export default function Home() {
  const { token, user } = useAuthStore();
  console.log(user, "user");
  console.log(token, "token");

  return (
    <ProtectedRoute>
      {user?.role === "user" && <UserDashboard />}
      {user?.role === "owner" && <OwnerDashboard />}
      {user?.role === "deliveryBoy" && <DeliveryBoyDashboard />}
    </ProtectedRoute>
  );
}
