import { BoxProps } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import { IAppTypography } from "components/common/typography/AppTypography";
import { SHOP_URL } from "lib/utils/app/variable";

type SidebarItem = { title: string; icon: any; linkTo: string | null; list: Array<{ listTitle: string; linkTo: string }> };
type SidebarGroup = { group: string; items: SidebarItem[] };
type ProfileItem = { title: { label: string; style: Partial<IAppTypography> }; icon: { svg: any; style: Partial<IAppTypography> }; linkTo: string | null; isExternalLink: boolean; rightSide: { value: string | null; style: Partial<IAppTypography> }; action?: () => void };
type SubscriptionPlan = { icon: any; title: string; rightSide: { type: "text"; style: IAppTypography; value: string } | { type: "button"; style: BoxProps; value: string; action: () => void } };

export const sidebar_constants: SidebarGroup[] = [
    {
        group: "Dashboard",
        items: [
            { title: "Analytics", icon: AppIcons.SidebarAnalytics, linkTo: "/dashboard", list: [] },
            {
                title: "Orders",
                icon: AppIcons.SidebarNote,
                linkTo: null,
                list: [{ listTitle: "Orders", linkTo: "/dashboard/orders" }, { listTitle: "Invoices", linkTo: "/dashboard/invoice-management" }],
            },
            {
                title: "Affiliate",
                icon: AppIcons.SidebarAffiliate,
                linkTo: null,
                list: [{ listTitle: "Market", linkTo: "/dashboard/" }, { listTitle: "Stores", linkTo: "/dashboard/affiliate/stores" }, { listTitle: "Products", linkTo: "/dashboard/affiliate" }],
            },
        ],
    },
    {
        group: "Shopfront",
        items: [
            {
                title: "Products",
                icon: AppIcons.SidebarProducts,
                linkTo: null,
                list: [{ listTitle: "Inventory", linkTo: "/dashboard/products" }, { listTitle: "Records (NFTs)", linkTo: "/dashboard/nfts" }, { listTitle: "Product Tile", linkTo: "/dashboard/settings/tile" }, { listTitle: "Product Link", linkTo: "/dashboard/settings/payment-link-design" }, { listTitle: "Collections", linkTo: "/dashboard/collections" }],
            },
            { title: "Blog", linkTo: "/dashboard/blogs", icon: AppIcons.SidebarBlog, list: [] },
        ],
    },
    {
        group: "More",
        items: [
            {
                title: "Account Management",
                icon: AppIcons.SidebarSetting,
                linkTo: null,
                list: [{ listTitle: "Account Information", linkTo: "/dashboard/settings/shop-info" }, { listTitle: "Storefront Designer", linkTo: "/dashboard/settings/design" }, { listTitle: "Wallet and Payments", linkTo: "/dashboard/settings/technical" }, { listTitle: "Coupons", linkTo: "/dashboard/settings/coupons" }, { listTitle: "Admin Management", linkTo: "/dashboard/settings/admins" }],
            },
            { title: "Pricing Plans", icon: AppIcons.SidebarPlan, linkTo: "/dashboard/plans", list: [] },
            { title: "Rewards", icon: AppIcons.SidebarRewards, linkTo: "/dashboard/gamification", list: [] },
            // { title: "Chat with Support", icon: AppIcons.SidebarChat, linkTo: "/dashboard/", list: [] },
        ],
    },
];

export const createProfileConstants = (shop: { credit: number; name: string }, logoutUser: () => void): ProfileItem[] => [
    {
        title: { label: "Credit", style: {} },
        icon: { svg: AppIcons.ProfileCredit, style: {} },
        linkTo: null,
        isExternalLink: false,
        rightSide: {
            value: `$${shop.credit.toFixed(2)} USD`,
            style: { color: "#2BCFA1", fontFamily: "Inter", fontSize: "14px", fontWeight: "500", lineHeight: "20px" },
        },
    },
    {
        title: { label: "View shop", style: {} },
        icon: { svg: AppIcons.ProfileShop, style: {} },
        linkTo: `${SHOP_URL}/${shop.name}`,
        isExternalLink: true,
        rightSide: { value: null, style: {} },
    },
    {
        title: { label: "Settings", style: {} },
        icon: { svg: AppIcons.ProfileSetting, style: {} },
        linkTo: "/dashboard/settings/shop-info",
        isExternalLink: false,
        rightSide: { value: null, style: {} },
    },
    // {
    //     title: { label: "Support", style: {} },
    //     icon: { svg: AppIcons.ProfileSupport, style: {} },
    //     linkTo: "/dashboard/",
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
            style: { color: "#7B7B7B", fontFamily: "Inter", fontSize: "14px", fontWeight: "500", lineHeight: "20px", textAlign: "left" },
        },
    },
    BUSINESS_PRO: {
        icon: AppIcons.PremiumPlan,
        title: "Premium",
        rightSide: {
            type: "text",
            value: `${daysLeft} days left` || "",
            style: { color: "#7B7B7B", fontFamily: "Inter", fontSize: "14px", fontWeight: "500", lineHeight: "20px", textAlign: "left" },
        },
    },
    ENTERPRISE: {
        icon: AppIcons.EnterprisePlan,
        title: "Enterprise",
        rightSide: {
            type: "text",
            value: `${daysLeft} days left` || "",
            style: { color: "#7B7B7B", fontFamily: "Inter", fontSize: "14px", fontWeight: "500", lineHeight: "20px", textAlign: "left" },
        },
    },
});
