import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";

import { Chart as ChartJS, CategoryScale,LinearScale, PointElement, LineElement,Title,Tooltip,Legend,ArcElement,} from "chart.js";
import { getAdminProduct } from "../../actions/productAction.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


const Dashboard = () => {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { order,totalAmount } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  //^-------------------------ADMIN-DESHBORD--------------------------------

  useEffect(()=>{
    dispatch(getAdminProduct())
    dispatch(getAllOrders())
    dispatch(getAllUsers())
  },[dispatch])


  let outOfStock =0

  products &&
  products.forEach((item) => {
    if (item.stock === 0) {
      outOfStock = outOfStock+1;
    }
  });


  const InStock = products?.length - outOfStock;


  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock,InStock],
      },
    ],

  }

  return (
    <>
      <div className="dashboard">
        <MetaData title="Dashboard - Admin Panel" />
        <Sidebar />
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>

          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ₹{totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p className="items">Product</p>
                <p  className="items2">{products?.length!==0 && products?.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p className="items ">Orders</p>
                <p className="items2">{order&& order?.length}</p>
              </Link>
              <Link to="/admin/users">
                <p className="items ">Users</p>
                <p className="items2">{users?.length!==0 && users?.length}</p>
              </Link>
            </div>
          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
          <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
