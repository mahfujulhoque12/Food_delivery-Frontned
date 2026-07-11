"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { UserRole } from "../auth/SignUp";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) {
  const router = useRouter();

  const { token, user, hydrated } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return;

    if (!token || !user) {
      router.replace("/signin");
      return;
    }

    if (allowedRoles.length && !allowedRoles.includes(user.role as UserRole)) {
      router.replace("/unauthorized");
    }
  }, [hydrated, token, user, allowedRoles, router]);

  if (!hydrated) return null;

  if (!token || !user) return null;

  if (allowedRoles.length && !allowedRoles.includes(user.role as UserRole)) {
    return null;
  }

  return <>{children}</>;
}
