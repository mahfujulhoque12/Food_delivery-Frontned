"use client";

import Image from "next/image";
import Error from "@/components/resuable/Error";
import Loading from "@/components/resuable/Loading";
import { useGetData } from "@/hooks/useGetData";
import { IShop } from "@/response/shop.res";
import { IFoodItem } from "@/response/shop.res";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useParams } from "next/navigation";

interface SingleShop {
  items: IFoodItem[];
  shop: IShop;
}

const Page = () => {
  const { id } = useParams();

  const { data, isLoading, isError, refetch } = useGetData<SingleShop>({
    url: `/api/item/get-item-byShop/${id}`,
    queryKey: ["get-item", id as any],
  });

  console.log(data, "Data of shop");
  if (isLoading) return <Loading />;
  if (isError) return <Error onRetry={refetch} />;

  return (
    <div className="bg-bg-main min-h-screen">
      {/* Hero */}
      <div className="relative h-72 w-full">
        <Image
          src={data?.shop.image || "/placeholder.png"}
          alt={data?.shop.name || ""}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-0 left-0 w-full">
          <div className="wrapper py-8 text-white">
            <h1 className="text-4xl font-bold">{data?.shop.name}</h1>

            <div className="flex items-center gap-2 mt-3 text-white/90">
              <FaMapMarkerAlt className="text-brand-primary text-lg" />
              <p>
                {data?.shop.address}, {data?.shop.state}, {data?.shop.city}
              </p>
            </div>

            <p className="mt-4 text-white/80">
              {data?.items.length} Foods Available
            </p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="wrapper py-12">
        <h2 className="text-3xl font-bold text-text-dark mb-8">
          Popular Foods
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.items.map((item) => (
            <div
              key={item._id}
              className="bg-bg-card rounded-2xl overflow-hidden border border-border-soft shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-56">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-text-dark">
                    {item.name}
                  </h3>

                  <span className="text-brand-primary font-bold text-lg">
                    ৳{item.price}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {item.category} • {item.foodType}
                </p>

                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-sm" />

                    <span className="font-medium text-text-dark">
                      {item.rating.average}
                    </span>

                    <span className="text-gray-500 text-sm">
                      ({item.rating.count})
                    </span>
                  </div>

                  <button className="bg-btn-dark text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:opacity-90 transition">
                    <IoCartOutline size={18} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data?.items.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-text-dark">
              No Food Found
            </h3>

            <p className="text-gray-500 mt-2">
              This shop hasn't added any food yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
