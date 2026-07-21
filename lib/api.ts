// lib/api.ts

import { BASE_URL_PRODUCTION } from "@/components/constant/constant";
import axios from "axios";

export const api = axios.create({
  baseURL: BASE_URL_PRODUCTION,
  withCredentials: true,
});
