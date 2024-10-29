import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Categories } from "../types";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Get Categories

export const GetCategories = async (
  parent: string,
  featured: boolean
): Promise<Categories[]> => {
  const response: AxiosResponse<Categories[]> = await axios.get(
    `${BACKEND_URL}/en/api/product/category/?parent=${parent}&featured=${featured}`
  );
  return response.data;
};

export function useGetCategories(parent: string, featured: boolean) {
  return useQuery({
    queryKey: ["categories", parent, featured],
    queryFn: () => GetCategories(parent, featured),
    refetchOnWindowFocus: false,
  });
}

// Get Brands
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axiosInstance.get("/products/brand/");
        setBrands(response.data);
      } catch (error) {
        setError("Failed to load brands");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, isLoading, error };
}
