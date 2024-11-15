import ProductOverview from "../../components/shared/products/productOverview";
import ProductInfo from "../../components/shared/products/ProductInfo";
import ProductsYouMayLike from "../../components/shared/products/ProductsYouMayLike";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../api/productRequests";
import { Backdrop, CircularProgress } from "@mui/material";

// const data = {
//   sku: "colorsku",
//   productName: null,
//   category: {
//     id: 1,
//     translations: {
//       en: {
//         name: "category1",
//       },
//     },
//     image:
//       "http://127.0.0.1:8000/media/categories/images/category1/Demon-Slayer-Logo.png",
//     slug: "categoryimageslug",
//     is_featured: true,
//     lft: 1,
//     rght: 2,
//     tree_id: 1,
//     level: 0,
//     parent: null,
//   },
//   brand: {
//     id: 1,
//     translations: {
//       en: {
//         name: "brand1",
//       },
//     },
//     slug: "brandslug",
//     image: "http://127.0.0.1:8000/media/brands/images/brand1/3615061.png",
//   },
//   translations: {
//     en: {
//       name: "product1",
//       description: "this is description for product one",
//     },
//   },
//   specifications: {
//     key: "value",
//   },
//   reviews: [
//     {
//       id: 1,
//       rating: 4.5,
//       comment: "review1",
//       username: "user1",
//       avatar: "",
//     },
//     {
//       id: 2,
//       rating: 3.5,
//       comment: "review2",
//       username: "user2",
//       avatar: "",
//     },
//     {
//       id: 1,
//       rating: 4.5,
//       comment: "review1",
//       username: "user1",
//       avatar: "",
//     },
//     {
//       id: 2,
//       rating: 3.5,
//       comment: "review2",
//       username: "user2",
//       avatar: "",
//     },
//   ],
//   thumbnail: "http://127.0.0.1:8000/media/product/images/product1/logo.jpeg",
//   image1:
//     "http://127.0.0.1:8000/media/product/images/product1/sticker-png-attack-on-titan-icon-media-render04.png",
//   image2: "http://127.0.0.1:8000/media/product/images/product1/download.jpg",
//   image3:
//     "http://127.0.0.1:8000/media/product/images/product1/de5oltn-034b5612-9e42-4e45-b617-73282c0924d2.png",
//   image4:
//     "http://127.0.0.1:8000/media/product/images/product1/Demon-Slayer-Logo.png",
//   color: [
//     {
//       id: 1,
//       name: "Red",
//     },
//     {
//       id: 3,
//       name: "Black",
//     },
//   ],
//   size: [
//     {
//       id: 1,
//       name: "XL",
//     },
//     {
//       id: 2,
//       name: "2XL",
//     },
//   ],
//   slug: "colorredslug",
//   price_before_discount: "15.00",
//   price_after_discount: "10.00",
//   stock_quantity: 100,
//   total_sold: 21,
//   total_views: 500,
//   is_available: true,
//   created: "2024-09-24T13:36:17.937485Z",
//   updated: "2024-09-27T18:16:23.129976Z",
//   supplier: "03715695-5c00-4a61-a413-9d1f905be34f",
// };

const products = [
  {
    id: 1,
    name: "Basic Tee",
    price: "  32",
    originalPrice: "  40",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat .",
    discount: 10,
  },
  {
    id: 2,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 3,
    name: "Basic Teee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 4,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 5,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 5,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 5,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 5,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 5,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 5,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 5,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 5,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 5,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 5,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 5,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    id: 5,
    name: "Basic Tee",
    price: "  32",
    href: "#",
    image:
      "https://img.freepik.com/free-photo/front-view-smartphone-with-geometry-tools_23-2149404189.jpg?ga=GA1.1.1957910710.1726994598&semt=ais_hybrid",
    imageAlt: "Two each of gray, white, and black shirts laying flat.",
  },
];

export default function ProductDetails() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    retry: false,
  });

  if (!data) return <div className="min-h-screen">Product not found.</div>;

  if (isLoading)
    return (
      <div className="min-h-screen">
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: 1 })}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  if (error) return <div className="min-h-screen">{error.message}</div>;

  if (data)
    return (
      <div>
        <ProductOverview product={data} />
        <ProductInfo product={data} />
        <ProductsYouMayLike products={products} />
      </div>
    );
}
