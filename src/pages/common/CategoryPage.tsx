import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { Product } from "../../types";
import ProductCard from "../../components/reusables/ProductCard";
import AccordionUsage from "../../components/shared/products/AccordionUsage";
import FilterSidebar from "../../components/shared/products/FilterSidebar";

import Loader from "../../components/reusables/Loader";
import Menu from "../../components/reusables/Menu";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setIsPending(true);
      try {
        const response = await axiosInstance.get(`/products/bycategory`, {
          params: { category: category },
        });

        const mappedProducts: Product[] = response.data.map((product: any) => ({
          id: product.id,
          name: product.translations.en.name,
          image: product.images[0]?.image || "", // First image or fallback
          price: product.price_after_discount,
          oldPrice: product.price_before_discount,
          rating: product.total_views,
          isBestSeller: product.total_sold > 50,
          description: product.translations.en.description,
          slug: product.slug,
          category: product.category.translations.en.name,
          brand: product.brand.translations.en.name,
          size: product.size.name,
          color: product.color.name,
        }));

        setProducts(mappedProducts);
        console.log("Mapped products:", mappedProducts);
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
      <div className="my-20 pt-5 flex flex-col bg-white">
        {/* <h1 className="ps-5 text-3xl font-bold my-6">{category}</h1> */}
        {/* Flex container for the title and filter icon */}
        <div className="flex items-center justify-between px-5 my-6">
          <h1 className="text-3xl font-bold">{category}</h1>
          <div className="flex items-center gap-3">
            <div className="laptop:hidden">
              <FilterSidebar />
            </div>
            <Menu />
          </div>
        </div>
        <br />
        <div className="flex">
          {/* left */}
          <div className="w-80 min-h-screen start-0 top-0 max-laptop:hidden">
            {/* Add filter or any additional components here */}
            <AccordionUsage />
          </div>
          {/* <div className="start-0 size-fit absolute laptop:hidden">
            <FilterSidebar />
          </div> */}
          {/* right */}
          <div className="flex flex-wrap gap-4 bg-gray-200 flex-1 p-4 pt-10">
            {isPending ? (
              <div className="flex justify-center items-center">
                <Loader isLoading={isPending} size={50} color="#0000FF" />
                {!isPending && <div>Data loaded!</div>}
              </div>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
