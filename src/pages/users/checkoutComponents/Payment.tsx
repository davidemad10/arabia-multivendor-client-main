import React, { useState } from "react";

interface Props {
  navigate?: () => void;
}

const Payment: React.FC<Props> = ({
  navigate = () => console.log("navigate fomr inside Payment"),
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProofImage(e.target.files[0]);
      setError(""); // Clear error if a file is selected
    }
  };

  const handleProceed = () => {
    if (
      (paymentMethod === "vodafone cash" || paymentMethod === "instapay") &&
      !proofImage
    ) {
      setError("Please upload proof of payment.");
      return;
    }
    navigate();
  };

  const paymentOptions = [
    { value: "visa", label: "Visa", img: "/images/visa.png" },
    { value: "cash", label: "Cash", img: "/images/cash.png" },
    {
      value: "vodafone cash",
      label: "Vodafone Cash",
      img: "/images/vodafone.png",
    },
    { value: "instapay", label: "InstaPay", img: "/images/instapay.png" },
  ];

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Choose Payment Method</h2>

      {/* Payment Method Options */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {paymentOptions.map((option) => (
          <div
            key={option.value}
            className={`cursor-pointer border rounded p-4 flex flex-col items-center ${
              paymentMethod === option.value
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300"
            }`}
            onClick={() => setPaymentMethod(option.value)}
          >
            <img
              src={option.img}
              alt={option.label}
              className="w-16 h-16 mb-2 rounded-sm bg-cover"
            />
            <span className="text-sm font-medium">{option.label}</span>
          </div>
        ))}
      </div>

      {/* File Upload for Specific Methods */}
      {(paymentMethod === "vodafone cash" || paymentMethod === "instapay") && (
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Upload Payment Proof:
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={handleFileUpload}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      )}

      {/* Proceed Button */}
      <button
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleProceed}
        disabled={!paymentMethod}
      >
        Proceed
      </button>
    </div>
  );
};

export default Payment;
