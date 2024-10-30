import React, { useEffect, useState } from "react";
import HeroSlider from "../../components/shared/advertisement/HeroSlider";
import CategoriesSlider from "../../components/shared/products/CategoriesSlider";
import ProductsSlider from "../../components/shared/products/ProductsSlider";
import { Helmet } from "react-helmet";
// import { useTranslation } from "react-i18next";
import BrandsSlider from "../../components/shared/products/BrandsSlider";
import axiosInstance from "../../api/axiosInstance";
import { Categories } from "../../types";
import { Trans, useTranslation } from "react-i18next";

export default function Home() {
  const { i18n, t } = useTranslation();

  const [categories, setCategories] = useState<Categories[]>([]);
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

            {/* Products Sliders */}
            <ProductsSlider title="Trending Now" link="/trending" />
            <ProductsSlider title="Time-limited Offers" link="/offers" />
            <ProductsSlider title="Women Collection" link="/women" />
            <ProductsSlider title="Electronics" link="/electronics" />
          </div>
        </div>
      </main>
    </div>
  );
}
