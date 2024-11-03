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
  const [sortOption, setSortOption] = useState<string>("");

  const fetchProductsByCategory = async () => {
    setIsPending(true);
    try {
      const response = await axiosInstance.get(`/products/bycategory`, {
        params: { category: category },
      });

      const mappedProducts: Product[] = response.data.map((product: any) => ({
        id: product.id,
        name: product.translations.en.name,
        image: product.images[0]?.image || "",
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
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchProductsByCategory();
  }, [category]);

  // Sort products based on the selected option
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "Price: High to Low") return b.price - a.price;
    if (sortOption === "Price: Low to High") return a.price - b.price;
    if (sortOption === "Best Rated") return b.rating - a.rating;
    return 0;
  });

  return (
    <main>
      <div className="my-20 pt-5 flex flex-col bg-white">
        <div className="flex items-center justify-between px-5 my-6">
          <h1 className="text-3xl font-bold">{category}</h1>
          <div className="flex items-center gap-3">
            <div className="laptop:hidden">
              <FilterSidebar />
            </div>
            <Menu setSortOption={setSortOption} />
          </div>
        </div>
        <div className="flex">
          <div className="w-80 min-h-screen start-0 top-0 max-laptop:hidden">
            <AccordionUsage />
          </div>
          <div className="flex flex-wrap gap-4 bg-gray-200 flex-1 p-4 pt-10">
            {isPending ? (
              <div className="flex justify-center w-full items-center">
                <Loader isLoading={isPending} size={50} color="#0000FF" />
              </div>
            ) : (
              sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
