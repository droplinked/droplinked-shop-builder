import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for different steps
export type StepsType = 'connect' | 'loading' | 'error' | 'done';

// Define the interface for wallet verification states
export interface IWalletVerificationStates {
  currentStep: StepsType;
}

// Define the initial state
export const initialWalletVerificationStates: IWalletVerificationStates = { 
  currentStep: 'connect' 
};

// Define the context interface
interface IWalletVerificationContext {
  states: IWalletVerificationStates;
  methods: {
    updateStates: ({ key, value }: { key: keyof IWalletVerificationStates; value: StepsType }) => void;
  };
}

// Create the context
const WalletVerificationContext = createContext<IWalletVerificationContext | undefined>(undefined);

// Define the Provider component props
interface WalletVerificationProviderProps {
  children: ReactNode;
}

// Provider component
export const WalletVerificationProvider: React.FC<WalletVerificationProviderProps> = ({
  children,
}) => {
  const [states, setStates] = useState<IWalletVerificationStates>(initialWalletVerificationStates);

  // Function to update the state values dynamically
  const updateStates = ({ key, value }: { key: keyof IWalletVerificationStates; value: StepsType }) => {
    setStates((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <WalletVerificationContext.Provider
      value={{
        states,
        methods: { updateStates },
      }}
    >
      {children}
    </WalletVerificationContext.Provider>
  );
};

// Custom hook to use the wallet verification context
export const useWalletVerificationContext = () => {
  const context = useContext(WalletVerificationContext);
  if (!context) {
    throw new Error('useWalletVerificationContext must be used within a WalletVerificationProvider');
  }
  return context;
};

export default WalletVerificationContext; 