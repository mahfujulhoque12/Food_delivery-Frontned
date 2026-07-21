"use client";
import { api } from "@/lib/api";
import { IOrderProps } from "@/response/order.res";

import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";


interface OrderProps {
  orders: IOrderProps[];
}
const OwnerOrder = ({ orders }: OrderProps) => {
const queryClient = useQueryClient();
  console.log(orders, "orders");
  const handleStatusChange = async (
    orderId: string,
    shopId: string,
    status: string,
  ) => {
    try {
      await api.post(`/api/item/update-status/${orderId}/${shopId}`, {
        status,
      });
      await queryClient.invalidateQueries({
        queryKey: ["get-orders"],
      });
      toast.success("Order status updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status.");
    }
  };
  return (
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

            {/* status  */}
            <div className="space-y-3">
              {order.shopOrders.map((data) => (
                <div
                  key={data._id}
                  className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-bg-card p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-xs text-text-light">Order Status</p>
                    <p className="mt-1 font-semibold capitalize text-brand-primary">
                      {data.status}
                    </p>
                  </div>

                  <div className="w-full md:w-52">
                    <select
                      value={data.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          data.shop._id,
                          e.target.value,
                        )
                      }
                      className="w-full rounded-xl border border-border-soft bg-bg-main px-4 py-2 text-sm text-text-dark outline-none transition focus:border-brand-primary"
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="out of delivery">Out of Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            {/* status end */}

            <div className="rounded-xl bg-bg-main px-5 py-3 text-right">
              <p className="text-sm text-gray-500">Payment</p>

              <h3 className="font-semibold uppercase">{order.paymentMethod}</h3>
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

                <p className="text-gray-600">{order.deliveryAddress.text}</p>
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
                      <p>{shopOrder.status}</p>

                      <p className="text-sm text-gray-500">
                        {shopOrder.shopOrderItems.length} Item(s)
                      </p>
                    </div>
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
                      <span className="text-lg font-semibold">Shop Total</span>

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
  );
};

export default OwnerOrder;
