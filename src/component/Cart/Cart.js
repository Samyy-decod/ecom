import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { useAlert } from "react-alert";
import Cookies from "js-cookie"; // Importing js-cookie

const Cart = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  //$^ --------------------------CART----------------------------------->


  console.log("cartItems=>",cartItems);
  
  const increaseQuantity = (id, quantity, stock) => {

    //# increase Quantity fro product ----->
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    //# increase Quantity fro product ------->
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
    alert.success("-1Product removed");
  };
const checkoutHandler =()=>{
    const token = Cookies.get("token");
    if(!token){
       return Navigate('/login?redirect=shipping')
    }
    Navigate('/shipping')

}
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>

    {/* ------------------ CART-HEADER----------------------------- */}
          <MetaData title="CART -- ECOMMERCE" />

          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>   
              <p>Subtotal</p>
            </div>

  {/* ------------------ CART-CONTANER---------------------------- */}

     {cartItems &&
         cartItems.map((item) => (
    <div className="cartContainer" key={item.id}>
            <CartItemCard item={item} deleteCartItems={deleteCartItems} />   
                <div className="cartInput">
                    <button onClick={() => decreaseQuantity(item.id, item.quantity)}>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => increaseQuantity(item.id, item.quantity, item.stock)}>+</button>
                </div>
     <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
    </div>
     ))}

    {/* ------------------ CART TOTALPROCE & CHAKE OUT----------------------------- */}
            <div className="cartGrossProfit">  
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce((acc,item)=> acc + item.quantity * item.price,0 )}`}</p>
              </div> 
          
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>  
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
