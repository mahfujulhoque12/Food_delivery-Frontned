import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface IFoodItem {
  _id: string;
  name: string;
  image: string;
  shop: string;
  rating: {
    average: number;
    count: number;
  };
  category:
    | "Burger"
    | "Pizza"
    | "Chicken"
    | "Fried Chicken"
    | "Sandwich"
    | "Pasta"
    | "Noodles"
    | "Rice"
    | "Biryani"
    | "Morog Polow"
    | "Kebab"
    | "BBQ"
    | "Seafood"
    | "Vegan"
    | "Others";
  price: number;
  foodType: "Fast Food" | "Deshi Food";
}

export interface IOwner {
  _id: string;
  full_name: string;
  email: string;
  mobile: string;
  role: "owner";
  isOtpVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IShop {
  _id: string;
  name: string;
  image: string;
  address: string;
  city: string;
  state: string;
  owner: IOwner;
  items: IFoodItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ShopForm {
  image: File | null;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  description: string;
}
