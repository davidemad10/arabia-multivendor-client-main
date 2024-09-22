import ProductOverview from "../../components/shared/products/productOverview";
import ProductInfo from "../../components/shared/products/ProductInfo";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
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
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  reviews: [
    {
      username: "john_doe",
      comment: "Great quality and very comfortable!",
      rating: 5,
    },
    {
      username: "jane_smith",
      comment: "Good value for the price.",
      rating: 4,
    },
    {
      username: "alex_jones",
      comment: "The fit is perfect and the material is soft.",
      rating: 5,
    },
    {
      username: "emily_clark",
      comment: "Colors are nice but the fabric could be better.",
      rating: 3,
    },
    {
      username: "michael_brown",
      comment: "Excellent product, will buy again.",
      rating: 5,
    },
  ],
};

export default function ProductDetails() {
  return (
    <div>
      <ProductOverview product={product} />
      <ProductInfo product={product} />
    </div>
  );
}
