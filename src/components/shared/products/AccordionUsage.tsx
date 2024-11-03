import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

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
  const handlePriceChange = (event: any, newValue: number | number[]) => {
    setLocalPriceRange(newValue as number[]);
    setPriceRange(newValue as number[]);
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

  return (
    <div className="space-y-4 pt-5 px-2">
      <Accordion className="">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="price-filter-content"
          id="price-filter-header"
        >
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={localPriceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
          <div className="flex justify-between text-sm">
            <span>${localPriceRange[0]}</span>
            <span>${localPriceRange[1]}</span>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="brand-filter-content"
          id="brand-filter-header"
        >
          <Typography>Brand</Typography>
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

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="rating-filter-content"
          id="rating-filter-header"
        >
          <Typography>Rating</Typography>
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
