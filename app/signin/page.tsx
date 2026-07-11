"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignIn from "@/components/auth/SignIn";
import { useAuthStore } from "@/store/authStore";

const Page = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  if (user) return null;

  return <SignIn />;
};

export default Page;
