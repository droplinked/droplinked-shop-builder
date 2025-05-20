import AppIcons from "assets/icon/Appicons";
import React from "react";

export const producerSidebarLinks = [
    {
        group: 'Performance',
        items: [
            {
                title: 'Dashboard',
                icon: React.createElement(AppIcons.SidebarDashboard),
                linkTo: '/analytics/dashboard',
                list: []
            },
            {
                title: 'Analytics',
                icon: React.createElement(AppIcons.SidebarAnalytics),
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
                icon: React.createElement(AppIcons.SidebarProducts),
                linkTo: null,
                list: [
                    { listTitle: 'Inventory Management', linkTo: '/analytics/products' },
                    { listTitle: 'Product Collections', linkTo: '/analytics/collections' },
                    { listTitle: 'Onchain Inventory', linkTo: '/analytics/onchain-records' }
                ]
            },
            {
                title: 'Order Management',
                icon: React.createElement(AppIcons.SidebarNote),
                linkTo: null,
                list: [
                    { listTitle: 'Purchase History', linkTo: '/analytics/purchase-history' },
                    { listTitle: 'Invoices', linkTo: '/analytics/invoice-management' }
                ]
            },
            {
                title: 'Style Center',
                icon: React.createElement(AppIcons.SidebarBrush),
                linkTo: null,
                list: [
                    { listTitle: 'Storefront Designer', linkTo: '/style-center/storefront-designer' },
                    { listTitle: 'Product Tiles', linkTo: '/analytics/settings/tile' },
                    { listTitle: 'Product Links', linkTo: '/analytics/settings/payment-link-design' },
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
                icon: React.createElement(AppIcons.SidebarAffiliate),
                linkTo: null,
                list: [
                    { listTitle: 'Products', linkTo: '/analytics/affiliate/products' },
                ]
            },
            {
                title: 'Account Settings',
                icon: React.createElement(AppIcons.SettingGear),
                linkTo: null,
                list: [
                    { listTitle: 'Settings', linkTo: '/analytics/account-settings' },
                    { listTitle: 'Credits and Account Activity', linkTo: '/analytics/credits-and-activity' }
                ]
            },
            {
                title: 'Rewards Center',
                icon: React.createElement(AppIcons.SidebarRewards),
                linkTo: '/analytics/gamification',
                list: []
            },
            {
                title: 'Quests',
                icon: React.createElement(AppIcons.SideBarQuests),
                linkTo: '/rewards',
                list: [],
                external: true
            },
            {
                title: 'Customer Support',
                icon: React.createElement(AppIcons.SidebarChat),
                linkTo: "#",
                list: [],
                onClick: () => window.Tawk_API?.toggle()
            },
            {
                title: 'Help Center',
                icon: React.createElement(AppIcons.HelpCenter),
                linkTo: null,
                list: [
                    { listTitle: 'Changelog', linkTo: '/analytics/changelog' }
                ]
            }
        ]
    }
]