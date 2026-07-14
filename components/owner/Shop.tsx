import Image from "next/image";
import { FiMapPin, FiPackage, FiUser, FiCheckCircle } from "react-icons/fi";
import { IShop } from "@/response/shop.res";

interface Props {
  data: IShop;
}

const Shop = ({ data }: Props) => {
  return (
    <section className="bg-bg-main py-10">
      <div className="wrapper">
        <div className="w-full overflow-hidden rounded-3xl border border-border-soft bg-bg-card shadow-lg">
          {/* Banner */}
          <div className="relative  w-full">
            <Image
              src={data.image}
              alt={data.name}
              priority
              width={1800}
              height={500}
              className="object-cover h-[500px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-8 left-8 text-white">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-1 text-sm font-medium">
                <FiCheckCircle />
                Open Now
              </div>

              <h1 className="text-4xl font-bold">{data.name}</h1>

              <div className="mt-3 flex flex-wrap gap-5 text-sm opacity-95">
                <span className="flex items-center gap-2">
                  <FiMapPin />
                  {data.address}
                </span>

                <span>
                  {data.city}, {data.state}
                </span>
              </div>
            </div>
          </div>

          {/* Shop Details */}
          <div className="grid gap-6 p-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border-soft bg-bg-main p-6">
              <div className="mb-3 flex items-center gap-3 text-brand-primary">
                <FiPackage size={22} />
                <h3 className="font-semibold text-text-dark">Total Items</h3>
              </div>

              <p className="text-3xl font-bold text-text-dark">
                {data.items.length}
              </p>
            </div>

            <div className="rounded-2xl border border-border-soft bg-bg-main p-6">
              <div className="mb-3 flex items-center gap-3 text-brand-primary">
                <FiUser size={22} />
                <h3 className="font-semibold text-text-dark">Shop Owner</h3>
              </div>

              <p className="font-semibold text-text-dark">
                {data.owner.full_name}
              </p>

              <p className="mt-1 text-sm text-gray-500">{data.owner.email}</p>
            </div>

            <div className="rounded-2xl border border-border-soft bg-bg-main p-6">
              <div className="mb-3 flex items-center gap-3 text-brand-primary">
                <FiMapPin size={22} />
                <h3 className="font-semibold text-text-dark">Location</h3>
              </div>

              <p className="text-text-dark">
                {data.city}, {data.state}
              </p>

              <p className="mt-1 text-sm text-gray-500">{data.address}</p>
            </div>
          </div>
        </div>

        {/* ================= Items ================= */}

        <div className="mt-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-text-dark">Our Menu</h2>

              <p className="mt-2 text-gray-500">
                Delicious foods prepared fresh every day.
              </p>
            </div>

            <div className="rounded-full bg-btn-dark px-5 py-2 font-medium text-white">
              {data.items.length} Items
            </div>
          </div>

          {/* Item Grid */}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[300px] animate-pulse rounded-2xl border border-border-soft bg-bg-card"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
