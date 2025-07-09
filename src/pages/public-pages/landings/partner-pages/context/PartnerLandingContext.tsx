import React, { createContext, ReactNode, useContext } from 'react';
import { PartnerConfig, PartnerId } from '../config/types';
import { WalletVerificationProvider } from './WalletVerificationContext';

// Define the context interface for partner landing pages
interface PartnerLandingContextType {
  // Partner configuration data
  partnerConfig: PartnerConfig;
  partnerId: PartnerId;
  partnerName: string;
  displayName: string;
  trialMonths: number;
  logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  
  // Hero section data
  hero: {
    title: string;
    subtitle: string;
    videoUrl?: string;
  };
  
  // Utility methods
  isPartner: (id: PartnerId) => boolean;
}

// Create the context
const PartnerLandingContext = createContext<PartnerLandingContextType | undefined>(undefined);

// Provider component props
interface PartnerLandingProviderProps {
  children: ReactNode;
  partnerConfig: PartnerConfig;
}

// Provider component
export const PartnerLandingProvider: React.FC<PartnerLandingProviderProps> = ({
  children,
  partnerConfig,
}) => {
  const contextValue: PartnerLandingContextType = {
    partnerConfig,
    partnerId: partnerConfig.id,
    partnerName: partnerConfig.name,
    displayName: partnerConfig.displayName,
    trialMonths: partnerConfig.trialMonths,
    logo: partnerConfig.logo,
    hero: partnerConfig.hero,
    isPartner: (id: PartnerId) => partnerConfig.id === id,
  };

  return (
    <WalletVerificationProvider>
      <PartnerLandingContext.Provider value={contextValue}>
        {children}
      </PartnerLandingContext.Provider>
    </WalletVerificationProvider>
  );
};

// Custom hook to use the partner landing context
export const usePartnerLanding = () => {
  const context = useContext(PartnerLandingContext);
  if (!context) {
    throw new Error('usePartnerLanding must be used within a PartnerLandingProvider');
  }
  return context;
};

export default PartnerLandingContext; 