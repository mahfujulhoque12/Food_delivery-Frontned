"use client";

import Link from "next/link";
import {
  FaCircleXmark,
  FaArrowRotateLeft,
  FaCartShopping,
} from "react-icons/fa6";

const CancelPage = () => {
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-border-soft bg-bg-card p-8 shadow-lg text-center">
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <FaCircleXmark className="text-6xl text-red-500" />
        </div>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold text-text-dark">
          Payment Cancelled
        </h1>

        {/* Description */}
        <p className="mt-3 text-gray-600 leading-7">
          Your payment was not completed. No order has been placed. You can
          return to your cart and try the payment again whenever you're ready.
        </p>

        {/* Info Box */}
        <div className="mt-6 rounded-xl border border-border-soft bg-bg-main p-5 text-left">
          <h3 className="font-semibold text-text-dark mb-3">
            Possible Reasons
          </h3>

          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>You closed the Stripe checkout page.</li>
            <li>You clicked the cancel button.</li>
            <li>Your checkout session expired.</li>
            <li>You decided not to complete the payment.</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/cart"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-btn-dark px-5 py-3 font-medium text-white transition-all duration-300 hover:opacity-90"
          >
            <FaCartShopping />
            Back to Cart
          </Link>

          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border-soft px-5 py-3 font-medium text-text-dark transition-all duration-300 hover:bg-gray-100"
          >
            <FaArrowRotateLeft />
            Continue Shopping
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-500">
          If you're experiencing payment issues, please contact our support
          team.
        </p>
      </div>
    </div>
  );
};

export default CancelPage;
