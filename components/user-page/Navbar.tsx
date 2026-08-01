"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiOutlineLocationMarker, HiOutlineShoppingCart } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import {
  FiPackage,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiPlus,
} from "react-icons/fi";

import { useAuthStore } from "@/store/authStore";
import useCurrentCity from "@/hooks/useCurrentCity";
import { useCartStore } from "@/store/useCartStore";
import { CurrentOrderResponse } from "@/response/order.res";
import { useGetData } from "@/hooks/useGetData";
import { api } from "@/lib/api";
import { CgShoppingBag } from "react-icons/cg";

const Navbar = () => {
  const { cart } = useCartStore();
  const { data } = useGetData<CurrentOrderResponse>({
    url: "/api/item/get-current-order",
    queryKey: ["current-order"],
  });

  const { user, logout } = useAuthStore();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const { city, loading } = useCurrentCity();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const firstLetter = user?.full_name?.charAt(0).toUpperCase() || "U";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchItems = async (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoadingSearch(true);

      const { data } = await api.get(
        `/api/item/search-items?query=${value}&city=${city}`,
      );

      setResults(data);
    } catch (error) {
      console.log(error);
      setResults([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  const { addToCart } = useCartStore();
  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-bg-card/90 backdrop-blur-lg">
      <div className="wrapper flex h-20 items-center justify-between gap-6">
        {/* ================= LOGO ================= */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary font-bold text-white shadow-md">
            M
          </div>

          {/* Desktop Only */}
          <div className="hidden lg:block">
            <h2 className="text-xl font-bold text-text-dark">
              M Food <span className="text-brand-primary">Shop</span>
            </h2>
            <p className="text-xs text-text-light">Fresh Food Delivered</p>
          </div>
        </Link>

        {/* ================= LOCATION + SEARCH ================= */}
        {user?.role === "user" && (
          <div className="hidden flex-1 items-center gap-4 lg:flex">
            {/* Location */}
            <button className="flex h-14 min-w-[220px] items-center gap-3 rounded-2xl border border-border-soft bg-bg-main px-5 transition-all duration-300 hover:border-brand-primary">
              <HiOutlineLocationMarker
                size={24}
                className="text-brand-primary"
              />
              <div className="text-left">
                <p className="text-xs text-text-light">Deliver To</p>
                <h4 className="font-semibold text-text-dark">
                  {loading ? "Loading..." : city}
                </h4>
              </div>
            </button>

            {/* Search (Desktop Fixed) */}
            <div className="relative flex-1 hidden lg:flex">
              <IoSearchOutline
                size={22}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-text-light"
              />
              <input
                value={query}
                onChange={(e) => handleSearchItems(e.target.value)}
                type="text"
                placeholder="Search food, restaurants..."
                className="h-14 w-full rounded-2xl border border-border-soft bg-bg-main pl-14 pr-5 text-text-dark outline-none transition-all duration-300 focus:border-brand-primary"
              />

              {query && (
                <div className="absolute left-0 right-0 top-16 z-50 overflow-hidden rounded-2xl border border-border-soft bg-bg-card shadow-xl">
                  {loadingSearch ? (
                    <div className="p-5 text-center text-text-light">
                      Searching...
                    </div>
                  ) : results.length > 0 ? (
                    results.map((item: any) => (
                      <div
                        key={item._id}
                        onClick={() => setShowSearch(false)}
                        className="flex items-center gap-4 border-b border-border-soft p-3 hover:bg-bg-main"
                      >
                        <img
                          src={item.image}
                          className="h-14 w-14 rounded-xl object-cover"
                          alt={item.name}
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-text-dark">
                            {item.name}
                          </h4>
                          <p className="text-sm text-text-light">
                            {item.category}
                          </p>
                        </div>
                        <span className="font-semibold text-brand-primary">
                          ৳{item.price}
                        </span>
                        <button
                          onClick={() =>
                            addToCart({
                              _id: item._id,
                              name: item.name,
                              image: item.image,
                              price: item.price,
                              foodType: item.foodType,
                              category: item.category,
                              shopId: item.shop._id,
                              shopName: item.shop.name,
                            })
                          }
                          className="flex items-center gap-2 px-4 h-10 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm shadow-brand-primary/20 active:scale-98 cursor-pointer"
                        >
                          <CgShoppingBag className="w-3.5 h-3.5" />
                          Cart
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-5 text-center text-text-light">
                      No food found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-3">
          {/* Mobile Search Button */}
          {user?.role === "user" && (
            <>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-border-soft bg-bg-main transition-all duration-300 hover:border-brand-primary lg:hidden"
              >
                <IoSearchOutline size={22} />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border-soft bg-bg-main transition-all duration-300 hover:bg-brand-primary hover:text-white"
              >
                <HiOutlineShoppingCart size={22} />
                {cart.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-[10px] font-semibold text-white">
                    {cart.length}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* User Role Actions */}
          {user?.role === "owner" ? (
            <>
              <Link
                href={"/add-item"}
                title="Add Item"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3.5 text-sm font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 active:scale-95 text-white cursor-pointer"
              >
                <FiPlus size={18} />
                <span className="hidden sm:flex"> Add Item</span>
              </Link>
              <Link
                href="/my-order"
                title="My Orders"
                className="flex h-12 items-center gap-2 rounded-xl bg-btn-dark px-5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-btn-dark-hover hover:shadow-md active:scale-95"
              >
                <FiPackage className="shrink-0" size={18} />
                <span className="hidden sm:block">My Orders</span>
              </Link>
            </>
          ) : (
            <>
              {user?.role !== "deliveryBoy" && user?.role && (
                <Link
                  title="My Orders"
                  href="/my-order"
                  className="h-12 items-center gap-2 rounded-xl bg-btn-dark px-5 font-medium text-btn-light transition-all duration-300 hover:opacity-90 flex text-white"
                >
                  <FiPackage size={18} />
                  <span className="hidden sm:flex">My Orders</span>
                </Link>
              )}
              {user?.role === "deliveryBoy" && (
                <Link
                  title="Accepted Orders"
                  href="/accept-order"
                  className="h-12 items-center gap-2 rounded-xl bg-btn-dark px-5 font-medium text-btn-light transition-all duration-300 hover:opacity-90 flex text-white"
                >
                  <FiPackage size={18} />
                  <span className="hidden sm:flex">Accepted Orders </span>
                </Link>
              )}
            </>
          )}

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex cursor-pointer h-12 items-center gap-2 rounded-xl border border-border-soft bg-bg-main px-3 transition-all duration-300 hover:border-brand-primary"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary font-semibold text-white">
                {firstLetter}
              </div>
              <FiChevronDown
                className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`absolute right-0 mt-3 w-52 rounded-2xl border border-border-soft bg-bg-card p-2 shadow-xl transition-all duration-300 ${
                open
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              <div className="border-b border-border-soft px-3 py-3">
                <h4 className="font-semibold text-text-dark">
                  {user?.full_name}
                </h4>
                <p className="truncate text-sm text-text-light">
                  {user?.email}
                </p>
              </div>

              <Link
                href="/settings"
                className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-text-dark transition-all duration-300 hover:bg-bg-main"
              >
                <FiSettings size={18} />
                Settings
              </Link>

              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-red-500 transition-all duration-300 hover:bg-red-50"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE SEARCH (Fixed Overflow & Layout) ================= */}
      {user?.role === "user" && (
        <div
          className={`border-t border-border-soft bg-bg-card transition-all duration-300 lg:hidden ${
            showSearch
              ? "h-auto py-4 opacity-100 block"
              : "h-0 py-0 opacity-0 hidden"
          }`}
        >
          <div className="wrapper">
            <div className="relative">
              <IoSearchOutline
                size={22}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-text-light"
              />
              <input
                value={query}
                onChange={(e) => handleSearchItems(e.target.value)}
                type="text"
                placeholder="Search food..."
                className="h-12 w-full rounded-2xl border border-border-soft bg-bg-main pl-14 pr-4 text-text-dark outline-none transition-all duration-300 focus:border-brand-primary"
              />

              {query && (
                <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-2xl border border-border-soft bg-bg-card shadow-xl max-h-60 overflow-y-auto">
                  {loadingSearch ? (
                    <div className="p-5 text-center text-text-light">
                      Searching...
                    </div>
                  ) : results.length > 0 ? (
                    results.map((item: any) => (
                      <div
                        key={item._id}
                        onClick={() => setShowSearch(false)}
                        className="flex items-center gap-3 p-3 border-b border-border-soft hover:bg-bg-main"
                      >
                        <img
                          src={item.image}
                          className="h-12 w-12 rounded-lg object-cover"
                          alt={item.name}
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-text-dark">
                            {item.name}
                          </h4>
                          <p className="text-xs text-text-light">
                            {item.category}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-brand-primary">
                          ৳{item.price}
                        </span>
                        <button
                          onClick={() =>
                            addToCart({
                              _id: item._id,
                              name: item.name,
                              image: item.image,
                              price: item.price,
                              foodType: item.foodType,
                              category: item.category,
                              shopId: item.shop._id,
                              shopName: item.shop.name,
                            })
                          }
                          className="flex items-center gap-2 px-4 h-10 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm shadow-brand-primary/20 active:scale-98 cursor-pointer"
                        >
                          <CgShoppingBag className="w-3.5 h-3.5" />
                          Add to Cart
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-5 text-center text-text-light">
                      No food found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
