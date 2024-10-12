import axiosInstance from "./axiosInstance";

interface registerUserData {
  email: string;
  full_name: string;
  password1: string;
  password2: string;
  phone: string;
}

export const registerUser = async (userData: registerUserData) => {
  try {
    const response = await axiosInstance.post(
      "/account/buyer/register/",
      userData
    );
    return response;
  } catch (error: any) {
    return {
      message: error || "An unexpected error occurred",
    };
  }
};
