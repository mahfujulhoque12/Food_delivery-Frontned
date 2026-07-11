"use client";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";

export default function Home() {
  const { token, user } = useAuthStore();
  console.log(token, "token");
  console.log(user, "user");
  return <div>h1 </div>;
}
