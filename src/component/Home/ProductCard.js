import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    edit: true,
    isHalf: true,
    activeColor: "tomato",
    precision: 0.5,
  };

  return (
    <Link to={`/product/${product._id}`} className='productCard' >
      <img src={product.image[0].url} alt={product.name} className="productImage" />
      <p>{product.name}</p>

      <div>
        <ReactStars {...options} />
        <span className="productCardSpan">
         ({product.numOfReviews} Reviews) 
        </span>
      </div>
      <span>₹{product.price}</span>
    </Link>
  );
};

export default ProductCard;
