import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { token } = useParams();
  const { error, loading, success } = useSelector((state) => state.forgotPassword);

  const [userPassword, setUserPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserPassword({
      ...userPassword,
      [name]: value, // Update the state for the corresponding field
    });
  };

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    console.log("resetPasswordSubmit--->>", userPassword);
    dispatch(resetPassword(token, userPassword)); // Dispatch the resetPassword action with token and form data
    setUserPassword({
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, alert, success, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>
              {/* --------------------------Reset Password----------------------------- */}
              <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    name="password" // Added name attribute for password
                    required
                    value={userPassword.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword" // Added name attribute for confirmPassword
                    required
                    value={userPassword.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <input type="submit" value="Update" className="resetPasswordBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
