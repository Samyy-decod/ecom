import { useEffect, useState } from 'react';
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getHomeProduct, getProduct,  } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from 'react-alert';
import Cookies from "js-cookie";  // Importing js-cookie

function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.homeproduct);
  const [hasFetched, setHasFetched] = useState(false); // For handling refetch on change
  const token = Cookies.get('token')
  
  useEffect(() => {
  
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getHomeProduct());
    
    if(!token){
      setHasFetched(true);
    }
  }, [dispatch, error, alert,token]);

  return (
    <>
      {loading ? <Loader/> : <> 
        <MetaData title="ECOMMERCE " />
        <div className="banner">
          <p>Welcome to Ecommerce</p>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>
          <a href="#container" className="scroll-indicator">
            <CgMouse />
          </a>
        </div>

        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id="container">
          {products && products.map((product) => (
            <ProductCard product={product} key={product._id} /> 
          ))}     
        </div>
      </>}
    </>
  );
}

export default Home;
