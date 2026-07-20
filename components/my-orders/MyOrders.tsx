"use client";

import Link from "next/link";
import { useGetData } from "@/hooks/useGetData";
import { IOrderProps } from "@/response/order.res";
import Loading from "../resuable/Loading";
import Error from "../resuable/Error";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaReceipt,
  FaStore,
} from "react-icons/fa";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MyOrders = () => {
  const router = useRouter();
  const { token, user } = useAuthStore();
  useEffect(() => {
    if (!token || !user) {
      router.replace("/signin");
    }
  }, [token, user, router]);
  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useGetData<IOrderProps[]>({
    url: "/api/item/get-orders",
    queryKey: ["get-orders"],
  });
  console.log(orders, "dd");

  console.log(typeof orders, "type");
  console.log(Array.isArray(orders), "array");

  if (isLoading) return <Loading />;
  if (isError) return <Error onRetry={refetch} />;

  return (
    <section className="wrapper py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-dark">My Orders</h1>
        <p className="mt-2 text-gray-500">
          View all of your previous food orders.
        </p>
      </div>

      {orders?.length === 0 ? (
        <div className="rounded-3xl border border-border-soft bg-bg-card py-20 text-center">
          <h2 className="text-2xl font-semibold text-text-dark">
            No Orders Yet
          </h2>

          <p className="mt-3 text-gray-500">
            Looks like you haven't ordered anything.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-btn-dark px-6 py-3 text-white"
          >
            Browse Foods
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {user?.role === "user" ? (
            orders?.map((order) => (
              <div
                key={order._id}
                className="overflow-hidden rounded-3xl border border-border-soft bg-bg-card shadow-sm transition hover:shadow-lg"
              >
                {/* Header */}
                <div className="flex flex-col gap-4 border-b border-border-soft p-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>

                    <h2 className="font-bold text-brand-primary">
                      #{order._id.slice(-8).toUpperCase()}
                    </h2>
                  </div>

                  {/* status  */}
                  <div>
                    <p className="text-sm text-gray-500">Status</p>

                    <h2 className="font-bold text-brand-primary capitalize">
                      {order?.shopOrders[0]?.status}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500">
                    <FaCalendarAlt />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Body */}
                <div className="grid gap-6 p-6 lg:grid-cols-3">
                  {/* Left */}
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <FaMoneyBillWave className="mt-1 text-brand-primary" />

                      <div>
                        <p className="text-sm text-gray-500">Payment</p>

                        <h3 className="font-semibold capitalize">
                          {order.paymentMethod}
                        </h3>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <FaReceipt className="mt-1 text-brand-primary" />

                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>

                        <h3 className="text-xl font-bold text-brand-primary">
                          ${order.totalAmount}
                        </h3>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <FaMapMarkerAlt className="mt-1 text-brand-primary" />

                      <div>
                        <p className="text-sm text-gray-500">
                          Delivery Address
                        </p>

                        <p className="text-sm text-text-dark">
                          {order.deliveryAddress.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Shops */}
                  <div className="lg:col-span-2">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-text-dark">
                      <FaStore className="text-brand-primary" />
                      Ordered From
                    </h3>

                    <div className="space-y-4">
                      {order.shopOrders.map((shopOrder) => (
                        <div
                          key={shopOrder._id}
                          className="rounded-2xl border border-border-soft bg-bg-main p-4"
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <h4 className="font-bold text-text-dark">
                              {shopOrder.shop.name}
                            </h4>

                            <span className="font-semibold text-brand-primary">
                              ${shopOrder.subtotal}
                            </span>
                          </div>

                          <div className="space-y-3">
                            {shopOrder.shopOrderItems.map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center gap-3">
                                  <img
                                    src={item.item.image}
                                    alt={item.name}
                                    className="h-14 w-14 rounded-xl object-cover"
                                  />

                                  <div>
                                    <h5 className="font-medium text-text-dark">
                                      {item.name}
                                    </h5>

                                    <p className="text-sm text-gray-500">
                                      Qty: {item.qty}
                                    </p>
                                  </div>
                                </div>

                                <span className="font-semibold">
                                  ${item.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-6">
              {orders?.map((order) => (
                <div
                  key={order._id}
                  className="overflow-hidden rounded-3xl border border-border-soft bg-bg-card shadow-sm transition hover:shadow-lg"
                >
                  {/* Header */}
                  <div className="flex flex-col gap-4 border-b border-border-soft p-6 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>

                      <h2 className="font-bold text-brand-primary">
                        #{order._id.slice(-8).toUpperCase()}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="rounded-xl bg-bg-main px-5 py-3 text-right">
                      <p className="text-sm text-gray-500">Payment</p>

                      <h3 className="font-semibold uppercase">
                        {order.paymentMethod}
                      </h3>
                    </div>
                  </div>

                  <div className="grid gap-6 p-6 lg:grid-cols-3">
                    {/* Customer + Address */}
                    <div className="space-y-6">
                      {/* Customer */}
                      <div className="rounded-2xl bg-bg-main p-5">
                        <h3 className="mb-4 text-lg font-bold text-text-dark">
                          Customer Information
                        </h3>

                        <div className="space-y-2">
                          <p>
                            <span className="font-semibold">Name:</span>{" "}
                            {order.user.full_name}
                          </p>

                          <p>
                            <span className="font-semibold">Email:</span>{" "}
                            {order.user.email}
                          </p>

                          <p>
                            <span className="font-semibold">Phone:</span>{" "}
                            {order.user.mobile}
                          </p>
                        </div>
                      </div>

                      {/* Delivery */}
                      <div className="rounded-2xl bg-bg-main p-5">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                          <FaMapMarkerAlt className="text-brand-primary" />
                          Delivery Address
                        </h3>

                        <p className="text-gray-600">
                          {order.deliveryAddress.text}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="lg:col-span-2">
                      {order.shopOrders.map((shopOrder) => (
                        <div
                          key={shopOrder._id}
                          className="rounded-2xl border border-border-soft bg-bg-main p-5"
                        >
                          <div className="mb-5 flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-text-dark">
                                {shopOrder.shop.name}
                              </h3>

                              <p className="text-sm text-gray-500">
                                {shopOrder.shopOrderItems.length} Item(s)
                              </p>
                            </div>

                            <h2 className="text-xl font-bold text-brand-primary">
                              ${shopOrder.subtotal}
                            </h2>
                          </div>

                          <div className="space-y-4">
                            {shopOrder.shopOrderItems.map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center justify-between rounded-xl border border-border-soft bg-bg-card p-4"
                              >
                                <div className="flex items-center gap-4">
                                  <img
                                    src={item.item.image}
                                    alt={item.name}
                                    className="h-16 w-16 rounded-xl object-cover"
                                  />

                                  <div>
                                    <h4 className="font-semibold text-text-dark">
                                      {item.name}
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                      Quantity : {item.qty}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                      Unit Price : ${item.price}
                                    </p>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <p className="text-sm text-gray-500">Total</p>

                                  <h3 className="text-lg font-bold text-brand-primary">
                                    ${item.qty * item.price}
                                  </h3>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="mt-6 border-t border-border-soft pt-5">
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold">
                                Shop Total
                              </span>

                              <span className="text-2xl font-bold text-brand-primary">
                                ${shopOrder.subtotal}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default MyOrders;
