import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { Product } from "../../types";

export default function BrandProducts() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `/products/bybrand/brand=${slug}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products for brand:", error);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <div>
      <h1>Products for {slug}</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id}>{/* Render product details here */}</div>
        ))}
      </div>
    </div>
  );
}
