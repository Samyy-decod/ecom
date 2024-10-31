import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { clearErrors, updateProfile, loaduser } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";


const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: "/Profile.png",
  });

  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [hasFetched, setHasFetched] = useState(false); // For handling refetch on change

  // Handle input changes for name and email
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle avatar change
  const updateProfileDataChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setUserData({ ...userData, avatar: reader.result });
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Handle profile update form submit
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(userData));
    setUserData({
      name: "",
      email: "",
      avatar: "/Profile.png",
    });
    setHasFetched(true);
  };

  useEffect(() => {

    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
      });
      setAvatarPreview(user.avatar.url);
    }

    if (isUpdated == true) {
      console.log("isUpdated-done"); 
      dispatch(loaduser());
      alert.success("Profile updated successfully");
      setHasFetched(true);
      dispatch({ type: UPDATE_PROFILE_RESET });
    }


    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    
  }, [dispatch, error, alert, isUpdated, loaduser, navigate, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input type="file" name="avatar" accept="image/*" onChange={updateProfileDataChange} />
                </div>

                <input type="submit" value="Update" className="updateProfileBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
