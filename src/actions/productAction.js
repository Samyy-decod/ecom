import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ALL_HOME_PRODUCT_REQUEST,
  ALL_HOME_PRODUCT_SUCCESS,
  ALL_HOME_PRODUCT_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../constants/productConstants";
import axios from "axios";
import Cookies from "js-cookie"; // Importing js-cookie

const API_BASE_URL = 'http://192.168.29.64:4000';

//^ get product
export const getProduct =
  (keyword = "", currentPage, price, category, ratings) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      const [priceGte, priceLte] = price;

      // let url = `http://localhost:4000/api/v1/product?&keyword=${keyword}&price[gte]=${priceGte}&price[lte]=${priceLte}&page=${currentPage}`;
      let url = `${API_BASE_URL}/api/v1/product?&keyword=${keyword}&price[gte]=${priceGte}&price[lte]=${priceLte}&page=${currentPage}`;

      if (category) {
        url += `&category=${category}`;
      }

      if (ratings) {
        url += `&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(url);
      console.log("data==>>>", data);

      if (data?.success) {
        dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
      } else {
        dispatch({ type: ALL_PRODUCT_FAIL, payload: data.message });
      }
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

//^get home product all
export const getHomeProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_HOME_PRODUCT_REQUEST });
   
    
    // const url = `http://localhost:4000/api/v1/products`;
    const url = `${API_BASE_URL}/api/v1/products`;
    const { data } = await axios.get(url);

    const success = data?.success;
    if (success) {
      dispatch({ type: ALL_HOME_PRODUCT_SUCCESS, payload: data });
    } else {
      console.log("getProductDetails==>>>", data);

      dispatch({ type: ALL_HOME_PRODUCT_FAIL, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: ALL_HOME_PRODUCT_FAIL, payload: error.response.data.message });
  }
};

//^ get product Detles
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    // const url = `http://localhost:4000/api/v1/product/${id}`;
    const url = `${API_BASE_URL}/api/v1/product/${id}`;
    const { data } = await axios.get(url);

    const success = data?.success;
    if (success) {
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } else {
      console.log("getProductDetails==>>>", data);

      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response.data.message });
  }
};


//^ newReview product
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    //# Get token from cookies
    const token = Cookies.get("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //&Send token with Authorization header
      },
      withCredentials: true, //&Send cookies with the request
    };

    // const url = `http://localhost:4000/api/v1/review`;
    const url = `${API_BASE_URL}/api/v1/review`;
    const { data } = await axios.put(url, reviewData, config);

    const success = data?.success;
    if (success) {
      dispatch({ type: NEW_REVIEW_SUCCESS, payload: data?.success });
    } else {
      console.log("newReview==>>>", data);

      dispatch({ type: NEW_REVIEW_FAIL, payload: data?.message });
    }
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.message });
  }
};


//!------------------// Get All Products For Admin //------------------------
export const getAdminProduct = () => async (dispatch) => {
  try {

    dispatch({ type: ADMIN_PRODUCT_REQUEST });

       //# Get token from cookies
        const token = Cookies.get("token");

        if (!token) {
          dispatch({ type: ADMIN_PRODUCT_FAIL , payload: "No token found" });
          console.log("token=>No token found");
          return;
        }
    
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, // Make sure credentials (cookies) are sent
        };

    // const url = `http://localhost:4000/api/v1/admin/products`;
    const url = `${API_BASE_URL}/api/v1/admin/products`;
    const { data } = await axios.get(url, config);

    const success = data?.success;

    if (success) {
      dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data?.products});
    } else {
      console.log("newReview==>>>", data);

      dispatch({ type:ADMIN_PRODUCT_FAIL, payload: data?.message });
    }
    
  } catch (error) {
    dispatch({ type: ADMIN_PRODUCT_FAIL, payload: error.response.data.message });
  }
};




//!------------------// create Product For Admin //------------------------
export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    // Get token from cookies
    const token = Cookies.get("token");

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`, // Send token with Authorization header
      },
      withCredentials: true, // Send cookies with the request
    };

    // const url = `http://localhost:4000/api/v1/create`;
    const url = `${API_BASE_URL}/api/v1/create`;
    const { data } = await axios.post(url, formData, config);

    const success = data?.success;

    if (success) {
      dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
    } else {
      dispatch({ type: NEW_PRODUCT_FAIL, payload: data?.message });
    }
    
  } catch (error) {
    dispatch({ type: NEW_PRODUCT_FAIL, payload: error.response.data.message });
  }
};


//!------------------// Delet Product For Admin //------------------------
export const deletProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const token = Cookies.get("token");

   
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // Make sure credentials (cookies) are sent
    };

    // const url = `http://localhost:4000/api/v1/product/${id}`;
    const url = `${API_BASE_URL}/api/v1/product/${id}`;
    const { data } = await axios.delete(url, config);

    const success = data?.success;

    if (success) {
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success});
    } else {
      dispatch({ type: DELETE_PRODUCT_FAIL, payload: data?.message });
    }
    
  } catch (error) {
    dispatch({ type:  DELETE_PRODUCT_FAIL, payload: error.response.data.message });
  }
};



//!------------------// UPDATE Product For Admin //------------------------
export const updateProduct = (id,productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    console.log("updateProduct=>",id,productData);
    

    //# Get token from cookies
    const token = Cookies.get("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, //& Send token with Authorization header
      },
      withCredentials: true, //& Send cookies with the request
    };

    // const url = `http://localhost:4000/api/v1/product/${id}`;
    const url = `${API_BASE_URL}/api/v1/product/${id}`;

    const { data } = await axios.put(url, productData, config);

    const success = data?.success;

    if (success) {
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success });
    } else {
      dispatch({ type: UPDATE_PRODUCT_FAIL, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.response.data.message });
  }
};

//!------------------//AllReviews Product For Admin //------------------------
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    // const url = `http://localhost:4000/api/v1/reviews?id=${id}`;
    const url = `${API_BASE_URL}/api/v1/reviews?id=${id}`;
    const { data } = await axios.get(url);

    const success = data?.success;
    if (success) {
      console.log("getAllReviewsaction====",data)
      dispatch({ type: ALL_REVIEW_SUCCESS, payload: data?.reviews });
    } else {
      dispatch({ type:  ALL_REVIEW_FAIL, payload: data?.message });
    }
  } catch (error) {
    dispatch({ type:  ALL_REVIEW_FAIL, payload: error.response.data.message });
  }
};

//!------------------//Delete Review of a Product  Admin //------------------------
export const deleteReviews = (reviewId,productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const token = Cookies.get("token");

   
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // Make sure credentials (cookies) are sent
    };

    // const url = `http://localhost:4000/api/v1/reviews?id=${reviewId}&productId=${productId}`;
    const url = `${API_BASE_URL}/api/v1/reviews?id=${reviewId}&productId=${productId}`;
    const { data } = await axios.delete(url,config);

    const success = data?.success;
    if (success) {
      console.log("getAllReviewsaction====",data)
      dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data?.success });
    } else {
      dispatch({ type: DELETE_REVIEW_FAIL, payload: data?.message });
    }
  } catch (error) {
    dispatch({ type: DELETE_REVIEW_FAIL, payload: error.response.data.message });
  }
};


//^ Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
