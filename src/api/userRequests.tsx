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

export const getUserOrders = async () => {
  try {
    const token = sessionStorage.getItem("accessToken");
    const response = await axiosInstance.get(`/order/orders/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("API response (get user orders):", response);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log("get user orders Error:", error);
    return { error: error.response?.data || error.message };
  }
};

export const getUserWishlist = async () => {
  try {
    const token = sessionStorage.getItem("accessToken");
    const response = await axiosInstance.get(`/account/favorites/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("API response (get user wishlist):", response);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log("get user wishlist Error:", error);
    return { error: error.response?.data || error.message };
  }
};
export const removeProductFromWishlist = async (id: string) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    const response = await axiosInstance.delete(`/account/favorites/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("API response (delete product from wishlist):", response);
    return response;
  } catch (error) {
    console.log("delete product from wishlist Error:", error);
    return { error: error.response?.data || error.message };
  }
};

export const deleteOrderItem = async (id: string) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    const response = await axiosInstance.delete(`/order/deletecartitem/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("API response (delete item from order):", response);
    return response;
  } catch (error) {
    console.log("API response (Delete item from order Error):", error);
    return { error: error.response?.data || error.message };
  }
};

export const getUserCart = async () => {
  try {
    const token = sessionStorage.getItem("accessToken");
    const response = await axiosInstance.get(`/order/cart/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("API response ( get cart details ):", response);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log("API response (get cart details Error):", error);
    return { error: error.response?.data || error.message };
  }
};

export const updateOrderItem = async (id: string, quantity: number) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    const response = await axiosInstance.patch(
      `/order/updatecart/${id}`,
      {
        quantity,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    console.log("API response (update item quantity):", response);
    return response;
  } catch (error) {
    console.log("API response (update item quantity Error):", error);
    return { error: error.response?.data || error.message };
  }
};

// Placeholder function to fetch user address
export const getUserAddress = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ address: "123 Main Street, City, Country" }); // Replace with actual API response
    }, 1000);
  });
};

// Placeholder function to fetch user phone
export const getUserPhone = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ phone: "+1234567890" }); // Replace with actual API response
    }, 1000);
  });
};

// Placeholder function to process payment
export const processPayment = async (paymentData) => {
  // Simulate API call
  console.log("Payment Data Sent to Backend:", paymentData);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        paymentData.paymentMethod === "visa" &&
        !paymentData.visaDetails.cardNumber
      ) {
        reject(new Error("Visa details missing"));
      } else {
        resolve({
          status: "success",
          message: "Payment processed successfully",
        });
      }
    }, 1500);
  });
};
