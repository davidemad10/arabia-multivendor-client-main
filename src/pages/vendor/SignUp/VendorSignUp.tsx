import { useState, useEffect } from "react";
import VendorData from "./VendorData";
import Documents from "./Documents";
import AddressData from "./AddressData";
import { registerVendor } from "../../../api/vendorRequests";
import { StepConfig, UserData } from "../../../types/Vendor";

// Step configurations
const stepsConfig: StepConfig[] = [
  {
    id: 1,
    title: "Personal Info",
    component: VendorData,
  },
  {
    id: 2,
    title: "Required Documents",
    component: Documents,
  },
  {
    id: 3,
    title: "Address",
    component: AddressData,
  },
];

const VendorSignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeComponent, setActiveComponent] = useState(
    stepsConfig[currentStep]
  );
  const [userData, setUserData] = useState<UserData>({
    user: {
      email: "",
      full_name: "",
      password1: "",
      password2: "",
      phone: "",
    },
    documents: {
      idFront: "",
      idBack: "",
      taxCard: "",
      commercialRecord: "",
      bankStatement: "",
    },
    address: {
      country: "",
      state: "",
      city: "",
      postal_code: "",
      address1: "",
      address2: "",
    },
  });

  useEffect(() => {
    setActiveComponent(() => stepsConfig[currentStep]);
  }, [currentStep]);

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  const NextStep = async (updatedUserData) => {
    if (currentStep < stepsConfig.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      registerVendor(updatedUserData)
        .then((response) => console.log("Success:", response))
        .catch((error) => console.error("Error:", error));
    }
  };

  const PreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const StepComponent = activeComponent.component;

  return (
    <div>
      <StepComponent
        onNext={NextStep}
        onPrev={PreviousStep}
        userData={userData}
        setUserData={setUserData}
      />
    </div>
  );
};

export default VendorSignUp;
