"use client";

import FormImageUpload from "@/components/resuable/form/FormImageUpload";
import FormInput from "@/components/resuable/form/FormInput";
import FormSelect from "@/components/resuable/form/FormSelect";
import { usePostMutation } from "@/hooks/usePostMutation";
import { objectToFormData } from "@/lib/objectToFormData";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type AddItemForm = {
  image: File | null;
  name: string;
  category: string;
  foodType: string;
  price: number;
  rating: {
    average: number;
    count: number;
  };
};

const categories = [
  { label: "Burger", value: "Burger" },
  { label: "Pizza", value: "Pizza" },
  { label: "Chicken", value: "Chicken" },
  { label: "Fried Chicken", value: "Fried Chicken" },
  { label: "Sandwich", value: "Sandwich" },
  { label: "Pasta", value: "Pasta" },
  { label: "Noodles", value: "Noodles" },
  { label: "Rice", value: "Rice" },
  { label: "Biryani", value: "Biryani" },
  { label: "Morog Polow", value: "Morog Polow" },
  { label: "Kebab", value: "Kebab" },
  { label: "BBQ", value: "BBQ" },
  { label: "Seafood", value: "Seafood" },
  { label: "Vegan", value: "Vegan" },
  { label: "Others", value: "Others" },
];

const foodTypes = [
  {
    label: "Fast Food",
    value: "Fast Food",
  },
  {
    label: "Deshi Food",
    value: "Deshi Food",
  },
];

const AddItemPage = () => {
  const navigate = useRouter();
  const { token, user } = useAuthStore();
  useEffect(() => {
    if (!token || !user) {
      navigate.replace("/signin");
    }
  }, [token, user, navigate]);
  const {
    register,
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<AddItemForm>();
  const { mutateAsync, isPending } = usePostMutation<AddItemForm>({
    url: "/api/item/add-item",
    invalidateQuery: ["shop"],
  });

  const onSubmit = async (data: AddItemForm) => {
    console.log(data.image, "image");

    try {
      const formData = objectToFormData(data);

      await mutateAsync(formData);
      toast.success("Shop created successfully!");
      reset();
      console.log(formData, "Res");
      navigate.push("/");
    } catch (error: any) {
      console.error("Authentication failed:", error);

      toast.error(error.response?.data?.message || "Failed to create shop.");
    }
  };

  return (
    <div className="min-h-screen wrapper bg-bg-main py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-dark">
            Add New Food Item
          </h1>
          <p className="mt-2 text-text-light">
            Fill in the details below to add a new menu item to your restaurant.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-border-soft bg-bg-card shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Image */}
              <div className="md:col-span-2">
                <Controller
                  name="image"
                  control={control}
                  rules={{
                    required: "Food image is required",
                  }}
                  render={({ field }) => (
                    <FormImageUpload
                      label="Food Image"
                      field={field}
                      error={errors.image}
                    />
                  )}
                />
              </div>

              {/* Name */}
              <FormInput
                label="Item Name"
                placeholder="Chicken Burger"
                register={register("name", {
                  required: "Item name is required",
                })}
                error={errors.name}
              />

              {/* Price */}
              <FormInput
                label="Price (৳)"
                type="number"
                placeholder="250"
                register={register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Price must be greater than 0",
                  },
                })}
                error={errors.price}
              />

              {/* Average Rating */}
              <FormInput
                label="Average Rating"
                type="number"
                placeholder="4.8"
                  step={0.1}
  min={0}
  max={5}
                register={register("rating.average", {
                  required: "Average rating is required",
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Minimum rating is 0",
                  },
                  max: {
                    value: 5,
                    message: "Maximum rating is 5",
                  },
                })}
                error={errors.rating?.average}
              />

              {/* Rating Count */}
              <FormInput
                label="Rating Count"
                type="number"
                placeholder="120"
                register={register("rating.count", {
                  required: "Rating count is required",
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Count cannot be negative",
                  },
                })}
                error={errors.rating?.count}
              />
              {/* Category */}
              <Controller
                name="category"
                control={control}
                rules={{
                  required: "Category is required",
                }}
                render={({ field }) => (
                  <FormSelect
                    label="Category"
                    placeholder="Choose Category"
                    options={categories}
                    field={field}
                    error={errors.category}
                  />
                )}
              />

              {/* Food Type */}
              <Controller
                name="foodType"
                control={control}
                rules={{
                  required: "Food type is required",
                }}
                render={({ field }) => (
                  <FormSelect
                    label="Food Type"
                    placeholder="Choose Food Type"
                    options={foodTypes}
                    field={field}
                    error={errors.foodType}
                  />
                )}
              />
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-border-soft" />

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-xl border border-border-soft px-6 py-3 font-medium text-text-dark transition bg-bg-main cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="rounded-xl bg-btn-dark px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:opacity-55 cursor-pointer"
              >
                {isPending ? "Adding..." : "  Add Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;
