import { SuitcaseLg } from 'assets/icons/System/SuitCase/SuitcaseLg';
import { LeafLg } from 'assets/icons/System/Leaf/LeafLg';
import { Star2Lg } from 'assets/icons/System/Star2/Star2Lg';
import { BuildingLg } from 'assets/icons/System/Building/BuildingLg';

export const subscriptionPlans = {
  STARTER: { 
    icon: LeafLg, 
    title: 'Starter', 
    description: 'For individuals or companies just getting started.' ,
    features: {
      title: "Starter plan includes:",
      items: [
          "Analytics",
          "Store designer",
          "Shipment tracking",
          "Product collections",
          "Custom referral codes",
          "Affiliate network access",
          "Basic customer support"
      ]
    }
  },
  BUSINESS: { 
    icon: SuitcaseLg, 
    title: 'Pro', 
    description: 'For small businesses and teams ready to grow.' ,
    features: {
      title: "Includes everything in Starter, plus:",
      items: [
          "Token gating",
          "Mint-to-Merch",
          "Unlimited tokenization",
          "Unlimited digital goods",
          "Unlimited physical products",
          "Customizable domains",
          "Customizable favicon",
          "Customizable shipping",
          "Digital coupons and giftcards",
          "Warehouse system integration",
          "Premium customer support"
      ]
    }
  },
  BUSINESS_PRO: { 
    icon: Star2Lg, 
    title: 'Premium', 
    description: 'For large businesses needing comprehensive solutions at scale.', 
    features: {
      title: "Includes everything in Pro, plus:",
        items: [
            "API integration",
            "Royalty tracking",
            "Advanced analytics",
            "Embeddable product tiles",
            "Unlimited Production-on-Demand",
            "Marketing tools",
            "Admin management panel",
            "VIP customer support"
        ]
    }
  },
  ENTERPRISE: { 
    icon: BuildingLg, 
    title: 'Enterprise', 
    description: 'Contact us to explore integration.' ,
    features: {
      title: "Includes everything in Premium, plus",
      items: [
          "Tokenpay",
          "Customizable templates",
          "Unlimited login methods",
          "Unlimited payment methods",
          "DPP (Digital Product Passport)"
      ]
    }
  }
} as const; 