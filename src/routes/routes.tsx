import MainLayout from "components/layouts/app/main/MainLayout";
import ShopManagementLayout from "components/layouts/app/shop-management/ShopManagementLayout";
import DashboardLayout from "components/layouts/dashboard/DashboardLayout";
import FullScreenLoading from "components/redesign/fullscreen-loading/FullScreenLoading";
import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lazy-loaded Components
const ResetPassPage = lazy(() => import("pages/auth-pages/reset-pass-page/ResetPassPage"));
const ThankForRegisterPage = lazy(() => import("pages/auth-pages/thank-for-regsiter-page/ThankForRegisterPage"));
const VerifyEmailPage = lazy(() => import("pages/auth-pages/verify-email-page/Email-verification-page"));
const Blogs = lazy(() => import("pages/blogs/Blogs"));
const BlogForm = lazy(() => import("pages/blogs/parts/blog-form/BlogForm"));
const Blog = lazy(() => import("pages/blogs/parts/blog/Blog"));
const Collections = lazy(() => import("pages/collections/Collections"));
const NewAnalytics = lazy(() => import("pages/analytics/Analytics"));
const NewDashboard = lazy(() => import("pages/dashboard/Dashboard"));
const Gamification = lazy(() => import("pages/gamification/Gamification"));
const InvoiceManagement = lazy(() => import("pages/invoice-management").then(module => ({ default: module.InvoiceManagement })));
const CreateInvoice = lazy(() => import("pages/invoice-management").then(module => ({ default: module.CreateInvoice })))
const MaintenancePage = lazy(() => import("pages/maintenance-page/MaintenancePage"));
const NFTs = lazy(() => import("pages/nfts/NFTs"));
const Orders = lazy(() => import("pages/orders/Orders"));
const ProductOrder = lazy(() => import("pages/product/order/ProductOrder"));
const ProductsV2 = lazy(() => import("pages/products/ProductsV2"));
const AboutUs = lazy(() => import("pages/public-pages/about/AboutUs"));
const AcceptInvitation = lazy(() => import("pages/public-pages/accept-invitation/AcceptInvitation"));
const ContactUs = lazy(() => import("pages/public-pages/contact-us/ContactUs"));
const Enquiry = lazy(() => import("pages/public-pages/enquiry-page/EnquiryPage"));
const HomePage = lazy(() => import("pages/public-pages/homePage/HomePage"));
const AffiliatePage = lazy(() => import("pages/public-pages/landings/affiliate-page/AffiliatePage"));
const AffiliateSassPage = lazy(() => import("pages/public-pages/landings/affiliate-sass-page/AffiliateSassPage"));
const CustomTokenPage = lazy(() => import("pages/public-pages/landings/custom-token-page/CustomTokenPage"));
const DigitalProductPage = lazy(() => import("pages/public-pages/landings/digital-product-page/DigitalProductPage"));
const DppPage = lazy(() => import("pages/public-pages/landings/dpp-page/DppPage"));
const MetaverseStorePage = lazy(() => import("pages/public-pages/landings/metaverse-store-page/MetaverseStorePage"));
const D3Page = lazy(() => import("pages/public-pages/landings/partners-pages/pages/D3Page"));
const UdPage = lazy(() => import("pages/public-pages/landings/partners-pages/pages/UdPage"));
const PolygonPage = lazy(() => import("pages/public-pages/landings/partners-pages/pages/PolygonPage"));
const PaymentLinkPage = lazy(() => import("pages/public-pages/landings/payment-link-page/PaymentLinkPage"));
const PhysicalProductPage = lazy(() => import("pages/public-pages/landings/physical-product-page/PhysicalProductPage"));
const PODProductPage = lazy(() => import("pages/public-pages/landings/pod-product-page/PODProductPage"));
const ProductTilePage = lazy(() => import("pages/public-pages/landings/product-tile-page/ProductTilePage"));
const ROIPage = lazy(() => import("pages/public-pages/landings/roi-page/ROIPage"));
const TokenizingProductsPage = lazy(() => import("pages/public-pages/landings/tokenizing-products-page/TokenizingProductsPage"));
const TokanpayPage = lazy(() => import("pages/public-pages/landings/tokenpay-page/TokanpayPage"));
const PricingPage = lazy(() => import("pages/public-pages/pricing/PricingPage"));
const PrivacyPage = lazy(() => import("pages/public-pages/privacy-page/PrivacyPage"));
const Rewards = lazy(() => import("pages/public-pages/rewards/rewards"));
const ShopPage = lazy(() => import("pages/public-pages/shop-page/ShopPage"));
const TermsPage = lazy(() => import("pages/public-pages/terms-page/TermsPage"));
const AffiliateMarket = lazy(() => import("pages/affiliate/market/AffiliateMarket"));
const AffiliateProductsSinglePage = lazy(() => import("pages/affiliate/product/ProductPage"));
const AffiliateProductsLayout = lazy(() => import("pages/affiliate/products/AffiliateProductsPage"));
const AffiliateStores = lazy(() => import("pages/affiliate/stores/AffiliateStores"));
const AffiliateStoresProfile = lazy(() => import("pages/affiliate/stores/profile/AffiliateStoresProfile"));
const RegisterPagesWrapper = lazy(() => import("pages/register-pages/RegisterPageWrapper"));
const Admins = lazy(() => import("pages/register-pages/pages/admins/Admins"));
const PaymentLink = lazy(() => import("pages/register-pages/pages/payment-link/PaymentLink"));
const RegisterShopInfo = lazy(() => import("pages/register-pages/pages/shop-info/ShopInfo"));
const SimpleRegistration = lazy(() => import("pages/register-pages/pages/simple-registration/SimpleRegistration"));
const TileDesign = lazy(() => import("pages/register-pages/pages/tile-design/TileDesign"));
const SettingsPage = lazy(() => import("pages/settings/SettingsPage"));
const ShopManagement = lazy(() => import("pages/shop-management/ShopManagement"));
const SubscriptionPlans = lazy(() => import("pages/subscription-plans/SubscriptionPlans"));
const NotFoundPage = lazy(() => import("pages/404/NotFoundPage"));
const CouponsSetting = lazy(() => import("pages/register-pages/pages/coupons/CouponsSetting"));
const DesignPage = lazy(() => import("pages/register-pages/pages/design/DesignPage"));
const TechnicalPage = lazy(() => import("pages/register-pages/pages/technical"));
const PublicBlogs = lazy(() => import("pages/public-pages/blogs/Blogs"));
const PublicBlog = lazy(() => import("pages/public-pages/blogs/blog/Blog"));
const CreditsAndActivity = lazy(() => import("pages/credits-and-activity/CreditsAndActivity"));
const OnchainRecords = lazy(() => import("pages/onchain-records/OnchainRecords"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: (
            <MainLayout>
                <MaintenancePage />
            </MainLayout>
        ),
        children: [
            { index: true, element: <HomePage /> },
            { path: "signup", element: <HomePage showAuthModal={true} /> },
            { path: "enquiry", element: <Enquiry /> },
            { path: "terms", element: <TermsPage /> },
            { path: "about", element: <AboutUs /> },
            { path: "contact-us", element: <ContactUs /> },
            { path: "privacy", element: <PrivacyPage /> },
            { path: "email-confirmation", element: <ThankForRegisterPage /> },
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
            { path: "/d3", element: <D3Page /> },
            { path: "/unstoppable-domains", element: <UdPage /> },
            { path: "/polygon", element: <PolygonPage /> },
            { path: "accept-invitation/:invitationId", element: <AcceptInvitation /> },
            { path: "roi", element: <ROIPage /> },
            { path: "dpp", element: <DppPage /> },
            {
                path: "blogs",
                children: [
                    { index: true, element: <PublicBlogs /> },
                    { path: ":slug", element: <PublicBlog /> },
                ],
            },
            { path: "email-verification/:token", element: <VerifyEmailPage /> },
            { path: "producer/account-recovery/:token", element: <ResetPassPage /> },
            { path: "plans", element: <PricingPage /> },
            { path: "rewards", element: <Rewards /> },
        ],
    },
    {
        path: "analytics",
        element: <DashboardLayout />,
        errorElement: (
            <DashboardLayout>
                <MaintenancePage />
            </DashboardLayout>
        ),
        children: [
            { index: true, element: <NewAnalytics /> },
            { path: "dashboard", element: <NewDashboard /> },
            { path: "registration", element: <SimpleRegistration /> },
            {
                path: "settings",
                element: <RegisterPagesWrapper />,
                children: [
                    { path: "shop-info", element: <RegisterShopInfo /> },
                    { path: "design", element: <DesignPage /> },
                    { path: "tile", element: <TileDesign /> },
                    { path: "technical", element: <TechnicalPage /> },
                    { path: "coupons", element: <CouponsSetting /> },
                    { path: "admins", element: <Admins /> },
                    { path: "payment-link-design", element: <PaymentLink /> },
                ],
            },
            { path: "account-settings", element: <SettingsPage /> },
            { path: "credits-and-activity", element: <CreditsAndActivity /> },
            { path: "onchain-records", element: <OnchainRecords /> },
            {
                path: "products",
                children: [
                    { index: true, element: <ProductsV2 /> },
                    { path: "order/:productID", element: <ProductOrder /> },
                ],
            },
            { path: "collections", element: <Collections /> },
            { path: "orders", element: <Orders /> },
            {
                path: "affiliate",
                children: [
                    { path: "market", element: <AffiliateMarket /> },
                    {
                        path: "products",
                        children: [
                            { index: true, element: <AffiliateProductsLayout /> },
                            { path: ":slug", element: <AffiliateProductsSinglePage /> },
                        ],
                    },
                    {
                        path: "stores",
                        children: [
                            { index: true, element: <AffiliateStores /> },
                            {
                                path: ":shopId",
                                children: [
                                    { index: true, element: <AffiliateStoresProfile /> },
                                    { path: ":slug", element: <AffiliateProductsSinglePage /> },
                                ],
                            },
                        ],
                    },
                ],
            },
            { path: "nfts", element: <NFTs /> },
            {
                path: "blogs",
                children: [
                    { index: true, element: <Blogs /> },
                    { path: "create", element: <BlogForm /> },
                    { path: ":slug", element: <Blog /> },
                ],
            },
            { path: "plans", element: <SubscriptionPlans /> },
            { path: "gamification", element: <Gamification /> },
            { path: "invoice-management", element: <InvoiceManagement /> },
            { path: "invoice-management/create", element: <CreateInvoice /> },
            { path: "invoice-management/edit/:invoiceId", element: <CreateInvoice /> },
        ],
    },
    {
        path: "shop-management",
        element: <ShopManagementLayout />,
        errorElement: <MaintenancePage />,
        children: [
            { index: true, element: <ShopManagement /> },
        ],
    },
    { path: ":shopname", element: <ShopPage /> },
    { path: "*", element: <NotFoundPage /> },
]);

function AppRoutes() {
    return (
        <Suspense fallback={<FullScreenLoading />}>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default AppRoutes;