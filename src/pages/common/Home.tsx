import HeroSlider from "../../components/shared/advertisement/HeroSlider";
import CategoriesSlider from "../../components/shared/products/CategoriesSlider";
import ProductsSlider from "../../components/shared/products/ProductsSlider";
import { Helmet } from "react-helmet";
import { useGetHeroSliders } from "../../react-query/advertisement";
import { useTranslation } from "react-i18next";
import { useGetCategories } from "../../react-query/product";
import BrandsSlider from "../../components/shared/products/BrandsSlider";

export default function Home() {
  const { t } = useTranslation();
  const sliders = useGetHeroSliders();
  const slidersData = [
    {
      id: 1,
      category: "example-category",
      translations: {
        en: {
          image:
            "https://img.freepik.com/free-photo/image-happy-man-shopping-vacation-holding-paper-bags-smiling-standing-against-yellow-backg_1258-161114.jpg?t=st=1729618990~exp=1729622590~hmac=a70d476dd21c73b64fe913d29e6c4b290e7fe43d845bb38336b0a37e6d7b4c4f&w=1380",
        },
        ar: {
          image:
            "https://img.freepik.com/free-photo/image-happy-man-shopping-vacation-holding-paper-bags-smiling-standing-against-yellow-backg_1258-161114.jpg?t=st=1729618990~exp=1729622590~hmac=a70d476dd21c73b64fe913d29e6c4b290e7fe43d845bb38336b0a37e6d7b4c4f&w=1380",
        },
      },
    },
    {
      id: 2,
      category: "example-category",
      translations: {
        en: {
          image:
            "https://img.freepik.com/free-photo/black-friday-sale-label-yellow-copy-space-background_23-2148665786.jpg?t=st=1729619572~exp=1729623172~hmac=b2ffaafc312b64cc0f560f51e385f4937ab7a2d58bbc8e990e7cd764a5f44891&w=1380",
        },
        ar: {
          image:
            "https://img.freepik.com/free-photo/black-friday-sale-label-yellow-copy-space-background_23-2148665786.jpg?t=st=1729619572~exp=1729623172~hmac=b2ffaafc312b64cc0f560f51e385f4937ab7a2d58bbc8e990e7cd764a5f44891&w=1380",
        },
      },
    },
  ];

  const categoriesData = [
    {
      id: 1,
      image:
        "https://img.freepik.com/premium-vector/home-electronics-appliances-circle-infographics-template-concept_94477-1118.jpg?w=826",
      translations: {
        en: {
          name: "Category 1",
        },
        ar: {
          name: "فئة 1",
        },
      },
      slug: "category-1",
      is_featured: false,
      lft: 1,
      rght: 2,
      depth: 1,
      parent_id: null,
      tree_id: 1,
      level: 1,
      parent: 0,
    },
    {
      id: 2,
      image: "https://cdn-icons-png.flaticon.com/128/2278/2278984.png",
      translations: {
        en: {
          name: "Category 2",
        },
        ar: {
          name: "فئة 2",
        },
      },
      slug: "category-2",
      is_featured: false,
      lft: 3,
      rght: 4,
      depth: 1,
      parent_id: null,
      tree_id: 1,
      level: 1,
      parent: 0,
    },
    {
      id: 3,
      image: "https://cdn-icons-png.flaticon.com/128/2954/2954918.png",
      translations: {
        en: {
          name: "Category 3",
        },
        ar: {
          name: "فئة 3",
        },
      },
      slug: "category-3",
      is_featured: false,
      lft: 5,
      rght: 6,
      depth: 1,
      parent_id: null,
      tree_id: 1,
      level: 1,
      parent: 0,
    },
    {
      id: 4,
      image:
        "https://static.vecteezy.com/system/resources/previews/006/687/367/original/sport-wear-community-logo-design-free-vector.jpg",
      translations: {
        en: {
          name: "Category 1",
        },
        ar: {
          name: "فئة 1",
        },
      },
      slug: "category-1",
      is_featured: false,
      lft: 1,
      rght: 2,
      depth: 1,
      parent_id: null,
      tree_id: 1,
      level: 1,
      parent: 0,
    },
    {
      id: 5,
      image:
        "https://static.vecteezy.com/system/resources/previews/006/687/367/original/sport-wear-community-logo-design-free-vector.jpg",
      translations: {
        en: {
          name: "Category 1",
        },
        ar: {
          name: "فئة 1",
        },
      },
      slug: "category-1",
      is_featured: false,
      lft: 1,
      rght: 2,
      depth: 1,
      parent_id: null,
      tree_id: 1,
      level: 1,
      parent: 0,
    },
    {
      id: 6,
      image:
        "https://static.vecteezy.com/system/resources/previews/006/687/367/original/sport-wear-community-logo-design-free-vector.jpg",
      translations: {
        en: {
          name: "Category 1",
        },
        ar: {
          name: "فئة 1",
        },
      },
      slug: "category-1",
      is_featured: false,
      lft: 1,
      rght: 2,
      depth: 1,
      parent_id: null,
      tree_id: 1,
      level: 1,
      parent: 0,
    },
    {
      id: 7,
      image:
        "https://static.vecteezy.com/system/resources/previews/006/687/367/original/sport-wear-community-logo-design-free-vector.jpg",
      translations: {
        en: {
          name: "Category 1",
        },
        ar: {
          name: "فئة 1",
        },
      },
      slug: "category-1",
      is_featured: false,
      lft: 1,
      rght: 2,
      depth: 1,
      parent_id: null,
      tree_id: 1,
      level: 1,
      parent: 0,
    },
    {
      id: 8,
      image:
        "https://static.vecteezy.com/system/resources/previews/006/687/367/original/sport-wear-community-logo-design-free-vector.jpg",
      translations: {
        en: {
          name: "Category 1",
        },
        ar: {
          name: "فئة 1",
        },
      },
      slug: "category-1",
      is_featured: false,
      lft: 1,
      rght: 2,
      depth: 1,
      parent_id: null,
      tree_id: 1,
      level: 1,
      parent: 0,
    },
    {
      id: 9,
      image:
        "https://static.vecteezy.com/system/resources/previews/006/687/367/original/sport-wear-community-logo-design-free-vector.jpg",
      translations: {
        en: {
          name: "Category 1",
        },
        ar: {
          name: "فئة 1",
        },
      },
      slug: "category-1",
      is_featured: false,
      lft: 1,
      rght: 2,
      depth: 1,
      parent_id: null,
      tree_id: 1,
      level: 1,
      parent: 0,
    },
  ];

  const categories = useGetCategories("", true);

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
            <HeroSlider sliders={slidersData} isPending={sliders.isPending} />
            <CategoriesSlider
              categories={categoriesData}
              isPending={categories.isPending}
            />
            <div className="w-full flexCenter">
              <BrandsSlider />
            </div>
            {/* 
            <div className="w-full flexCenter">
              {[
                "/25-b2s-smart-watch-ar3.jpg",
                "/24-b2s-gaming-monitors-ar3.jpg",
                "/23-b2s-smarthome-ar3.jpg",
              ].map((src, idx) => (
                <div key={idx} className="w-1/5">
                  <img src={src} alt="Ad" />
                </div>
              ))}
            </div> */}

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

{
  /* <Helmet>
  <title>Arbia - Multi-vendor Online Store</title>
  <meta name="description" content="Arbia is a diverse online store offering a wide range of products from various vendors. Shop now and discover exclusive deals and featured products." />
  <meta name="keywords" content="Arbia, online store, shop online, multi-vendor products, vendors, special offers, shopping" />
  <meta property="og:title" content="Arbia - Multi-vendor Online Store" />
  <meta property="og:description" content="Arbia is your go-to destination for online shopping. Browse a wide selection of products and deals from top vendors." />
  <meta property="og:image" content="https://example.com/path/to/your/og-image.jpg" />
  <meta property="og:url" content="https://example.com/home" />
  <link rel="alternate" hreflang="en" href="https://example.com/home/en" />
  <link rel="alternate" hreflang="ar" href="https://example.com/home/ar" />
  </Helmet> */
}
{
  /* <button className='button1 px-6 h-14 w-52 font-bold text-white'>ابدأ التسوق</button> */
}
