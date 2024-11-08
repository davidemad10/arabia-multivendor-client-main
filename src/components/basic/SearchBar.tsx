import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../api/axiosInstance";

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any[]>([]); // Type `any[]` can be replaced with your product type if available.

  // Fetch products based on search term
  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.trim() === "") {
        setResults([]);
        return;
      }

      try {
        const response = await axiosInstance.get(`/products/`, {
          params: { search: searchTerm },
        });
        setResults(response.data.results);
        console.log("....................", response.data.results); // Adjust this line if the data is nested in `response.data`
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    // Debounce to wait for the user to stop typing
    const delayDebounce = setTimeout(() => {
      fetchResults();
    }, 300); // Adjust debounce time as needed

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="w-1/2 laptop:w-4/12 desktop:w-2/5 desktop:mr-20 mx-6 justify-center">
      <div className="relative">
        <input
          placeholder={t("search")}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border placeholder:text-sm outline-none focus:border-Red border-gray-400 h-12 text-lg rounded-md p-4 pr-10 pl-4 w-full"
        />
        <div className="absolute top-0 right-0 flex items-center justify-center h-full w-10 text-gray-400 text-xl">
          <FiSearch />
        </div>
      </div>

      {/* Display search results (optional) */}
      {results.length > 0 && (
        <div className="absolute z-10 bg-white border border-gray-200 shadow-lg rounded-b-lg">
          {results.map((product) => (
            <div
              key={product.id}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {product.productName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
