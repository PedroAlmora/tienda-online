import axios from "axios";
import { ProductInterface } from "../../products";

const BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetchRandomProducts = async (): Promise<ProductInterface[]> => {
  try {
    const response = await axiosInstance.get<ProductInterface[]>("/products/random");
    return response.data;
  } catch (error) {
    console.error("Error fetching random products:", error);
    return [];
  }
};