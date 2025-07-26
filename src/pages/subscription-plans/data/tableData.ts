import { TFunction } from 'i18next';

export const getTableData = (t: TFunction) => ({
  data: [
    {
      _id: '667bd35a5f922762128218f2',
      type: 'STARTER',
      subOptionIds: [
        {
          title: t('ComparisonTable.storeBuilder'),
          key: 'dashboard',
          value: [
            {
              title: t('PlansTable.storeDesigner'),
              key: 'shop_designer',
              value: true
            },
            {
              title: t('PlansTable.analytics'),
              key: 'analytics',
              value: true
            },
            {
              title: t('PlansTable.collectionManagement'),
              key: 'Collection management',
              value: true
            },
            {
              title: t('PlansTable.orderInventoryManagement'),
              key: 'Order & Inventory Management',
              value: true
            },
            {
              title: t('PlansTable.affiliateNetwork'),
              key: 'Affiliate network',
              value: true
            },
            {
              title: t('PlansTable.customReferralCodes'),
              key: 'Custom referral codes',
              value: true
            },
            {
              title: t('PlansTable.couponsAndCredits'),
              key: 'Coupons and credit creation',
              value: false
            },
            {
              title: t('PlansTable.advancedAnalytics'),
              key: 'Advanced analytics',
              value: false
            },
            {
              title: t('PlansTable.adminManagement'),
              key: 'Admin management',
              value: false
            },
            {
              title: t('PlansTable.embeddableProductTile'),
              key: 'Embeddable product tile',
              value: false
            },
            {
              title: t('PlansTable.apiIntegration'),
              key: 'API integration',
              value: false
            }
          ]
        },
        {
          title: t('ComparisonTable.storefront'),
          key: 'shop',
          value: [
            {
              title: t('PlansTable.physicalProducts'),
              key: 'Physical products',
              value: '5'
            },
            {
              title: t('PlansTable.digitalGoods'),
              key: 'Digital goods',
              value: '5'
            },
            {
              title: t('PlansTable.productionOnDemand'),
              key: 'Production-on-Demand',
              value: '5'
            },
            {
              title: t('PlansTable.productTokenization'),
              key: 'digital_product',
              value: '5'
            },
            {
              title: t('PlansTable.loginMethods'),
              key: 'print_on_demand',
              value: `1 ${t('common.network')}`
            },
            {
              title: t('PlansTable.postPurchaseDataGathering'),
              key: 'Post Purchase Data Gathering',
              value: true
            },
            {
              title: t('PlansTable.customizableFavicon'),
              key: 'Customizable_favicon',
              value: false
            },
            {
              title: t('PlansTable.mintToMerch'),
              key: 'Mint_to_Merch',
              value: false
            },
            {
              title: t('PlansTable.tokenGating'),
              key: 'Token_gating',
              value: false
            },
            {
              title: t('PlansTable.embeddableProductTiles'),
              key: 'Embeddable_product_tiles',
              value: false
            },
            {
              title: t('PlansTable.customizableDomain'),
              key: 'Customizable_domain',
              value: false
            },
            {
              title: t('PlansTable.royaltyTracking'),
              key: 'Royalty_tracking',
              value: false
            },
            {
              title: t('PlansTable.customTemplates'),
              key: 'Custom_templates',
              value: false
            }
          ]
        },
        {
          title: t('ComparisonTable.paymentOptions'),
          key: 'payment_options',
          value: [
            {
              title: t('PlansTable.cryptoPayments'),
              key: 'crypto_payments',
              value: 1
            },
            {
              title: t('PlansTable.creditCardPayments'),
              key: 'credit_card_payments',
              value: true
            },
            {
              title: t('PlansTable.tokenPay'),
              key: 'tokenpay',
              value: false
            }
          ]
        },
        {
          title: t('ComparisonTable.shipping'),
          key: 'shipping_options',
          value: [
            {
              title: t('PlansTable.automatedShipping'),
              key: 'automated_shipping',
              value: true
            },
            {
              title: t('PlansTable.selfManagedShipping'),
              key: 'self_managed_shipping',
              value: true
            },
            {
              title: t('PlansTable.shipmentTracking'),
              key: 'shipment_tracking',
              value: true
            },
            {
              title: t('PlansTable.customizableShipping'),
              key: 'customizable_shipping',
              value: false
            }
          ]
        },
        {
          key: t('ComparisonTable.services'),
          value: [
            {
              title: t('PlansTable.marketingTools'),
              key: 'marketing_tools',
              value: false
            },
            {
              title: t('PlansTable.accountManager'),
              key: 'account_manager',
              value: false
            },
            {
              title: t('PlansTable.digitalProductPassport'),
              key: 'digital_product_passport',
              value: false
            },
            {
              title: t('PlansTable.support'),
              key: 'support',
              value: t('PlansTable.basicSupport')
            }
          ]
        }
      ]
    },
    {
      _id: '667bd35e5f92276212821938',
      type: 'BUSINESS',
      subOptionIds: [
        {
          title: t('ComparisonTable.storeBuilder'),
          key: 'dashboard',
          value: [
            {
              title: t('PlansTable.storeDesigner'),
              key: 'shop_designer',
              value: true
            },
            {
              title: t('PlansTable.analytics'),
              key: 'analytics',
              value: true
            },
            {
              title: t('PlansTable.collectionManagement'),
              key: 'Collection management',
              value: true
            },
            {
              title: t('PlansTable.orderInventoryManagement'),
              key: 'Order & Inventory Management',
              value: true
            },
            {
              title: t('PlansTable.affiliateNetwork'),
              key: 'Affiliate network',
              value: true
            },
            {
              title: t('PlansTable.customReferralCodes'),
              key: 'Custom referral codes',
              value: true
            },
            {
              title: t('PlansTable.couponsAndCredits'),
              key: 'Coupons and credit creation',
              value: true
            },
            {
              title: t('PlansTable.advancedAnalytics'),
              key: 'Advanced analytics',
              value: false
            },
            {
              title: t('PlansTable.adminManagement'),
              key: 'Admin management',
              value: false
            },
            {
              title: t('PlansTable.embeddableProductTile'),
              key: 'Embeddable product tile',
              value: false
            },
            {
              title: t('PlansTable.apiIntegration'),
              key: 'API integration',
              value: false
            }
          ]
        },
        {
          title: t('ComparisonTable.storefront'),
          key: 'shop',
          value: [
            {
              title: t('PlansTable.physicalProducts'),
              key: 'Physical products',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.digitalGoods'),
              key: 'Digital goods',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.productionOnDemand'),
              key: 'Production-on-Demand',
              value: `10 / ${t('common.month')}`
            },
            {
              title: t('PlansTable.productTokenization'),
              key: 'digital_product',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.loginMethods'),
              key: 'print_on_demand',
              value: `3 ${t('common.network')}`
            },
            {
              title: t('PlansTable.postPurchaseDataGathering'),
              key: 'Post Purchase Data Gathering',
              value: true
            },
            {
              title: t('PlansTable.customizableFavicon'),
              key: 'Customizable_favicon',
              value: true
            },
            {
              title: t('PlansTable.mintToMerch'),
              key: 'Mint_to_Merch',
              value: true
            },
            {
              title: t('PlansTable.tokenGating'),
              key: 'Token_gating',
              value: true
            },
            {
              title: t('PlansTable.embeddableProductTiles'),
              key: 'Embeddable_product_tiles',
              value: true
            },
            {
              title: t('PlansTable.customizableDomain'),
              key: 'Customizable_domain',
              value: true
            },
            {
              title: t('PlansTable.royaltyTracking'),
              key: 'Royalty_tracking',
              value: false
            },
            {
              title: t('PlansTable.customTemplates'),
              key: 'Custom_templates',
              value: false
            }
          ]
        },
        {
          title: t('ComparisonTable.paymentOptions'),
          key: 'payment_options',
          value: [
            {
              title: t('PlansTable.cryptoPayments'),
              key: 'crypto_payments',
              value: 3
            },
            {
              title: t('PlansTable.creditCardPayments'),
              key: 'credit_card_payments',
              value: true
            },
            {
              title: t('PlansTable.tokenPay'),
              key: 'tokenpay',
              value: false
            }
          ]
        },
        {
          title: t('ComparisonTable.shipping'),
          key: 'shipping_options',
          value: [
            {
              title: t('PlansTable.automatedShipping'),
              key: 'automated_shipping',
              value: true
            },
            {
              title: t('PlansTable.selfManagedShipping'),
              key: 'self_managed_shipping',
              value: true
            },
            {
              title: t('PlansTable.shipmentTracking'),
              key: 'shipment_tracking',
              value: true
            },
            {
              title: t('PlansTable.customizableShipping'),
              key: 'customizable_shipping',
              value: true
            }
          ]
        },
        {
          key: t('ComparisonTable.services'),
          value: [
            {
              title: t('PlansTable.marketingTools'),
              key: 'marketing_tools',
              value: false
            },
            {
              title: t('PlansTable.accountManager'),
              key: 'account_manager',
              value: false
            },
            {
              title: t('PlansTable.digitalProductPassport'),
              key: 'digital_product_passport',
              value: false
            },
            {
              title: t('PlansTable.support'),
              key: 'support',
              value: t('PlansTable.premiumSupport')
            }
          ]
        }
      ]
    },
    {
      _id: '667bd3605f9227621282197e',
      type: 'BUSINESS_PRO',
      subOptionIds: [
        {
          title: t('ComparisonTable.storeBuilder'),
          key: 'dashboard',
          value: [
            {
              title: t('PlansTable.storeDesigner'),
              key: 'shop_designer',
              value: true
            },
            {
              title: t('PlansTable.analytics'),
              key: 'analytics',
              value: true
            },
            {
              title: t('PlansTable.collectionManagement'),
              key: 'Collection management',
              value: true
            },
            {
              title: t('PlansTable.orderInventoryManagement'),
              key: 'Order & Inventory Management',
              value: true
            },
            {
              title: t('PlansTable.affiliateNetwork'),
              key: 'Affiliate network',
              value: true
            },
            {
              title: t('PlansTable.customReferralCodes'),
              key: 'Custom referral codes',
              value: true
            },
            {
              title: t('PlansTable.couponsAndCredits'),
              key: 'Coupons and credit creation',
              value: true
            },
            {
              title: t('PlansTable.advancedAnalytics'),
              key: 'Advanced analytics',
              value: true
            },
            {
              title: t('PlansTable.adminManagement'),
              key: 'Admin management',
              value: true
            },
            {
              title: t('PlansTable.embeddableProductTile'),
              key: 'Embeddable product tile',
              value: true
            },
            {
              title: t('PlansTable.apiIntegration'),
              key: 'API integration',
              value: true
            }
          ]
        },
        {
          title: t('ComparisonTable.storefront'),
          key: 'shop',
          value: [
            {
              title: t('PlansTable.physicalProducts'),
              key: 'Physical products',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.digitalGoods'),
              key: 'Digital goods',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.productionOnDemand'),
              key: 'Production-on-Demand',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.productTokenization'),
              key: 'digital_product',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.loginMethods'),
              key: 'print_on_demand',
              value: `5 ${t('common.network')}`
            },
            {
              title: t('PlansTable.postPurchaseDataGathering'),
              key: 'Post Purchase Data Gathering',
              value: true
            },
            {
              title: t('PlansTable.customizableFavicon'),
              key: 'Customizable_favicon',
              value: true
            },
            {
              title: t('PlansTable.mintToMerch'),
              key: 'Mint_to_Merch',
              value: true
            },
            {
              title: t('PlansTable.tokenGating'),
              key: 'Token_gating',
              value: true
            },
            {
              title: t('PlansTable.embeddableProductTiles'),
              key: 'Embeddable_product_tiles',
              value: true
            },
            {
              title: t('PlansTable.customizableDomain'),
              key: 'Customizable_domain',
              value: true
            },
            {
              title: t('PlansTable.royaltyTracking'),
              key: 'Royalty_tracking',
              value: true
            },
            {
              title: t('PlansTable.customTemplates'),
              key: 'Custom_templates',
              value: false
            }
          ]
        },
        {
          title: t('ComparisonTable.paymentOptions'),
          key: 'payment_options',
          value: [
            {
              title: t('PlansTable.cryptoPayments'),
              key: 'crypto_payments',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.creditCardPayments'),
              key: 'credit_card_payments',
              value: true
            },
            {
              title: t('PlansTable.tokenPay'),
              key: 'tokenpay',
              value: false
            }
          ]
        },
        {
          title: t('ComparisonTable.shipping'),
          key: 'shipping_options',
          value: [
            {
              title: t('PlansTable.automatedShipping'),
              key: 'automated_shipping',
              value: true
            },
            {
              title: t('PlansTable.selfManagedShipping'),
              key: 'self_managed_shipping',
              value: true
            },
            {
              title: t('PlansTable.shipmentTracking'),
              key: 'shipment_tracking',
              value: true
            },
            {
              title: t('PlansTable.customizableShipping'),
              key: 'customizable_shipping',
              value: true
            }
          ]
        },
        {
          key: t('ComparisonTable.services'),
          value: [
            {
              title: t('PlansTable.marketingTools'),
              key: 'marketing_tools',
              value: true
            },
            {
              title: t('PlansTable.accountManager'),
              key: 'account_manager',
              value: false
            },
            {
              title: t('PlansTable.digitalProductPassport'),
              key: 'digital_product_passport',
              value: false
            },
            {
              title: t('PlansTable.support'),
              key: 'support',
              value: t('PlansTable.vipSupport')
            }
          ]
        }
      ]
    },
    {
      _id: '667bd3625f922762128219c4',
      type: 'ENTERPRISE',
      subOptionIds: [
        {
          title: t('ComparisonTable.storeBuilder'),
          key: 'dashboard',
          value: [
            {
              title: t('PlansTable.storeDesigner'),
              key: 'shop_designer',
              value: true
            },
            {
              title: t('PlansTable.analytics'),
              key: 'analytics',
              value: true
            },
            {
              title: t('PlansTable.collectionManagement'),
              key: 'Collection management',
              value: true
            },
            {
              title: t('PlansTable.orderInventoryManagement'),
              key: 'Order & Inventory Management',
              value: true
            },
            {
              title: t('PlansTable.affiliateNetwork'),
              key: 'Affiliate network',
              value: true
            },
            {
              title: t('PlansTable.customReferralCodes'),
              key: 'Custom referral codes',
              value: true
            },
            {
              title: t('PlansTable.couponsAndCredits'),
              key: 'Coupons and credit creation',
              value: true
            },
            {
              title: t('PlansTable.advancedAnalytics'),
              key: 'Advanced analytics',
              value: true
            },
            {
              title: t('PlansTable.adminManagement'),
              key: 'Admin management',
              value: true
            },
            {
              title: t('PlansTable.embeddableProductTile'),
              key: 'Embeddable product tile',
              value: true
            },
            {
              title: t('PlansTable.apiIntegration'),
              key: 'API integration',
              value: true
            }
          ]
        },
        {
          title: t('ComparisonTable.storefront'),
          key: 'shop',
          value: [
            {
              title: t('PlansTable.physicalProducts'),
              key: 'Physical products',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.digitalGoods'),
              key: 'Digital goods',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.productionOnDemand'),
              key: 'Production-on-Demand',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.productTokenization'),
              key: 'digital_product',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.loginMethods'),
              key: 'print_on_demand',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.postPurchaseDataGathering'),
              key: 'Post Purchase Data Gathering',
              value: true
            },
            {
              title: t('PlansTable.customizableFavicon'),
              key: 'Customizable_favicon',
              value: true
            },
            {
              title: t('PlansTable.mintToMerch'),
              key: 'Mint_to_Merch',
              value: true
            },
            {
              title: t('PlansTable.tokenGating'),
              key: 'Token_gating',
              value: true
            },
            {
              title: t('PlansTable.embeddableProductTiles'),
              key: 'Embeddable_product_tiles',
              value: true
            },
            {
              title: t('PlansTable.customizableDomain'),
              key: 'Customizable_domain',
              value: true
            },
            {
              title: t('PlansTable.royaltyTracking'),
              key: 'Royalty_tracking',
              value: true
            },
            {
              title: t('PlansTable.customTemplates'),
              key: 'Custom_templates',
              value: true
            }
          ]
        },
        {
          title: t('ComparisonTable.paymentOptions'),
          key: 'payment_options',
          value: [
            {
              title: t('PlansTable.cryptoPayments'),
              key: 'crypto_payments',
              value: t('PlansTable.unlimited')
            },
            {
              title: t('PlansTable.creditCardPayments'),
              key: 'credit_card_payments',
              value: true
            },
            {
              title: t('PlansTable.tokenPay'),
              key: 'tokenpay',
              value: true
            }
          ]
        },
        {
          title: t('ComparisonTable.shipping'),
          key: 'shipping_options',
          value: [
            {
              title: t('PlansTable.automatedShipping'),
              key: 'automated_shipping',
              value: true
            },
            {
              title: t('PlansTable.selfManagedShipping'),
              key: 'self_managed_shipping',
              value: true
            },
            {
              title: t('PlansTable.shipmentTracking'),
              key: 'shipment_tracking',
              value: true
            },
            {
              title: t('PlansTable.customizableShipping'),
              key: 'customizable_shipping',
              value: true
            }
          ]
        },
        {
          key: t('ComparisonTable.services'),
          value: [
            {
              title: t('PlansTable.marketingTools'),
              key: 'marketing_tools',
              value: true
            },
            {
              title: t('PlansTable.accountManager'),
              key: 'account_manager',
              value: true
            },
            {
              title: t('PlansTable.digitalProductPassport'),
              key: 'digital_product_passport',
              value: true
            },
            {
              title: t('PlansTable.support'),
              key: 'support',
              value: t('PlansTable.vipSupport')
            }
          ]
        }
      ]
    }
  ]
});
