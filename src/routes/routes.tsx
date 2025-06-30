import React, { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import FullScreenLoading from "components/redesign/fullscreen-loading/FullScreenLoading"
import ProducerLayout from "layouts/ProducerLayout/ProducerLayout"
import PublicLayout from "layouts/PublicLayout/PublicLayout"

// public routes
import AffiliateStoresProfile from "pages/affiliate/stores/profile/AffiliateStoresProfile"
import BlogCreatePage from "pages/blogs/components/BlogCreatePage"
import BlogEditPage from "pages/blogs/components/BlogEditPage"
import Changelog from "pages/changelog/Changelog"
import ChangelogDetail from "pages/changelog/components/ChangelogDetail"
import Onboarding from "pages/onboarding/Onboarding"
import AffiliatePage from "pages/public-pages/landings/affiliate-page/AffiliatePage"
import AffiliateSassPage from "pages/public-pages/landings/affiliate-sass-page/AffiliateSassPage"
import CustomTokenPage from "pages/public-pages/landings/custom-token-page/CustomTokenPage"
import DigitalProductPage from "pages/public-pages/landings/digital-product-page/DigitalProductPage"
import DppPage from "pages/public-pages/landings/dpp-page/DppPage"
import MetaverseStorePage from "pages/public-pages/landings/metaverse-store-page/MetaverseStorePage"
import D3Page from "pages/public-pages/landings/partners-pages/pages/D3Page"
import PolygonPage from "pages/public-pages/landings/partners-pages/pages/PolygonPage"
import UdPage from "pages/public-pages/landings/partners-pages/pages/UdPage"
import PaymentLinkPage from "pages/public-pages/landings/payment-link-page/PaymentLinkPage"
import PhysicalProductPage from "pages/public-pages/landings/physical-product-page/PhysicalProductPage"
import PODProductPage from "pages/public-pages/landings/pod-product-page/PODProductPage"
import CrossmintLanding from "pages/public-pages/redesign-landings/crossmint/Crossmint"
import ProductTilePage from "pages/public-pages/landings/product-tile-page/ProductTilePage"
import ROIPage from "pages/public-pages/landings/roi-page/ROIPage"
import TokenizingProductsPage from "pages/public-pages/landings/tokenizing-products-page/TokenizingProductsPage"
import TokanpayPage from "pages/public-pages/landings/tokenpay-page/TokanpayPage"
import Rewards from "pages/public-pages/rewards/Rewards"
import AboutUs from "pages/public-pages/about/AboutUs"
import AcceptInvitation from "pages/public-pages/accept-invitation/AcceptInvitation"
import ContactUs from "pages/public-pages/contact-us/ContactUs"
import Enquiry from "pages/public-pages/enquiry-page/EnquiryPage"
import PricingPage from "pages/public-pages/pricing/PricingPage"
import PrivacyPage from "pages/public-pages/privacy-page/PrivacyPage"
import TermsPage from "pages/public-pages/terms-page/TermsPage"
import AffiliateProductsSinglePage from "pages/affiliate/product/ProductPage"
import AffiliateProductsPage from "pages/affiliate/products/AffiliateProductsPage"
import PublicBlogs from "pages/public-pages/blogs/Blogs"
import PublicBlog from "pages/public-pages/blogs/blog/Blog"
import HomePage from "pages/public-pages/redesign-landings/homePage/HomePage"

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
        errorElement: (
            <PublicLayout>
                <MaintenancePage />
            </PublicLayout>
        ),
        children: [
            { index: true, element: <HomePage /> },
            { path: "crossmint", element: <CrossmintLanding /> },
            { path: "enquiry", element: <Enquiry /> },
            { path: "terms", element: <TermsPage /> },
            { path: "about", element: <AboutUs /> },
            { path: "contact-us", element: <ContactUs /> },
            { path: "privacy", element: <PrivacyPage /> },
            { path: "physical-product", element: <PhysicalProductPage /> },
            { path: "digital-product", element: <DigitalProductPage /> },
            { path: "pod-product", element: <PODProductPage /> },
            { path: "tokenpay", element: <TokanpayPage /> },
            { path: "payment-links", element: <PaymentLinkPage /> },
            { path: "product-tiles", element: <ProductTilePage /> },
            { path: "tokenizing-products", element: <TokenizingProductsPage /> },
            { path: "affiliate-sass", element: <AffiliateSassPage /> },
            { path: "custom-tokens", element: <CustomTokenPage /> },
            { path: "metaverse-store", element: <MetaverseStorePage /> },
            { path: "onchain-affiliate", element: <AffiliatePage /> },
            { path: "d3", element: <D3Page /> },
            { path: "unstoppable-domains", element: <UdPage /> },
            { path: "polygon", element: <PolygonPage /> },
            { path: "roi", element: <ROIPage /> },
            { path: "dpp", element: <DppPage /> },
            { path: "accept-invitation/:invitationId", element: <AcceptInvitation /> },
            {
                path: "blogs",
                children: [
                    { index: true, element: <PublicBlogs /> },
                    { path: ":slug", element: <PublicBlog /> }
                ]
            },
            { path: "plans", element: <PricingPage /> },
            { path: "rewards", element: <Rewards /> },
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