import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getUserAddress,
  getUserPhone,
  processPayment,
} from "../../api/userRequests";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [visaDetails, setVisaDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const { data: addressData, isLoading: addressLoading } = useQuery({
    queryKey: ["user", "address"],
    queryFn: getUserAddress,
  });

  const { data: phoneData, isLoading: phoneLoading } = useQuery({
    queryKey: ["user", "phone"],
    queryFn: getUserPhone,
  });

  const paymentMutation = useMutation({
    mutationFn: processPayment,
    onSuccess: () => {
      alert("Payment Successful!");
    },
    onError: (error) => {
      alert("Payment Failed: " + error.message);
    },
  });

  const handleVisaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisaDetails({ ...visaDetails, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = () => {
    if (paymentMethod === "visa") {
      if (
        !visaDetails.cardNumber ||
        !visaDetails.expiryDate ||
        !visaDetails.cvv
      ) {
        alert("Please fill in all Visa details.");
        return;
      }
    }

    paymentMutation.mutate({
      paymentMethod,
      visaDetails: paymentMethod === "visa" ? visaDetails : null,
    });
  };

  if (addressLoading || phoneLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Address</h3>
        {addressData?.address ? (
          <p>{addressData.address}</p>
        ) : (
          <p className="text-red-600">
            No address found. Please update your profile.
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Phone Number</h3>
        {phoneData?.phone ? (
          <p>{phoneData.phone}</p>
        ) : (
          <p className="text-red-600">
            No phone number found. Please update your profile.
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Payment Method</h3>
        <div>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
          <label className="ml-6">
            <input
              type="radio"
              name="paymentMethod"
              value="visa"
              checked={paymentMethod === "visa"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Visa
          </label>
        </div>

        {paymentMethod === "visa" && (
          <div className="mt-4 space-y-3">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              className="w-full p-2 border rounded"
              onChange={handleVisaChange}
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              className="w-full p-2 border rounded"
              onChange={handleVisaChange}
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              className="w-full p-2 border rounded"
              onChange={handleVisaChange}
            />
          </div>
        )}
      </div>

      <button
        onClick={handleConfirmOrder}
        className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-800"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default CheckoutPage;
