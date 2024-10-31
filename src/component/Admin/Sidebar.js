import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <Link to="/">
          <img src={logo} alt="Ecommerce" />
        </Link>
        <Link to="/admin/dashboard">
          <p>
            <DashboardIcon /> Dashboard 
          </p>
        </Link>



        <details className="dropdown-details">
        <summary className="dropdown-summary">
        <ImportExportIcon />
        Products
      </summary>
   
        <Link to="/admin/products">
          <p>
          <PostAddIcon />All Products
          </p>
        </Link>
        <br />
        <Link to="/admin/create/product">
          <p>
          <AddIcon />Create Product
          </p>
        </Link>
     
    </details>


    
    

        <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>


      </div>
    </>
  );
};

export default Sidebar;
