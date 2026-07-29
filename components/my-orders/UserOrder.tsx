import { IOrderProps } from "@/response/order.res";
import Link from "next/link";
import React from "react";
import {
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaReceipt,
  FaStore,
} from "react-icons/fa";
interface OrderProps {
  orders: IOrderProps[];
}

const UserOrder = ({ orders }: OrderProps) => {
  return (
    <div className="space-y-6">
      {orders?.map((order) => (
        <div
          key={order._id}
          className="overflow-hidden rounded-3xl border border-border-soft bg-bg-card shadow-sm transition hover:shadow-lg "
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
                  <p className="text-sm text-gray-500">Delivery Address</p>

                  <p className="text-sm text-text-dark">
                    {order.deliveryAddress.text}
                  </p>
                </div>
              </div>
              <Link
                href={`/track-order/${order._id}`}
                className="inline-flex items-center gap-2 rounded-xl bg-btn-dark px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:opacity-90 active:scale-95"
              >
                <FaMapMarkedAlt className="text-base" />
                <span>Track Order</span>
              </Link>
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

                          <span className="font-semibold">${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrder;
