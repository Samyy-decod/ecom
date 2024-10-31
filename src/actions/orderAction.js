import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,

  
} from "../constants/orderConstants";


  import axios from "axios";
  import Cookies from "js-cookie"; // Importing js-cookie
  const API_BASE_URL = 'http://192.168.29.64:4000';


  //^-----------------ORDER-CREATE----------------------------      
  export const createOrder = (order) => async (dispatch) => {
    try {
      dispatch({ type:  CREATE_ORDER_REQUEST });
       console.log("order=>",order);
  
      //# Get token from cookies
      const token = Cookies.get("token");
 
      if (!token) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: "No token found" });
        return;
      }
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //& Send token with Authorization header
        },
        withCredentials: true, //& Send cookies with the request
      };
  
      const url = `${API_BASE_URL}/api/v1/order/new`;
  
      const { data } = await axios.post(url, order, config);
      console.log("ordercreatedata=>",data);
      
      if (data?.success) {
        dispatch({ type:  CREATE_ORDER_SUCCESS, payload: data });
        
      } else {
        dispatch({ type: CREATE_ORDER_FAIL, payload: data.message });
      }
    } catch (error) {
      dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
    }
  };
  


  //^-----------------myOrders----------------------------      
  export const myOrders = () => async (dispatch) => {
    try {
      dispatch({ type: MY_ORDERS_REQUEST });
      
      const token = Cookies.get("token");
  
      if (!token) {
        dispatch({ type:   MY_ORDERS_FAIL, payload: "No token found" });
        console.log("token=>No token found");
        return;
      }
  
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true, // Make sure credentials (cookies) are sent
      };
  
      const url = `${API_BASE_URL}/api/v1/orders/my`;
  
      const { data } = await axios.get(url, config);

      if (data?.success) {
        console.log("myorder--o-oo-o",data);
        
        dispatch({ type:  MY_ORDERS_SUCCESS, payload: data });
        
        
      } else {
        dispatch({ type: CREATE_ORDER_FAIL, payload: data.message });
      }
    } catch (error) {
      dispatch({ type:  MY_ORDERS_FAIL, payload: error.response.data.message });
    }
  };
  

  //^-----------------myOrders-Details----------------------------      
  export const getOrderDetails = (id) => async (dispatch) => {
    
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
      
      const token = Cookies.get("token");
  
      if (!token) {
        dispatch({ type:    ORDER_DETAILS_FAIL, payload: "No token found" });
        console.log("token=>No token found");
        return;
      }
  
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true, // Make sure credentials (cookies) are sent
      };
  
      const url = `${API_BASE_URL}/api/v1/order/${id}`;
  
      const { data } = await axios.get(url, config);

      if (data?.success) {   
        dispatch({ type:   ORDER_DETAILS_SUCCESS, payload: data.order });        
      } else {
        dispatch({ type:  ORDER_DETAILS_FAIL, payload: data.message });
      }
    } catch (error) {
      console.log('err in order detailis api==>>>>', error)
      dispatch({ type:  ORDER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };
  

  //!------------------// GetAllOrders For Admin //------------------------
  export const getAllOrders = () => async (dispatch) => {
    try {
  
      dispatch({ type: ALL_ORDERS_REQUEST  });
  
         //# Get token from cookies
          const token = Cookies.get("token");
  
          if (!token) {
            dispatch({ type:ALL_ORDERS_FAIL , payload: "No token found" });
            console.log("token=>No token found");
            return;
          }
      
          const config = {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true, // Make sure credentials (cookies) are sent
          };
  
      const url = `${API_BASE_URL}/api/v1/admin/orders`;
      const { data } = await axios.get(url, config);
  
      const success = data?.success;
  
      if (success) {
        dispatch({ type:ALL_ORDERS_SUCCESS, payload: data});
      } else {
        console.log("newReview==>>>", data);
  
        dispatch({ type:ALL_ORDERS_FAIL, payload: data?.message });
      }
      
    } catch (error) {
      dispatch({ type: ALL_ORDERS_FAIL, payload: error.response.data.message });
    }
  };



  
//!------------------// Delet Oder For Admin //------------------------
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    // Get token from cookies
    const token = Cookies.get("token");

   
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // Make sure credentials (cookies) are sent
    };

    const url = `${API_BASE_URL}/api/v1/admin/order/${id}`;
    const { data } = await axios.delete(url, config);

    const success = data?.success;

    if (success) {
      dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success});
    } else {
      dispatch({ type: DELETE_ORDER_FAIL, payload: data?.message });
    }
    
  } catch (error) {
    dispatch({ type:   DELETE_ORDER_FAIL, payload: error.response.data.message });
  }
};


//!------------------// update Order For Admin //------------------------
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    console.log("updateOrder=>",id,order);
    

    // Get token from cookies
    const token = Cookies.get("token");


    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //& Send token with Authorization header
      },
      withCredentials: true, //& Send cookies with the request
    };

    const url = `${API_BASE_URL}/api/v1/admin/update/orders/${id}`;
    const { data } = await axios.put(url, order,config);

    const success = data?.success;

    if (success) {
      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success});
      console.log("updateOrder data=>",data);
    } else {
      dispatch({ type: UPDATE_ORDER_FAIL, payload: data?.message });
    }
    
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message });
  }
};




  //! Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  