import ProductOverview from "../../components/shared/products/productOverview";
import ProductInfo from "../../components/shared/products/ProductInfo";
import ProductsYouMayLike from "../../components/shared/products/ProductsYouMayLike";

const product = {
  name: "Basic Tee 6-Pack",
  price: "  192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://images.unsplash.com/photo-1562424995-2efe650421dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1667891838018-a6df081da495?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1665413642308-c5c1ed052d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: {
    handmade: "Hand cut and sewn locally",
    dye: "Dyed with our propriPack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on ao fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive coletary colors",
    washing: "Pre-washed & pre-shrunk",
    material: "Ultra-soft 100% cotton",
  },
  reviews: [
    {
      username: "john_doe",
      comment: "Great quality and very comfortablee!",
      rating: 5,
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg",
    },
    {
      username: "jane_smith",
      comment: "Good value for the price.",
      rating: 4,
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg",
    },
    {
      username: "alex_jones",
      comment: "The fit is perfect and the material is soft.",
      rating: 5,
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg",
    },
    {
      username: "emily_clark",
      comment: "Colors are nice but the fabric could be better.",
      rating: 3,
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg",
    },
    {
      username: "michael_brown",
      comment: "Excellent product, will buy again.",
      rating: 5,
      avatar:
        "https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg",
    },
  ],
};

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
  return (
    <div>
      <ProductOverview product={product} />
      <ProductInfo product={product} />
      <ProductsYouMayLike products={products} />
    </div>
  );
}
