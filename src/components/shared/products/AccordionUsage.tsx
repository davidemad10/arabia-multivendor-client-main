import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

interface Category {
  id: number;
  name: string;
  level: number;
  parent: number | null;
  children?: Category[];
}

interface Brand {
  id: number;
  name: string;
  slug: string;
}

export default function AccordionUsage({
  setSelectedCategories,
  setSelectedBrands,
}: {
  setSelectedCategories: (categories: string[]) => void;
  setSelectedBrands: (brands: string[]) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedCategories, setLocalSelectedCategories] = useState<string[]>(
    []
  );
  const [selectedBrands, setLocalSelectedBrands] = useState<string[]>([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/products/category/");
        const formattedCategories = response.data.map((cat: any) => ({
          id: cat.id,
          name: cat.translations.en.name,
          level: cat.level,
          parent: cat.parent,
        }));
        setCategories(buildCategoryHierarchy(formattedCategories));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axiosInstance.get("/products/brand/");
        const formattedBrands = response.data.map((brand: any) => ({
          id: brand.id,
          name: brand.translations.en.name,
          slug: brand.slug,
        }));
        setBrands(formattedBrands);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const buildCategoryHierarchy = (categories: Category[]) => {
    const map = new Map(
      categories.map((cat) => [cat.id, { ...cat, children: [] }])
    );
    const rootCategories: Category[] = [];
    categories.forEach((cat) => {
      if (cat.parent) {
        map.get(cat.parent)?.children?.push(map.get(cat.id)!);
      } else {
        rootCategories.push(map.get(cat.id)!);
      }
    });
    return rootCategories;
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryName: string
  ) => {
    const { checked } = event.target;
    const updatedCategories = checked
      ? [...selectedCategories, categoryName]
      : selectedCategories.filter((name) => name !== categoryName);
    setLocalSelectedCategories(updatedCategories);
    setSelectedCategories(updatedCategories);
  };

  const handleBrandChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    brandName: string
  ) => {
    const { checked } = event.target;
    const updatedBrands = checked
      ? [...selectedBrands, brandName]
      : selectedBrands.filter((name) => name !== brandName);
    setLocalSelectedBrands(updatedBrands);
    setSelectedBrands(updatedBrands);
  };

  const renderCategory = (category: Category) => (
    <div key={category.id}>
      <FormControlLabel
        control={
          <Checkbox
            value={category.name}
            checked={selectedCategories.includes(category.name)}
            onChange={(e) => handleCategoryChange(e, category.name)}
          />
        }
        label={category.name}
      />
      {category.children && (
        <div style={{ paddingLeft: "20px" }}>
          {category.children.map((subCategory) => renderCategory(subCategory))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {/* Category Filter */}
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: "bold" }}>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {categories.map((cat) => renderCategory(cat))}
        </AccordionDetails>
      </Accordion>

      {/* Brand Filter */}
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: "bold" }}>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {brands.map((brand) => (
            <FormControlLabel
              key={brand.id}
              control={
                <Checkbox
                  value={brand.name}
                  checked={selectedBrands.includes(brand.name)}
                  onChange={(e) => handleBrandChange(e, brand.name)}
                />
              }
              label={brand.name}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
