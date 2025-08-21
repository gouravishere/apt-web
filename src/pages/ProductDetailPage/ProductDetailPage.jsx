import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { productId } = useParams(); // Extract the productId from the URL

  return (
    <div>
      <h1>Product Detail</h1>
      <p>Displaying details for product ID: {productId}</p>
    </div>
  );
};

export default ProductDetailPage;
