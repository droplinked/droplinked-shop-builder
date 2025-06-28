import React, { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import FullScreenLoading from "components/redesign/fullscreen-loading/FullScreenLoading"
import ProducerLayout from "layouts/ProducerLayout/ProducerLayout"
import PublicLayout from "layouts/PublicLayout/PublicLayout"

// Lazy-loaded components from the selection
const AffiliateStoresProfile = lazy(() => import("pages/affiliate/stores/profile/AffiliateStoresProfile"))
const BlogCreatePage = lazy(() => import("pages/blogs/components/BlogCreatePage"))
const BlogEditPage = lazy(() => import("pages/blogs/components/BlogEditPage"))
const Changelog = lazy(() => import("pages/changelog/Changelog"))
const ChangelogDetail = lazy(() => import("pages/changelog/components/ChangelogDetail"))
const Onboarding = lazy(() => import("pages/onboarding/Onboarding"))
const AffiliatePage = lazy(() => import("pages/public-pages/landings/affiliate-page/AffiliatePage"))
const AffiliateSassPage = lazy(() => import("pages/public-pages/landings/affiliate-sass-page/AffiliateSassPage"))
const CustomTokenPage = lazy(() => import("pages/public-pages/landings/custom-token-page/CustomTokenPage"))
const DigitalProductPage = lazy(() => import("pages/public-pages/landings/digital-product-page/DigitalProductPage"))
const DppPage = lazy(() => import("pages/public-pages/landings/dpp-page/DppPage"))
const MetaverseStorePage = lazy(() => import("pages/public-pages/landings/metaverse-store-page/MetaverseStorePage"))
const D3Page = lazy(() => import("pages/public-pages/landings/partners-pages/pages/D3Page"))
const PolygonPage = lazy(() => import("pages/public-pages/landings/partners-pages/pages/PolygonPage"))
const UdPage = lazy(() => import("pages/public-pages/landings/partners-pages/pages/UdPage"))
const PaymentLinkPage = lazy(() => import("pages/public-pages/landings/payment-link-page/PaymentLinkPage"))
const PhysicalProductPage = lazy(() => import("pages/public-pages/landings/physical-product-page/PhysicalProductPage"))
const PODProductPage = lazy(() => import("pages/public-pages/landings/pod-product-page/PODProductPage"))
const CrossmintLanding = lazy(() => import("pages/public-pages/redesign-landings/crossmint/Crossmint"))
const ProductTilePage = lazy(() => import("pages/public-pages/landings/product-tile-page/ProductTilePage"))
const ROIPage = lazy(() => import("pages/public-pages/landings/roi-page/ROIPage"))
const TokenizingProductsPage = lazy(() => import("pages/public-pages/landings/tokenizing-products-page/TokenizingProductsPage"))
const TokanpayPage = lazy(() => import("pages/public-pages/landings/tokenpay-page/TokanpayPage"))
const Rewards = lazy(() => import("pages/public-pages/rewards/Rewards"))
const StorefrontDesigner = lazy(() => import("pages/storefront-designer/StorefrontDesigner"))


// Lazy-loaded Components
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
const AboutUs = lazy(() => import("pages/public-pages/about/AboutUs"))
const AcceptInvitation = lazy(() => import("pages/public-pages/accept-invitation/AcceptInvitation"))
const ContactUs = lazy(() => import("pages/public-pages/contact-us/ContactUs"))
const Enquiry = lazy(() => import("pages/public-pages/enquiry-page/EnquiryPage"))
const HomePage = lazy(() => import("pages/public-pages/homePage/HomePage"))
const PricingPage = lazy(() => import("pages/public-pages/pricing/PricingPage"))
const PrivacyPage = lazy(() => import("pages/public-pages/privacy-page/PrivacyPage"))
const TermsPage = lazy(() => import("pages/public-pages/terms-page/TermsPage"))
const AffiliateProductsSinglePage = lazy(() => import("pages/affiliate/product/ProductPage"))
const AffiliateProductsPage = lazy(() => import("pages/affiliate/products/AffiliateProductsPage"))
const AffiliateStores = lazy(() => import("pages/affiliate/stores/AffiliateStores"))
const PaymentLink = lazy(() => import("pages/payment-link/PaymentLink"))
const SimpleRegistration = lazy(() => import("pages/simple-registration/SimpleRegistration"))
const TileDesign = lazy(() => import("pages/tile-design/TileDesign"))
const SettingsPage = lazy(() => import("pages/settings/SettingsPage"))
const ShopManagement = lazy(() => import("pages/shop-management/ShopManagement"))
const SubscriptionPlans = lazy(() => import("pages/subscription-plans/SubscriptionPlans"))
const NotFoundPage = lazy(() => import("pages/404/NotFoundPage"))
const PublicBlogs = lazy(() => import("pages/public-pages/blogs/Blogs"))
const PublicBlog = lazy(() => import("pages/public-pages/blogs/blog/Blog"))
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