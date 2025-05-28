import { SuitcaseLg } from 'assets/icons/System/SuitCase/SuitcaseLg';
import { LeafLg } from 'assets/icons/System/Leaf/LeafLg';
import { Star2Lg } from 'assets/icons/System/Star2/Star2Lg';
import { BuildingLg } from 'assets/icons/System/Building/BuildingLg';

export const subscriptionPlans = {
  STARTER: { 
    icon: LeafLg, 
    title: 'plans.starter.title', 
    description: 'plans.starter.description',
    features: {
      title: "plans.starter.featuresTitle",
      items: [
        "plans.starter.features.analytics",
        "plans.starter.features.storeDesigner",
        "plans.starter.features.shipmentTracking",
        "plans.starter.features.productCollections",
        "plans.starter.features.referralCodes",
        "plans.starter.features.affiliateNetwork",
        "plans.starter.features.basicSupport"
      ]
    },
    type: 'STARTER'
  },
  BUSINESS: { 
    icon: SuitcaseLg, 
    title: 'plans.pro.title', 
    description: 'plans.pro.description',
    features: {
      title: "plans.pro.featuresTitle",
      items: [
        "plans.pro.features.tokenGating",
        "plans.pro.features.mintToMerch",
        "plans.pro.features.unlimitedTokenization",
        "plans.pro.features.unlimitedDigitalGoods",
        "plans.pro.features.unlimitedPhysicalProducts",
        "plans.pro.features.customDomains",
        "plans.pro.features.customFavicon",
        "plans.pro.features.customShipping",
        "plans.pro.features.digitalCoupons",
        "plans.pro.features.warehouseIntegration",
        "plans.pro.features.premiumSupport"
      ]
    },
    type: 'BUSINESS'
  },
  BUSINESS_PRO: { 
    icon: Star2Lg, 
    title: 'plans.premium.title', 
    description: 'plans.premium.description',
    features: {
      title: "plans.premium.featuresTitle",
      items: [
        "plans.premium.features.apiIntegration",
        "plans.premium.features.royaltyTracking",
        "plans.premium.features.advancedAnalytics",
        "plans.premium.features.embeddableProducts",
        "plans.premium.features.unlimitedProduction",
        "plans.premium.features.marketingTools",
        "plans.premium.features.adminPanel",
        "plans.premium.features.vipSupport"
      ]
    },
    type: 'BUSINESS_PRO'
  },
  ENTERPRISE: { 
    icon: BuildingLg, 
    title: 'plans.enterprise.title', 
    description: 'plans.enterprise.description',
    features: {
      title: "plans.enterprise.featuresTitle",
      items: [
        "plans.enterprise.features.tokenPay",
        "plans.enterprise.features.customTemplates",
        "plans.enterprise.features.unlimitedLogin",
        "plans.enterprise.features.unlimitedPayment",
        "plans.enterprise.features.digitalPassport"
      ]
    },
    type: 'ENTERPRISE'
  }
} as const; 