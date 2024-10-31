import { createStore, combineReducers, applyMiddleware, compose } from "redux"; 
import {thunk} from "redux-thunk"; // Correct import for thunk
import { deleteProductReviewsReducer, homeproductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer } from "./reducers/productReducer";
import {  allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { adorderReducer, allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer";

// Combine all reducers
const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  homeproduct: homeproductReducer,
  user: userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  cart:cartReducer,
  newOrder:newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDetailsReducer,
  newReview:newReviewReducer,
  createProduct:newProductReducer,
  deshbordproducts:productsReducer,
  allOrders:allOrdersReducer,
  adorder:adorderReducer,
  allUsers:allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  deletProductReview: deleteProductReviewsReducer,
  
});

let initialState = {
  cart:{
    cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) //# fir se string se object me convart krha hu 
    : [],
    shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},

  },
};

// Enable Redux DevTools if available
const composeEnhancers = 
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) : compose;

const middleware = [thunk];

// Create the store
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
