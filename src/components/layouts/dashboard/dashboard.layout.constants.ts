import { BoxProps } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import { IAppTypography } from "components/common/typography/AppTypography";
import { SHOP_URL } from "lib/utils/app/variable";
import { currencyConvertion } from "lib/utils/helpers/currencyConvertion";
import { IShopCurrency } from "types/interface/shopCurrency.interface";

type SidebarItem = {
    title: string;
    icon: any;
    linkTo: string | null;
    list: Array<{ listTitle: string; linkTo: string }>;
};
type SidebarGroup = { group: string; items: SidebarItem[] };
type ProfileItem = {
    title: { label: string; style: Partial<IAppTypography> };
    icon: { svg: any; style: Partial<IAppTypography> };
    linkTo: string | null;
    isExternalLink: boolean;
    rightSide: { value: string | null; style: Partial<IAppTypography> };
    action?: () => void;
};
type SubscriptionPlan = {
    icon: any;
    title: string;
    rightSide: { type: "text"; style: IAppTypography; value: string } | { type: "button"; style: BoxProps; value: string; action: () => void };
};

export interface IGrowthHackSubSection {
    title: string;
    description: string;
    link?: {
        linkTitle: string;
        linkTo: string;
        isExternal: boolean;
    };
    image: string;
    buttons?: any;
}

export interface IGrowthHackSection {
    title: string;
    objectField: string;
    subSections: IGrowthHackSubSection[];
}

export const sidebar_constants: SidebarGroup[] = [
    {
        group: "Analytics",
        items: [
            {
                title: "Analytics",
                icon: AppIcons.SidebarAnalytics,
                linkTo: "/analytics",
                list: [],
            },
        ],
    },
    {
        group: "Storefront",
        items: [
            {
                title: "Products",
                icon: AppIcons.SidebarProducts,
                linkTo: null,
                list: [
                    { listTitle: "Inventory Management", linkTo: "/analytics/products" },
                    {
                        listTitle: "Product Collections",
                        linkTo: "/analytics/collections",
                    },
                    { listTitle: "Onchain Records", linkTo: "/analytics/nfts" },
                ],
            },

            {
                title: "Order Management",
                icon: AppIcons.SidebarNote,
                linkTo: null,
                list: [
                    { listTitle: "Purchase History", linkTo: "/analytics/orders" },
                    { listTitle: "Invoices", linkTo: "/analytics/invoice-management" },
                ],
            },

            {
                title: "Style Center",
                icon: AppIcons.SidebarBrush,
                linkTo: null,
                list: [
                    {
                        listTitle: "Storefront Designer",
                        linkTo: "/analytics/settings/design",
                    },
                    { listTitle: "Product Tiles", linkTo: "/analytics/settings/tile" },
                    {
                        listTitle: "Product Links",
                        linkTo: "/analytics/settings/payment-link-design",
                    },
                    {
                        listTitle: "Blog Editor",
                        linkTo: "/analytics/blogs",
                    },
                ],
            },
        ],
    },
    {
        group: "More",
        items: [
            {
                title: "Affiliate Network",
                icon: AppIcons.SidebarAffiliate,
                linkTo: null,
                list: [
                    { listTitle: "Marketplace", linkTo: "/analytics/affiliate/market" },
                    { listTitle: "Products", linkTo: "/analytics/affiliate/products" },
                    { listTitle: "Stores", linkTo: "/analytics/affiliate/stores" },
                ],
            },
            {
                title: "Rewards Center",
                icon: AppIcons.SidebarRewards,
                linkTo: "/analytics/gamification",
                list: [],
            },
            {
                title: "Account Settings",
                icon: AppIcons.SettingGear,
                linkTo: "/analytics/account-settings/general",
                list: [],
            },
            {
                title: "Management Panel",
                icon: AppIcons.SidebarSetting,
                linkTo: null,
                list: [
                    {
                        listTitle: "Account Information",
                        linkTo: "/analytics/settings/shop-info",
                    },

                    {
                        listTitle: "Wallet and Payments",
                        linkTo: "/analytics/settings/technical",
                    },
                    {
                        listTitle: "User Management",
                        linkTo: "/analytics/settings/admins",
                    },
                    {
                        listTitle: "Digital Coupons",
                        linkTo: "/analytics/settings/coupons",
                    },
                ],
            },

            // { title: "Chat with Support", icon: AppIcons.SidebarChat, linkTo: "/analytics/", list: [] },
        ],
    },
];

export const createProfileConstants = (shop: { credit: number; name: string; shopDomain: string; currency: IShopCurrency }, logoutUser: () => void): ProfileItem[] => [
    {
        title: { label: "Credit", style: {} },
        icon: { svg: AppIcons.ProfileCredit, style: {} },
        linkTo: null,
        isExternalLink: false,
        rightSide: {
            value: `${shop.currency?.symbol}${currencyConvertion(Number(shop?.credit), shop.currency?.conversionRateToUSD, false)} ${shop.currency?.abbreviation}`,
            style: {
                color: "#2BCFA1",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "20px",
            },
        },
    },
    {
        title: { label: "View shop", style: {} },
        icon: { svg: AppIcons.ProfileShop, style: {} },
        linkTo: shop?.shopDomain ? `https://${shop?.shopDomain}` : `${SHOP_URL}/${shop.name}`,
        isExternalLink: true,
        rightSide: { value: null, style: {} },
    },
    {
        title: { label: "Settings", style: {} },
        icon: { svg: AppIcons.ProfileSetting, style: {} },
        linkTo: "/analytics/settings/shop-info",
        isExternalLink: false,
        rightSide: { value: null, style: {} },
    },
    // {
    //     title: { label: "Support", style: {} },
    //     icon: { svg: AppIcons.ProfileSupport, style: {} },
    //     linkTo: "/analytics/",
    //     isExternalLink: false,
    //     rightSide: { value: null, style: {} },
    // },
    {
        title: { label: "Documents", style: {} },
        icon: { svg: AppIcons.ProfileDocument, style: {} },
        linkTo: "https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked",
        isExternalLink: true,
        rightSide: { value: null, style: {} },
    },
    {
        title: { label: "Log out", style: { color: "#F24" } },
        icon: { svg: AppIcons.ProfileLogout, style: { color: "#FFF" } },
        linkTo: null,
        isExternalLink: false,
        rightSide: { value: null, style: {} },
        action: logoutUser,
    },
];

export const createSubscriptionStatusConstants = (actions: { STARTER: () => void }, daysLeft?: number): Record<string, SubscriptionPlan> => ({
    STARTER: {
        icon: AppIcons.StarterPlan,
        title: "Starter",
        rightSide: {
            type: "button",
            value: "Upgrade",
            action: actions.STARTER,
            style: {
                display: "flex",
                padding: "8px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "4px",
                background: "rgba(43, 207, 161, 0.10)",
                color: "#2BCFA1",
                textAlign: "center",
                fontFamily: "Inter",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "16px",
            },
        },
    },
    BUSINESS: {
        icon: AppIcons.ProPlan,
        title: "Pro",
        rightSide: {
            type: "text",
            value: `${daysLeft} days left` || "",
            style: {
                color: "#7B7B7B",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "20px",
                textAlign: "left",
            },
        },
    },
    BUSINESS_PRO: {
        icon: AppIcons.PremiumPlan,
        title: "Premium",
        rightSide: {
            type: "text",
            value: `${daysLeft} days left` || "",
            style: {
                color: "#7B7B7B",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "20px",
                textAlign: "left",
            },
        },
    },
    ENTERPRISE: {
        icon: AppIcons.EnterprisePlan,
        title: "Enterprise",
        rightSide: {
            type: "text",
            value: `${daysLeft} days left` || "",
            style: {
                color: "#7B7B7B",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "20px",
                textAlign: "left",
            },
        },
    },
});

export const growth_hack_constants = [
    {
        title: "Create first product",
        objectField: "createFirstProduct",
        subSections: [
            {
                title: "Physical Products",
                description: "Add physical products by entering details like name, description, and price. Customers can browse and buy directly from your store.",
                link: { linkTitle: "Learn more", linkTo: "/analytics", isExternal: false },
                image: "https://upload-file-droplinked.s3.amazonaws.com/215575e99677753f8ba8277f621ac9a36eda99e621cdd60b1b69d3d8ce11da4d.png",
                buttons: {
                    left: null,
                    right: {
                        label: "Next",
                        rightIcon: AppIcons.SidebarNext,
                        styles: {},
                        onClick: (setCurrentSubSection) => setCurrentSubSection((prevSection) => prevSection + 1),
                    },
                },
            },
            {
                title: "Digital Goods",
                description: "Sell digital products like eBooks, software, or music. Upload files, set prices, and allow instant downloads after purchase.",
                link: { linkTitle: "Learn more", linkTo: "/analytics", isExternal: false },
                image: "https://upload-file-droplinked.s3.amazonaws.com/59fe00a4b64ec51e04c4c0b80927ddd9e021d6aa2b418e26ba7ee19c0aad6796.png",
                buttons: {
                    left: {
                        label: "Back",
                        styles: {},
                        onClick: (setCurrentSubSection) => setCurrentSubSection((prevSection) => prevSection - 1),
                    },
                    right: {
                        label: "Next",
                        rightIcon: AppIcons.SidebarNext,
                        styles: {},
                        onClick: (setCurrentSubSection) => setCurrentSubSection((prevSection) => prevSection + 1),
                    },
                },
            },
            {
                title: "Production-on-Demand Items",
                description: "Offer customizable products like t-shirts or mugs that are produced only when ordered, handled by your print-on-demand partner.",
                link: { linkTitle: "Learn more about it in our Help Center", linkTo: "https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked", isExternal: true },
                image: "https://upload-file-droplinked.s3.amazonaws.com/6fd973113f122e9941f93472b3487dbe21750dae58e2ad075d00880a9bf50913.png",
                buttons: {
                    left: {
                        label: "Back",
                        styles: {},
                        onClick: (setCurrentSubSection) => setCurrentSubSection((prevSection) => prevSection - 1),
                    },
                    right: {
                        label: "Create Product",
                        rightIcon: AppIcons.SidebarGo,
                        styles: {},
                        onClick: (setCurrentSubSection, onClose, navigate) => {
                            onClose();
                            navigate("/analytics/products/types");
                        },
                    },
                },
            },
        ],
    },
    {
        title: "Customize shopfront",
        objectField: "customizeShop",
        subSections: [
            {
                title: "Customize Your Storefront Template",
                description: "Stand out by customizing your store's design. Select a template, adjust colors, fonts, and layout to match your brand.",
                image: "https://upload-file-droplinked.s3.amazonaws.com/4c9b32fd20d246052ea848063380e6edbfba9bcda424d6de84a8b16427918ecc.png",
                buttons: {
                    left: null,
                    right: {
                        label: "Storefront Customization",
                        rightIcon: AppIcons.SidebarGo,
                        styles: {},
                        onClick: (setCurrentSubSection, onClose, navigate) => {
                            onClose();
                            navigate("/analytics/settings/design");
                        },
                    },
                },
            },
        ],
    },
    {
        title: "Join affiliate market",
        objectField: "joinAffiliateMarket",
        subSections: [
            {
                title: "Join the Affiliate Market",
                description: "Expand your reach by joining the affiliate market. Promote other stores' products for a commission or list your own for affiliates to sell.",
                image: "https://upload-file-droplinked.s3.amazonaws.com/da9dbffc0e3a12de5ba1505f433b25204f8de0ed0b16684922caa3b5423ef7b1.png",
                buttons: {
                    left: null,
                    right: {
                        label: "Affiliate Market",
                        rightIcon: AppIcons.SidebarGo,
                        styles: {},
                        onClick: (setCurrentSubSection, onClose, navigate) => {
                            onClose();
                            navigate("/analytics/affiliate/market");
                        },
                    },
                },
            },
        ],
    },
    {
        title: "Sell first product",
        objectField: "sellFirstProduct",
        subSections: [
            {
                title: "Receive Your First Order",
                description: "Manage your store's activity and orders. From payment to delivery, we guide you through every step to help grow your business.",
                link: { linkTitle: "Learn more about it in our Help Center", linkTo: "https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked", isExternal: true },
                image: "https://upload-file-droplinked.s3.amazonaws.com/717f254d430b3a819a0be97fd00283fb7e3a65b87ec55547c628eba427146fec.png",
                buttons: {
                    left: null,
                    right: {
                        label: "Next",
                        rightIcon: AppIcons.SidebarNext,
                        styles: {},
                        onClick: (setCurrentSubSection) => setCurrentSubSection((prevSection) => prevSection + 1),
                    },
                },
            },

            {
                title: "Product Link",
                description: "Generate a payment link for any product, simplifying the checkout process and bypassing the storefront.",
                link: { linkTitle: "Learn more about it in our Help Center", linkTo: "https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked", isExternal: true },
                image: "https://upload-file-droplinked.s3.amazonaws.com/93ddecbdb555b88368ba3bf31cb4facd30a625d87396faa5de271b6804437e4f.png",
                buttons: {
                    left: {
                        label: "Back",
                        styles: {},
                        onClick: (setCurrentSubSection) => setCurrentSubSection((prevSection) => prevSection - 1),
                    },
                    right: {
                        label: "Next",
                        rightIcon: AppIcons.SidebarNext,
                        styles: {},
                        onClick: (setCurrentSubSection) => setCurrentSubSection((prevSection) => prevSection + 1),
                    },
                },
            },
            {
                title: "Product Tile",
                description: "Create a customizable product tile for your website. Configure details and upload images to match your brand.",
                link: { linkTitle: "Learn more about it in our Help Center", linkTo: "https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked", isExternal: true },
                image: "https://upload-file-droplinked.s3.amazonaws.com/1728952a3abf0b4a17346cd309ff18d97e9db470051e3b08f955135a5a27c675.png",
                buttons: {
                    left: {
                        label: "Back",
                        styles: {},
                        onClick: (setCurrentSubSection) => setCurrentSubSection((prevSection) => prevSection - 1),
                    },
                    right: {
                        label: "Next",
                        rightIcon: AppIcons.SidebarNext,
                        styles: {},
                        onClick: (setCurrentSubSection) => setCurrentSubSection((prevSection) => prevSection + 1),
                    },
                },
            },
            {
                title: "Social Tile",
                description: "Share products on Twitter with an embeddable tile that allows customers to view details and purchase directly.",
                link: { linkTitle: "Learn more about it in our Help Center", linkTo: "https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked", isExternal: true },
                image: "https://upload-file-droplinked.s3.amazonaws.com/36399de3948b9d88ccc7a455434e69c123a0f7e5494de763507e8d6532d1a5d5.png",
                buttons: {
                    left: {
                        label: "Back",
                        styles: {},
                        onClick: (setCurrentSubSection) => setCurrentSubSection((prevSection) => prevSection - 1),
                    },
                    right: {
                        label: "Create Product",
                        rightIcon: AppIcons.SidebarGo,
                        styles: {},
                        onClick: (setCurrentSubSection, onClose, navigate) => {
                            onClose();
                            navigate("/analytics");
                        },
                    },
                },
            },
        ],
    },
];
