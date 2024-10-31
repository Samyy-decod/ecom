import React, { useEffect, useRef, useState } from "react";
import "./payment.css";
import axios from "axios";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie"; // Importing js-cookie
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderAction";

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")); //^get the order info
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    console.log("cartItems=>",cartItems);
    

    const alert = useAlert();
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const Navigate = useNavigate();
    

  const paymentData = { amount: Math.round(orderInfo.totalPrice * 100) };


const order ={
    shippingInfo,
    orderItems:cartItems,
    itemsPrice:orderInfo.subtotal,
    taxPrice:orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
}


  const submitHandler = async (e) => {
    e.preventDefault();
   
    try {
      const token = Cookies.get("token");

      const config = {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        withCredentials: true,
      };

      const url = "http://localhost:4000/api/v1/payment/process";
      const { data } = await axios.post(url, paymentData, config);

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
     
      } else {
        if (result.paymentIntent.status === "succeeded") {
            order.paymentInfo={
                id:result.paymentIntent.id,
                status: result.paymentIntent.status,
            }
            dispatch(createOrder(order))
            console.log("shippingInfoorder--->",order)
            
          Navigate("/success");
        } else {
          alert.error("There's some issue while processing payment");
         
        }
      }
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }

  }, [error,dispatch]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />

      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>

          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>

          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>

          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input type="submit" value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}  className="paymentFormBtn" />
        </form>
      </div>
    </>
  );
};

export default Payment;
