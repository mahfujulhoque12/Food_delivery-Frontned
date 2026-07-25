import { IUser } from "./order.res";

export interface SignInFormInput {
  _id: string;
  full_name: string;
  email: string;
  mobile: string;
  role: string;
  isOtpVerified: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  location: ILocation;
}

export interface Token {
  token: string;
}

export interface LoginResponse {
  user: IUserRes;
  token: string;
}

export interface ILocation {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface IUserRes {
  _id: string;
  full_name: string;
  email: string;
  password: string;
  mobile: string;
  role: string;
  isOtpVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  location: ILocation;
}
