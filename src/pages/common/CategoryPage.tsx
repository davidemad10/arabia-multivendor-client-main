import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import ProductsSlider from "../../components/shared/products/ProductsSlider";
import { Product } from "../../types";
import Filter from "../../components/shared/products/Filter";
// import AccordionUsage from "../../components/shared/products/AccordionUsage";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setIsPending(true);
      try {
        const response = await axiosInstance.get(
          `/products/bycategory/category=${category}`
        );
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsPending(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <main>
      <div className="flexCenter flex-col">
        <div className="container flex justify-center flex-col">
          <div className="container">
            <h1 className="text-3xl font-bold my-6">{category}</h1>
            {/* <ProductsSlider
        products={products}
        title={category || "Products"}
        link={`/category/${category}`}
      /> */}
            {/* <AccordionUsage></AccordionUsage> */}
            <Filter></Filter>
          </div>
        </div>
      </div>
    </main>
  );
}
