// lib/api.ts

import { BASE_URL } from "@/components/constant/constant";
import axios from "axios";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
