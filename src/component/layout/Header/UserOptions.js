import React, { useEffect, useState } from "react";
import "./Header.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const [hasFetched, setHasFetched] = useState(false); //^ reload the pageee
//^----------------------------USER-DILER------------------------------->

  const options = [];

  options.push(
    { icon: <PersonIcon />, name: "Profile", func: account },
   
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
  );
   
  if (user.role !== "admin" && user.role !== "subadmin") {  //^ user acces onley----
    options.unshift({ 
      icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />,
      name: `Cart(${cartItems.length})`, 
      func: cart 
    });
  }


  if (user.role !== "admin" && user.role !== "subadmin") { //^ user acces onley----
    options.unshift({ 
      icon: <ListAltIcon />, 
      name: "Orders", 
      func: orders 
    });
  }

  
  if (user.role === "admin" ||user.role ==="subadmin") {  //# admin he to DashboardIcon dikhe anhi to not show

    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }


  //^---------------function-of-SpeedDialAction------------------->
  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
       
    setTimeout(()=>{
      setHasFetched(true); //^Trigger reload state
    },1000)
  }

  
  useEffect(() => {
    if (hasFetched) {
      setHasFetched(false);
      navigate("/login");
      window.location.reload(); 
    }
  }, [hasFetched,navigate]);

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        style={{ zIndex: "11" }}
        className="speedDial"
        icon={
        <img  className="speedDialIcon" src={user?.avatar?.url ? user.avatar.url : "/Profile.png"}
         alt="Profile"  onError={(e) => (e.target.src = "/Profile.png")}/>
        }>


        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
