import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
} from "@react-router/dev/routes";

export default [
    // Public Routes with PublicLayout
    layout("./layouts/PublicLayout/PublicLayout.tsx", [
        route("/", "./pages/public-pages/landings/home/HomePage.tsx"),
        route("enquiry", "./pages/public-pages/enquiry-page/EnquiryPage.jsx"),
        route("terms", "./pages/public-pages/terms-page/TermsPage.jsx"),
        route("about", "./pages/public-pages/about/AboutUs.tsx"),
        route("contact-us", "./pages/public-pages/contact-us/ContactUs.tsx"),
        route("privacy", "./pages/public-pages/privacy-page/PrivacyPage.jsx"),
        route("physical-inventory", "./pages/public-pages/landings/physical-inventory/PhysicalInventoryPage.tsx"),
        route("digital-goods", "./pages/public-pages/landings/digital-goods/DigitalGoodsPage.tsx"),
        route("products-on-demand", "./pages/public-pages/landings/products-on-demand/ProductsOnDemandPage.tsx"),
        route("tokenpay", "./pages/public-pages/landings/tokenpay/TokenpayPage.tsx"),
        route("payment-links", "./pages/public-pages/landings/payment-links/PaymentLinksPage.tsx"),
        route("product-tiles", "./pages/public-pages/landings/product-tiles/ProductTilesPage.tsx"),
        route("tokenizing-products", "./pages/public-pages/landings/tokenizing-products/TokenizingProductsPage.tsx"),
        route("onchain-subscriptions", "./pages/public-pages/landings/onchain-subscriptions/OnchainSubscriptionsPage.tsx"),
        route("custom-tokens", "./pages/public-pages/landings/custom-tokens/CustomTokensPage.tsx"),
        route("metaverse-store", "./pages/public-pages/landings/metaverse-showroom/MetaverseShowroomPage.tsx"),
        route("book-demo", "./pages/public-pages/landings/book-demo/BookDemoPage.tsx"),
        route("d3", "./pages/public-pages/landings/partner-pages/PartnerPageD3.tsx"),
        route("unstoppable-domains", "./pages/public-pages/landings/partner-pages/PartnerPageUnstoppableDomains.tsx"),
        route("polygon", "./pages/public-pages/landings/partner-pages/PartnerPagePolygon.tsx"),
        route("crossmint", "./pages/public-pages/landings/partner-pages/PartnerPageCrossmint.tsx"),
        route("base", "./pages/public-pages/landings/partner-pages/PartnerPageBase.tsx"),
        route("onchain-affiliate", "./pages/public-pages/landings/onchain-affiliate/OnchainAffiliatePage.tsx"),
        route("roi", "./pages/public-pages/landings/DIMST/DIMST.tsx"),
        route("dpp", "./pages/public-pages/landings/dpp/DPPPage.tsx"),
        route("accept-invitation/:invitationId", "./pages/public-pages/accept-invitation/AcceptInvitation.tsx"),
        route("plans", "./pages/public-pages/pricing/PricingPage.tsx"),
        route("rewards", "./pages/public-pages/landings/social-quests/SocialQuests.tsx"),
        route("explore", "./pages/explore/ExplorePage.tsx"),

        // Public blogs routes
        ...prefix("blogs", [
            index("./pages/public-pages/public-blogs/PublicBlogs.tsx"),
            route("categories/:category", "./pages/public-pages/public-blogs/pages/CategoryPage/CategoryPage.tsx"),
            route(":slug", "./pages/public-pages/public-blogs/pages/BlogDetailsPage/BlogDetailsPage.tsx"),
        ]),

        // Public affiliate routes
        ...prefix("affiliate/products", [
            index("./pages/affiliate/products/AffiliateProductsPagePublic.tsx"),
            route(":slug", "./pages/affiliate/product/ProductPagePublic.tsx", { id: "affiliate-public" }),
        ]),
    ]),

    // Protected Analytics Routes with AuthGuard and ProducerLayout
    layout("./layouts/AuthGuardProducerLayout.tsx", [
        ...prefix("analytics", [
            index("./pages/analytics/Analytics.tsx"),
            route("dashboard", "./pages/dashboard/Dashboard.tsx"),
            route("registration", "./pages/simple-registration/SimpleRegistration.tsx"),
            route("style-center/product-tiles", "./pages/tile-design/TileDesign.tsx"),
            route("style-center/product-links", "./pages/payment-link/PaymentLink.tsx"),
            route("account-settings", "./pages/settings/SettingsPage.tsx"),
            route("credits-and-activity", "./pages/credits-and-activity/CreditsAndActivity.tsx"),
            route("onchain-records", "./pages/onchain-records/OnchainRecords.tsx"),
            route("products", "./pages/products/Products.tsx"),
            route("collections", "./pages/collections/Collections.tsx"),
            route("purchase-history", "./pages/purchase-history/PurchaseHistory.tsx"),
            route("shipping-management", "./pages/shipping-management/ShippingManagement.tsx"),
            route("plans", "./pages/subscription-plans/SubscriptionPlans.tsx"),
            route("gamification", "./pages/gamification/Gamification.tsx"),
            route("crossmint", "./pages/crossmint/Crossmint.tsx"),

            // Analytics affiliate routes
            ...prefix("affiliate/products", [
                index("./pages/affiliate/products/AffiliateProductsPage.tsx"),
                route(":slug", "./pages/affiliate/product/ProductPage.tsx", { id: "affiliate-private" }),
            ]),

            // Analytics affiliate stores routes
            ...prefix("affiliate/stores", [
                index("./pages/affiliate/stores/AffiliateStores.tsx"),
                route(":shopId", "./pages/affiliate/stores/profile/AffiliateStoresProfile.tsx"),
                route(":shopId/:slug", "./pages/affiliate/product/ProductPage.tsx", { id: "affiliate-private-stores" }),
            ]),

            // Analytics blogs routes
            ...prefix("blogs", [
                index("./pages/blogs/Blogs.tsx"),
                route("new", "./pages/blogs/components/BlogCreatePage.tsx"),
                route(":id", "./pages/blogs/components/BlogEditPage.tsx"),
            ]),

            // Analytics changelog routes
            ...prefix("changelog", [
                index("./pages/changelog/Changelog.tsx"),
                route(":id", "./pages/changelog/components/ChangelogDetail.tsx"),
            ]),
        ]),
    ]),

    // Shop Management Route with custom layout
    layout("./layouts/AuthGuardProducerLayoutShop.tsx", [
        route("shop-management", "./pages/shop-management/ShopManagement.tsx"),
    ]),

    route("/analytics/style-center/template-builder", "./pages/template-designer/components/TemplateCreatePage.client.tsx"),


    // Standalone Routes
    route("onboarding", "./pages/onboarding/Onboarding.tsx"),
    route("invoice/:txId", "./pages/invoice-template/InvoiceTemplate.tsx"),

    // Catch-all route for 404
    route("*", "./pages/404/NotFoundPage.tsx"),
    route("sitemap.xml", "./sitemap.xml.ts"),
] satisfies RouteConfig;
