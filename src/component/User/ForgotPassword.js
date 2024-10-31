import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { CLEAR_ERRORS } from "../../constants/userConstants";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message,success, loading } = useSelector((state) => state.forgotPassword);
  const [hasFetched, setHasFetched] = useState(false); // For handling refetch on change
  //$^ --------------------------Forgot-Password----------------------------------->

  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value,
    });
  };

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    console.log("forgotPasswordSubmit--->>", email);
    dispatch(forgotPassword(email));
    setEmail({
      email: "",
    });
    setHasFetched(true);;
  };

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success(message);
      setHasFetched(true);
      dispatch({ type: CLEAR_ERRORS });
     
    }
  }, [dispatch, error, alert, message,success,setHasFetched]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />

          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
                {/* --------------------------forgot Password Email----------------------------- */}

                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input type="email" placeholder="email" name="email" required value={setEmail.email} onChange={handleChange} />
                </div>

                <input type="submit" value="Change" className="forgotPasswordBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
