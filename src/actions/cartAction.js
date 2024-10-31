import { ADD_TO_CART, ADD_TO_CART_FAIL, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import axios from "axios";
const API_BASE_URL = 'http://192.168.29.64:4000';

//^---------------------ADD-TO-CART------------------------>
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {  //^ Tum jab getState() use karte ho, toh Redux store ka sara data milta hai

    try {
  
        const url = `${API_BASE_URL}/api/v1/product/${id}`
        const { data } = await axios.get(url)
    
        const success = data?.success
        if (success) {
    
          dispatch({ type:ADD_TO_CART, payload:{
            id: data.product._id,
            name: data.product.name,
            price:data.product.price,
            image:data.product.image[0].url,
            stock:data.product.stock,
            quantity,

          } })
  
          
            localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));//# kitni bhi bar relod kr le card mese items nhi jana chahiye
        } else {
          dispatch({ type:  ADD_TO_CART_FAIL, payload: data.message })
        }
      } catch (error) {
        dispatch({ type:  ADD_TO_CART_FAIL, payload: error.response.data.message })
      }
    }


    
//^---------------------REMOVE FROM CART------------------------>
export const removeItemsFromCart = (id) => async (dispatch, getState) => {  //^ Tum jab getState() use karte ho, toh Redux store ka sara data milta hai

        
    dispatch({ type:  REMOVE_CART_ITEM, payload: id })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

   
}


//^---------------------SAVE SHIPPING INFO------------------------>

export const saveShippingInfo = (data) => async (dispatch) => {
  
  
  dispatch({ type:   SAVE_SHIPPING_INFO, payload: data })
  
  localStorage.setItem("shippingInfo", JSON.stringify(data));

}