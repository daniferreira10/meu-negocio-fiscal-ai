
import { UseFormReturn, Control } from "react-hook-form";
import { CpfFormValues, CnpjFormValues } from "@/types/userProfileTypes";

// Create specific types for each form instead of using a union type
export interface AccountTabProps {
  form: UseFormReturn<any>; // Using 'any' to allow both form types
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
