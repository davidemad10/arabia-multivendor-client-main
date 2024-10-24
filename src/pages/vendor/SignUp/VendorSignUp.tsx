import { useState, useEffect } from "react";
import VendorData from "./VendorData";
import Documents from "./Documents";
import AddressData from "./AddressData";
import { registerVendor } from "../../../api/vendorRequests";
import { StepConfig, UserData } from "../../../types/Vendor";
import { enqueueSnackbar } from "notistack";
import { TransitionsModal } from "../../../components/reusables/PopUpModal";
import { t } from "i18next";
import { Navigate } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
      setIsLoading(true);
      registerVendor(updatedUserData)
        .then((response) => {
          console.log("Success:", response);
          enqueueSnackbar("Account Created successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          setOpen(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          Object.values(error.response.data.user_errors).forEach(
            (errorMessages) => {
              errorMessages.forEach((errorMessage) => {
                enqueueSnackbar(errorMessage, {
                  variant: "error",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                });
              });
            }
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
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
        isLoading={isLoading}
      />
      <TransitionsModal
        dialogueText={t("accountUnderReview")}
        open={open}
        setOpen={setOpen}
      ></TransitionsModal>
    </div>
  );
};

export default VendorSignUp;
