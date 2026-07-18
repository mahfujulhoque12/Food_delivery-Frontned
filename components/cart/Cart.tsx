"use client";

import Image from "next/image";
import React from "react";
import {
  BiMinus,
  BiPlus,
  BiTrash,
  BiShoppingBag,
  BiArrowBack,
} from "react-icons/bi";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const deliveryFee = subtotal > 0 ? 3 : 0;
  const tax = subtotal * 0.05;

  const total = subtotal + deliveryFee + tax;

  if (!cart.length) {
    return (
      <section className="bg-bg-main min-h-screen flex items-center justify-center">
        <div className="wrapper">
          <div className="max-w-md mx-auto text-center bg-bg-card rounded-3xl border border-border-soft p-10">
            <BiShoppingBag className="mx-auto text-6xl text-brand-primary mb-5" />

            <h2 className="head-2 mb-2">Your cart is empty</h2>

            <p className="para-2 mb-8">
              Looks like you haven't added anything yet.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-hover text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              <BiArrowBack />
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-bg-main min-h-screen py-12">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="head-1">Shopping Cart</h1>

            <p className="para-2 mt-1">
              {totalItems} item{totalItems > 1 && "s"} in your cart
            </p>
          </div>

          <Link
            href="/"
            className="text-brand-primary font-semibold hover:underline"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Cart Items */}

          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-bg-card rounded-2xl border border-border-soft p-5 flex gap-4"
              >
                <div className="relative h-28 w-28 overflow-hidden rounded-xl bg-bg-main">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-text-dark">
                          {item.name}
                        </h3>

                        <p className="text-sm text-text-light mt-1">
                          {item.shopName}
                        </p>

                        <span className="inline-block mt-2 text-xs bg-brand-light text-brand-primary px-3 py-1 rounded-full">
                          {item.foodType}
                        </span>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                      >
                        <BiTrash size={22} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5">
                    <h4 className="text-xl font-black text-text-dark">
                      ${item.price.toFixed(2)}
                    </h4>

                    <div className="flex items-center bg-btn-dark text-white rounded-xl overflow-hidden">
                      <button
                        onClick={() => decrement(item._id)}
                        className="px-4 py-3 hover:bg-btn-dark-hover transition cursor-pointer"
                      >
                        <BiMinus />
                      </button>

                      <span className="px-5 font-bold">{item.quantity}</span>

                      <button
                        onClick={() => increment(item._id)}
                        className="px-4 py-3 hover:bg-btn-dark-hover transition cursor-pointer"
                      >
                        <BiPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}

          <div className="bg-bg-card rounded-2xl border border-border-soft p-6 h-fit sticky top-24">
            <h3 className="head-2 mb-6">Order Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between para-2">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between para-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between para-2">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between para-2">
                <span>VAT (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <hr className="border-border-soft" />

              <div className="flex justify-between text-lg font-bold text-text-dark">
                <span>Total</span>

                <span className="text-brand-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href={"/checkout"}
              className="flex justify-center items-center w-full mt-8 h-12 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-semibold transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
