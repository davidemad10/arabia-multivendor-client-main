import { FC, useState, useEffect } from "react";
import VendorData from "./VendorData";
import { Documents } from "./Documents";
import { Address } from "./Address";

// Step configuration type
interface StepConfig {
  id: number;
  title: string;
  component: FC<StepComponentProps>;
}

interface StepComponentProps {
  onNext: () => void;
  onPrev: () => void;
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
    component: Address,
  },
];

const VendorSignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeComponent, setActiveComponent] = useState(
    stepsConfig[currentStep]
  );

  useEffect(() => {
    setActiveComponent(() => stepsConfig[currentStep]);
  }, [currentStep]);

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
      <StepComponent onNext={NextStep} onPrev={PreviousStep} />
    </div>
  );
};

export default VendorSignUp;
