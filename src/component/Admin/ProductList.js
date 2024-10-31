import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, deletProduct, getAdminProduct,} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector( (state) => state.deshbordproducts);
  
useEffect(()=>{
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }
},[error])


  useEffect(()=>{
    dispatch(getAdminProduct())
  },[])

  useEffect(()=>{
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
  },[deleteError])
  
  useEffect(()=>{
    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
      dispatch(getAdminProduct())
    }

  },[isDeleted])


  const deleteProductHandler =(id)=>{
    dispatch(deletProduct(id))
  }

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${(params.row.id)}`}>
              <EditIcon />
            </Link>

            <Button onClick={(()=> deleteProductHandler((params.row.id)))}>
              <DeleteIcon/>
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
  products?.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });



  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
       
        <div className="productListContainerr">
       

          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
          rows={rows}
              columns={columns}
              disableSelectionOnClick
              className="productListTable"
              autoHeight

              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 9,
                  },
                },
              }}
              pageSizeOptions={[9]}

          />

          </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
