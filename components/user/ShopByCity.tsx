"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import useCurrentCity from "@/hooks/useCurrentCity";
import Loading from "../resuable/Loading";
import Error from "../resuable/Error";
import { IShop, IFoodItem } from "@/response/shop.res";
import { BiMapPin, BiMinus, BiPlus } from "react-icons/bi";

import { CgShoppingBag } from "react-icons/cg";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

interface ShopByCityRes {
  shops: IShop[];
  selectedCategory: string;
}

const ShopByCity = ({ shops, selectedCategory }: ShopByCityRes) => {
  const [selectedShop, setSelectedShop] = useState<IShop | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? (selectedShop?.items ?? [])
      : (selectedShop?.items ?? []).filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase(),
        );
  const { addToCart, increment, decrement, getQuantity } = useCartStore();
  const { city, loading } = useCurrentCity();

  // ডাটা লোড হওয়ার পর ডিফল্টভাবে প্রথম শপটি সিলেক্ট করে রাখা
  useEffect(() => {
    if (shops && shops.length > 0) {
      setSelectedShop(shops[0]);
    }
  }, [shops]);

  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      loop: shops && shops.length > 5,
      dragFree: true,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ],
  );

  return (
    <section className="bg-bg-main min-h-screen py-12 transition-colors duration-300">
      <div className="wrapper max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-10 ">
          <div>
            <span className="text-brand-primary text-xs font-bold uppercase tracking-widest bg-brand-light px-3 py-1.5 rounded-full border border-border-focus/40">
              ⚡ Explore Local Eats
            </span>
            <h2 className="mt-4 head-1">Browse by City</h2>
            <div className="mt-2 para-3">
              <BiMapPin className="w-4 h-4 text-brand-primary animate-pulse" />
              <span className="font-medium text-sm md:text-base">
                {loading ? "Locating you..." : `Top Rated Vendors in ${city}`}
              </span>
            </div>
          </div>
          <p className="para-2">
            Discover culinary gems near you. Click on any restaurant below to
            view their exclusive menu items.
          </p>
        </div>

        {/* --- Shops Carousel --- */}
        <div className="overflow-hidden py-4 -mx-4 px-4" ref={emblaRef}>
          <div className="flex gap-5">
            {shops?.map((shop) => {
              const isSelected = selectedShop?._id === shop._id;
              return (
                <Link
                  href={`/shop/${shop._id}`}
                  key={shop._id}
                  onClick={() => setSelectedShop(shop)}
                  className="min-w-0 flex-[0_0_70%] sm:flex-[0_0_40%] md:flex-[0_0_30%] lg:flex-[0_0_22%] xl:flex-[0_0_18%] cursor-pointer select-none"
                >
                  <div
                    className={`group relative rounded-2xl border bg-bg-card p-5 transition-all duration-300 shadow-sm hover:shadow-md ${
                      isSelected
                        ? "border-brand-primary ring-2 ring-border-focus bg-brand-light/20 -translate-y-1"
                        : "border-border-soft hover:border-brand-accent/50"
                    }`}
                  >
                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-bg-main ring-4 ring-bg-main shadow-inner">
                      <Image
                        src={shop.image}
                        alt={shop.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>

                    <h3 className="mt-4 text-center text-sm font-bold text-text-dark line-clamp-1 group-hover:text-brand-primary transition-colors">
                      {shop.name}
                    </h3>
                    <p className="mt-1 text-center text-xs font-medium text-text-muted">
                      {shop.items?.length || 0} Flavors Available
                    </p>

                    {isSelected && (
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brand-primary animate-ping" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* --- Active Shop's Food Items Grid --- */}
        {selectedShop && (
          <div className="mt-4 animate-fade-in">
            <div className="border-b border-border-soft pb-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="head-2">
                  Menu from{" "}
                  <span className="text-brand-primary">
                    {selectedShop.name}
                  </span>
                </h3>
                <p className="para-4">
                  <BiMapPin className="w-3 h-3" /> {selectedShop.address},{" "}
                  {selectedShop.city}
                </p>
              </div>
              <span className="para-2">
                Total {filteredItems.length || 0} Items
              </span>
            </div>

            {filteredItems?.length === 0 ? (
              <div className="text-center py-16 bg-bg-card rounded-2xl border border-border-soft">
                <p className="text-text-muted font-medium">
                  No menu items found for this restaurant.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredItems?.map((item: IFoodItem) => {
                  const quantity = getQuantity(item._id);

                  return (
                    <div
                      key={item._id}
                      className="group flex flex-col justify-between bg-bg-card rounded-2xl border border-border-soft p-4 transition-all duration-300 hover:shadow-lg hover:border-border-focus"
                    >
                      {/* Item Image & Meta */}
                      <div>
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-bg-main mb-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 20vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-2 left-2 text-[10px] font-bold tracking-wide uppercase px-2 py-1 bg-btn-dark/80 backdrop-blur-sm text-white rounded-md">
                            {item.foodType}
                          </span>
                        </div>

                        {/* Rating & Category */}
                        <div className="flex items-center justify-between gap-1 text-xs mb-1.5">
                          <span className="text-text-light font-medium">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-0.5 text-amber-500 font-semibold">
                            <MdOutlineStarPurple500 className="w-3.5 h-3.5 fill-current" />
                            <span>{item.rating?.average || "4.5"}</span>
                            <span className="text-text-light text-[10px]">
                              ({item.rating?.count || 20})
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-text-dark text-base tracking-tight line-clamp-1 group-hover:text-brand-primary transition-colors">
                          {item.name}
                        </h4>
                      </div>

                      {/* Pricing and Action Button */}
                      <div className="mt-5 pt-3 border-t border-border-soft flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-text-light font-bold uppercase tracking-wider">
                            Price
                          </span>
                          <span className="text-lg font-black text-text-dark">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>

                        {/* Interactive Quantity/Cart Control */}
                        {quantity > 0 ? (
                          <div className="flex items-center bg-btn-dark text-white rounded-xl overflow-hidden shadow-sm h-10 transition-all duration-200">
                            <button
                              onClick={() => decrement(item._id)}
                              className="px-2.5 h-full hover:bg-btn-dark-hover active:scale-95 transition-all text-brand-accent cursor-pointer"
                            >
                              <BiMinus className="w-4 h-4 stroke-[3]" />
                            </button>
                            <span className="px-2 font-bold text-sm min-w-[1.5rem] text-center select-none">
                              {quantity}
                            </span>
                            <button
                              onClick={() => increment(item._id)}
                              className="px-2.5 h-full hover:bg-btn-dark-hover active:scale-95 transition-all text-brand-accent cursor-pointer"
                            >
                              <BiPlus className="w-4 h-4 stroke-[3]" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              addToCart({
                                _id: item._id,
                                name: item.name,
                                image: item.image,
                                price: item.price,
                                foodType: item.foodType,
                                category: item.category,
                                shopId: selectedShop._id,
                                shopName: selectedShop.name,
                              })
                            }
                            className="flex items-center gap-2 px-4 h-10 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm shadow-brand-primary/20 active:scale-98 cursor-pointer"
                          >
                            <CgShoppingBag className="w-3.5 h-3.5" />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopByCity;
