// src/pages/DynamicTryOnPage.js
import React, { useState } from "react";
import DynamicTryOn from "../components/DynamicTryOn";
import { productsData } from "../data/products";

const DynamicTryOnPage = () => {
  // For testing, we select the Victorian Dress (id:3) as our dynamic try-on product.
  const [selectedProduct, setSelectedProduct] = useState(
    productsData.find((p) => p.id === 3)
  );

  const handleClose = () => {
    // You can clear the selection or navigate away
    setSelectedProduct(null);
  };

  return selectedProduct ? (
    <DynamicTryOn product={selectedProduct} onClose={handleClose} />
  ) : (
    <div>
      <h2>No product selected for dynamic try-on.</h2>
    </div>
  );
};

export default DynamicTryOnPage;
