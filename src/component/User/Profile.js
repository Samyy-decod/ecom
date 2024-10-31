import React, { useEffect, useState } from "react";
import "./Profile.css";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import defaultPic from "../../images/Profile.png"; // Default profile picture
import sbadmin from "../../images/sb.png"; // Default profile picture
import Adadmin from "../../images/ad.png"; // Default profile picture
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Use navigate instead of rendering <Navigate />
      setHasFetched(true);
    }
  }, [navigate, isAuthenticated]);

  const avatarUrl = user?.avatar?.url || defaultPic;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name || "User"}'s Profile`} />
          <div className="profileContainer">
            <div>
              {user.role === "admin" ? (
                <>
                  <h1> 
                  <img src={Adadmin} className="subadmin-img" alt="admin profile" />
                  </h1>
                </>
              ) : user.role === "subadmin" ? (
                <>
                  <h1>  <img src={sbadmin} className="subadmin-img" alt="subadmin profile" /></h1>
                
                </>
              ) : (
                <h1>My Profile</h1>
              )}


              <img src={avatarUrl} alt={user?.name || "Default User"} id="avatarUrl" />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
              <div className={user.role === "admin" || user.role === "subadmin" ? "adminLoginCount" : "loginCount"} >
                <h4>Login Count</h4>
                <p>{user.loginCount}</p>
              </div>
              <div>
               <Link  to="/orders"   className={`orders-link ${(user.role === "admin" || user.role === "subadmin") ? "hide-link" : ""}`}>
                  My Orders
                  </Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
