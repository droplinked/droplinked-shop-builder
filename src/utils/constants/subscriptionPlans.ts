import { BuildingLg } from 'assets/icons/System/Building/BuildingLg';
import { LeafLg } from 'assets/icons/System/Leaf/LeafLg';
import { Star2Lg } from 'assets/icons/System/Star2/Star2Lg';
import { SuitcaseLg } from 'assets/icons/System/SuitCase/SuitcaseLg';
import { TFunction } from 'i18next';
import { PlanType } from 'services/subscription/interfaces';

type SubscriptionPlans = Record<PlanType, {
  icon: React.ComponentType<{ color?: string }>;
  title: string;
  description: string;
  features: {
    title: string;
    items: string[];
  };
  type: PlanType;
}>;

export const getSubscriptionPlans = (t: TFunction): SubscriptionPlans => ({
  STARTER: { 
    icon: LeafLg, 
    title: t('plans.starter.title'), 
    description: t('plans.starter.description'),
    features: {
      title: t('plans.starter.featuresTitle'),
      items: [
        t('plans.starter.features.analytics'),
        t('plans.starter.features.storeDesigner'),
        t('plans.starter.features.shipmentTracking'),
        t('plans.starter.features.productCollections'),
        t('plans.starter.features.referralCodes'),
        t('plans.starter.features.affiliateNetwork'),
        t('plans.starter.features.basicSupport')
      ]
    },
    type: 'STARTER'
  },
  BUSINESS: { 
    icon: SuitcaseLg, 
    title: t('plans.pro.title'), 
    description: t('plans.pro.description'),
    features: {
      title: t('plans.pro.featuresTitle'),
      items: [
        t('plans.pro.features.tokenGating'),
        t('plans.pro.features.mintToMerch'),
        t('plans.pro.features.unlimitedTokenization'),
        t('plans.pro.features.unlimitedDigitalGoods'),
        t('plans.pro.features.unlimitedPhysicalProducts'),
        t('plans.pro.features.customDomains'),
        t('plans.pro.features.customFavicon'),
        t('plans.pro.features.customShipping'),
        t('plans.pro.features.digitalCoupons'),
        t('plans.pro.features.warehouseIntegration'),
        t('plans.pro.features.premiumSupport')
      ]
    },
    type: 'BUSINESS'
  },
  BUSINESS_PRO: { 
    icon: Star2Lg, 
    title: t('plans.premium.title'), 
    description: t('plans.premium.description'),
    features: {
      title: t('plans.premium.featuresTitle'),
      items: [
        t('plans.premium.features.apiIntegration'),
        t('plans.premium.features.royaltyTracking'),
        t('plans.premium.features.advancedAnalytics'),
        t('plans.premium.features.embeddableProducts'),
        t('plans.premium.features.unlimitedProduction'),
        t('plans.premium.features.marketingTools'),
        t('plans.premium.features.adminPanel'),
        t('plans.premium.features.vipSupport')
      ]
    },
    type: 'BUSINESS_PRO'
  },
  ENTERPRISE: { 
    icon: BuildingLg, 
    title: t('plans.enterprise.title'), 
    description: t('plans.enterprise.description'),
    features: {
      title: t('plans.enterprise.featuresTitle'),
      items: [
        t('plans.enterprise.features.tokenPay'),
        t('plans.enterprise.features.customTemplates'),
        t('plans.enterprise.features.unlimitedLogin'),
        t('plans.enterprise.features.unlimitedPayment'),
        t('plans.enterprise.features.digitalPassport')
      ]
    },
    type: 'ENTERPRISE'
  }
})