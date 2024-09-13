import React from 'react'

export default function BrandsUlove() {
    const brands = [
        { name: 'Xiaomi', image: 'https://f.nooncdn.com/mpcms/EN0003/assets/345a73af-8c25-427a-ae62-1aee9f340087.png?format=avif' },
        { name: 'DeFacto', image: 'https://f.nooncdn.com/mpcms/EN0003/assets/508a6bef-0b04-4772-8143-6a0e4d6cbe78.png?format=avif' },
        { name: 'Essence', image: 'https://f.nooncdn.com/mpcms/EN0003/assets/9ddfdb94-0fea-42cf-ba36-614940610081.png?format=avif' },
        { name: 'Samsung', image: 'https://f.nooncdn.com/mpcms/EN0003/assets/08c398ef-80ec-4650-b431-79caa6d7cd3c.png' },
        { name: 'ElAraby', image: 'https://f.nooncdn.com/mpcms/EN0003/assets/9d68b9ed-c2bf-4add-b71c-d8adda3e9c63.png?format=avif' },
        { name: 'ElAraby', image: 'https://f.nooncdn.com/mpcms/EN0003/assets/9d68b9ed-c2bf-4add-b71c-d8adda3e9c63.png?format=avif' },
        { name: 'B.TECH', image: 'https://f.nooncdn.com/mpcms/EN0003/assets/bc566480-cabf-4a77-be68-a21c53a4264e.png?format=avif' },
        { name: 'B.TECH', image: 'https://f.nooncdn.com/mpcms/EN0003/assets/bc566480-cabf-4a77-be68-a21c53a4264e.png?format=avif' },
        { name: 'Braun', image: 'https://f.nooncdn.com/mpcms/EN0003/assets/ff6e3edc-0498-4633-977b-934fdd527903.png?format=avif' },
        { name: 'Braun', image: 'https://f.nooncdn.com/mpcms/EN0003/assets/ff6e3edc-0498-4633-977b-934fdd527903.png?format=avif' },
        { name: 'Puma', image: 'https://f.nooncdn.com/mpcms/EN0003/assets/ccb71c1c-ea0c-41eb-b34d-39e5fd577e1c.png?format=avif' },
        { name: 'Puma', image: 'https://f.nooncdn.com/mpcms/EN0003/assets/ccb71c1c-ea0c-41eb-b34d-39e5fd577e1c.png?format=avif' },
      ];
  return (
    <div className="container mx-auto p-6">
    <h2 className="text-center text-2xl font-semibold mb-6">ماركات تحبها</h2>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {brands.map((brand, index) => (
        <div key={index} className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center">
          <img src={brand.image} alt={brand.name} className=" w-32" />
        </div>
      ))}
    </div>
  </div>
  )
}
