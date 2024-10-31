import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams hook
import ReactStars from "react-rating-stars-component";
import { ReviewCard } from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { addItemsToCart } from "../../actions/cartAction";

import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";


const ProductDetails = () => {
  const { id } = useParams(); // Use useParams to get the 'id' from URL
  const { loading, product, error } = useSelector((state) => state.productDetails); // Default product to an empty object
  const { success, error: reviewError } = useSelector((state) => state.newReview);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate()
  const [hasFetched, setHasFetched] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

//^---------------------PRODUCT-DETLISE-------------------------------
  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));   //# ID HE TO PRODUCT MILE 
    }
  }, []);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth", //# Optional: Adds smooth scrolling
    });
  }, [error]);
 


  const options = {      //# REATING POCTION
    value: product.ratings, 
    readOnly: true,
    edit: false,
    activeColor: "tomato",
    precision: 0.5,
    size: "24",
    isHalf: true,
  };

  const addToCartHandler = () => {
    if(!user?._id){
      alert.error(`Not Access This Resource login first`);
      Navigate('/login')
      return 
      }
      
   if(user?.role !=="user"){
    return  alert.error(`Not Access This Resource Because Your Are-${user?.role}`);
   }
    dispatch(addItemsToCart(id, quantity));  //#dd To Cart-------
    alert.success("Item Added To Cart");
  };


  //^----------------Increment& Decremtn-----------------------
  const increaseQuantity = () => {
    if (product?.stock <= quantity) return;     
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const submitReviewToggle = () => {   //#Submit TOggle---------
    if(!user?._id){
      alert.error(`Not Access This Resource login first`);
      Navigate('/login')
      return 
      }
      
   if(user?.role !=="user"){
    return  alert.error(`Not Access This Resource Because Your Are-${user?.role}`);
   }
   
      open ? setOpen(setOpen) : setOpen(true);
  };

  
  useEffect(() => {  //#review err-----
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    
  }, [reviewError, ]);
  
  useEffect(()=>{  //#review Successfully-----
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
      
      dispatch(getProductDetails(id));
    }
  },[success,])
  
  const reviewSubmitHandler = (e) => {
    e.preventDefault();       //# Review submit------>
    const reviewData = { 
      rating: rating,
      comment: comment,
      productID: id,
    };
    dispatch(newReview(reviewData));
    setOpen(false);
  };
  
  return (
    <>
    {loading ? (
      <Loader />
    ) : (
      
      product?._id && (
        <>
     <div className="ProductDetails">

         {/* -------------PRODUCT-IMG----------------- */}
       <div className="image-move">
         <Carousel className="Carousel">
           {product?.image ? (product?.image.map((item, index) =>
             <img className="CarouselImage" key={item?.url} src={item?.url} alt={`${index} Slider`} />)
                ) : (<Skeleton height="250px" className="CarouselImage" />)}
         </Carousel>
       </div>


      <div>
          {/* -------------PRODUCT-NAME & ID----------------- */}
          <div className="detailsBlock-1">
            <h2>{product?.name || <Skeleton width="200px" />}</h2>
             <p>{product?._id ? `Product #${product?._id}` : <Skeleton width="100px" />}</p>
          </div>

           {/* -------------PRODUCT-RETING & REVIEW----------------- */} 
              <div className="detailsBlock-2">
                    <ReactStars {...options} />
                    <span>({product?.numOfReviews || 0} Reviews) </span>  
              </div>


    <div className="detailsBlock-3">
            {/* -------------PRODUCT-price------------------ */}
              <h1>{product?.price ? `₹${product?.price}` : <Skeleton width="80px" />}</h1> 

            {/* -------------PRODUCT-quantity------------------ */}
                {product?.length !== 0 ? (
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                      <input type="number" value={product?.stock == 0 ? "0" : quantity} readOnly />
                      <button onClick={increaseQuantity}>+</button>
                 </div>

            {/* -------------PRODUCT-addToCarT------------------ */}
            

                    <button onClick={addToCartHandler} disabled={product?.stock == 0 ? true : false}>
                      {" "}
                      Add to Cart{" "}
                    </button>
          
                </div>
                ) : (
                  <Skeleton width="130px" />
                )}
              
            {/* -------------PRODUCT-stock------------------ */}
                {!product?.length !== 0 ? (
                  <p>Status: <b className={product?.stock == 0 ? "redColor" : "greenColor"}>
                    {product?.stock ==0 ? "Out OfStock" : "InStock"}</b>
                  </p>
                ) : (
                  <Skeleton width="90px" />
                )}
                
    </div>

            {/* -------------PRODUCT-description------------------ */}
              {product?.length !== 0 ? (
              <div className="detailsBlock-4">
                  Description: <p>{product?.description}</p>
                </div>) : (  <Skeleton count={3} />)}


            {/* -------------PRODUCT-submitReview------------------ */}
              {product?.length !== 0 ? (
                <button className="submitReview" onClick={submitReviewToggle}> Submit Review </button>
              ) : (<Skeleton width="80px" />)}
        </div>
              </div>

            {/* -------------PRODUCT-REVIEWS------------------ */}
          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
            <DialogTitle>Submit Review</DialogTitle>

            <DialogContent className="submitDialog">
              <ReactStars size={26} isHalf={true} onChange={(newRating) => setRating(newRating)} value={rating} />
              <textarea className="submitDialogTextArea" cols="30" rows="5" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </DialogContent>

            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">Cancel </Button>
              <Button type="button" onClick={reviewSubmitHandler} color="primary">Submit</Button>

            </DialogActions>
          </Dialog>

            {/* -------------PRODUCT-REVIEWS-SHOW------------------ */}

          {product?.reviews && product?.reviews.length > 0 ? (
            <div className="reviews">
              {product?.reviews.map((review) => (
                <ReviewCard key={review?._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )
    )}
  </>
  );
};

export default ProductDetails;
