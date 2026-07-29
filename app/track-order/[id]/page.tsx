"use client";
import Error from "@/components/resuable/Error";
import Loading from "@/components/resuable/Loading";
import Navbar from "@/components/user-page/Navbar";
import { useGetData } from "@/hooks/useGetData";
import { TrackOrderProps } from "@/response/order.res";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import OrderTrackingMapUser from "@/components/user/OrderTrackingMapUser";

const page = () => {
  const OrderTrackingMap = dynamic(
    () => import("@/components/user/OrderTrackingMapUser"),
    {
      ssr: false,
    },
  );
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetData<TrackOrderProps>({
    url: `/api/item/get-order-byId/${id}`,
    queryKey: ["get-order"],
  });
  const currentStatus = data?.shopOrders?.[0]?.status ?? "pending";
  console.log(data, "data track order");

  const statusList = ["pending", "preparing", "out of delivery", "delivered"];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error onRetry={refetch} />;
  }

  return (
    <div>
      <Navbar />
      <div className="wrapper py-8">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border-soft bg-bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-dark">
                  Track Order
                </h1>

                <p className="mt-1 text-sm text-text-light">
                  Order ID #{data?._id.slice(-8).toUpperCase()}
                </p>
              </div>

              <div className="rounded-xl bg-bg-main px-4 py-2">
                <p className="text-lg font-bold text-brand-primary">
                  ${data?.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* -------------- */}
          <div className="rounded-3xl border border-border-soft bg-bg-card p-6">
            <h2 className="mb-5 text-xl font-bold text-text-dark">
              Order Status
            </h2>

            <div className="space-y-5">
              {statusList.map((status, index) => {
                const currentIndex = statusList.indexOf(currentStatus);

                const active = index <= currentIndex;

                return (
                  <div key={status} className="flex items-center gap-4">
                    <div
                      className={`h-5 w-5 rounded-full ${
                        active ? "bg-brand-primary" : "bg-gray-300"
                      }`}
                    />

                    <div>
                      <p
                        className={`font-semibold capitalize ${
                          active ? "text-brand-primary" : "text-gray-400"
                        }`}
                      >
                        {status}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* ?----------------- */}
          <div className="rounded-3xl border border-border-soft bg-bg-card p-6">
            <h2 className="mb-3 text-xl font-bold text-text-dark">
              Delivery Address
            </h2>

            <p className="text-text-light">{data?.deliveryAddress.text}</p>
          </div>
          {/* =========== */}
          <div className="rounded-3xl border border-border-soft bg-bg-card p-6">
            <h2 className="mb-4 text-xl font-bold text-text-dark">
              Ordered Items
            </h2>

            <div className="space-y-3">
              {data?.shopOrders[0]?.shopOrderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between border-b border-border-soft pb-3"
                >
                  <div>
                    <p className="font-semibold text-text-dark">{item.name}</p>

                    <p className="text-sm text-text-light">Qty {item.qty}</p>
                  </div>

                  <p className="font-bold text-brand-primary">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
          {/* ============== */}
          <div className="rounded-3xl border border-border-soft bg-bg-card p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-text-light">Payment Method</p>

                <p className="font-semibold text-text-dark">
                  {data?.paymentMethod}
                </p>
              </div>

              <div className="text-right">
                <p className="text-text-light">Total</p>

                <p className="text-2xl font-bold text-brand-primary">
                  ${data?.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          {/* =========== */}
        </div>
        {data?.deliveryAddress &&
          data?.shopOrders?.[0]?.status !== "delivered" && (
            <div className="mt-8">
              <OrderTrackingMapUser
                customer={{
                  lat: data.deliveryAddress.latitude,
                  lon: data.deliveryAddress.longitude,
                }}
                deliveryBoy={{
                  lat: (
                    data.shopOrders?.[0]?.assignDeliveryBoy?.location as any
                  )?.coordinates?.[1],
                  lon: (
                    data.shopOrders?.[0]?.assignDeliveryBoy?.location as any
                  )?.coordinates?.[0],
                }}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default page;
