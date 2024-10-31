import React, { useEffect, useState, useRef } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "../Home/ProductCard";
import { clearErrors, getProduct } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { Slider, Typography } from "@material-ui/core";
import PaginationComponent from "../PaginationComponent"; // Import the custom PaginationComponent
import ReactStars from 'react-rating-stars-component';

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams();

  // Redux state
  const { loading, error, products, resultPerPage, productsCount, filteredProductCount, productCurentPage } = useSelector((state) => state.products);

  const categories = ["leptop", "mobile", "Bottom", "Tops", "Attire", "Camera", "SmartPhones"];

  const [category, setCategory] = useState(""); // Selected category state
  const [hasFetched, setHasFetched] = useState(false); // For handling refetch on change
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [price, setPrice] = useState([0, 25000]); // Price range state
  const [ratings,setRatings]=useState(0)
  const timeoutRef = useRef(null); // Reference for handling debounce in slider

  // Handler for price slider
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setHasFetched(false); // Trigger re-fetch when slider stops moving
    }, 1000);
  };

  // Handler for setting the current page
  const setCurrentPageNo = (value) => {
    if (value === productCurentPage) return;
    setCurrentPage(value);
    setHasFetched(false); // Refetch data when the page changes
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (!loading && !error && !hasFetched) {
      // Fetch products based on filters and pagination
      dispatch(getProduct(keyword, currentPage, price, category,ratings));
      setHasFetched(true);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling
    });
  }, [dispatch, alert, error, loading, hasFetched, keyword, currentPage, price, category,ratings]);

  // Calculate total pages
  const totalPages = Math.ceil(productsCount / resultPerPage);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          {/* Products Display */}
          <div className="products">{products?.length > 0 && products?.map((product) => <ProductCard key={product._id} product={product} />)}</div>

          {/* Filters Section */}
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider value={price} onChange={priceHandler} valueLabelDisplay="auto" aria-labelledby="range-slider" min={0} max={25000} />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((categoryItem) => (
                <li
                  className="category-link"
                  key={categoryItem}
                  onClick={() => {
                    setCategory(categoryItem); // Set the selected category
                    setHasFetched(false); // Trigger re-fetch
                  }}
                >
                  {categoryItem}
                </li>
              ))}
            </ul>

            
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                  setHasFetched(false);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>

          </div>

          {/* Pagination Component */}
          {resultPerPage < filteredProductCount && <PaginationComponent page={currentPage} totalPages={totalPages} setCurrentPageNo={setCurrentPageNo} />}
        </>
      )}
    </>
  );
};

export default Products;
