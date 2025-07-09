import FullScreenLoading from "components/redesign/fullscreen-loading/FullScreenLoading"
import ProducerLayout from "layouts/ProducerLayout/ProducerLayout"
import PublicLayout from "layouts/PublicLayout/PublicLayout"
import React, { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// public routes
import AffiliateProductsSinglePage from "pages/affiliate/product/ProductPage"
import AffiliateProductsPage from "pages/affiliate/products/AffiliateProductsPage"
import AffiliateStoresProfile from "pages/affiliate/stores/profile/AffiliateStoresProfile"
import BlogCreatePage from "pages/blogs/components/BlogCreatePage"
import BlogEditPage from "pages/blogs/components/BlogEditPage"
import Changelog from "pages/changelog/Changelog"
import ChangelogDetail from "pages/changelog/components/ChangelogDetail"
import Onboarding from "pages/onboarding/Onboarding"
import AboutUs from "pages/public-pages/about/AboutUs"
import AcceptInvitation from "pages/public-pages/accept-invitation/AcceptInvitation"
import PublicBlog from "pages/public-pages/blogs/blog/Blog"
import PublicBlogs from "pages/public-pages/blogs/Blogs"
import ContactUs from "pages/public-pages/contact-us/ContactUs"
import Enquiry from "pages/public-pages/enquiry-page/EnquiryPage"
import CustomTokenPage from "pages/public-pages/redesign-landings/custom-tokens/CustomTokensPage"
import MetaverseStorePage from "pages/public-pages/redesign-landings/metaverse-showroom/MetaverseShowroomPage"
import TokenpayPage from "pages/public-pages/redesign-landings/tokenpay/TokenpayPage"
import PricingPage from "pages/public-pages/pricing/PricingPage"
import PrivacyPage from "pages/public-pages/privacy-page/PrivacyPage"
import DigitalGoodsPage from "pages/public-pages/redesign-landings/digital-goods/DigitalGoodsPage"
import DPPLanding from "pages/public-pages/redesign-landings/dpp-landing/DPPLanding"
import HomePage from "pages/public-pages/redesign-landings/home/HomePage"
import OnchainAffiliatePage from "pages/public-pages/redesign-landings/onchain-affiliate/OnchainAffiliatePage"
import OnchainSubscriptions from "pages/public-pages/redesign-landings/onchain-subscriptions/OnchainSubscriptions"
import PaymentLinksPage from "pages/public-pages/redesign-landings/payment-links/PaymentLinksPage"
import PhysicalInventoryPage from "pages/public-pages/redesign-landings/physical-inventory/PhysicalInventoryPage"
import ProductTilesPage from "pages/public-pages/redesign-landings/product-tiles/ProductTilesPage"
import ProductsOnDemandPage from "pages/public-pages/redesign-landings/products-on-demand/ProductsOnDemandPage"
import TokenizingProducts from "pages/public-pages/redesign-landings/tokenizing-products/TokenizingProducts"
import TermsPage from "pages/public-pages/terms-page/TermsPage"
import SocialQuests from "pages/public-pages/redesign-landings/social-quests/SocialQuests"
import PartnerPage from "pages/public-pages/redesign-landings/partnerLandings/PartnerPage"
import DIMST from "pages/public-pages/redesign-landings/DIMST/DIMST"

// Lazy-loaded components for other routes
const StorefrontDesigner = lazy(() => import("pages/storefront-designer/StorefrontDesigner"))
const Dashboard = lazy(() => import("pages/dashboard/Dashboard"))
const Blogs = lazy(() => import("pages/blogs/Blogs"))
const Collections = lazy(() => import("pages/collections/Collections"))
const Analytics = lazy(() => import("pages/analytics/Analytics"))
const Gamification = lazy(() => import("pages/gamification/Gamification"))
const InvoiceManagement = lazy(() => import("pages/invoice-management").then(module => ({ default: module.InvoiceManagement })))
const CreateInvoice = lazy(() => import("pages/invoice-management").then(module => ({ default: module.CreateInvoice })))
const MaintenancePage = lazy(() => import("pages/maintenance-page/MaintenancePage"))
const ProductOrder = lazy(() => import("pages/order-sample-pod/ProductOrder"))
const ProductsV2 = lazy(() => import("pages/products/ProductsV2"))
const AffiliateStores = lazy(() => import("pages/affiliate/stores/AffiliateStores"))
const PaymentLink = lazy(() => import("pages/payment-link/PaymentLink"))
const SimpleRegistration = lazy(() => import("pages/simple-registration/SimpleRegistration"))
const TileDesign = lazy(() => import("pages/tile-design/TileDesign"))
const SettingsPage = lazy(() => import("pages/settings/SettingsPage"))
const ShopManagement = lazy(() => import("pages/shop-management/ShopManagement"))
const SubscriptionPlans = lazy(() => import("pages/subscription-plans/SubscriptionPlans"))
const NotFoundPage = lazy(() => import("pages/404/NotFoundPage"))
const CreditsAndActivity = lazy(() => import("pages/credits-and-activity/CreditsAndActivity"))
const InvoiceTemplate = lazy(() => import("pages/invoice-template/InvoiceTemplate"))
const OnchainRecords = lazy(() => import("pages/onchain-records/OnchainRecords"))
const PurchaseHistory = lazy(() => import("pages/purchase-history/PurchaseHistory"))
const Crossmint = lazy(() => import("pages/crossmint/Crossmint"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        errorElement: <MaintenancePage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "enquiry", element: <Enquiry /> },
            { path: "terms", element: <TermsPage /> },
            { path: "about", element: <AboutUs /> },
            { path: "contact-us", element: <ContactUs /> },
            { path: "privacy", element: <PrivacyPage /> },
            { path: "physical-inventory", element: <PhysicalInventoryPage /> },
            { path: "digital-goods", element: <DigitalGoodsPage /> },
            { path: "products-on-demand", element: <ProductsOnDemandPage /> },
            { path: "tokenpay", element: <TokenpayPage /> },
            { path: "payment-links", element: <PaymentLinksPage /> },
            { path: "product-tiles", element: <ProductTilesPage /> },
            { path: "tokenizing-products", element: <TokenizingProducts /> },
            { path: "onchain-subscriptions", element: <OnchainSubscriptions /> },
            { path: "custom-tokens", element: <CustomTokenPage /> },
            { path: "metaverse-store", element: <MetaverseStorePage /> },
            // Partner routes using dynamic component 
            { path: "d3", element: <PartnerPage partnerId="d3" /> },
            { path: "unstoppable-domains", element: <PartnerPage partnerId="unstoppableDomains" /> },
            { path: "polygon", element: <PartnerPage partnerId="polygon" /> },
            { path: "crossmint", element: <PartnerPage partnerId="crossmint" /> },
            { path: "onchain-affiliate", element: <OnchainAffiliatePage /> },
            { path: "roi", element: <DIMST /> },
            { path: "dpp", element: <DPPLanding /> },
            { path: "accept-invitation/:invitationId", element: <AcceptInvitation /> },
            {
                path: "blogs",
                children: [
                    { index: true, element: <PublicBlogs /> },
                    { path: ":slug", element: <PublicBlog /> }
                ]
            },
            { path: "plans", element: <PricingPage /> },
            { path: "rewards", element: <SocialQuests /> },
            {
                path: "affiliate/products",
                children: [
                    { index: true, element: <AffiliateProductsPage isPublic={true} /> },
                    { path: ":slug", element: <AffiliateProductsSinglePage isPublic={true} /> },
                ]
            }
        ]
    },
    {
        path: "analytics",
        element: <ProducerLayout />,
        errorElement: (
            <ProducerLayout>
                <MaintenancePage />
            </ProducerLayout>
        ),
        children: [
            { index: true, element: <Analytics /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "registration", element: <SimpleRegistration /> },
            {
                path: "style-center",
                children: [
                    { path: "product-tiles", element: <TileDesign /> },
                    { path: "product-links", element: <PaymentLink /> }
                ]
            },
            { path: "account-settings", element: <SettingsPage /> },
            { path: "credits-and-activity", element: <CreditsAndActivity /> },
            { path: "onchain-records", element: <OnchainRecords /> },
            {
                path: "products",
                children: [
                    { index: true, element: <ProductsV2 /> },
                    { path: "order/:productID", element: <ProductOrder /> }
                ]
            },
            { path: "collections", element: <Collections /> },
            { path: "purchase-history", element: <PurchaseHistory /> },
            {
                path: "affiliate",
                children: [
                    {
                        path: "products",
                        children: [
                            { index: true, element: <AffiliateProductsPage /> },
                            { path: ":slug", element: <AffiliateProductsSinglePage /> }
                        ]
                    },
                    {
                        path: "stores",
                        children: [
                            { index: true, element: <AffiliateStores /> },
                            {
                                path: ":shopId",
                                children: [
                                    { index: true, element: <AffiliateStoresProfile /> },
                                    { path: ":slug", element: <AffiliateProductsSinglePage /> }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                path: "blogs",
                children: [
                    { index: true, element: <Blogs /> },
                    { path: "new", element: <BlogCreatePage /> },
                    { path: ":id", element: <BlogEditPage /> }
                ]
            },
            { path: "plans", element: <SubscriptionPlans /> },
            { path: "gamification", element: <Gamification /> },
            { path: "invoice-management", element: <InvoiceManagement /> },
            { path: "invoice-management/create", element: <CreateInvoice /> },
            { path: "invoice-management/edit/:invoiceId", element: <CreateInvoice /> },
            {
                path: "changelog",
                children: [
                    { index: true, element: <Changelog /> },
                    { path: ":id", element: <ChangelogDetail /> }
                ]
            },
            { path: "crossmint", element: <Crossmint /> }
        ]
    },
    {
        path: "shop-management",
        element: <ProducerLayout hideSidebar={true} showBackground={true} />,
        errorElement: <MaintenancePage />,
        children: [
            { index: true, element: <ShopManagement /> }
        ]
    },
    {
        path: 'style-center/storefront-designer',
        element: <ProducerLayout hideSidebar={true} />,
        errorElement: <MaintenancePage />,
        children: [
            { index: true, element: <StorefrontDesigner /> }
        ]
    },
    { path: "onboarding", element: <Onboarding /> },
    { path: "invoice/:txId", element: <InvoiceTemplate /> },
    { path: "*", element: <NotFoundPage /> }
])

function AppRoutes() {
    return (
        <Suspense fallback={<FullScreenLoading />}>
            <RouterProvider router={router} />
        </Suspense>
    )
}

export default AppRoutes