/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePostMutation } from "@/hooks/usePostMutation";
import { LoginResponse, SignInFormInput } from "@/response/auth.res";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiEye, FiEyeOff, FiShoppingBag } from "react-icons/fi";
import { toast } from "sonner";

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useRouter();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm<SignInFormInput>({
    defaultValues: {},
  });

  const { mutateAsync, isPending } = usePostMutation<LoginResponse>({
    url: "/api/auth/signin",
  });

  const onSubmit = async (data: SignInFormInput) => {
    try {
      const res = await mutateAsync(data);
      const user = res.user;
      const token = res.token;
      setAuth(user, token);
      toast.success("Logged in successfully!");

      console.log(res, "Res");
      navigate.push("/");
      reset();
    } catch (error: any) {
      console.error("Authentication failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to log in. Please check your credentials.",
      );
    }
  };

  return (
    /* Strict viewport wrapping prevents any browser window scrolling */
    <div className="h-screen w-screen bg-bg-main flex items-center justify-center p-4 overflow-hidden antialiased font-sans selection:bg-brand-light">
      <div className="w-full max-w-md bg-bg-card rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-border-soft p-6 space-y-5">
        {/* Soft Minimalist Branding Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-light text-brand-primary mb-1">
            <FiShoppingBag size={20} />
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-text-dark">
            Welcome Back
          </h1>
          <p className="text-xs text-text-muted max-w-xs mx-auto">
            Please log into your portal dashboard to manage orders.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Custom Card Role Selector (Kept for targeted portal redirection) */}

          <hr className="border-border-soft my-1" />

          {/* Email Address Field */}
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
                  required: "Please enter your email",
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

          {/* Password Field */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-text-muted">
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-[11px] text-brand-primary hover:underline underline-offset-2"
              >
                Forgot?
              </a>
            </div>
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
                  required: "Please enter your password",
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

          {/* Action Login Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 bg-btn-dark hover:bg-btn-dark-hover text-bg-main font-medium py-2.5 px-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-border-focus transition duration-150 disabled:opacity-50 text-xs tracking-wide"
          >
            {isPending ? "Verifying Credentials..." : "Sign In"}
          </button>

          {/* Alternate Redirection Link */}
          <p className="text-center text-[11px] text-text-light mt-2">
            New to M-Food-Shop?{" "}
            <a
              href="/signup"
              className="text-brand-primary font-medium hover:underline underline-offset-2"
            >
              Create an Account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
