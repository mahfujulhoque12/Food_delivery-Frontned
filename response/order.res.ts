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
  owner: string | IShopOwner;
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
  role: string;
  isOtpVerified: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IShopOrder {
  _id: string;
  assignDeliveryBoy: IUser;
  assignment: string;
  owner: string | IShopOwner;
  shop: IShop;
  shopOrderItems: IShopOrderItem[];
  status: string;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAvailableBoy {
  id: string;
  full_name: string;
  latitude: number;
  longitude: number;
  mobile: string;
}
export interface IAvailableBoyFullResponse {
  assignedDeliveryBoy: string | null;
  assignment: string;
  avaiableBoys: IAvailableBoy[];
  message: string;
  shopOrder: IShopOrder;
}

export interface IDeliveryAddress {
  latitude: number;
  longitude: number;
  text: string;
}

export interface IAssignmentItem {
  _id: string;
  item: string;
  name: string;
  price: number;
  qty: number;
  createdAt: string;
  updatedAt: string;
}

export interface IDeliveryAssignment {
  assignmentId: string;
  orderId: string;
  shopName: string;
  subtotal: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: IDeliveryAddress;
  items: IAssignmentItem[];
}

interface ILocation {
  lat: number;
  lon: number;
}

export interface CurrentOrderResponse {
  customerLocation: ILocation;
  deliveryBoyLocation: ILocation;
  deliveryAddress: IDeliveryAddress;
  shopOrder: IShopOrder;
  user: IUser;
}
