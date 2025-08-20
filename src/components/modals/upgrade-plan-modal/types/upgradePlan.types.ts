import React from 'react';

export type PlanType = 'pro' | 'premium' | 'enterprise';

export interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export interface PlanInfo {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

export interface EnterpriseFormData {
  primaryGoal: string;
  organizationSize: string;
  featureDescription: string;
}

export interface UpgradePlanTexts {
  title: string;
  description: string;
  saveButtonText: string;
  discardButtonText: string;
} 