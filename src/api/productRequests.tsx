import axiosInstance from "./axiosInstance";

export const fetchProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const fetchProduct = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    return {
      message: error.response?.data?.message || "An unexpected error occurred",
    };
  }
};
