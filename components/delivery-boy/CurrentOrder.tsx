"use client";

import { useGetData } from "@/hooks/useGetData";
import Loading from "../resuable/Loading";
import Error from "../resuable/Error";
import { CurrentOrderResponse } from "@/response/order.res";
import dynamic from "next/dynamic";
import { useState } from "react";

// Safe dynamic initialization
const DeliveryTrackingMap = dynamic(() => import("./DeliveryTrackingMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: "450px" }}
      className="w-full bg-bg-main rounded-3xl animate-pulse flex items-center justify-center text-text-light text-sm"
    >
      🔄 Loading live map...
    </div>
  ),
});

const CurrentOrder = () => {
  const { data, isLoading, isError, refetch } =
    useGetData<CurrentOrderResponse>({
      url: "/api/item/get-current-order",
      queryKey: ["current-order"],
    });

  const [otpShow, setOtpShow] = useState(false);

  const handleSendOtp = () => {
    setOtpShow(true);
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error onRetry={refetch} />;

  return (
    <div className="wrapper py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-brand-primary to-orange-500 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Current Delivery</p>
              <h1 className="mt-2 text-3xl font-bold">
                Order #{data?.shopOrder._id.slice(-6).toUpperCase()}
              </h1>
            </div>
            <span className="rounded-full bg-white/20 px-5 py-2 font-semibold">
              {data?.shopOrder.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT (Customer Info + Items + Live Tracking) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Customer Details */}
            <div className="rounded-3xl border border-border-soft bg-bg-card p-6">
              <h2 className="mb-5 text-xl font-bold text-text-dark">
                Customer
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-text-light">Name</p>
                  <p className="font-semibold">{data?.user.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-text-light">Phone</p>
                  <p>{data?.user.mobile}</p>
                </div>
                <div>
                  <p className="text-sm text-text-light">Email</p>
                  <p>{data?.user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-text-light">Delivery Address</p>
                  <p>{data?.deliveryAddress.text}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="rounded-3xl border border-border-soft bg-bg-card p-6">
              <h2 className="mb-5 text-xl font-bold">Order Items</h2>
              <div className="space-y-4">
                {data?.shopOrder.shopOrderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between rounded-2xl bg-bg-main p-4"
                  >
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-text-light">
                        Qty : {item.qty}
                      </p>
                    </div>
                    <span className="font-bold text-brand-primary">
                      ${item.price}
                    </span>
                  </div>
                ))}

                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Subtotal</span>
                  <span>${data?.shopOrder.subtotal}</span>
                </div>
              </div>
            </div>

            {/* Live Tracking Map Section (FIXED: Loop er baahire pure layout a asche) */}
            {data?.customerLocation && data?.deliveryBoyLocation && (
              <div className="rounded-3xl border border-border-soft bg-bg-card p-6">
                <h2 className="mb-4 text-xl font-bold text-text-dark">
                  Live Tracking
                </h2>
                <DeliveryTrackingMap
                  customer={data.customerLocation}
                  deliveryBoy={data.deliveryBoyLocation}
                />
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR (Live Stats & Actions) */}
          <div className="space-y-6">
            {/* Location Coordinates */}
            <div className="rounded-3xl border border-border-soft bg-bg-card p-6">
              <h2 className="mb-4 text-xl font-bold">Live Location</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-text-light">Customer</p>
                  <p>
                    {data?.customerLocation.lat}, {data?.customerLocation.lon}
                  </p>
                </div>
                <div>
                  <p className="text-text-light">Delivery Boy</p>
                  <p>
                    {data!.deliveryBoyLocation.lat},{" "}
                    {data!.deliveryBoyLocation.lon}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="rounded-3xl border border-border-soft bg-bg-card p-6">
              <h2 className="mb-5 text-xl font-bold">Actions</h2>
              <div className="space-y-4">
                <button
                  onClick={() => window.open(`tel:${data?.user.mobile}`)}
                  className="w-full rounded-2xl bg-bg-main py-4 font-semibold text-text-dark cursor-pointer transition hover:opacity-90"
                >
                  📞 Call Customer
                </button>

                {!otpShow ? (
                  <button
                    onClick={handleSendOtp}
                    className="w-full rounded-2xl bg-btn-dark py-4 font-semibold text-white cursor-pointer transition hover:opacity-90"
                  >
                    ✅ Mark Delivered
                  </button>
                ) : (
                  <div className="p-4 bg-bg-main rounded-2xl border border-orange-100">
                    <p className="text-sm font-medium capitalize text-text-dark">
                      Get Otp from{" "}
                      <span className="text-orange-600 font-bold">
                        {data?.user.full_name}
                      </span>
                    </p>
                    <input type="text" name="" id="" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentOrder;
