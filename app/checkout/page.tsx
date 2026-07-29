"use client";
import Checkout from "@/components/checkout/Checkout";
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
      <Checkout />
    </div>
  );
};

export default page;
