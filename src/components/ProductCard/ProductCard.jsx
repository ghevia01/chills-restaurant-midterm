import React from "react";

import "./product-card-styles.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-img">
        <img src={product.image} alt="product" />
      </div>
      <div className="product-info">
        <div className="product-name-price-container">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price}</p>
        </div>
        <div className="product-description">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
