import { passwords, registerUserData, userCredentials } from "../types";
import axiosInstance from "./axiosInstance";

export const registerUser = async (userData: registerUserData) => {
  try {
    const response = await axiosInstance.post(
      "/account/buyer/register/",
      userData
    );
    console.log("API response ( Register User ) : ", response);
    return response;
  } catch (error: any) {
    console.error("Register User Error : ", error);
    return { error: error.response?.data || error.message };
  }
};

export const verifyEmail = async (otp: number) => {
  const email = localStorage.getItem("email");
  console.log(email);
  console.log(otp);
  const response = await axiosInstance.post("/account/verify-otp/", {
    email,
    otp,
  });
  console.log("API raw response:", response);
  return response;
};

export const login = async (userCredentials: userCredentials) => {
  const response = await axiosInstance.post("/account/login/", userCredentials);
  return response;
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post(
      "/account/passwordresetotp/",
      {
        email,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("API response (Send OTP to the email) :", response);
    return response;
  } catch (error: any) {
    return {
      error,
    };
  }
};

export const verifyResetOTP = async (otp: number) => {
  try {
    const response = await axiosInstance.post(
      "/account/passwordresetotpverfiy/",
      { otp },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("API response (submit OTP):", response);
    return response;
  } catch (error: any) {
    console.error("Verify OTP Error:", error);
    return { error: error.response?.data || error.message };
  }
};

export const updatePassword = async (passwords: passwords) => {
  try {
    const response = await axiosInstance.post(
      "/account/passwordresetconfirm/",
      { ...passwords },
      {
        withCredentials: true,
      }
    );
    console.log("API response (update password):", response);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    console.error("Update Password Error:", error);
    return { error: error.response?.data || error.message };
  }
};

export const updateUserInfo = async (info: object, id: string) => {
  try {
    const response = await axiosInstance.patch(
      `/account/users/${id}/`,
      { ...info },
      {
        withCredentials: true,
      }
    );
    console.log("API response ( update user info ):", response);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    console.log("Update user info Error:", error);
    return { error: error.response?.data || error.message };
  }
};

export const getUserInfo = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/account/users/${id}/`, {
      withCredentials: true,
    });
    console.log("API response ( get user info ):", response);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    console.log("get user info Error:", error);
    return { error: error.response?.data || error.message };
  }
};
