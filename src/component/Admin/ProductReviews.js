import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { clearErrors, getAllReviews, deleteReviews } from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import Star from "@material-ui/icons/Star";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, reviews, loading}=useSelector((state)=>state.productReviews)
  const { error: deleteError, isDeleted}=useSelector((state)=>state.deletProductReview)

 const [productId, setProductId] = useState("");



  useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      } 
    },[ error]);

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
          }
    },[productId]);




    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    console.log("getAllReviews=>",productId)
     }

    useEffect(() => {
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
    },[ deleteError]);

  useEffect(() => {
   if(isDeleted){
    alert.success("Review Deleted Successfully");
    dispatch({ type: DELETE_REVIEW_RESET });
    dispatch(getAllReviews(productId));
   }
    },[isDeleted]);

  const deleteReviewHandler = (reviewId) => {
      dispatch(deleteReviews(reviewId,productId));
  };

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.row.rating >= 3
            ? "greenColor"
            : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />

        <div className="productReviewsContainer">
          <form className="productReviewsForm" onSubmit={productReviewsSubmitHandler}>
            <h1 id="productReviewsFormHeading">ALL REVIEWS</h1>
            <div>
              <Star />
              <input type="text" placeholder="Product Id" required value={productId} onChange={(e) => setProductId(e.target.value)} />
            </div>
              <Button id="createProductBtn" type="submit" disabled={loading ? true : false || productId === "" ? true : false}>
                Search
              </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
