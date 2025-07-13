import { BasketMd } from "assets/icons/Finance/Basket/BasketMd";
import { BoxMd } from "assets/icons/Finance/Box/BoxMd";
import { ChartMd } from "assets/icons/Finance/Chart/ChartMd";
import { HelpMd } from "assets/icons/Sign/Help/HelpMd";
import { TargetMd } from "assets/icons/Sign/Target/TargetMd";
import { BrushMd } from "assets/icons/StyleDesigner/Brush/BrushMd";
import { AffiliateMd } from "assets/icons/System/Affiliate/AffiliateMd";
import { ChatMd } from "assets/icons/System/Chat/ChatMd";
import { DashboardMd } from "assets/icons/System/Dashboard/DashboardMd";
import { GiftMd } from "assets/icons/System/Gift/GiftMd";
import { SettinggearMd } from "assets/icons/System/SettingGear/SettinggearMd";
import React from "react";
import { TFunction } from "i18next";

const createSidebarLinks = (t: TFunction) => [
    {
        group: t('groups.performance'),
        items: [
            {
                title: t('items.dashboard'),
                icon: React.createElement(DashboardMd, { color: "#FFF" }),
                linkTo: '/analytics/dashboard',
                list: []
            },
            {
                title: t('items.analytics'),
                icon: React.createElement(ChartMd, { color: "#FFF" }),
                linkTo: '/analytics',
                list: []
            }
        ]
    },
    {
        group: t('groups.storefront'),
        items: [
            {
                title: t('items.products'),
                icon: React.createElement(BoxMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: t('lists.inventoryManagement'), linkTo: '/analytics/products' },
                    { listTitle: t('lists.productCollections'), linkTo: '/analytics/collections' },
                    { listTitle: t('lists.onchainInventory'), linkTo: '/analytics/onchain-records' }
                ]
            },
            {
                title: t('items.orderManagement'),
                icon: React.createElement(BasketMd, { color: "#fff" }),
                linkTo: null,
                list: [
                    { listTitle: t('lists.purchaseHistory'), linkTo: '/analytics/purchase-history' },
                    { listTitle: t('lists.invoices'), linkTo: '/analytics/invoice-management' }
                ]
            },
            {
                title: t('items.styleCenter'),
                icon: React.createElement(BrushMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: t('lists.storefrontDesigner'), linkTo: '/style-center/storefront-designer' },
                    { listTitle: t('lists.productTiles'), linkTo: '/analytics/style-center/product-tiles' },
                    { listTitle: t('lists.productLinks'), linkTo: '/analytics/style-center/product-links' },
                    { listTitle: t('lists.blogEditor'), linkTo: '/analytics/blogs' }
                ]
            }
        ]
    },
    {
        group: t('groups.more'),
        items: [
            {
                title: t('items.affiliateNetwork'),
                icon: React.createElement(AffiliateMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: t('lists.products'), linkTo: '/analytics/affiliate/products' },
                ]
            },
            {
                title: t('items.accountSettings'),
                icon: React.createElement(SettinggearMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: t('lists.settings'), linkTo: '/analytics/account-settings' },
                    { listTitle: t('lists.creditsAndActivity'), linkTo: '/analytics/credits-and-activity' }
                ]
            },
            {
                title: t('items.rewardsCenter'),
                icon: React.createElement(GiftMd, { color: "#FFF" }),
                linkTo: '/analytics/gamification',
                list: []
            },
            {
                title: t('items.quests'),
                icon: React.createElement(TargetMd, { color: "#FFF" }),
                linkTo: '/rewards',
                list: [],
                external: true
            },
            {
                title: t('items.customerSupport'),
                icon: React.createElement(ChatMd, { color: "#FFF" }),
                linkTo: "#",
                list: [],
                onClick: () => window.Tawk_API?.toggle()
            },
            {
                title: t('items.helpCenter'),
                icon: React.createElement(HelpMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: t('lists.changelog'), linkTo: '/analytics/changelog' }
                ]
            }
        ]
    }
]

// Utility function to filter sidebar links based on conditions
export const getFilteredSidebarLinks = (t: TFunction, hasCompletedQuests: boolean) => {
    return createSidebarLinks(t).map(group => ({
        ...group,
        items: group.items.filter(item => {
            // Filter out Quests if they are completed
            if (item.title === t('items.quests') && hasCompletedQuests) {
                return false;
            }
            return true
        })
    }))
}

export const getProducerSidebarLinks = (t: TFunction) => createSidebarLinks(t);