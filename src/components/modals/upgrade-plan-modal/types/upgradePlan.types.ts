import React from 'react';

export type PlanType = 'pro' | 'premium' | 'enterprise';

export interface PlanTabData {
  icon: React.ReactNode;
  label: string;
  image: string;
}

export interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  isTrial?: boolean;
  initialActiveTab?: PlanType;
}

export interface PlanTabProps {
  activeTab: PlanType;
  onTabChange: (tab: PlanType) => void;
  isDrawer?: boolean;
}

export interface BillingCycleSelectorProps {
  plan: PlanType;
  isDrawer?: boolean;
  canActivateTrial: boolean;
}

export interface PlanHeaderProps {
  isCrossmint: boolean;
  canActivateTrial: boolean;
  activeTab: PlanType;
}

export interface PlanFooterProps {
  isCrossmint: boolean;
  canActivateTrial: boolean;
  activeTab: PlanType;
  onClose: () => void;
  onUpgrade: () => void;
} 