import axiosInstance from "./axiosInstance";

interface registerUserData {
  email: string;
  full_name: string;
  password1: string;
  password2: string;
  phone: string;
}

interface userCredentials {
  email: string;
  password: string;
}

export const registerUser = async (userData: registerUserData) => {
  try {
    const response = await axiosInstance.post(
      "/account/buyer/register/",
      userData
    );
    console.log(response);

    return response;
  } catch (error: any) {
    return {
      message: error || "An unexpected error occurred",
    };
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
