// Dynamic partner page component that handles all partners based on partnerId prop
import React from 'react';
import { Navigate } from 'react-router-dom';
import { PartnerLayout } from './components/PartnerLayout';
import { PARTNER_CONFIGS } from './config/partners';
import { PartnerId } from './config/types';

interface PartnerPageProps {
  partnerId: string;
}

export default function PartnerPage({ partnerId }: PartnerPageProps) {
  // Validate partner ID and get config
  if (!partnerId || !(partnerId in PARTNER_CONFIGS)) {
    return <Navigate to="/404" replace />;
  }
  
  const config = PARTNER_CONFIGS[partnerId as PartnerId];
  
  return <PartnerLayout config={config} />;
} 