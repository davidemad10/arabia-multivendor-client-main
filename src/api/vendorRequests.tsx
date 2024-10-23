import { UserData } from "../types/Vendor";
import axiosInstance from "./axiosInstance";

export const registerVendor = async (userData: UserData) => {
  const formData = new FormData();

  formData.append("user[email]", userData.user.email);
  formData.append("user[full_name]", userData.user.full_name);
  formData.append("user[password1]", userData.user.password1);
  formData.append("user[password2]", userData.user.password2);
  formData.append("user[phone]", userData.user.phone);

  formData.append("address[country]", userData.address.country);
  formData.append("address[state]", userData.address.state);
  formData.append("address[city]", userData.address.city);
  formData.append("address[postal_code]", userData.address.postal_code);
  formData.append("address[address_1]", userData.address.address1);
  formData.append("address[address_2]", userData.address.address2);

  formData.append("documents[front_id]", userData.documents.idFront);
  formData.append("documents[back_id]", userData.documents.idBack);
  formData.append("documents[tax_card]", userData.documents.taxCard);
  formData.append(
    "documents[commercial_record]",
    userData.documents.commercialRecord
  );
  formData.append(
    "documents[bank_statement]",
    userData.documents.bankStatement
  );

  try {
    const response = await axiosInstance.post(
      "/account/supplier/register/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Vendor registered successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error registering vendor:", error);
    throw error;
  }
};
