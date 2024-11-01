import React, { useEffect, useState } from "react";
import HeroSlider from "../../components/shared/advertisement/HeroSlider";
import CategoriesSlider from "../../components/shared/products/CategoriesSlider";
import ProductsSlider from "../../components/shared/products/ProductsSlider";
import { Helmet } from "react-helmet";
// import { useTranslation } from "react-i18next";
import BrandsSlider from "../../components/shared/products/BrandsSlider";
import axiosInstance from "../../api/axiosInstance";
import { Categories } from "../../types";
import { Product } from "../../types";

export default function Home() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<
    Record<string, Product[]>
  >({});
  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsPending(true);
      try {
        const response = await axiosInstance.get("/products/category/");
        setCategories(response.data);
        console.log("................................", response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsPending(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      const productsData: Record<string, Product[]> = {};
      for (const category of categories) {
        try {
          const response = await axiosInstance.get(`/products/bycategory`, {
            params: { category: category.slug },
          });
          console.log("Products By category", response.data);
          productsData[category.slug] = response.data.map((product: any) => ({
            id: product.id,
            name: product.translations.en.name,
            image: product.images[0]?.image, // First image for simplicity
            price: product.price_after_discount,
            oldPrice: product.price_before_discount,
            rating: product.total_views, // Adjust as needed if you have a rating system
            isBestSeller: product.total_sold > 50, // Example condition
            description: product.translations.en.description,
            slug: product.slug,
          }));
        } catch (error) {
          console.error(
            `Failed to fetch products for category ${category.slug}:`,
            error
          );
        }
      }
      setCategoryProducts(productsData);
      console.log("Products", categoryProducts);
      setIsPending(false);
    };

    if (categories.length > 0) {
      fetchProductsByCategory();
    }
  }, [categories]);

  const slidersData = [
    {
      id: 1,
      category: "example-category",
      translations: {
        en: {
          image:
            "https://www.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-260nw-1188351907.jpg",
        },
        ar: {
          image:
            "https://www.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-260nw-1188351907.jpg",
        },
      },
    },
    {
      id: 2,
      category: "example-category",
      translations: {
        en: {
          image:
            "https://www.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-260nw-1228522084.jpg",
        },
        ar: {
          image:
            "https://www.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-260nw-1228522084.jpg",
        },
      },
    },
  ];

  return (
    <div>
      <Helmet>
        <title>أربيا - متجر إلكتروني متعدد البائعين</title>
        <link rel="icon" type="image/svg+xml" href="/654651.png" />
        <meta
          name="description"
          content="أربيا هو متجر إلكتروني متنوع يقدم مجموعة واسعة من المنتجات من مختلف البائعين. تسوق الآن واكتشف العروض الحصرية والمنتجات المميزة."
        />
        <meta
          name="keywords"
          content="أربيا, متجر إلكتروني, تسوق عبر الإنترنت, منتجات متعددة, بائعين, عروض خاصة, تسوق"
        />
        <meta
          property="og:title"
          content="أربيا - متجر إلكتروني متعدد البائعين"
        />
        <meta
          property="og:description"
          content="أربيا هو وجهتك المفضلة للتسوق عبر الإنترنت. استعرض مجموعة واسعة من المنتجات والعروض من أفضل البائعين."
        />
        <meta
          property="og:image"
          content="https://example.com/path/to/your/og-image.jpg"
        />
        <meta property="og:url" content="https://example.com/home" />
      </Helmet>
      <main>
        <div className="flexCenter flex-col">
          <div className="container flex justify-center flex-col">
            <HeroSlider sliders={slidersData} isPending={isPending} />
            <CategoriesSlider categories={categories} isPending={isPending} />
            <div className="w-full flexCenter">
              <BrandsSlider />
            </div>

            {categories.map((category) => (
              <ProductsSlider
                key={category.id}
                title={category.translations.en.name}
                link={`/products/category/${category.slug}`}
                products={categoryProducts[category.slug] || []}
                isPending={isPending}
              />
            ))}
            {/* Products Sliders */}
            {/* <ProductsSlider title="Trending Now" link="/trending" />
            <ProductsSlider title="Time-limited Offers" link="/offers" />
            <ProductsSlider title="Women Collection" link="/women" />
            <ProductsSlider title="Electronics" link="/electronics" /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
