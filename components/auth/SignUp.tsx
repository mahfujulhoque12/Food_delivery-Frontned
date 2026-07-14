"use client";

import { usePostMutation } from "@/hooks/usePostMutation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiShoppingBag,
  FiTruck,
  FiCoffee,
} from "react-icons/fi";
import { toast } from "sonner";

export type UserRole = "user" | "owner" | "deliveryBoy";

interface SignUpFormInput {
  full_name: string;
  email: string;
  password: string;
  mobile: string;
  role: UserRole;
}

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<SignUpFormInput>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      mobile: "",
      role: "user",
    },
  });

  const { mutateAsync, isPending } = usePostMutation<SignUpFormInput>({
    url: "/api/auth/signup",
  });
  const currentRole = watch("role");

  const onSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
    try {
      const res = await mutateAsync(data);

      toast.success("Account created successfully!");
      reset();
      console.log(res, "Res");
      navigate.push("/signin");
    } catch (error: any) {
      console.error("Authentication failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to log in. Please check your credentials.",
      );
    }
  };

  return (
    /* Configured with your global CSS theme tokens */
    <div className="h-screen w-screen bg-bg-main flex items-center justify-center p-4 overflow-hidden antialiased font-sans selection:bg-brand-light">
      <div className="w-full max-w-lg bg-bg-card rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-border-soft p-6 space-y-5">
        {/* Soft Minimalist Branding Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-light text-brand-primary mb-1">
            <FiShoppingBag size={20} />
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-text-dark">
            Create an Account
          </h1>
          <p className="text-xs text-text-muted max-w-xs mx-auto">
            Discover culinary choices or manage your deliveries with
            M-Food-Shop.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Custom Card Role Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-wider text-text-light block">
              I want to join as a...
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: "user", label: "User", icon: FiShoppingBag },
                { id: "owner", label: "Owner", icon: FiCoffee },
                { id: "deliveryBoy", label: "Delivery Boy", icon: FiTruck },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = currentRole === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setValue("role", item.id as UserRole)}
                    className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl border text-center transition-all group ${
                      isSelected
                        ? "border-brand-primary/30 bg-brand-light text-brand-primary shadow-sm"
                        : "border-border-soft hover:border-stone-200 bg-bg-card text-text-muted hover:text-text-dark"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`mb-1 transition-transform ${isSelected ? "scale-105" : "group-hover:scale-102"}`}
                    />
                    <span className="text-[11px] font-medium tracking-tight">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-border-soft my-1" />

          {/* Grid Layout for Compact Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-light pointer-events-none">
                  <FiUser size={15} />
                </span>
                <input
                  type="text"
                  placeholder="Alex Mercer"
                  className={`w-full pl-9 pr-3 py-2 text-text-dark bg-bg-main/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-brand-primary transition placeholder:text-text-light text-xs ${
                    errors.full_name
                      ? "border-error bg-rose-50/20 focus:ring-error/20 focus:border-error"
                      : "border-stone-200"
                  }`}
                  {...register("full_name", { required: "Name is required" })}
                />
              </div>
              {errors.full_name && (
                <p className="text-[10px] text-error font-medium pl-0.5">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-light pointer-events-none">
                  <FiPhone size={15} />
                </span>
                <input
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  className={`w-full pl-9 pr-3 py-2 text-text-dark bg-bg-main/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-brand-primary transition placeholder:text-text-light text-xs ${
                    errors.mobile
                      ? "border-error bg-rose-50/20 focus:ring-error/20 focus:border-error"
                      : "border-stone-200"
                  }`}
                  {...register("mobile", {
                    required: "Mobile number is required",
                  })}
                />
              </div>
              {errors.mobile && (
                <p className="text-[10px] text-error font-medium pl-0.5">
                  {errors.mobile.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-light pointer-events-none">
                <FiMail size={15} />
              </span>
              <input
                type="email"
                placeholder="alex@example.com"
                className={`w-full pl-9 pr-3 py-2 text-text-dark bg-bg-main/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-brand-primary transition placeholder:text-text-light text-xs ${
                  errors.email
                    ? "border-error bg-rose-50/20 focus:ring-error/20 focus:border-error"
                    : "border-stone-200"
                }`}
                {...register("email", {
                  required: "Please provide your email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email structure",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-[10px] text-error font-medium pl-0.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-light pointer-events-none">
                <FiLock size={15} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full pl-9 pr-9 py-2 text-text-dark bg-bg-main/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-brand-primary transition placeholder:text-text-light text-xs ${
                  errors.password
                    ? "border-error bg-rose-50/20 focus:ring-error/20 focus:border-error"
                    : "border-stone-200"
                }`}
                {...register("password", {
                  required: "Please provide your password",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-light hover:text-text-muted focus:outline-none"
              >
                {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[10px] text-error font-medium pl-0.5">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Core Interactive CTA Button Token */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 bg-btn-dark hover:bg-btn-dark-hover text-bg-main font-medium py-2.5 px-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-border-focus transition duration-150 disabled:opacity-50 text-xs tracking-wide"
          >
            {isPending ? "Processing Details..." : "Create Account"}
          </button>

          {/* Footer Navigation Link */}
          <p className="text-center text-[11px] text-text-light mt-2">
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-brand-primary font-medium hover:underline underline-offset-2"
            >
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
