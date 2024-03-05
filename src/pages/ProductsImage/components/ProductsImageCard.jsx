import React, { useState, useEffect } from 'react';
import ProductsImageCardUi from './ProductsImageCardUi';
import '../components/ProductsImageCardUi.css';
// import '../components/ProductsImagesApi.css'


function ProductsImageCard({ productsImg }) {
  // console.log(productsImg)
  return (
    productsImg.map((image, index) => (

      <ProductsImageCardUi image={image} key={index + 1} />
    ))
  );
}

export default ProductsImageCard;