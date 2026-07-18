"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { categories } from "@/data/data";
import useCurrentCity from "@/hooks/useCurrentCity";
import { BiMapPin } from "react-icons/bi";

const Category = () => {
  const { city, loading } = useCurrentCity();
  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      dragFree: true,
    },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  return (
    <section className="wrapper mt-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="title">⚡ Categories</span>

          <h2 className="mt-4 head-1">Browse by Category</h2>
          <div className="mt-2 para-3">
            <BiMapPin className="w-4 h-4 text-brand-primary animate-pulse" />
            <span className="font-medium text-sm md:text-base">
              {loading ? "Locating you..." : `Top Rated Categories in ${city}`}
            </span>
          </div>

          <p className="para-2">
            Find your favorite meals from a wide range of delicious food
            categories.
          </p>
        </div>
      </div>

      <div className="overflow-hidden py-2" ref={emblaRef}>
        <div className="-ml-4 flex">
          {categories.map((category) => (
            <div
              key={category.label}
              className="
                min-w-0
                pl-4
                flex-[0_0_50%]
                sm:flex-[0_0_33.333%]
                md:flex-[0_0_25%]
                lg:flex-[0_0_20%]
                xl:flex-[0_0_14.285%]
              "
            >
              <div
                className="
                  group
                  cursor-pointer
                  rounded-3xl
                  border
                  border-border-soft
                  bg-bg-card
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-brand-primary
                  hover:shadow-xl
                "
              >
                <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-bg-main">
                  <Image
                    src={category.image}
                    alt={category.label}
                    width={90}
                    height={90}
                    className="h-20 w-20 object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>

                <h3 className="mt-5 text-center text-base font-semibold text-text-dark">
                  {category.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
