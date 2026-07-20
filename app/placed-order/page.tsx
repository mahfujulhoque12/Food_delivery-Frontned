"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { FaArrowRight, FaCheckCircle, FaClipboardList } from "react-icons/fa";

const Page = () => {
  const router = useRouter();
  const { token, user } = useAuthStore();
  useEffect(() => {
    if (!token || !user) {
      router.replace("/signin");
    }
  }, [token, user, router]);
  return (
    <section className="bg-bg-main min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl rounded-3xl border border-border-soft bg-bg-card p-8 shadow-xl">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-green-100">
            <FaCheckCircle className="text-6xl text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <div className="mt-8 text-center">
          <h1 className="text-text-dark text-4xl font-bold">
            Order Placed Successfully!
          </h1>

          <p className="mt-4 text-gray-500">
            Thank you for your order. Our restaurant has received it and is
            preparing your delicious meal.
          </p>
        </div>

        {/* Notice */}
        <div className="mt-6 rounded-xl border border-brand-primary/20 bg-brand-primary/10 p-4">
          <p className="text-center text-sm text-text-dark">
            You can track your order status anytime from the{" "}
            <span className="font-semibold text-brand-primary">My Orders</span>{" "}
            page.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/my-order"
            className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-btn-dark px-6 py-4 font-semibold text-white transition hover:opacity-90"
          >
            <FaClipboardList />
            Back to My Orders
          </Link>

          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-3 rounded-xl border border-border-soft px-6 py-4 font-semibold text-text-dark transition hover:bg-bg-main"
          >
            Continue Shopping
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page;
