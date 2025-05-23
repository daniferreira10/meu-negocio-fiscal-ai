
import { UseFormReturn, Control } from "react-hook-form";
import { CpfFormValues, CnpjFormValues } from "@/types/userProfileTypes";

// Define a union type that can be either CpfFormValues or CnpjFormValues
export type RegistrationFormValues = CpfFormValues | CnpjFormValues;

// Interface for AccountTab props that works with both form types
export interface AccountTabProps {
  form: UseFormReturn<RegistrationFormValues>;
  onNext: () => void;
  onBack?: () => void;
}

// Interface for CompanyTab props
export interface CompanyTabProps {
  form: UseFormReturn<CnpjFormValues>;
  onNext: () => void;
  onPrevious: () => void;
}

// Interface for BankingTab props
export interface BankingTabProps {
  form: UseFormReturn<CnpjFormValues>;
  onSubmit?: () => void;
  onPrevious: () => void;
  loading: boolean;
}
