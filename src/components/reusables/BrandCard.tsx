interface BrandCardProps {
  brand: {
    id: number;
    name: string;
    image: string;
  };
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-black p-4 border border-gray-200 rounded-xl shadow-lg h-40 w-64">
      <img
        className="w-full h-28 object-contain"
        src={brand.image}
        alt={brand.name}
      />
      <h2 className="text-center mt-4 text-white font-bold">{brand.name}</h2>
    </div>
  );
}
