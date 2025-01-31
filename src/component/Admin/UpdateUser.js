import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, getUserDetails, updateUser } from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateUser = () => {
  const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);
  const { loading, error, user } = useSelector((state) => state.userDetails);
//^-----------------------------------UPDATE-USER---------------------------------------
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  // Load user details if not available or if user ID changes
  useEffect(() => {
    if (!user || user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setUserData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [id, user, dispatch]);

  // Handle success and errors for user update
  useEffect(() => {
    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
  }, [isUpdated, error, updateError, dispatch, navigate, alert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(id, userData));
  };

  return (
    <>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading || updateLoading ? (
            <Loader />
          ) : (
            <form className="createProductForm" onSubmit={updateUserSubmitHandler}>
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input type="text" placeholder="Name" name="name" required value={userData.name} onChange={handleChange} />
              </div>

              <div>
                <MailOutlineIcon />
                <input type="email" placeholder="Email" name="email" required value={userData.email} onChange={handleChange} />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={userData.role} onChange={handleChange} name="role">
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="subadmin">Sub Admin</option>
                </select>
              </div>

              <Button id="createProductBtn" type="submit" disabled={updateLoading}>
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
