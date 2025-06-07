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

const baseSidebarLinks = [
    {
        group: 'Performance',
        items: [
            {
                title: 'Dashboard',
                icon: React.createElement(DashboardMd, { color: "#FFF" }),
                linkTo: '/analytics/dashboard',
                list: []
            },
            {
                title: 'Analytics',
                icon: React.createElement(ChartMd, { color: "#FFF" }),
                linkTo: '/analytics',
                list: []
            }
        ]
    },
    {
        group: 'Storefront',
        items: [
            {
                title: 'Products',
                icon: React.createElement(BoxMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: 'Inventory Management', linkTo: '/analytics/products' },
                    { listTitle: 'Product Collections', linkTo: '/analytics/collections' },
                    { listTitle: 'Onchain Inventory', linkTo: '/analytics/onchain-records' }
                ]
            },
            {
                title: 'Order Management',
                icon: React.createElement(BasketMd, { color: "#fff" }),
                linkTo: null,
                list: [
                    { listTitle: 'Purchase History', linkTo: '/analytics/purchase-history' },
                    { listTitle: 'Invoices', linkTo: '/analytics/invoice-management' }
                ]
            },
            {
                title: 'Style Center',
                icon: React.createElement(BrushMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: 'Storefront Designer', linkTo: '/style-center/storefront-designer' },
                    { listTitle: 'Product Tiles', linkTo: '/analytics/style-center/product-links' },
                    { listTitle: 'Product Links', linkTo: '/analytics/style-center/product-tiles' },
                    { listTitle: 'Blog Editor', linkTo: '/analytics/blogs' }
                ]
            }
        ]
    },
    {
        group: 'More',
        items: [
            {
                title: 'Affiliate Network',
                icon: React.createElement(AffiliateMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: 'Products', linkTo: '/analytics/affiliate/products' },
                ]
            },
            {
                title: 'Account Settings',
                icon: React.createElement(SettinggearMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: 'Settings', linkTo: '/analytics/account-settings' },
                    { listTitle: 'Credits and Account Activity', linkTo: '/analytics/credits-and-activity' }
                ]
            },
            {
                title: 'Rewards Center',
                icon: React.createElement(GiftMd, { color: "#FFF" }),
                linkTo: '/analytics/gamification',
                list: []
            },
            {
                title: 'Quests',
                icon: React.createElement(TargetMd, { color: "#FFF" }),
                linkTo: '/rewards',
                list: [],
                external: true
            },
            {
                title: 'Customer Support',
                icon: React.createElement(ChatMd, { color: "#FFF" }),
                linkTo: "#",
                list: [],
                onClick: () => window.Tawk_API?.toggle()
            },
            {
                title: 'Help Center',
                icon: React.createElement(HelpMd, { color: "#FFF" }),
                linkTo: null,
                list: [
                    { listTitle: 'Changelog', linkTo: '/analytics/changelog' }
                ]
            }
        ]
    }
];

// Utility function to filter sidebar links based on conditions
export const getFilteredSidebarLinks = (hasCompletedQuests: boolean) => {
    return baseSidebarLinks.map(group => ({
        ...group,
        items: group.items.filter(item => {
            // Filter out Quests if they are completed
            if (item.title === 'Quests' && hasCompletedQuests) {
                return false;
            }
            return true;
        })
    }));
};

export const producerSidebarLinks = baseSidebarLinks;