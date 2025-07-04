// Polygon partner landing page using generic PartnerLayout
import React from 'react';
import { PartnerLayout } from './components/PartnerLayout';
import { PARTNER_CONFIGS } from './config/partners';

export default function Polygon() {
  return <PartnerLayout config={PARTNER_CONFIGS.polygon} />;
} 