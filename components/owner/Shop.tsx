import Image from "next/image";
import { FiMapPin, FiPackage, FiUser, FiCheckCircle } from "react-icons/fi";
import { IShop } from "@/response/shop.res";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { useDeleteMutation } from "@/hooks/useDeleteMutation";
import { useState } from "react";
import DeleteConfirmModal from "../resuable/DeleteConfirmModal";

interface Props {
  data: IShop;
}

const Shop = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const { mutate: deleteItem, isPending } = useDeleteMutation({
    url: "/api/item/delete-item",
    invalidateQueries: [["shop"]],
  });

  const handleDelete = () => {
    deleteItem(selectedId, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };
  return (
    <section className="bg-bg-main py-10">
      <div className="wrapper">
        <div className="w-full overflow-hidden rounded-3xl border border-border-soft bg-bg-card shadow-lg">
          {/* Banner */}
          <div className="relative  w-full">
            <Link
              title="Edit Shop"
              href={"/add-shop"}
              className="bg-brand-primary px-3 py-1.5 rounded-full w-12 h-12 flex absolute right-5 top-5 text-white z-20"
            >
              <CiEdit size={35} />
            </Link>
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
              <div className="mb-4  inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-1 text-sm font-medium">
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

            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3.5 text-sm font-semibold  shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 active:scale-95 text-white cursor-pointer"
              href={"/add-item"}
            >
              Add Item
            </Link>
          </div>

          {/* Item Grid */}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.items.map((item) => (
              <>
                <div
                  key={item._id}
                  className="group overflow-hidden rounded-2xl border border-border-soft bg-bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-btn-dark px-3 py-1 text-xs font-semibold text-white">
                      {item.foodType}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 p-5">
                    <div>
                      <h3 className="line-clamp-1 text-lg font-bold text-text-dark">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-text-light">
                        {item.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-brand-primary">
                          ৳{item.price}
                        </span>

                        <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1">
                          <span className="text-yellow-500">⭐</span>

                          <span className="text-sm font-semibold text-text-dark">
                            {item.rating?.average?.toFixed(1) ?? "0.0"}
                          </span>

                          <span className="text-xs text-text-light">
                            ({item.rating?.count ?? 0})
                          </span>
                        </div>
                      </div>

                      <span className="rounded-full bg-bg-main px-3 py-1 text-xs font-medium text-text-dark">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Link
                        href={`/add-item/${item._id}`}
                        className="flex-1 rounded-xl border border-border-soft flex items-center justify-center text-white py-2 font-medium hover:text-brand-accent transition hover:bg-bg-main  bg-brand-accent"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => {
                          setSelectedId(item._id);
                          setOpen(true);
                        }}
                        disabled={isPending}
                        className="flex-1 rounded-xl bg-red-500 py-2 font-medium text-white transition hover:bg-red-600 cursor-pointer"
                      >
                        {isPending ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
                <DeleteConfirmModal
                  open={open}
                  onClose={() => setOpen(false)}
                  onConfirm={handleDelete}
                  isLoading={isPending}
                  title={`Delete Food Item ${item.name}`}
                  description="This item will be permanently removed from your menu."
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
