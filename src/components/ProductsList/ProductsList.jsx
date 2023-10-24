import React from "react";

import ProductCard from "../ProductCard/ProductCard";

import "./products-list-styles.css";

const ProductsList = ({ products }) => {
  return (
    <section className="products-list-container">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </section>
  );
};

export default ProductsList;
