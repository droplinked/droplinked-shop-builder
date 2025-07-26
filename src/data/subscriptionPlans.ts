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
    title: t('PlanCard.starter.title'), 
    description: t('PlanCard.starter.description'),
    features: {
      title: t('PlanCard.starter.featuresTitle'),
      items: [
        t('PlanCard.starter.features.analytics'),
        t('PlanCard.starter.features.storeDesigner'),
        t('PlanCard.starter.features.shipmentTracking'),
        t('PlanCard.starter.features.productCollections'),
        t('PlanCard.starter.features.referralCodes'),
        t('PlanCard.starter.features.affiliateNetwork'),
        t('PlanCard.starter.features.basicSupport')
      ]
    },
    type: 'STARTER'
  },
  BUSINESS: { 
    icon: SuitcaseLg, 
    title: t('PlanCard.pro.title'), 
    description: t('PlanCard.pro.description'),
    features: {
      title: t('PlanCard.pro.featuresTitle'),
      items: [
        t('PlanCard.pro.features.tokenGating'),
        t('PlanCard.pro.features.mintToMerch'),
        t('PlanCard.pro.features.unlimitedTokenization'),
        t('PlanCard.pro.features.unlimitedDigitalGoods'),
        t('PlanCard.pro.features.unlimitedPhysicalProducts'),
        t('PlanCard.pro.features.customDomains'),
        t('PlanCard.pro.features.customFavicon'),
        t('PlanCard.pro.features.customShipping'),
        t('PlanCard.pro.features.digitalCoupons'),
        t('PlanCard.pro.features.warehouseIntegration'),
        t('PlanCard.pro.features.premiumSupport')
      ]
    },
    type: 'BUSINESS'
  },
  BUSINESS_PRO: { 
    icon: Star2Lg, 
    title: t('PlanCard.premium.title'), 
    description: t('PlanCard.premium.description'),
    features: {
      title: t('PlanCard.premium.featuresTitle'),
      items: [
        t('PlanCard.premium.features.apiIntegration'),
        t('PlanCard.premium.features.royaltyTracking'),
        t('PlanCard.premium.features.advancedAnalytics'),
        t('PlanCard.premium.features.embeddableProducts'),
        t('PlanCard.premium.features.unlimitedProduction'),
        t('PlanCard.premium.features.marketingTools'),
        t('PlanCard.premium.features.adminPanel'),
        t('PlanCard.premium.features.vipSupport')
      ]
    },
    type: 'BUSINESS_PRO'
  },
  ENTERPRISE: { 
    icon: BuildingLg, 
    title: t('PlanCard.enterprise.title'), 
    description: t('PlanCard.enterprise.description'),
    features: {
      title: t('PlanCard.enterprise.featuresTitle'),
      items: [
        t('PlanCard.enterprise.features.tokenPay'),
        t('PlanCard.enterprise.features.customTemplates'),
        t('PlanCard.enterprise.features.unlimitedLogin'),
        t('PlanCard.enterprise.features.unlimitedPayment'),
        t('PlanCard.enterprise.features.digitalPassport')
      ]
    },
    type: 'ENTERPRISE'
  }
})