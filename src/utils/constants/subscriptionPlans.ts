import { SuitcaseLg } from 'assets/icons/System/SuitCase/SuitcaseLg';
import { LeafLg } from 'assets/icons/System/Leaf/LeafLg';
import { Star2Lg } from 'assets/icons/System/Star2/Star2Lg';
import { BuildingLg } from 'assets/icons/System/Building/BuildingLg';

export const subscriptionPlans = {
  STARTER: { 
    icon: LeafLg, 
    title: 'Starter', 
    description: 'For individuals or companies just getting started.' 
  },
  BUSINESS: { 
    icon: SuitcaseLg, 
    title: 'Pro', 
    description: 'For small businesses and teams ready to grow.' 
  },
  BUSINESS_PRO: { 
    icon: Star2Lg, 
    title: 'Premium', 
    description: 'For large businesses needing comprehensive solutions at scale.' 
  },
  ENTERPRISE: { 
    icon: BuildingLg, 
    title: 'Enterprise', 
    description: 'Contact us to explore integration.' 
  }
} as const; 