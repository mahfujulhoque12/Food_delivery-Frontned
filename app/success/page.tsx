"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { FaCircleCheck } from "react-icons/fa6";

const SuccessPage = () => {
  const router = useRouter();
  const { clearCart } = useCartStore();

  // পেমেন্ট সফল হওয়ার পর ফ্রন্টএন্ডের কার্ট ক্লিয়ার করে দেওয়া ভালো
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-bg-main px-4">
      <div className="w-full max-w-md rounded-3xl border border-border-soft bg-bg-card p-8 text-center shadow-lg">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center text-brand-primary">
          <FaCircleCheck size={64} className="animate-bounce" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-extrabold text-text-dark">
          Payment Successful!
        </h1>
        <p className="mt-3 text-sm text-text-light">
          Thank you for your purchase. Your order has been placed successfully
          and is being processed.
        </p>

        {/* Order Details Preview Box */}
        <div className="my-6 rounded-2xl bg-brand-primary/5 p-4 border border-brand-primary/10">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
            Order Status
          </span>
          <p className="mt-1 font-bold text-text-dark">Confirmed & Paid</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/placed-order")}
            className="w-full cursor-pointer rounded-xl bg-brand-primary py-3 font-semibold text-white transition hover:opacity-90"
          >
            Track Your Order
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full cursor-pointer rounded-xl border border-border-soft bg-transparent py-3 font-semibold text-text-dark transition hover:bg-border-soft/20"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
