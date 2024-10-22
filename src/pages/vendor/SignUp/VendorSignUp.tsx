import { FC, useState, useEffect } from "react";
import VendorData from "./VendorData";
import Documents from "./Documents";
import AddressData from "./AddressData";
import { registerVendor } from "../../../api/vendorRequests";
import { Button } from "@mui/material";

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

  const minimalUserData = {
    user: {
      id: "", // Optional (read-only, backend will generate it)
      email: "testuser@example.com",
      full_name: "Test User",
      created_date: "", // Optional (read-only, backend will generate it)
      created_time: "", // Optional (read-only, backend will generate it)
      password1: "password123",
      password2: "password123",
      phone: "01234567890",
    },
    address: {
      id: "", // Optional (read-only, backend will generate it)
      country: "Egypt",
      state: "Cairo",
      city: "Heliopolis",
      postal_code: "11757",
      address_1: "123 Test Street",
      address_2: "Apt 5B",
    },
    documents: {
      front_id: new File([""], "front_id.jpg", { type: "image/jpeg" }),
      back_id: new File([""], "back_id.jpg", { type: "image/jpeg" }),
      tax_card: new File([""], "tax_card.pdf", { type: "application/pdf" }),
      commercial_record: new File([""], "commercial_record.pdf", {
        type: "application/pdf",
      }),
      bank_statement: new File([""], "bank_statement.pdf", {
        type: "application/pdf",
      }),
    },
  };

  useEffect(() => {
    setActiveComponent(() => stepsConfig[currentStep]);
  }, [currentStep]);

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  const NextStep = async () => {
    if (currentStep < stepsConfig.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      registerVendor(minimalUserData)
        .then((response) => console.log("Success:", response))
        .catch((error) => console.error("Error:", error.response.data));
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
      <Button
        variant="contained"
        sx={{
          background: "black",
          borderRadius: "7px",
          marginTop: "10px",
          width: "20%",
        }}
        onClick={() => {
          registerVendor(minimalUserData)
            .then((response) => console.log("Success:", response))
            .catch((error) => console.error("Error:", error.response.data));
        }}
      >
        Register here ya david
      </Button>{" "}
    </div>
  );
};

export default VendorSignUp;
