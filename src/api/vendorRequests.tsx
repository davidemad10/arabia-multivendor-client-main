import axiosInstance from "./axiosInstance";

type User = {
  email: string;
  full_name: string;
  password1: string;
  password2: string;
  phone: string;
};

type Address = {
  country: string;
  state: string;
  city: string;
  postal_code: string;
  address1: string;
  address2: string;
};

type Documents = {
  [key: string]: File; // Assuming documents are keyed by string and the value is a File
};

type UserData = {
  user: User;
  documents: Documents;
  address: Address;
};

export const registerVendor = async (userData: any) => {
  const formData = new FormData();

  console.log("inside the request ====>");

  console.log(userData);

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

  console.log("Logging the form data");

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  // Send POST request with multipart/form-data
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
