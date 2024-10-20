// types.ts (or interfaces.ts)
import { FC } from "react";

// Step Configuration Interface
export interface StepConfig {
  id: number;
  title: string;
  component: FC<StepComponentProps>;
}

// Props for Step Components
export interface StepComponentProps {
  onNext: () => void;
  onPrev: () => void;
  userData: UserData;
  setUserData: (newState: object) => void;
}

// User Information Interface
export interface User {
  email: string;
  full_name: string;
  password1: string;
  password2: string;
  phone: string;
}

// Documents Interface
export interface Documents {
  front_id: string;
  back_id: string;
  tax_card: string;
  commercial_record: string;
}

// Address Interface
export interface Address {
  country: string;
  state: string;
  city: string;
  postal_code: string;
  address_1: string;
  address_2: string;
}

// Main UserData Interface
export interface UserData {
  user: User;
  documents: Documents;
  address: Address;
}
