import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

interface SubCategory {
  name: string;
}

interface Category {
  name: string;
  subCategories: SubCategory[];
}

interface AccordionUsageProps {
  setPriceRange: (value: number[]) => void;
  setSelectedBrands: (brands: string[]) => void;
  setSelectedRating: (rating: number | null) => void;
  setSelectedCategories: (categories: string[]) => void;
}

export default function AccordionUsage({
  setPriceRange,
  setSelectedBrands,
  setSelectedRating,
  setSelectedCategories,
}: AccordionUsageProps) {
  const [localPriceRange, setLocalPriceRange] = React.useState<number[]>([
    0, 500,
  ]);
  const [localSelectedBrands, setLocalSelectedBrands] = React.useState<
    string[]
  >([]);
  const [localSelectedRating, setLocalSelectedRating] = React.useState<
    number | null
  >(null);
  const [localSelectedCategories, setLocalSelectedCategories] = React.useState<
    string[]
  >([]);

  const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];

  const categories: Category[] = [
    {
      name: "Home & Kitchen",
      subCategories: [{ name: "Kitchen & Dining" }, { name: "Bath" }],
    },
    {
      name: "Electronics",
      subCategories: [{ name: "Mobile Phones" }, { name: "Laptops" }],
    },
  ];

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = parseInt(event.target.value, 10) || 0;
    setLocalPriceRange([minPrice, localPriceRange[1]]);
    setPriceRange([minPrice, localPriceRange[1]]);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = parseInt(event.target.value, 10) || 0;
    setLocalPriceRange([localPriceRange[0], maxPrice]);
    setPriceRange([localPriceRange[0], maxPrice]);
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updatedBrands = localSelectedBrands.includes(value)
      ? localSelectedBrands.filter((brand) => brand !== value)
      : [...localSelectedBrands, value];
    setLocalSelectedBrands(updatedBrands);
    setSelectedBrands(updatedBrands);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rating = Number(event.target.value);
    setLocalSelectedRating(rating);
    setSelectedRating(rating);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryName: string
  ) => {
    const { checked } = event.target;
    const updatedSelectedCategories = checked
      ? [...localSelectedCategories, categoryName]
      : localSelectedCategories.filter((name) => name !== categoryName);

    setLocalSelectedCategories(updatedSelectedCategories);
    setSelectedCategories(updatedSelectedCategories);
  };

  const handleSubCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    subCategoryName: string
  ) => {
    const { checked } = event.target;
    const updatedSelectedCategories = checked
      ? [...localSelectedCategories, subCategoryName]
      : localSelectedCategories.filter((name) => name !== subCategoryName);

    setLocalSelectedCategories(updatedSelectedCategories);
    setSelectedCategories(updatedSelectedCategories);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="space-y-4 pt-5 px-2">
      {/* Price Filter */}
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="price-filter-content"
          id="price-filter-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            {capitalizeFirstLetter("price")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex space-x-2">
            <TextField
              label="From Price"
              type="number"
              variant="outlined"
              value={localPriceRange[0]}
              onChange={handleMinPriceChange}
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              label="To Price"
              type="number"
              variant="outlined"
              value={localPriceRange[1]}
              onChange={handleMaxPriceChange}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Brand Filter */}
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="brand-filter-content"
          id="brand-filter-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            {capitalizeFirstLetter("brand")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {brands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  value={brand}
                  checked={localSelectedBrands.includes(brand)}
                  onChange={handleBrandChange}
                />
              }
              label={brand}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Rating Filter */}
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="rating-filter-content"
          id="rating-filter-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            {capitalizeFirstLetter("rating")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {[4, 3, 2, 1].map((rating) => (
            <FormControlLabel
              key={rating}
              control={
                <Checkbox
                  value={rating}
                  checked={localSelectedRating === rating}
                  onChange={handleRatingChange}
                />
              }
              label={`${rating} Stars & Up`}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Category Filter */}
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="category-filter-content"
          id="category-filter-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            {capitalizeFirstLetter("category")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {categories.map((category) => (
            <div key={category.name}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={category.name}
                    checked={localSelectedCategories.includes(category.name)}
                    onChange={(e) => handleCategoryChange(e, category.name)}
                  />
                }
                label={category.name}
              />
              {category.subCategories.map((subCategory) => (
                <div style={{ paddingLeft: "20px" }} key={subCategory.name}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={subCategory.name}
                        checked={localSelectedCategories.includes(
                          subCategory.name
                        )}
                        onChange={(e) =>
                          handleSubCategoryChange(e, subCategory.name)
                        }
                      />
                    }
                    label={subCategory.name}
                  />
                </div>
              ))}
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
