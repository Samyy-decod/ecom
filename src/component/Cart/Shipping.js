import React, { useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import CheckoutSteps from "../Cart/CheckoutSteps";

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  
  //$^ --------------------------Shipping Details----------------------------------->

  const [shipping, setShipping] = useState({
    address: shippingInfo.address || "",
    city: shippingInfo.city || "",
    state: shippingInfo.state || "",
    country: shippingInfo.country || "",
    pinCode: shippingInfo.pinCode || "",
    phoneNo: shippingInfo.phoneNo || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({
      ...shipping,
      [name]: value,
    });
  };

  const shippingSubmit = (e) => {
  
    
    e.preventDefault();
    if(shipping.phoneNo.length <10 || shipping.phoneNo.length >10 ){
    alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(saveShippingInfo(shipping))
    
    Navigate('/order/confirm')

  };

  return (

    <>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          {/* --------------------------shippingForm----------------------------------- */}
          <form className="shippingForm" onSubmit={shippingSubmit}>
            <div>
            <HomeIcon />
              <input type="text" placeholder="Address" name="address" required value={shipping.address} onChange={handleChange} />
            </div>

            <div>
            <LocationCityIcon />
              <input type="text" placeholder="City" name="city" required value={shipping.city} onChange={handleChange} />
            </div>

            <div>
            <PinDropIcon />
              <input type="number" placeholder="Pin Code" name="pinCode" required value={shipping.pinCode} onChange={handleChange} />
            </div>

            <div>
            <PhoneIcon />
              <input type="number" placeholder="Phone Number" name="phoneNo" required value={shipping.phoneNo} onChange={handleChange} />
            </div>

            <div>
            <PublicIcon />
              <select name="country" required value={shipping.country} onChange={handleChange}>
                <option value="">Country</option>
                {Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {shipping.country && (
              <div>
                   <TransferWithinAStationIcon />
                <select name="state" required value={shipping.state} onChange={handleChange}>
                  <option value="">State</option>
                  {State.getStatesOfCountry(shipping.country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <input type="submit" value="Continue" className="shippingBtn" disabled={!shipping.state} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
