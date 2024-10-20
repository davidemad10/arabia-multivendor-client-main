import { FC, useState, useEffect } from "react";
import VendorData from "./VendorData";
import Documents from "./Documents";
import AddressData from "./AddressData";

// Step configuration type
interface StepConfig {
  id: number;
  title: string;
  component: FC<StepComponentProps>;
}

interface StepComponentProps {
  onNext: () => void;
  onPrev: () => void;
  userData: UserData;
  setUserData: (newState: UserData) => void;
}

interface User {
  email: string;
  full_name: string;
  password1: string;
  password2: string;
  phone: string;
}

interface Documents {
  front_id: string;
  back_id: string;
  tax_card: string;
  commercial_record: string;
}

interface Address {
  country: string;
  state: string;
  city: string;
  postal_code: string;
  address_1: string;
  address_2: string;
}

interface UserData {
  user: User;
  documents: Documents;
  address: Address;
}

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
  const [currentStep, setCurrentStep] = useState(2);
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
      front_id: "",
      back_id: "",
      tax_card: "",
      commercial_record: "",
    },
    address: {
      country: "",
      state: "",
      city: "",
      postal_code: "",
      address_1: "",
      address_2: "",
    },
  });

  useEffect(() => {
    setActiveComponent(() => stepsConfig[currentStep]);
  }, [currentStep]);

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  const NextStep = () => {
    if (currentStep < stepsConfig.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      alert("All steps completed successfully!");
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
