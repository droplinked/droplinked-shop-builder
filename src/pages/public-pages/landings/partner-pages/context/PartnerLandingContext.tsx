import React, { createContext, ReactNode, useContext } from 'react';
import { PartnerConfig, PartnerId, TemplateType, ButtonAction } from '../config/types';
import { PARTNER_TEMPLATES } from '../config/templates';
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
  
  // Template-based properties
  template: TemplateType;
  showPartners: boolean;
  showClaimNow: boolean;
  showProPlanCard: boolean;
  buttonAction: ButtonAction;
  requiresWalletVerification: boolean;
  allowCustomSections: boolean;
  
  // Utility methods
  isPartner: (id: PartnerId) => boolean;
  shouldShowSection: (sectionId: string) => boolean;
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
  const template = PARTNER_TEMPLATES[partnerConfig.template];
  
  const contextValue: PartnerLandingContextType = {
    partnerConfig,
    partnerId: partnerConfig.id,
    partnerName: partnerConfig.name,
    displayName: partnerConfig.displayName,
    trialMonths: partnerConfig.trialMonths,
    logo: partnerConfig.logo,
    hero: partnerConfig.hero,
    
    // Template-based properties
    template: partnerConfig.template,
    showPartners: template.showPartners,
    showClaimNow: template.showClaimNow,
    showProPlanCard: template.showProPlanCard,
    buttonAction: template.buttonAction,
    requiresWalletVerification: template.requiresWalletVerification,
    allowCustomSections: template.allowCustomSections,
    
    // Utility methods
    isPartner: (id: PartnerId) => partnerConfig.id === id,
    shouldShowSection: (sectionId: string) => template.sections.includes(sectionId),
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