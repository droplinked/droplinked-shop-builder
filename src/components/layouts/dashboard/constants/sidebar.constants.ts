import AppIcons from 'assest/icon/Appicons';
import { SidebarGroup } from './interfaces';

export const SIDEBAR_CONSTANTS: SidebarGroup[] = [
  {
    group: 'Performance',
    items: [
      {
        title: 'Dashboard',
        icon: AppIcons.SidebarDashboard,
        linkTo: '/analytics/dashboard',
        list: []
      },
      {
        title: 'Analytics',
        icon: AppIcons.SidebarAnalytics,
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
        icon: AppIcons.SidebarProducts,
        linkTo: null,
        list: [
          { listTitle: 'Inventory Management', linkTo: '/analytics/products' },
          {
            listTitle: 'Product Collections',
            linkTo: '/analytics/collections'
          },
          { listTitle: 'Onchain Inventory', linkTo: '/analytics/onchain-records' }
        ]
      },

      {
        title: 'Order Management',
        icon: AppIcons.SidebarNote,
        linkTo: null,
        list: [
          { listTitle: 'Purchase History', linkTo: '/analytics/orders' },
          { listTitle: 'Invoices', linkTo: '/analytics/invoice-management' }
        ]
      },

      {
        title: 'Style Center',
        icon: AppIcons.SidebarBrush,
        linkTo: null,
        list: [
          {
            listTitle: 'Storefront Designer',
            linkTo: '/analytics/settings/design'
          },
          { listTitle: 'Product Tiles', linkTo: '/analytics/settings/tile' },
          {
            listTitle: 'Product Links',
            linkTo: '/analytics/settings/payment-link-design'
          },
          {
            listTitle: 'Blog Editor',
            linkTo: '/analytics/blogs'
          }
        ]
      }
    ]
  },
  {
    group: 'More',
    items: [
      {
        title: 'Affiliate Network',
        icon: AppIcons.SidebarAffiliate,
        linkTo: null,
        list: [
          // { listTitle: 'Marketplace', linkTo: '/analytics/affiliate/market' },
          { listTitle: 'Products', linkTo: '/analytics/affiliate/products' },
          // { listTitle: 'Stores', linkTo: '/analytics/affiliate/stores' }
        ]
      },

      {
        title: 'Account Settings',
        icon: AppIcons.SettingGear,
        linkTo: null,
        list: [
          { listTitle: 'Settings', linkTo: '/analytics/account-settings' },
          { listTitle: 'Credits and Account Activity', linkTo: '/analytics/credits-and-activity' }
        ]
      },
      {
        title: 'Rewards Center',
        icon: AppIcons.SidebarRewards,
        linkTo: '/analytics/gamification',
        list: []
      },
      {
        title: 'Quests',
        icon: AppIcons.SideBarQuests,
        linkTo: '/rewards',
        list: []
      },
      {
        title: 'Customer Support',
        icon: AppIcons.SidebarChat,
        linkTo: "#",
        list: [],
        onClick: () => window.Tawk_API?.toggle()
      }
    ]
  }
];
