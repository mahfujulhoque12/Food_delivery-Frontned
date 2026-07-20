"use client";

import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa6";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { usePostMutation } from "@/hooks/usePostMutation";
import { toast } from "sonner";
import { useLocationStore } from "@/store/useLocationStore";
import { useRouter } from "next/navigation";

const PlaceOrder = () => {
  const position = useLocationStore((state) => state.position);
  const address = useLocationStore((state) => state.address);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");

  const cart = useCartStore((state) => state.cart);
  const { clearCart } = useCartStore();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const deliveryFee = subtotal > 0 ? 3 : 0;
  const tax = subtotal * 0.05;

  const totalAmount = subtotal + deliveryFee + tax;

  const { mutateAsync, isPending } = usePostMutation({
    url: "/api/item/place-order",
    invalidateQuery: ["get-orders"],
  });

  const handlePlaceOrder = async () => {
    try {
      const payload = {
        paymentMethod,
        totalAmount,
        deliveryAddress: {
          text: address,
          latitude: position?.lat,
          longitude: position?.lng,
        },
        cartItems: cart.map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          qty: item.quantity,
          shop: item.shopId,
        })),
      };

      const res = await mutateAsync(payload);
      console.log(res);
      toast.success("Order placed successfully");
      clearCart();
      router.push("/placed-order");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to  place order.");
    }
  };

  return (
    <div className="grid mt-5 grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Payment Method */}
      <div className="lg:col-span-2">
        <div className="rounded-3xl border border-border-soft bg-bg-card p-6">
          <h2 className="mb-6 text-2xl font-bold text-text-dark">
            Choose Payment Method
          </h2>

          <div className="space-y-5">
            {/* Cash on Delivery */}
            <button
              onClick={() => setPaymentMethod("cod")}
              className={`w-full cursor-pointer rounded-2xl border p-5 transition-all duration-200 ${
                paymentMethod === "cod"
                  ? "border-brand-primary bg-brand-primary/10 shadow-md"
                  : "border-border-soft hover:border-brand-primary hover:shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-white">
                    <FaMoneyBillWave size={22} />
                  </div>

                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-text-dark">
                      Cash on Delivery
                    </h3>

                    <p className="mt-1 text-sm text-text-light">
                      Pay after your food is delivered.
                    </p>
                  </div>
                </div>

                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    paymentMethod === "cod"
                      ? "border-brand-primary"
                      : "border-border-soft"
                  }`}
                >
                  {paymentMethod === "cod" && (
                    <div className="h-3 w-3 rounded-full bg-brand-primary" />
                  )}
                </div>
              </div>
            </button>

            {/* Online Payment */}
            <button
              onClick={() => setPaymentMethod("online")}
              className={`w-full cursor-pointer rounded-2xl border p-5 transition-all duration-200 ${
                paymentMethod === "online"
                  ? "border-brand-primary bg-brand-primary/10 shadow-md"
                  : "border-border-soft hover:border-brand-primary hover:shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-white">
                    <FaCreditCard size={22} />
                  </div>

                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-text-dark">
                      Online Payment
                    </h3>

                    <p className="mt-1 text-sm text-text-light">
                      bKash, Nagad, Visa & Mastercard
                    </p>
                  </div>
                </div>

                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    paymentMethod === "online"
                      ? "border-brand-primary"
                      : "border-border-soft"
                  }`}
                >
                  {paymentMethod === "online" && (
                    <div className="h-3 w-3 rounded-full bg-brand-primary" />
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 overflow-hidden rounded-3xl border border-border-soft bg-bg-card">
          <div className="bg-brand-primary p-6 text-white">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <p className="mt-1 text-sm opacity-90">
              {totalItems} item{totalItems > 1 ? "s" : ""}
            </p>
          </div>

          <div className="space-y-5 p-6">
            <div className="flex items-center justify-between">
              <span className="text-text-light">Subtotal</span>

              <span className="font-semibold text-text-dark">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-light">Delivery Fee</span>

              <span className="font-semibold text-text-dark">
                ${deliveryFee.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-light">Tax</span>

              <span className="font-semibold text-text-dark">
                ${tax.toFixed(2)}
              </span>
            </div>

            <div className="border-t border-dashed border-border-soft pt-5">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-text-dark">Total</span>

                <span className="text-3xl font-extrabold text-brand-primary">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => handlePlaceOrder()}
              className="w-full rounded-xl bg-brand-primary py-2 cursor-pointer text-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
              disabled={isPending}
            >
              {isPending ? "Ordering..." : "          Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
