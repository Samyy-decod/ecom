import React, { useEffect } from "react";
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
import { clearErrors, deleteUser, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector((state) => state.user);
    const { error, users } = useSelector((state) => state.allUsers);
    const { error: deleteError, isDeleted,message,} = useSelector((state) => state.profile);

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
      },[ error]);

      useEffect(() => {
        dispatch(getAllUsers());
      },[]);

      useEffect(() => {
        if (deleteError) {
          alert.error(deleteError);
          dispatch(clearErrors());
        }
      },[ deleteError]);

    useEffect(() => {
     if(isDeleted){
        alert.success(message);
        dispatch({ type: DELETE_USER_RESET });
        dispatch(getAllUsers());
     }
      },[isDeleted,message]);


const deleteUserHandler =(id)=>{
  dispatch(deleteUser(id));
}
       
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    {
        field: "email",
        headerName: "Email",
        minWidth: 200,
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 0.5,
      },

      
      {
        field: "role",
        headerName: "Role",
        type: "number",
        minWidth: 150,
        flex: 0.3,
        cellClassName: (params) => {
          return params.row.role === "admin"
            ? "greenColor"
            : "redColor";
        },
      },

    // {
    //   field: "actions",
    //   flex: 0.3,
    //   headerName: "Actions",
    //   minWidth: 150,
    //   type: "number",
      
    //   renderCell: (params) => {
    //     return (
    //         <>
            
    //       <Link to={`/admin/user/${params.row.id}`}>
    //       <EditIcon />
    //       </Link>

          
    //       <Button onClick={(()=> deleteUserHandler((params.row.id)))}>
    //           <DeleteIcon />
    //         </Button>
            
    //         </>
    //     );
    //   },
    // },
  ];


// Conditionally add the "Actions" column if the user's role is "admin"
if (user.role === "admin") {
  columns.push({
    field: "actions",
    flex: 0.3,
    headerName: "Actions",
    minWidth: 150,
    type: "number",
    renderCell: (params) => (
      <>
        <Link to={`/admin/user/${params.row.id}`}>
          <EditIcon />
        </Link>
        <Button onClick={() => deleteUserHandler(params.row.id)}>
          <DeleteIcon />
        </Button>
      </>
    ),
  });
}

  
  const rows = [];

  users &&
  users.forEach((item) => {
    rows.push({
      id: item._id,
      role: item.role,
      email: item.email,
      name: item.name,
    });
  });


  return (
   <>
    <MetaData title={`ALL USERS - Admin`} />

<div className="dashboard">
  <SideBar />
 
  <div className="productListContainerr">
 

    <h1 id="productListHeading">ALL USERS</h1>

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
}

export default UsersList