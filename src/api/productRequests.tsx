import axiosInstance from "./axiosInstance";

export const fetchProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const fetchProduct = async (sku: number) => {
  const response = await axiosInstance.get(`/products/${sku}`);
  return response.data;
};
