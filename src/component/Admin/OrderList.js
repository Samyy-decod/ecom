import React, {  useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { deleteOrder, getAllOrders, clearErrors } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";


const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { order:orders,error } = useSelector((state) => state.allOrders);
    const {isDeleted,error: deleteError, } = useSelector((state) => state.adorder);

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
      },[ error]);

    useEffect(() => {
        dispatch(getAllOrders())
      },[]);

      useEffect(() => {
        if (deleteError) {
          alert.error(deleteError);
          dispatch(clearErrors());
        }
      },[ deleteError]);

    useEffect(() => {
     if(isDeleted){
        alert.success("Order Deleted Successfully");
        dispatch({ type: DELETE_ORDER_RESET });
        dispatch(getAllOrders());
     }
      },[isDeleted]);

      
      const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
      };
    
    
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      renderCell: (params) => {
        return (
            <>
          <Link to={`/admin/order/${params.row.id}`}>
          <EditIcon />
          </Link>

          
          <Button onClick={(()=> deleteOrderHandler((params.row.id)))}>
              <DeleteIcon />
            </Button>
            
            </>
        );
      },
    },
  ];

  
  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
      });
    });


  

  return (
    <>
    <MetaData title={`ALL PRODUCTS - Admin`} />

    <div className="dashboard">
      <SideBar />
     
      <div className="productListContainerr">
     

        <h1 id="productListHeading">ALL ORders</h1>

        <DataGrid
        rows={rows}
            columns={columns}
            disableSelectionOnClick
            className="productListTable"
            autoHeight

            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}

        />

        </div>
    </div>
  </>
  )
};

export default OrderList;
