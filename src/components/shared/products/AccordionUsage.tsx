import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";

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
  setPriceRange,
  setSelectedRatings,
  resetTrigger, // Add resetTrigger prop
}: {
  setSelectedCategories: (categories: string[]) => void;
  setSelectedBrands: (brands: string[]) => void;
  setPriceRange: (range: { from: number; to: number }) => void;
  setSelectedRatings: (ratings: number[]) => void;
  resetTrigger: boolean;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedCategories, setLocalSelectedCategories] = useState<string[]>(
    []
  );
  const [selectedBrands, setLocalSelectedBrands] = useState<string[]>([]);
  const [fromPrice, setFromPrice] = useState<string>("");
  const [toPrice, setToPrice] = useState<string>("");
  const [priceError, setPriceError] = useState<string | null>(null);
  const [ratingRange, setRatingRange] = useState<number[]>([1, 5]);

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

  useEffect(() => {
    // Reset all local states on clear
    setLocalSelectedCategories([]);
    setLocalSelectedBrands([]);
    setFromPrice("");
    setToPrice("");
    setRatingRange([1, 5]);

    // Update parent states
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange(null);
    setSelectedRatings([1, 5]);
  }, [resetTrigger]);

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

  const handlePriceChange = () => {
    const from = parseFloat(fromPrice);
    const to = parseFloat(toPrice);

    if (isNaN(from) || isNaN(to)) {
      setPriceError("Please enter valid numbers for both prices.");
      return;
    }
    if (from < 0 || to < 0) {
      setPriceError("Prices must be positive numbers.");
      return;
    }
    if (from > to) {
      setPriceError(
        "The 'From' price must be less than or equal to the 'To' price."
      );
      return;
    }

    setPriceError(null);
    setPriceRange({ from, to });
  };

  const handleRatingRangeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    const ratingRange = newValue as number[];
    setRatingRange(ratingRange);
    setSelectedRatings(ratingRange);
  };

  const renderCategory = (category: Category) => {
    if (category.children && category.children.length > 0) {
      return (
        <Accordion
          key={category.id}
          sx={{ boxShadow: "none", marginLeft: `${category.level * 10}px` }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{category.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {category.children.map((subCategory) =>
              renderCategory(subCategory)
            )}
          </AccordionDetails>
        </Accordion>
      );
    }
    return (
      <FormControlLabel
        key={category.id}
        control={
          <Checkbox
            value={category.name}
            checked={selectedCategories.includes(category.name)}
            onChange={(e) => handleCategoryChange(e, category.name)}
          />
        }
        label={category.name}
        sx={{ marginLeft: `${category.level * 10}px` }}
      />
    );
  };

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

      {/* Price Filter */}
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: "bold" }}>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="From"
            variant="outlined"
            size="small"
            value={fromPrice}
            onChange={(e) => setFromPrice(e.target.value)}
            type="number"
            sx={{ marginRight: "8px" }}
          />
          <TextField
            label="To"
            variant="outlined"
            size="small"
            value={toPrice}
            onChange={(e) => setToPrice(e.target.value)}
            type="number"
            sx={{ marginRight: "8px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePriceChange}
          >
            Go
          </Button>
          {priceError && <Typography color="error">{priceError}</Typography>}
        </AccordionDetails>
      </Accordion>

      {/* Rating Filter */}
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: "bold" }}>Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={ratingRange}
            onChange={handleRatingRangeChange}
            valueLabelDisplay="auto"
            min={1}
            max={5}
            marks
          />
          <Typography>{`Rating: ${ratingRange[0]} - ${ratingRange[1]} Stars`}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
