"use client";

import { useGetData } from "@/hooks/useGetData";
import { useAuthStore } from "@/store/authStore";
import { FaMotorcycle, FaPhoneAlt } from "react-icons/fa";
import Loading from "../resuable/Loading";
import Error from "../resuable/Error";
import { IDeliveryAssignment } from "@/response/order.res";
import { api } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

const DeliveryBoyMain = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { data, isLoading, isError, refetch } = useGetData<
    IDeliveryAssignment[]
  >({
    url: "/api/item/get-assignments",
    queryKey: ["get-assignments"],
  });

  const handleAcceptOrder = async (assignmentId: any) => {
    try {
      setLoadingId(assignmentId);
      const res = await api.get(`/api/item/accept-order/${assignmentId}`);
      await queryClient.invalidateQueries({
        queryKey: ["get-assignments"],
      });
      toast.success("Order Accepted successfully.");
      console.log(res, "res on accept order");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to accept order.");
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error onRetry={refetch} />;
  }
  return (
    <div className="wrapper py-8 space-y-8">
      {/* Hero */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-brand-primary to-orange-500 text-white shadow-xl">
        <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/20 bg-white/20 text-4xl font-bold backdrop-blur">
              {user?.full_name.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-white/80">Welcome Back 👋</p>

              <h1 className="mt-1 text-4xl font-bold">{user?.full_name}</h1>

              <p className="mt-3 flex items-center gap-2 text-lg text-white/90">
                <FaMotorcycle />
                Delivery Partner
              </p>
            </div>
          </div>

          {/* Online Card */}

          <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
            <p className="text-sm text-white/70">Current Status</p>

            <div className="mt-3 flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>

                <span className="relative inline-flex h-4 w-4 rounded-full bg-green-400"></span>
              </span>

              <span className="text-xl font-bold">Online</span>
            </div>

            <p className="mt-3 text-sm text-white/70">
              Ready to receive delivery requests
            </p>
          </div>
        </div>
      </div>
      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Assignments */}

        <div className="rounded-3xl border border-border-soft bg-bg-card p-6 shadow-sm">
          <p className="text-text-light">Active Assignments</p>

          <h2 className="mt-3 text-4xl font-bold text-brand-primary">
            {data?.length ?? 0}
          </h2>
        </div>

        {/* Phone */}

        <div className="rounded-3xl border border-border-soft bg-bg-card p-6 shadow-sm">
          <p className="text-text-light">Phone Number</p>

          <h2 className="mt-3 font-semibold text-text-dark">{user?.mobile}</h2>
        </div>

        {/* Latitude */}

        <div className="rounded-3xl border border-border-soft bg-bg-card p-6 shadow-sm">
          <p className="text-text-light">Latitude</p>

          <h2 className="mt-3 font-semibold text-text-dark">
            {user?.location.coordinates[1].toFixed(5)}
          </h2>
        </div>

        {/* Longitude */}

        <div className="rounded-3xl border border-border-soft bg-bg-card p-6 shadow-sm">
          <p className="text-text-light">Longitude</p>

          <h2 className="mt-3 font-semibold text-text-dark">
            {user?.location.coordinates[0].toFixed(5)}
          </h2>
        </div>
      </div>
      {/* ================= Active Assignments ================= */}

      <div className="rounded-3xl border border-border-soft bg-bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border-soft p-6">
          <div>
            <h2 className="text-2xl font-bold text-text-dark">
              🚚 Active Delivery Assignments
            </h2>

            <p className="mt-1 text-text-light">Orders waiting for delivery</p>
          </div>

          <div className="rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white">
            {data?.length ?? 0} Active
          </div>
        </div>

        <div className="p-6">
          {!data?.length ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border-soft bg-bg-main py-20 text-center">
              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-bg-card text-5xl">
                🛵
              </div>

              <h3 className="text-2xl font-bold text-text-dark">
                No Active Deliveries
              </h3>

              <p className="mt-3 max-w-md text-text-light">
                You're all caught up! New delivery requests will appear here
                automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {data.map((assignment) => (
                <div
                  key={assignment.assignmentId}
                  className="overflow-hidden rounded-3xl border border-border-soft bg-bg-main transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Header */}
                  <div className="flex flex-col gap-5 border-b border-border-soft bg-bg-card p-6 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-text-dark">
                        {assignment.shopName}
                      </h3>

                      <p className="mt-2 text-text-light">
                        Order #{assignment.orderId.slice(-8).toUpperCase()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-text-light">Order Total</p>

                      <h2 className="text-3xl font-bold text-brand-primary">
                        ৳ {assignment.subtotal}
                      </h2>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="grid gap-6 p-6 lg:grid-cols-2">
                    {/* Delivery Address */}
                    <div className="rounded-2xl border border-border-soft bg-bg-card p-5">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-xl text-white">
                          📍
                        </div>

                        <div>
                          <h4 className="font-bold text-text-dark">
                            Delivery Address
                          </h4>

                          <p className="text-sm capitalize text-text-light">
                            Customer Name: {assignment.customerName}
                          </p>
                        </div>
                      </div>

                      <p className="leading-7 text-text-dark">
                        {assignment.deliveryAddress.text}
                      </p>
                    </div>

                    {/* Order Summary */}
                    <div className="rounded-2xl border border-border-soft bg-bg-card p-5">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-xl text-white">
                          🍔
                        </div>

                        <div>
                          <h4 className="font-bold text-text-dark">
                            Order Summary
                          </h4>

                          <p className="text-sm text-text-light">
                            {assignment.items.length} Item(s)
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {assignment.items.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center justify-between rounded-xl bg-bg-main p-3"
                          >
                            <div>
                              <h5 className="font-semibold text-text-dark">
                                {item.name}
                              </h5>

                              <p className="text-sm text-text-light">
                                Qty × {item.qty}
                              </p>
                            </div>

                            <span className="font-bold text-brand-primary">
                              ৳ {item.price * item.qty}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col gap-4 border-t border-border-soft bg-bg-card p-6 md:flex-row md:justify-end">
                    <button className="rounded-2xl border border-border-soft px-6 py-3 font-semibold text-text-dark transition hover:border-brand-primary cursor-pointer">
                      View Route
                    </button>

                    <button
                      disabled={loadingId === assignment.assignmentId}
                      onClick={() => handleAcceptOrder(assignment.assignmentId)}
                      className="rounded-2xl bg-brand-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 cursor-pointer disabled:cursor-not-allowed disabled:opacity-75"
                    >
                      {loadingId ? "Accepting..." : "  Accept Delivery"}
                    </button>
                  </div>
                  <div className="border-t border-border-soft bg-bg-card p-6">
                    {/* Quick Info */}
                    <div className="mb-6 grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl border border-border-soft bg-bg-main p-4">
                        <p className="text-sm text-text-light">Assignment ID</p>

                        <h4 className="mt-2 font-semibold text-text-dark">
                          #{assignment.assignmentId.slice(-8).toUpperCase()}
                        </h4>
                      </div>

                      <div className="rounded-2xl border border-border-soft bg-bg-main p-4">
                        <p className="text-sm text-text-light">Items</p>

                        <h4 className="mt-2 text-2xl font-bold text-brand-primary">
                          {assignment.items.length}
                        </h4>
                      </div>

                      <div className="rounded-2xl border border-border-soft bg-bg-main p-4">
                        <p className="text-sm text-text-light">Order Value</p>

                        <h4 className="mt-2 text-2xl font-bold text-brand-primary">
                          ৳ {assignment.subtotal}
                        </h4>
                      </div>
                    </div>

                    {/* Buttons */}

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <button
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps?q=${assignment.deliveryAddress.latitude},${assignment.deliveryAddress.longitude}`,
                            "_blank",
                          )
                        }
                        className="rounded-2xl border border-border-soft cursor-pointer bg-bg-main py-3 font-semibold text-text-dark transition hover:border-brand-primary"
                      >
                        📍 Open Map
                      </button>

                      <button
                        onClick={() =>
                          window.open(`tel:${assignment.customerPhone}`)
                        }
                        className="rounded-2xl border border-border-soft cursor-pointer bg-bg-main py-3 font-semibold text-text-dark transition hover:border-brand-primary"
                      >
                        📞 Call Customer
                      </button>

                      <button className="rounded-2xl bg-orange-500 py-3 font-semibold cursor-pointer text-white transition hover:opacity-90">
                        🍔 Picked Up
                      </button>

                      <button className="rounded-2xl bg-brand-primary cursor-pointer py-3 font-semibold text-white transition hover:opacity-90">
                        ✅ Delivered
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* ================= Assignment Action Center ================= */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyMain;
