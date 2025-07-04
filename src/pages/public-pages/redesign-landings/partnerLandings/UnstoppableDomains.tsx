// Unstoppable Domains partner landing page using generic PartnerLayout
import React from 'react';
import { PartnerLayout } from './components/PartnerLayout';
import { PARTNER_CONFIGS } from './config/partners';

export default function UnstoppableDomains() {
  return <PartnerLayout config={PARTNER_CONFIGS['unstoppableDomains']} />;
} 