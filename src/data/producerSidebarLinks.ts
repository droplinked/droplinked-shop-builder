import { BasketMd } from "assets/icons/Finance/Basket/BasketMd";
import { BoxMd } from "assets/icons/Finance/Box/BoxMd";
import { ChartMd } from "assets/icons/Finance/Chart/ChartMd";
import { HelpMd } from "assets/icons/Sign/Help/HelpMd";
import { TargetMd } from "assets/icons/Sign/Target/TargetMd";
import { BrushMd } from "assets/icons/StyleDesigner/Brush/BrushMd";
import { AffiliateMd } from "assets/icons/System/Affiliate/AffiliateMd";
import { DashboardMd } from "assets/icons/System/Dashboard/DashboardMd";
import { GiftMd } from "assets/icons/System/Gift/GiftMd";
import { SettinggearMd } from "assets/icons/System/SettingGear/SettinggearMd";
import { TFunction } from "i18next";
import React from "react";

const createSidebarLinks = (t: TFunction) => [
    {
        group: t('Sidebar.NavLinks.groups.performance'),
        items: [
            {
                title: t('Sidebar.NavLinks.items.dashboard'),
                icon: React.createElement(DashboardMd, { color: "#FFF" }),
                linkTo: '/analytics/dashboard',
                list: []
            },
            {
                title: t('Sidebar.NavLinks.items.analytics'),
                icon: React.createElement(ChartMd, { color: "#FFF" }),
                linkTo: '/analytics',
                list: []
            }
        ]
    },
    {
        group: t('Sidebar.NavLinks.groups.storefront'),
        items: [
            {
                title: t('Sidebar.NavLinks.items.products'),
                icon: React.createElement(BoxMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: t('Sidebar.NavLinks.lists.inventoryManagement'), linkTo: '/analytics/products' },
                    { listTitle: t('Sidebar.NavLinks.lists.productCollections'), linkTo: '/analytics/collections' },
                    { listTitle: t('Sidebar.NavLinks.lists.shippingManagement'), linkTo: '/analytics/shipping-management' },
                    { listTitle: t('Sidebar.NavLinks.lists.onchainInventory'), linkTo: '/analytics/onchain-records' },
                ]
            },
            {
                title: t('Sidebar.NavLinks.items.orderManagement'),
                icon: React.createElement(BasketMd, { color: "#fff" }),
                linkTo: null,
                list: [
                    { listTitle: t('Sidebar.NavLinks.lists.purchaseHistory'), linkTo: '/analytics/purchase-history' },
                ]
            },
            {
                title: t('Sidebar.NavLinks.items.designStudio'),
                icon: React.createElement(BrushMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: t('Sidebar.NavLinks.lists.templateBuilder'), linkTo: '/analytics/style-center/template-builder' },
                    { listTitle: t('Sidebar.NavLinks.lists.productTiles'), linkTo: '/analytics/style-center/product-tiles' },
                    { listTitle: t('Sidebar.NavLinks.lists.productLinks'), linkTo: '/analytics/style-center/product-links' },
                    { listTitle: t('Sidebar.NavLinks.lists.blogEditor'), linkTo: '/analytics/blogs' }
                ]
            }
        ]
    },
    {
        group: t('Sidebar.NavLinks.groups.more'),
        items: [
            {
                title: t('Sidebar.NavLinks.items.affiliateNetwork'),
                icon: React.createElement(AffiliateMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: t('Sidebar.NavLinks.lists.products'), linkTo: '/analytics/affiliate/products' },
                ]
            },
            {
                title: t('Sidebar.NavLinks.items.accountSettings'),
                icon: React.createElement(SettinggearMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: t('Sidebar.NavLinks.lists.settings'), linkTo: '/analytics/account-settings' },
                    { listTitle: t('Sidebar.NavLinks.lists.creditsAndActivity'), linkTo: '/analytics/credits-and-activity' }
                ]
            },
            {
                title: t('Sidebar.NavLinks.items.rewardsCenter'),
                icon: React.createElement(GiftMd, { color: "#FFF" }),
                linkTo: '/analytics/gamification',
                list: []
            },
            {
                title: t('Sidebar.NavLinks.items.quests'),
                icon: React.createElement(TargetMd, { color: "#FFF" }),
                linkTo: '/rewards',
                list: [],
                external: true
            },
            //{
            //     title: t('Sidebar.NavLinks.items.customerSupport'),
            //     icon: React.createElement(ChatMd, { color: "#FFF" }),
            //     linkTo: "#",
            //     list: [],
            //     onClick: () => 
            // },
            {
                title: t('Sidebar.NavLinks.items.helpCenter'),
                icon: React.createElement(HelpMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: t('Sidebar.NavLinks.lists.changelog'), linkTo: '/analytics/changelog' }
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
            if (item.title === t('Sidebar.NavLinks.items.quests') && hasCompletedQuests) {
                return false;
            }
            return true
        })
    }))
}

export const getProducerSidebarLinks = (t: TFunction) => createSidebarLinks(t);