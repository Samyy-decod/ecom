import "./UpdatePassword.css";
import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [hasFetched, setHasFetched] = useState(false); // For handling refetch on change
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //$^ --------------------------UpdatePassword-----------------------------    
  const [userPassword, setUserPassword] = useState({
    oldPassword: "",    
    newPassword: "",
    confirmPassword: "",
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserPassword({  //#---->Handle input changes for name and email
      ...userPassword,
      [name]: value,
    });
  };

  
  const updatePasswordSubmit = (e) => {   //#---->Handle profile update form submit
    e.preventDefault();
    console.log("password--->>",userPassword);
    dispatch(updatePassword(userPassword));
    setUserPassword({   
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setHasFetched(true);
  };

  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState); // Toggle visibility
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      console.log("isUpdated-done");
      navigate("/account");
      setHasFetched(true);
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
    <MetaData title="Change Password" />

     <div className="updatePasswordContainer">
    <div className="updatePasswordBox">

     <h2 className="updatePasswordHeading">Update Password</h2>

     <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>

{/* --------------------------Old Password----------------------------- */}
     <div className="loginPassword">
        <VpnKeyIcon />
         <input type="password" placeholder="Old Password" name="oldPassword" required value={userPassword.oldPassword} onChange={handleChange} />
      </div>

{/* --------------------------New Password----------------------------- */}
    <div className="loginPassword">
        <LockOpenIcon />
        <input type="password" placeholder="New Password" name="newPassword" required value={userPassword.newPassword} onChange={handleChange} />
     </div>

{/* --------------------------Confirm Password----------------------------- */}               
                
    <div className="loginPassword">
         <LockIcon />
         <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password"  name="confirmPassword" required value={userPassword.confirmPassword} onChange={handleChange} />
    {showConfirmPassword ? <VisibilityOutlinedIcon onClick={toggleConfirmPasswordVisibility}   className="VisibilityOffOutlinedIcon"/>:
     <VisibilityOffOutlinedIcon onClick={toggleConfirmPasswordVisibility}   className="VisibilityOffOutlinedIcon"/>}
  
    </div>

    <input type="submit" value="Change" className="updatePasswordBtn" />

    </form>
    </div>
    </div>
    </>

      )}
    </>
  );
};
export default UpdatePassword;
