import React from "react";
import { useParams } from "react-router-dom";

import ProductOverview from "../../components/shared/products/productOverview";

export default function ProductDetails() {
  const { id } = useParams();
  return (
    <div>
      ProductDetails
      <ProductOverview id={id} />
    </div>
  );
}
