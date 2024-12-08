// partner.context.tsx

import React, { createContext, useContext, useState, ReactNode, ReactElement } from "react";

// Define the type for different steps.
export type StepsType = "connect" | "loading" | "error" | "done";

// Define the interface for partner states.
export interface IPartnerStates {
  currentStep: StepsType;
}

// Define the initial partner state.
export const initialPartnerStates: IPartnerStates = { currentStep: "connect" };

// Define the context interface.
interface IPartnerContext {
  states: IPartnerStates;
  partnerName: string;
  partnerLogo?: ReactElement; // make partnerLogo optional
  planType: string;
  planDurationMonths: number;
  methods: {
    updateStates: ({ key, value }: { key: keyof IPartnerStates; value: StepsType }) => void;
  };
}

// Create the context with a default value of undefined to handle initial state properly.
const PartnerContext = createContext<IPartnerContext | undefined>(undefined);

// Define the PartnerProvider component.
interface PartnerProviderProps {
  children: ReactNode;
  partnerName: string;
  partnerLogo?: ReactElement;  // make partnerLogo optional
  planType: string;
  planDurationMonths: number;
}

export const PartnerProvider: React.FC<PartnerProviderProps> = ({
  children,
  partnerName,
  partnerLogo,
  planType,
  planDurationMonths,
}) => {
  const [states, setStates] = useState<IPartnerStates>(initialPartnerStates);

  // Function to update the state values dynamically.
  const updateStates = ({ key, value }: { key: keyof IPartnerStates; value: StepsType }) => {
    setStates((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <PartnerContext.Provider
      value={{
        states,
        partnerName,
        partnerLogo,
        planType,
        planDurationMonths,
        methods: { updateStates },
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

// Custom hook to use the partner context.
export const usePartnerContext = () => {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error("usePartnerContext must be used within a PartnerProvider");
  }
  return context;
};

export default PartnerContext;
