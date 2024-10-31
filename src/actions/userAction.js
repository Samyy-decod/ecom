import {
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../constants/userConstants";
import axios from "axios";
import Cookies from "js-cookie"; // Importing js-cookie


const API_BASE_URL = 'http://192.168.29.64:4000';

//#login---->
export const login = (loginData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const header = { headers: { "Content-Type": "application/json" } };
    const Url = `${API_BASE_URL}/api/v1/login`;
    const { data } = await axios.post(Url, loginData, header);
    console.log("data==>>>", data);

    if (data?.success) {
      Cookies.set("token", data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } else {
      dispatch({ type: LOGIN_FAIL, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//# Register ---->
export const register = (registerData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    

    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const Url = `${API_BASE_URL}/api/v1/register`;
    const { data } = await axios.post(Url, registerData, header);
    console.log("data==>>>", data?.user);

    if (data?.success) {
      Cookies.set("token", data.token);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } else {
      dispatch({ type: REGISTER_USER_FAIL, payload: data?.message });
    }
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error?.response?.data.message });
  }
};

//^ Action to load user details
export const loaduser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const token = Cookies.get("token");
    console.log("token=>", token);

    if (!token) {
      dispatch({ type: LOAD_USER_FAIL, payload: "No token found" });
      console.log("token=>No token found");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // Make sure credentials (cookies) are sent
    };

    const url = `${API_BASE_URL}/api/v1/me`;
    const result = await axios.get(url, config);
    console.log("ReloadData=>", result);
    const { data } = result;

    if (data?.success) {
      dispatch({ type: LOAD_USER_SUCCESS, payload: data });
    } else {
      dispatch({ type: LOAD_USER_FAIL, payload: data?.message });
    }
  } catch (error) {
    // Check if error is a network error
    if (error.message === "Network Error") {
      dispatch({ type: LOAD_USER_FAIL, payload: "Network Error - Backend not reachable" });
    } else {
      // Other types of errors
      dispatch({ type: LOAD_USER_FAIL, payload: error.response?.data?.message || error.message });
    }
  }
};

//!Logout User
export const logout = () => async (dispatch) => {
  try {
    Cookies.remove("token");
    const url = `${API_BASE_URL}/api/v1/logout`;
    const result = await axios.get(url);

    const { data } = result;

    if (data?.success) {
      dispatch({ type: LOGOUT_SUCCESS });
    } else {
      dispatch({ type: LOGOUT_FAIL, payload: data?.message });
    }
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

//^ Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    console.log("update====",userData)

    //# Get token from cookies
    const token = Cookies.get("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, //& Send token with Authorization header
      },
      withCredentials: true, //& Send cookies with the request
    };

    const url = `${API_BASE_URL}/api/v1/me/update`;

    // Change from GET to PUT request for updating profile
    const { data } = await axios.put(url, userData, config);
    if (data?.success) {
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } else {
      dispatch({ type: UPDATE_PROFILE_FAIL, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message });
  }
};

//^ Update updatePassword
export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    //# Get token from cookies
    const token = Cookies.get("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //&Send token with Authorization header
      },
      withCredentials: true, //&Send cookies with the request
    };

    const url = `${API_BASE_URL}/api/v1/password/update`;

    const { data } = await axios.put(url, password, config);
    console.log("passwarddataaction--->>>", data);

    if (data?.success) {
      Cookies.remove("token");
      Cookies.set("token", data.token);
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } else {
      dispatch({ type: UPDATE_PASSWORD_FAIL, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
  }
};

//^ Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const url = `${API_BASE_URL}/api/v1/password/forgot`;

    const { data } = await axios.post(url, email, config);

    if (data?.success) {
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
    } else {
      dispatch({ type: FORGOT_PASSWORD_FAIL, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
  }
};

//^ Reset Password
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    console.log("resetPassword---", token, password);

    const config = { headers: { "Content-Type": "application/json" } };

    const url = `${API_BASE_URL}/api/v1/password/reset/${token}`;

    const { data } = await axios.put(url, password, config);

    if (data?.success) {
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } else {
      dispatch({ type: RESET_PASSWORD_FAIL, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
  }
};

//!------------------// Get Alluser For (Admin) //------------------------
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    //# Get token from cookies
    const token = Cookies.get("token");

    if (!token) {
      dispatch({ type: ALL_USERS_FAIL, payload: "No token found" });
      console.log("token=>No token found");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // Make sure credentials (cookies) are sent
    };

    const url = `${API_BASE_URL}/api/v1/admin/users`;
    const { data } = await axios.get(url, config);

    const success = data?.success;

    if (success) {
      dispatch({ type: ALL_USERS_SUCCESS, payload: data?.users });
    } else {
      console.log("newReview==>>>", data);

      dispatch({ type: ALL_USERS_FAIL, payload: data?.message });
    }
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};


//!------------------// Get userdetlies For (Admin) //------------------------
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    //# Get token from cookies
    const token = Cookies.get("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //&Send token with Authorization header
      },
      withCredentials: true, //&Send cookies with the request
    };
    const url = `${API_BASE_URL}/api/v1/admin/user/${id}`;
    const { data } = await axios.get(url,config);

    const success = data?.success;
    if (success) {
      dispatch({ type:USER_DETAILS_SUCCESS, payload: data.user });
    } else {
      dispatch({ type: USER_DETAILS_FAIL, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};


//!------------------//  updateUser For (Admin) //------------------------
export const updateUser = (id,UserData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    console.log("updateUser===",id,UserData)

    //# Get token from cookies
    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // Make sure credentials (cookies) are sent
    };

    const url = `${API_BASE_URL}/api/v1/admin/user/${id}`;
    const { data } = await axios.put(url,UserData,config);

    const success = data?.success;
    if (success) {
      dispatch({ type:UPDATE_USER_SUCCESS, payload: data.success });
      console.log("updateUser data line342====",data)
    } else {
      dispatch({ type: UPDATE_USER_FAIL, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message });
  }
};

//!------------------//  deleteUser For (Admin) //------------------------
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    console.log("deleteUser===",id,)

    //# Get token from cookies
    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // Make sure credentials (cookies) are sent
    };

    const url = `${API_BASE_URL}/api/v1/admin/user/${id}`;
    const { data } = await axios.delete(url,config);

    const success = data?.success;
    if (success) {
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } else {
      dispatch({ type:  DELETE_USER_FAIL, payload: data.message });
    }
  } catch (error) {
    dispatch({ type:  DELETE_USER_FAIL, payload: error.response.data.message });
  }
};




//! Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
