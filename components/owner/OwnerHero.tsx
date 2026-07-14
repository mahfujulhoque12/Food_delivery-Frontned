import { useGetData } from "@/hooks/useGetData";
import React from "react";
import Loading from "../resuable/Loading";
import Error from "../resuable/Error";
import { IShop } from "@/response/shop.res";
import { FiArrowRight, FiStopCircle } from "react-icons/fi";
import Link from "next/link";
import Shop from "./Shop";

const OwnerHero = () => {
  const { data, isLoading, isError, refetch } = useGetData<IShop>({
    url: `/api/shop/get-shop`,
    params: {},
    queryKey: ["shop"],
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error onRetry={refetch} />;
  }
  return (
    <div className="wrapper mt-5">
      {data ? (
        <>
          <Shop data={data} />
        </>
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="w-full max-w-lg rounded-3xl border border-border-soft bg-bg-card p-10 text-center shadow-sm">
            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-light">
              <FiStopCircle className="text-brand-primary" size={40} />
            </div>

            {/* Title */}
            <h2 className="mt-6 text-3xl font-bold text-text-dark">
              No Shop Created
            </h2>

            {/* Description */}
            <p className="mt-3 text-text-muted leading-7">
              You haven't created a shop yet. Create your first shop to start
              managing your menu, receive orders, and grow your business.
            </p>

            {/* CTA */}
            <Link
              href="/add-shop"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-btn-dark px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-btn-dark-hover hover:gap-3"
            >
              Create New Shop
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerHero;
