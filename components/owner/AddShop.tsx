"use client";

import { Controller, useForm } from "react-hook-form";
import { FiHome } from "react-icons/fi";
import FormImageUpload from "../resuable/form/FormImageUpload";
import FormInput from "../resuable/form/FormInput";
import { IShop } from "@/response/shop.res";
import { usePostMutation } from "@/hooks/usePostMutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { objectToFormData } from "@/lib/objectToFormData";
import { useGetData } from "@/hooks/useGetData";
import Loading from "../resuable/Loading";
import Error from "../resuable/Error";
import { useEffect } from "react";

const AddShop = () => {
  const navigate = useRouter();
  const {
    data: shop,
    isLoading,
    isError,
    refetch,
  } = useGetData<IShop>({
    url: `/api/shop/get-shop`,
    params: {},
    queryKey: ["shop"],
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IShop>({
    defaultValues: {
      image: undefined,
      name: "",
      address: "",
      city: "",
      state: "",
    },
  });

  useEffect(() => {
    if (shop) {
      reset({
        name: shop.name,
        city: shop.city,
        state: shop.state,
        address: shop.address,
        image: shop.image,
      });
    }
  }, [shop, reset]);

  const { mutateAsync, isPending } = usePostMutation<IShop>({
    url: "/api/shop/create-edit",
    invalidateQuery: ["shop"],
  });
  const onSubmit = async (data: IShop) => {
    console.log(data.image, "image");

    try {
      const formData = objectToFormData(data);

      await mutateAsync(formData);
      toast.success(
        shop ? "Shop updated successfully!" : "Shop created successfully!",
      );
      reset();
      console.log(formData, "Res");
      navigate.push("/");
    } catch (error: any) {
      console.error("Authentication failed:", error);

      toast.error(error.response?.data?.message || "Failed to create shop.");
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error onRetry={refetch} />;
  }
  return (
    <div className="wrapper py-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border-soft bg-bg-card shadow-sm">
        {/* Header */}
        <div className="border-b border-border-soft bg-brand-light px-8 py-7">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary text-white">
              <FiHome size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-text-dark">
                {shop ? "Edit Shop" : "Create Shop"}
              </h1>

              <p className="mt-1 text-text-muted">
                {shop
                  ? "Update your restaurant information."
                  : "Set up your restaurant and start receiving online orders."}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
            {/* Left */}
            <div>
              <div className="rounded-2xl border border-border-soft bg-bg-main p-6">
                <h3 className="text-lg font-semibold text-text-dark">
                  Shop Image
                </h3>

                <p className="mt-1 mb-5 text-sm text-text-muted">
                  Upload your restaurant logo or cover image.
                </p>

                <Controller
                  name="image"
                  control={control}
                  rules={{
                    required: "Shop image is required",
                  }}
                  render={({ field }) => (
                    <FormImageUpload
                      label="Shop Image"
                      field={field}
                      error={errors.image}
                      previewClassName=""
                    />
                  )}
                />
              </div>
            </div>

            {/* Right */}
            <div className="rounded-2xl border border-border-soft bg-bg-main p-7">
              <h3 className="text-xl font-semibold text-text-dark">
                Shop Information
              </h3>

              <p className="mt-1 text-sm text-text-muted">
                Provide the basic details about your restaurant.
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <FormInput
                  label="Shop Name"
                  placeholder="Bangla Kitchen"
                  register={register("name", {
                    required: "Shop name is required",
                  })}
                  error={errors.name}
                />

                <FormInput
                  label="City"
                  placeholder="Dhaka"
                  register={register("city", {
                    required: "City is required",
                  })}
                  error={errors.city}
                />

                <FormInput
                  label="State"
                  placeholder="Dhaka"
                  register={register("state", {
                    required: "State is required",
                  })}
                  error={errors.state}
                />

                <div className="md:col-span-2">
                  <FormInput
                    label="Address"
                    placeholder="House, Road, Area"
                    register={register("address", {
                      required: "Address is required",
                    })}
                    error={errors.address}
                  />
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  disabled={isPending}
                  type="submit"
                  className="rounded-xl bg-btn-dark px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-btn-dark-hover hover:scale-[1.02] active:scale-100 disabled:opacity-60"
                >
                  <button>
                    {isPending
                      ? shop
                        ? "Updating..."
                        : "Creating..."
                      : shop
                        ? "Update Shop"
                        : "Create Shop"}
                  </button>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShop;
