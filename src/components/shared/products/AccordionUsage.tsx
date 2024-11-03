import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

interface AccordionUsageProps {
  setPriceRange: (value: number[]) => void;
  setSelectedBrands: (brands: string[]) => void;
  setSelectedRating: (rating: number | null) => void;
}

export default function AccordionUsage({
  setPriceRange,
  setSelectedBrands,
  setSelectedRating,
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

  const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];

  // Handle price range change
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

  // Handle brand change
  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updatedBrands = localSelectedBrands.includes(value)
      ? localSelectedBrands.filter((brand) => brand !== value)
      : [...localSelectedBrands, value];
    setLocalSelectedBrands(updatedBrands);
    setSelectedBrands(updatedBrands);
  };

  // Handle rating change
  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rating = Number(event.target.value);
    setLocalSelectedRating(rating);
    setSelectedRating(rating);
  };

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="space-y-4 pt-5 px-2">
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
    </div>
  );
}
