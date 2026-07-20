"use client";
import Checkout from "@/components/checkout/Checkout";
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
      <Checkout />
    </div>
  );
};

export default page;
