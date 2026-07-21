"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { usePostMutation } from "@/hooks/usePostMutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
};

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password");

  const { mutateAsync, isPending } = usePostMutation<FormData>({
    url: "/api/auth/sent-otp",
  });

  const onEmailSubmit = async (data: FormData) => {
    console.log(data.email);
    try {
      const res = await mutateAsync(data);

      console.log(res, "res");
      toast.success("Send Otp successfully!");
      reset();
      setUserEmail(data.email);
      setStep(2);
    } catch (error: any) {
      console.error("Authentication failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to log in. Please check your credentials.",
      );
    }
  };

  const { mutateAsync: verifyOtp, isPending: isOtpPending } =
    usePostMutation<FormData>({
      url: "/api/auth/verify-otp",
    });
  const onOtpSubmit = async (data: FormData) => {
    try {
      const res = await verifyOtp({
        email: userEmail,
        otp: data.otp,
      });
      console.log(res, "res");
      toast.success("Verify Otp successfully!");
      reset();
      setStep(3);
    } catch (error: any) {
      {
        console.error("Authentication failed:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to log in. Please check your credentials.",
        );
      }
    }
  };
  const { mutateAsync: resetPass, isPending: isResetPending } =
    usePostMutation<FormData>({
      url: "/api/auth/reset-password",
    });
  const onPasswordSubmit = async (data: FormData) => {
    try {
      const res = await resetPass({
        email: userEmail,
        newPassword: data.password,
      });
      console.log(res, "res");
      toast.success("Password Reset successfully!");
      reset();

      router.push("/signin");
    } catch (error: any) {
      {
        console.error("Authentication failed:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to log in. Please check your credentials.",
        );
      }
    }

    // await resetPassword(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-main px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-border-soft bg-bg-card p-8 shadow-sm">
        {/* Title */}
        <div className="mb-8">
          {step === 1 && (
            <>
              <h1 className="text-2xl font-semibold text-text-dark">
                Forgot Password
              </h1>

              <p className="mt-2 text-sm text-text-muted">
                Enter your email address and we'll send you a verification code.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl font-semibold text-text-dark">
                Verify OTP
              </h1>

              <p className="mt-2 text-sm text-text-muted">
                Enter the 6-digit OTP sent to your email.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-2xl font-semibold text-text-dark">
                Reset Password
              </h1>

              <p className="mt-2 text-sm text-text-muted">
                Create a new password for your account.
              </p>
            </>
          )}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-text-dark">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full rounded-lg border border-border-soft bg-transparent px-4 py-3 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-border-focus"
              />

              {errors.email && (
                <p className="mt-2 text-sm text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full cursor-pointer rounded-lg bg-btn-dark py-3 font-medium text-white transition hover:bg-btn-dark-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleSubmit(onOtpSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-text-dark">
                Verification Code
              </label>

              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                {...register("otp", {
                  required: "OTP is required",
                  minLength: {
                    value: 6,
                    message: "OTP must be 6 digits",
                  },
                  maxLength: {
                    value: 6,
                    message: "OTP must be 6 digits",
                  },
                })}
                className="w-full rounded-lg border border-border-soft px-4 py-3 text-center text-lg tracking-[10px] outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-border-focus"
              />

              {errors.otp && (
                <p className="mt-2 text-sm text-error">{errors.otp.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isOtpPending}
              className="w-full cursor-pointer rounded-lg bg-btn-dark py-3 font-medium text-white transition hover:bg-btn-dark-hover"
            >
              {isOtpPending ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-sm font-medium text-brand-primary"
            >
              <FaArrowLeft className="text-xs" />
              Back
            </button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-text-dark">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full rounded-lg border border-border-soft px-4 py-3 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-border-focus"
              />

              {errors.password && (
                <p className="mt-2 text-sm text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-text-dark">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full rounded-lg border border-border-soft px-4 py-3 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-border-focus"
              />

              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-error">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isResetPending}
              className="w-full cursor-pointer rounded-lg bg-btn-dark py-3 font-medium text-white transition hover:bg-btn-dark-hover"
            >
              {isResetPending ? "Resting..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-2 text-sm font-medium text-brand-primary"
            >
              <FaArrowLeft className="text-xs" />
              Back
            </button>
          </form>
        )}

        <div className="mt-8 border-t border-border-soft pt-6 text-center">
          <Link
            href="/signin"
            className="text-sm font-medium text-brand-primary transition hover:text-brand-hover"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
