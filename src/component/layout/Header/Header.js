import React from 'react';
import {ReactNavbar} from "overlay-navbar"
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'; // Example icons
import logo from "../../../images/logo.png"

const App = () => {

const navbarConfig = {

  burgerColor: "red", // Color of the burger menu button
  burgerColorHover: "burgerColor", // Color of the burger menu button on hove
 
  logo,
  logoWidth: "20vmax",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",

  // Navigation Colors
  navColor1: "rgb(255, 245, 245)", // Color of the first nav section
  navColor2: "rgb(255, 245, 245)", // Color of the second nav section
  navColor3: "rgb(255, 245, 245)", // Color of the third nav section
  navColor4: "rgb(255, 245, 245)", // Color of the fourth nav section


  // Navigation Flex Directions
  nav1FlexDirection: "row",
  nav2FlexDirection: "row",
  nav3FlexDirection: "row",
  nav4FlexDirection: "row",


  // Navigation Alignments
  nav1alignItems: "center",
  nav2alignItems: "center",
  nav3alignItems: "center",
  nav4alignItems: "center",

    // Navigation justifications
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",


  // Navigation Transitions
  nav1Transition: 0.4,
  nav2Transition: 0.8, // nav1Transition + 0.4
  nav3Transition: 1.2, // nav2Transition + 0.4
  nav4Transition: 1.6, // nav3Transition + 0.4
 
  // Links
  link1Text: "Home",
  link1Url: "/",
  link1Size: "1.2rem",
  link1Family: "sans-serif",
  link1Color: "black",
  link1BackgroundColor: "unset",
  link1ColorHover: "red",
  link1Decoration: "none",
  link1Margin: "9.256px",
  link1Padding: "9.256px",
  link1Border: "none",
  link1Transition: 0.5,
  link1AnimationTime: 1.5,

  link2Text: "About",
  link2Url: "/about",
  link2Size: "1.2rem",
  link2Family: "sans-serif",
  link2Color: "black",
  link2BackgroundColor: "unset",
  link2ColorHover: "red",
  link2Decoration: "none",
  link2Margin: "9.256px",
  link2Padding: "9.256px",
  link2Border: "none",
  link2Transition: 0.5,
  link2AnimationTime: 1.5,

  link3Text: "Products",
  link3Url: "/products",
  link3Size: "1.2rem",
  link3Family: "sans-serif",
  link3Color: "black",
  link3BackgroundColor: "unset",
  link3ColorHover: "red",
  link3Decoration: "none",
  link3Margin: "9.256px",
  link3Padding: "9.256px",
  link3Border: "none",
  link3Transition: 0.5,
  link3AnimationTime: 1.5,

  link4Text: "Contact",
  link4Url: "/contact",
  link4Size: "1.2rem",
  link4Family: "sans-serif",
  link4Color: "black",
  link4BackgroundColor: "unset",
  link4ColorHover: "red",
  link4Decoration: "none",
  link4Margin: "9.256px",
  link4Padding: "9.256px",
  link4Border: "none",
  link4Transition: 0.5,
  link4AnimationTime: 1.5,



  // Icon Margins and URLs
  searchIconMargin: "4.628px",
  profileIconMargin: "4.628px",
  searchIconUrl: "/search",
  cartIconUrl: "/cart",
  profileIconUrl: "/login",

  // Icon Sizes
  searchIconSize: "30px",
  cartIconSize: "30px",
  profileIconSize: "30px",

   

  // Icon properties
  profileIconColor: "rgba(35, 35, 35, 0.8)",
  searchIconColor: "rgba(35, 35, 35, 0.8)",
  cartIconColor: "rgba(35, 35, 35, 0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",

  // Icon Transitions and Animation Times
  cartIconTransition: 0.2,
  searchIconTransition: 0.2,
  profileIconTransition: 0.2,
  searchIconAnimationTime: 2,
  cartIconAnimationTime: 2.2,
  profileIconAnimationTime: 2.3,
  
  // Search and cart icons
  searchIcon: true,
  SearchIconElement: FaSearch, // Ensure FaSearch is imported
  cartIcon: true,
  CartIconElement: FaShoppingCart, // Ensure FaShoppingCart is imported
  profileIcon: true,
  ProfileIconElement: FaUser // Ensure FaUser is imported
};



  return (
    <ReactNavbar {...navbarConfig} />
  )
};

export default App;
