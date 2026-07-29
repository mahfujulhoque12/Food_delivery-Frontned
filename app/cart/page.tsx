"use client";
import Cart from "@/components/cart/Cart";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

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
      <Cart />
    </div>
  );
};

export default page;
