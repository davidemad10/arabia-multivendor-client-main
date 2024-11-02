import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import ProductsSlider from "../../components/shared/products/ProductsSlider";
import { Product } from "../../types";
import ProductCard from "../../components/reusables/ProductCard";
import Filter from "../../components/shared/products/Filter";
import { Accordion } from "@mui/material";
import AccordionUsage from "../../components/shared/products/AccordionUsage";
import { Drawer, Button, List, ListItem, ListItemText } from "@mui/material";
import FilterSidebar from "../../components/shared/products/FilterSidebar";

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
    // <main>
    //   <div className="mx-52 my-20 pt-5 flex flex-col bg-white">
    //     {/* <h1 className="text-3xl font-bold my-6">{category}</h1> */}
    //     {/* <br /> */}
    //     <div className="flex">
    //       {/* left */}
    //       <div className="left bg-gray-800 w-80 min-h-screen start-0 top-0 p-10 ps-16 max-laptop:hidden">
    //         {/* Add filter or any additional components here */}
    //         <FilterSidebar />
    //       </div>
    //       {/* right */}
    //       <div className="right flex flex-wrap gap-4 bg-gray-200 flex-1 p-4 pt-10">
    //         {isPending ? (
    //           <p>Loading...</p>
    //         ) : (
    //           products.map((product) => (
    //             <ProductCard key={product.id} product={product} />
    //           ))
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </main>
    <Filter products={products} category={category} />
  );
}
