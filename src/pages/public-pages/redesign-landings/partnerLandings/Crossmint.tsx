import React from 'react';
import { PartnerLayout } from './components/PartnerLayout';
import { PARTNER_CONFIGS } from './config/partners';

export default function Crossmint() {
  return <PartnerLayout config={PARTNER_CONFIGS['crossmint']} />;
} 