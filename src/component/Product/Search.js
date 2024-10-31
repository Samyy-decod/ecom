import React, { useState } from "react";
import "./Search.css";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
const Search = () => {
    const [keyward, setKeyward] = useState();
    const navigate = useNavigate();
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyward.trim()) {
            navigate(`/products/${keyward}`)
        }else{
            
            navigate("/products");
        }
    }

    return (
        <>
         <MetaData title="Search A Product -- ECOMMERCE" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input type="text" placeholder="Search a Product ..." onChange={(e) => setKeyward(e.target.value)} />
                <input type="submit" value="Search" />
            </form>
        </>
    );
};

export default Search;
