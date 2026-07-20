"use client";
import MyOrders from "@/components/my-orders/MyOrders";
import Navbar from "@/components/user-page/Navbar";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const { token, user } = useAuthStore();
  useEffect(() => {
    if (!token || !user) {
      router.replace("/signin");
    }
  }, [token, user, router]);
  return (
    <div>
      <Navbar />
      <MyOrders />
    </div>
  );
};

export default page;
