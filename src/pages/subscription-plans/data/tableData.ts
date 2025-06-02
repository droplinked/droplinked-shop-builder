import { TFunction } from 'i18next';

export const getTableData = (t: TFunction) => ({
  data: [
    {
      _id: '667bd35a5f922762128218f2',
      type: 'STARTER',
      subOptionIds: [
        {
          title: t('plansTable.storeBuilder'),
          key: 'dashboard',
          value: [
            {
              title: t('plansTable.features.storeDesigner'),
              key: 'shop_designer',
              value: true
            },
            {
              title: t('plansTable.features.analytics'),
              key: 'analytics',
              value: true
            },
            {
              title: t('plansTable.features.collectionManagement'),
              key: 'Collection management',
              value: true
            },
            {
              title: t('plansTable.features.orderInventoryManagement'),
              key: 'Order & Inventory Management',
              value: true
            },
            {
              title: t('plansTable.features.affiliateNetwork'),
              key: 'Affiliate network',
              value: true
            },
            {
              title: t('plansTable.features.customReferralCodes'),
              key: 'Custom referral codes',
              value: true
            },
            {
              title: t('plansTable.features.couponsAndCredits'),
              key: 'Coupons and credit creation',
              value: false
            },
            {
              title: t('plansTable.features.advancedAnalytics'),
              key: 'Advanced analytics',
              value: false
            },
            {
              title: t('plansTable.features.adminManagement'),
              key: 'Admin management',
              value: false
            },
            {
              title: t('plansTable.features.embeddableProductTile'),
              key: 'Embeddable product tile',
              value: false
            },
            {
              title: t('plansTable.features.apiIntegration'),
              key: 'API integration',
              value: false
            }
          ]
        },
        {
          title: t('plansTable.storefront'),
          key: 'shop',
          value: [
            {
              title: t('plansTable.features.physicalProducts'),
              key: 'Physical products',
              value: '5'
            },
            {
              title: t('plansTable.features.digitalGoods'),
              key: 'Digital goods',
              value: '5'
            },
            {
              title: t('plansTable.features.productionOnDemand'),
              key: 'Production-on-Demand',
              value: '5'
            },
            {
              title: t('plansTable.features.productTokenization'),
              key: 'digital_product',
              value: '5'
            },
            {
              title: t('plansTable.features.loginMethods'),
              key: 'print_on_demand',
              value: `1 ${t('network')}`
            },
            {
              title: t('plansTable.features.postPurchaseDataGathering'),
              key: 'Post Purchase Data Gathering',
              value: true
            },
            {
              title: t('plansTable.features.customizableFavicon'),
              key: 'Customizable_favicon',
              value: false
            },
            {
              title: t('plansTable.features.mintToMerch'),
              key: 'Mint_to_Merch',
              value: false
            },
            {
              title: t('plansTable.features.tokenGating'),
              key: 'Token_gating',
              value: false
            },
            {
              title: t('plansTable.features.embeddableProductTiles'),
              key: 'Embeddable_product_tiles',
              value: false
            },
            {
              title: t('plansTable.features.customizableDomain'),
              key: 'Customizable_domain',
              value: false
            },
            {
              title: t('plansTable.features.royaltyTracking'),
              key: 'Royalty_tracking',
              value: false
            },
            {
              title: t('plansTable.features.customTemplates'),
              key: 'Custom_templates',
              value: false
            }
          ]
        },
        {
          title: t('plansTable.paymentOptions'),
          key: 'payment_options',
          value: [
            {
              title: t('plansTable.features.cryptoPayments'),
              key: 'crypto_payments',
              value: 1
            },
            {
              title: t('plansTable.features.creditCardPayments'),
              key: 'credit_card_payments',
              value: true
            },
            {
              title: t('plansTable.features.tokenPay'),
              key: 'tokenpay',
              value: false
            }
          ]
        },
        {
          title: t('plansTable.shipping'),
          key: 'shipping_options',
          value: [
            {
              title: t('plansTable.features.automatedShipping'),
              key: 'automated_shipping',
              value: true
            },
            {
              title: t('plansTable.features.selfManagedShipping'),
              key: 'self_managed_shipping',
              value: true
            },
            {
              title: t('plansTable.features.shipmentTracking'),
              key: 'shipment_tracking',
              value: true
            },
            {
              title: t('plansTable.features.customizableShipping'),
              key: 'customizable_shipping',
              value: false
            }
          ]
        },
        {
          key: t('plansTable.services'),
          value: [
            {
              title: t('plansTable.features.marketingTools'),
              key: 'marketing_tools',
              value: false
            },
            {
              title: t('plansTable.features.accountManager'),
              key: 'account_manager',
              value: false
            },
            {
              title: t('plansTable.features.digitalProductPassport'),
              key: 'digital_product_passport',
              value: false
            },
            {
              title: t('plansTable.features.support'),
              key: 'support',
              value: t('plansTable.features.basicSupport')
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
          title: t('plansTable.storeBuilder'),
          key: 'dashboard',
          value: [
            {
              title: t('plansTable.features.storeDesigner'),
              key: 'shop_designer',
              value: true
            },
            {
              title: t('plansTable.features.analytics'),
              key: 'analytics',
              value: true
            },
            {
              title: t('plansTable.features.collectionManagement'),
              key: 'Collection management',
              value: true
            },
            {
              title: t('plansTable.features.orderInventoryManagement'),
              key: 'Order & Inventory Management',
              value: true
            },
            {
              title: t('plansTable.features.affiliateNetwork'),
              key: 'Affiliate network',
              value: true
            },
            {
              title: t('plansTable.features.customReferralCodes'),
              key: 'Custom referral codes',
              value: true
            },
            {
              title: t('plansTable.features.couponsAndCredits'),
              key: 'Coupons and credit creation',
              value: true
            },
            {
              title: t('plansTable.features.advancedAnalytics'),
              key: 'Advanced analytics',
              value: false
            },
            {
              title: t('plansTable.features.adminManagement'),
              key: 'Admin management',
              value: false
            },
            {
              title: t('plansTable.features.embeddableProductTile'),
              key: 'Embeddable product tile',
              value: false
            },
            {
              title: t('plansTable.features.apiIntegration'),
              key: 'API integration',
              value: false
            }
          ]
        },
        {
          title: t('plansTable.storefront'),
          key: 'shop',
          value: [
            {
              title: t('plansTable.features.physicalProducts'),
              key: 'Physical products',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.digitalGoods'),
              key: 'Digital goods',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.productionOnDemand'),
              key: 'Production-on-Demand',
              value: `10 / ${t('values.month')}`
            },
            {
              title: t('plansTable.features.productTokenization'),
              key: 'digital_product',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.loginMethods'),
              key: 'print_on_demand',
              value: `3 ${t('network')}`
            },
            {
              title: t('plansTable.features.postPurchaseDataGathering'),
              key: 'Post Purchase Data Gathering',
              value: true
            },
            {
              title: t('plansTable.features.customizableFavicon'),
              key: 'Customizable_favicon',
              value: true
            },
            {
              title: t('plansTable.features.mintToMerch'),
              key: 'Mint_to_Merch',
              value: true
            },
            {
              title: t('plansTable.features.tokenGating'),
              key: 'Token_gating',
              value: true
            },
            {
              title: t('plansTable.features.embeddableProductTiles'),
              key: 'Embeddable_product_tiles',
              value: true
            },
            {
              title: t('plansTable.features.customizableDomain'),
              key: 'Customizable_domain',
              value: true
            },
            {
              title: t('plansTable.features.royaltyTracking'),
              key: 'Royalty_tracking',
              value: false
            },
            {
              title: t('plansTable.features.customTemplates'),
              key: 'Custom_templates',
              value: false
            }
          ]
        },
        {
          title: t('plansTable.paymentOptions'),
          key: 'payment_options',
          value: [
            {
              title: t('plansTable.features.cryptoPayments'),
              key: 'crypto_payments',
              value: 3
            },
            {
              title: t('plansTable.features.creditCardPayments'),
              key: 'credit_card_payments',
              value: true
            },
            {
              title: t('plansTable.features.tokenPay'),
              key: 'tokenpay',
              value: false
            }
          ]
        },
        {
          title: t('plansTable.shipping'),
          key: 'shipping_options',
          value: [
            {
              title: t('plansTable.features.automatedShipping'),
              key: 'automated_shipping',
              value: true
            },
            {
              title: t('plansTable.features.selfManagedShipping'),
              key: 'self_managed_shipping',
              value: true
            },
            {
              title: t('plansTable.features.shipmentTracking'),
              key: 'shipment_tracking',
              value: true
            },
            {
              title: t('plansTable.features.customizableShipping'),
              key: 'customizable_shipping',
              value: true
            }
          ]
        },
        {
          key: t('plansTable.services'),
          value: [
            {
              title: t('plansTable.features.marketingTools'),
              key: 'marketing_tools',
              value: false
            },
            {
              title: t('plansTable.features.accountManager'),
              key: 'account_manager',
              value: false
            },
            {
              title: t('plansTable.features.digitalProductPassport'),
              key: 'digital_product_passport',
              value: false
            },
            {
              title: t('plansTable.features.support'),
              key: 'support',
              value: t('plansTable.features.premiumSupport')
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
          title: t('plansTable.storeBuilder'),
          key: 'dashboard',
          value: [
            {
              title: t('plansTable.features.storeDesigner'),
              key: 'shop_designer',
              value: true
            },
            {
              title: t('plansTable.features.analytics'),
              key: 'analytics',
              value: true
            },
            {
              title: t('plansTable.features.collectionManagement'),
              key: 'Collection management',
              value: true
            },
            {
              title: t('plansTable.features.orderInventoryManagement'),
              key: 'Order & Inventory Management',
              value: true
            },
            {
              title: t('plansTable.features.affiliateNetwork'),
              key: 'Affiliate network',
              value: true
            },
            {
              title: t('plansTable.features.customReferralCodes'),
              key: 'Custom referral codes',
              value: true
            },
            {
              title: t('plansTable.features.couponsAndCredits'),
              key: 'Coupons and credit creation',
              value: true
            },
            {
              title: t('plansTable.features.advancedAnalytics'),
              key: 'Advanced analytics',
              value: true
            },
            {
              title: t('plansTable.features.adminManagement'),
              key: 'Admin management',
              value: true
            },
            {
              title: t('plansTable.features.embeddableProductTile'),
              key: 'Embeddable product tile',
              value: true
            },
            {
              title: t('plansTable.features.apiIntegration'),
              key: 'API integration',
              value: true
            }
          ]
        },
        {
          title: t('plansTable.storefront'),
          key: 'shop',
          value: [
            {
              title: t('plansTable.features.physicalProducts'),
              key: 'Physical products',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.digitalGoods'),
              key: 'Digital goods',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.productionOnDemand'),
              key: 'Production-on-Demand',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.productTokenization'),
              key: 'digital_product',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.loginMethods'),
              key: 'print_on_demand',
              value: `5 ${t('network')}`
            },
            {
              title: t('plansTable.features.postPurchaseDataGathering'),
              key: 'Post Purchase Data Gathering',
              value: true
            },
            {
              title: t('plansTable.features.customizableFavicon'),
              key: 'Customizable_favicon',
              value: true
            },
            {
              title: t('plansTable.features.mintToMerch'),
              key: 'Mint_to_Merch',
              value: true
            },
            {
              title: t('plansTable.features.tokenGating'),
              key: 'Token_gating',
              value: true
            },
            {
              title: t('plansTable.features.embeddableProductTiles'),
              key: 'Embeddable_product_tiles',
              value: true
            },
            {
              title: t('plansTable.features.customizableDomain'),
              key: 'Customizable_domain',
              value: true
            },
            {
              title: t('plansTable.features.royaltyTracking'),
              key: 'Royalty_tracking',
              value: true
            },
            {
              title: t('plansTable.features.customTemplates'),
              key: 'Custom_templates',
              value: false
            }
          ]
        },
        {
          title: t('plansTable.paymentOptions'),
          key: 'payment_options',
          value: [
            {
              title: t('plansTable.features.cryptoPayments'),
              key: 'crypto_payments',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.creditCardPayments'),
              key: 'credit_card_payments',
              value: true
            },
            {
              title: t('plansTable.features.tokenPay'),
              key: 'tokenpay',
              value: false
            }
          ]
        },
        {
          title: t('plansTable.shipping'),
          key: 'shipping_options',
          value: [
            {
              title: t('plansTable.features.automatedShipping'),
              key: 'automated_shipping',
              value: true
            },
            {
              title: t('plansTable.features.selfManagedShipping'),
              key: 'self_managed_shipping',
              value: true
            },
            {
              title: t('plansTable.features.shipmentTracking'),
              key: 'shipment_tracking',
              value: true
            },
            {
              title: t('plansTable.features.customizableShipping'),
              key: 'customizable_shipping',
              value: true
            }
          ]
        },
        {
          key: t('plansTable.services'),
          value: [
            {
              title: t('plansTable.features.marketingTools'),
              key: 'marketing_tools',
              value: true
            },
            {
              title: t('plansTable.features.accountManager'),
              key: 'account_manager',
              value: false
            },
            {
              title: t('plansTable.features.digitalProductPassport'),
              key: 'digital_product_passport',
              value: false
            },
            {
              title: t('plansTable.features.support'),
              key: 'support',
              value: t('plansTable.features.vipSupport')
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
          title: t('plansTable.storeBuilder'),
          key: 'dashboard',
          value: [
            {
              title: t('plansTable.features.storeDesigner'),
              key: 'shop_designer',
              value: true
            },
            {
              title: t('plansTable.features.analytics'),
              key: 'analytics',
              value: true
            },
            {
              title: t('plansTable.features.collectionManagement'),
              key: 'Collection management',
              value: true
            },
            {
              title: t('plansTable.features.orderInventoryManagement'),
              key: 'Order & Inventory Management',
              value: true
            },
            {
              title: t('plansTable.features.affiliateNetwork'),
              key: 'Affiliate network',
              value: true
            },
            {
              title: t('plansTable.features.customReferralCodes'),
              key: 'Custom referral codes',
              value: true
            },
            {
              title: t('plansTable.features.couponsAndCredits'),
              key: 'Coupons and credit creation',
              value: true
            },
            {
              title: t('plansTable.features.advancedAnalytics'),
              key: 'Advanced analytics',
              value: true
            },
            {
              title: t('plansTable.features.adminManagement'),
              key: 'Admin management',
              value: true
            },
            {
              title: t('plansTable.features.embeddableProductTile'),
              key: 'Embeddable product tile',
              value: true
            },
            {
              title: t('plansTable.features.apiIntegration'),
              key: 'API integration',
              value: true
            }
          ]
        },
        {
          title: t('plansTable.storefront'),
          key: 'shop',
          value: [
            {
              title: t('plansTable.features.physicalProducts'),
              key: 'Physical products',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.digitalGoods'),
              key: 'Digital goods',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.productionOnDemand'),
              key: 'Production-on-Demand',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.productTokenization'),
              key: 'digital_product',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.loginMethods'),
              key: 'print_on_demand',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.postPurchaseDataGathering'),
              key: 'Post Purchase Data Gathering',
              value: true
            },
            {
              title: t('plansTable.features.customizableFavicon'),
              key: 'Customizable_favicon',
              value: true
            },
            {
              title: t('plansTable.features.mintToMerch'),
              key: 'Mint_to_Merch',
              value: true
            },
            {
              title: t('plansTable.features.tokenGating'),
              key: 'Token_gating',
              value: true
            },
            {
              title: t('plansTable.features.embeddableProductTiles'),
              key: 'Embeddable_product_tiles',
              value: true
            },
            {
              title: t('plansTable.features.customizableDomain'),
              key: 'Customizable_domain',
              value: true
            },
            {
              title: t('plansTable.features.royaltyTracking'),
              key: 'Royalty_tracking',
              value: true
            },
            {
              title: t('plansTable.features.customTemplates'),
              key: 'Custom_templates',
              value: true
            }
          ]
        },
        {
          title: t('plansTable.paymentOptions'),
          key: 'payment_options',
          value: [
            {
              title: t('plansTable.features.cryptoPayments'),
              key: 'crypto_payments',
              value: t('plansTable.features.unlimited')
            },
            {
              title: t('plansTable.features.creditCardPayments'),
              key: 'credit_card_payments',
              value: true
            },
            {
              title: t('plansTable.features.tokenPay'),
              key: 'tokenpay',
              value: true
            }
          ]
        },
        {
          title: t('plansTable.shipping'),
          key: 'shipping_options',
          value: [
            {
              title: t('plansTable.features.automatedShipping'),
              key: 'automated_shipping',
              value: true
            },
            {
              title: t('plansTable.features.selfManagedShipping'),
              key: 'self_managed_shipping',
              value: true
            },
            {
              title: t('plansTable.features.shipmentTracking'),
              key: 'shipment_tracking',
              value: true
            },
            {
              title: t('plansTable.features.customizableShipping'),
              key: 'customizable_shipping',
              value: true
            }
          ]
        },
        {
          key: t('plansTable.services'),
          value: [
            {
              title: t('plansTable.features.marketingTools'),
              key: 'marketing_tools',
              value: true
            },
            {
              title: t('plansTable.features.accountManager'),
              key: 'account_manager',
              value: true
            },
            {
              title: t('plansTable.features.digitalProductPassport'),
              key: 'digital_product_passport',
              value: true
            },
            {
              title: t('plansTable.features.support'),
              key: 'support',
              value: t('plansTable.features.vipSupport')
            }
          ]
        }
      ]
    }
  ]
});
