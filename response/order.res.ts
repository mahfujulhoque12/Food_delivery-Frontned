export interface IOrderProps {
  _id: string;
  user: IUser;
  totalAmount: number;
  paymentMethod: "cod" | "online" | string;
  deliveryAddress: IDeliveryAddress;
  shopOrders: IShopOrder[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IDeliveryAddress {
  latitude: number;
  longitude: number;
  text: string;
}

export interface IShopOrder {
  _id: string;
  shop: IShop;
  owner: IShopOwner;
  subtotal: number;
  status: string;
  shopOrderItems: IShopOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface IShop {
  _id: string;
  name: string;
}

export interface IShopOwner {
  _id: string;
  email: string;
  mobile: string;
}

export interface IShopOrderItem {
  _id: string;
  item: IItem;
  name: string;
  price: number;
  qty: number;
  createdAt: string;
  updatedAt: string;
}

export interface IItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  foodType: string;
  shop: string;
  rating: IRating;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IRating {
  average: number;
  count: number;
}

export interface IUser {
  _id: string;
  full_name: string;
  email: string;
  mobile: string;
  role: "user" | "owner";
  isOtpVerified: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
