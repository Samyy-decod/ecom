import React, { useEffect, useRef, useState } from "react";
import "./LoginSignUp.css";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { Link, useNavigate, useLocation } from "react-router-dom";  // Import useLocation
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, login, register } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const location = useLocation();  //@ Use useLocation to get the location object

  const { error, loading, isAuthenticated,message } = useSelector((state) => state.user);


  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "/Profile.png",
  });

  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [hasFetched, setHasFetched] = useState(false); // For handling refetch on change
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRegisterChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar" && files) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setRegisterData({ ...registerData, avatar: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setRegisterData({ ...registerData, [name]: value });
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    setLoginData({
        email: "",
        password: "",
    });
    dispatch(login(loginData));
    setHasFetched(true);
    console.log("Login Data:", loginData);
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(register(registerData));
    setRegisterData({
      name: "",
      email: "",
      password: "",
      avatar: "/Profile.png",
    });
    setHasFetched(true);
    console.log("Register Data:", registerData);
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account"; // Use location from useLocation()

  useEffect(() => {
    if (error == "invalid email and passsword!") {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      if(message){
        alert.success(message);
      }
      Navigate(redirect); //^Redirect to account page if authenticated
    }
  }, [dispatch, error, alert, isAuthenticated, Navigate, redirect,message]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    } else {
      switcherTab.current.classList.remove("shiftToNeutral");
      switcherTab.current.classList.add("shiftToRight");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
    {loading ? (
          <Loader />
    ):<>
      <MetaData title="LOGIN & SIGNUP -- ECOMMERCE" />
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>

          {/*------------- Login Form----------------------------- */}
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Link to="/password/forgot">Forget Password?</Link>
            <input type="submit" value="LOGIN" className="loginBtn" />
          </form>

          {/*----------------------------- Register Form ------------------------------*/}
          <form className="signUpForm" ref={registerTab} onSubmit={registerSubmit}>
            <div className="signUpName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="signUpEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleRegisterChange}
              />
            </div>
            <input type="submit" value="REGISTER" className="signUpBtn" />
          </form>
        </div>
      </div>
    </>}
    
    </>
  );
};

export default LoginSignUp;
