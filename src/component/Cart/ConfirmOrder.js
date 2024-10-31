import React from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = () => {
    const Navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart); //^user shiping info  or card items  and user name-------------->
  const { user } = useSelector((state) => state.user);
 //$^ --------------------------ConfirmOrder Details----------------------------------->

const subtotal = cartItems.reduce((acc,item)=> acc+ item.quantity *item.price ,0)   //# cart products total amount ------

const shippingCharges = subtotal >1000? 0:200;   //# products shippingCharges------

const tax = subtotal*0.18 //#products tax 18%------

const totalPrice =subtotal + shippingCharges + tax;   //#All products total amount------

const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`; //# product address ------

const proceedToPayment =()=>{
const orderData={
    subtotal,
    shippingCharges,
    tax,
    totalPrice,
}
sessionStorage.setItem("orderInfo",JSON.stringify(orderData))  //#use sessionStorage when page remove nhi hoga to  data set hi rehega  other wise page remove data is remove to sessionStorage
Navigate("/process/payment")
}
  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />

      <div className="confirmOrderPage">
        {/* ---------------first seacttion about product ditles ---------------------------- */}
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>

            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:&nbsp;</p>
                <p className="Shipping-Info-span"> {user.name}</p>
    
              </div>

              <div>
                <p>Phone:&nbsp;</p>
                <p  className="Shipping-Info-span">{shippingInfo.phoneNo}</p>
              </div>

              <div>
                <p>Address:&nbsp;</p>
                <p  className="Shipping-Info-span">{ address}</p>
              </div>
            </div>
          </div>

          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.id}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                    <span>
                        {item.quantity}X ₹{item.price} =
                        <b>₹{item.price *item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
   {/* ---------------2 seacttion orderSummary ---------------------------- */}
        <div>
        <div className="orderSummary">
        <div>

           <div>
             <p>Subtotal:</p>
                <span>₹{subtotal}</span>
             </div>

            <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
            </div>

            <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>      
        </div>

        
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
        </div>

        </div>

      </div>
    </>
  );
};

export default ConfirmOrder;
