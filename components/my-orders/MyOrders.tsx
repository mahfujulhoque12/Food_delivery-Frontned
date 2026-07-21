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
import UserOrder from "./UserOrder";
import OwnerOrder from "./OwnerOrder";

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
  console.log(orders, "orders");

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
        <div>
          {user?.role === "user" ? (
            <UserOrder orders={orders ?? []} />
          ) : (
            <div>
              <OwnerOrder orders={orders ?? []} />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default MyOrders;
