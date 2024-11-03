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
  const [isCategoriesLoading, setIsCategoriesLoading] = useState<boolean>(true);
  const [isProductsLoading, setIsProductsLoading] = useState<boolean>(true);

  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsCategoriesLoading(true);
      try {
        const response = await axiosInstance.get("/products/category/");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setIsProductsLoading(true);
      const productsData: Record<string, Product[]> = {};

      try {
        const productPromises = categories.map(async (category) => {
          const response = await axiosInstance.get(`/products/bycategory`, {
            params: { category: category.slug },
          });
          productsData[category.slug] = response.data.map((product: any) => ({
            id: product.id,
            name: product.translations.en.name,
            image: product.images[0]?.image,
            price: product.price_after_discount,
            oldPrice: product.price_before_discount,
            rating: product.total_views,
            isBestSeller: product.total_sold > 50,
            description: product.translations.en.description,
            slug: product.slug,
          }));
        });

        await Promise.all(productPromises);
        setCategoryProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsProductsLoading(false);
      }
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
    <div className="mt-32">
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
            <CategoriesSlider
              categories={categories}
              isPending={isCategoriesLoading}
            />
            <div className="w-full flexCenter">
              <BrandsSlider />
            </div>

            {categories.map((category) => (
              <ProductsSlider
                key={category.id}
                title={category.translations.en.name}
                link={`/category/${category.slug}`}
                products={categoryProducts[category.slug] || []}
                isLoading={isProductsLoading}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
