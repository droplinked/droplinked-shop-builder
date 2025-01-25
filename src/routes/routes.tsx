import MainLayout from "components/layouts/app/main/mainLayout";
import ShopManagementLayout from "components/layouts/app/shop-management/ShopManagementLayout";
import DashboardLayout from "components/layouts/dashboard/DashboardLayout";
import FullScreenLoading from "components/redesign/fullscreen-loading/FullScreenLoading";
import NotFound from "pages/404/404";
import ResetPassPage from "pages/auth-pages/reset-pass-page/ResetPassPage";
import ThankForRegisterPage from "pages/auth-pages/thank-for-regsiter-page/ThankForRegisterPage";
import VerifyEmailPage from "pages/auth-pages/verify-email-page/Email-verification-page";
import Blogs from "pages/blogs/Blogs";
import BlogForm from "pages/blogs/parts/blog-form/BlogForm";
import Blog from "pages/blogs/parts/blog/Blog";
import Collections from "pages/collections/Collections";
import DashboardPage from "pages/dashboard/DashboardPage";
import Gamification from "pages/gamification/Gamification";
import { CreateInvoice, InvoiceManagement } from "pages/invoice-management";
import Maintenance from "pages/maintenance/Maintenance";
import NFTs from "pages/nfts/NFTs";
import Orders from "pages/orders/Orders";
import ProductOrder from "pages/product/order/ProductOrder";
import ProductsV2 from "pages/products/ProductsV2";
import AboutUs from "pages/public-pages/about/AboutUs";
import AcceptInvitation from "pages/public-pages/accept-invitation/AcceptInvitation";
import ContactUs from "pages/public-pages/contact-us/ContactUs";
import Enquiry from "pages/public-pages/enquiry-page/EnquiryPage";
import HomePage from "pages/public-pages/homePage/HomePage";
import AffiliatePage from "pages/public-pages/landings/affiliate-page/AffiliatePage";
import AffiliateSassPage from "pages/public-pages/landings/affiliate-sass-page/AffiliateSassPage";
import CustomTokenPage from "pages/public-pages/landings/custom-token-page/CustomTokenPage";
import DigitalProductPage from "pages/public-pages/landings/digital-product-page/DigitalProductPage";
import DppPage from "pages/public-pages/landings/dpp-page/DppPage";
import MetaverseStorePage from "pages/public-pages/landings/metaverse-store-page/MetaverseStorePage";
import D3Page from "pages/public-pages/landings/partners-pages/pages/D3Page";
import UdPage from "pages/public-pages/landings/partners-pages/pages/UdPage";
import PaymentLinkPage from "pages/public-pages/landings/payment-link-page/PaymentLinkPage";
import PhysicalProductPage from "pages/public-pages/landings/physical-product-page/PhysicalProductPage";
import PODProductPage from "pages/public-pages/landings/pod-product-page/PODProductPage";
import ProductTilePage from "pages/public-pages/landings/product-tile-page/ProductTilePage";
import ROIPage from "pages/public-pages/landings/roi-page/ROIPage";
import TokenizingProductsPage from "pages/public-pages/landings/tokenizing-products-page/TokenizingProductsPage";
import TokanpayPage from "pages/public-pages/landings/tokenpay-page/TokanpayPage";
import PricingPage from "pages/public-pages/pricing/PricingPage";
import PrivacyPage from "pages/public-pages/privacy-page/PrivacyPage";
import Rewards from "pages/public-pages/rewards/rewards";
import ShopPage from "pages/public-pages/shop-page/ShopPage";
import TermsPage from "pages/public-pages/terms-page/TermsPage";
import AffiliateMarket from "pages/redesign-affiliate/market/AffiliateMarket";
import AffiliateProductsSinglePage from "pages/redesign-affiliate/product-page/ProductPage";
import AffiliateProductsLayout from "pages/redesign-affiliate/products/AffiliateProductsLayout";
import AffiliateStores from "pages/redesign-affiliate/stores/AffiliateStores";
import AffiliateStoresProfile from "pages/redesign-affiliate/stores/profile/AffiliateStoresProfile";
import RegisterPagesWrapper from "pages/register-pages/RegisterPageWrapper";
import Admins from "pages/register-pages/pages/admins/Admins";
import PaymentLink from "pages/register-pages/pages/payment-link/PaymentLink";
import RegisterShopInfo from "pages/register-pages/pages/shop-info/ShopInfo";
import SimpleRegistration from "pages/register-pages/pages/simple-registration/SimpleRegistration";
import TileDesign from "pages/register-pages/pages/tile-design/TileDesign";
import SettingsPage from "pages/settings/SettingsPage";
import ShopManagement from "pages/shop-management/ShopManagement";
import SubscriptionPlans from "pages/subscription-plans/SubscriptionPlans";
import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScrollToTop from "components/layouts/scroll-to-top/ScrollToTop";

const ProductSingle = lazy(() => import("pages/product/single"));
const CouponsSetting = lazy(() => import("pages/register-pages/pages/coupons/CouponsSetting"));
const DesignPage = lazy(() => import("pages/register-pages/pages/design/DesignPage"));
const TechnicalPage = lazy(() => import("pages/register-pages/pages/technical"));
const PublicBlogs = lazy(() => import("pages/public-pages/blogs/Blogs"));
const PublicBlog = lazy(() => import("pages/public-pages/blogs/blog/Blog"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ScrollToTop>
                <MainLayout />
            </ScrollToTop>
        ),
        errorElement: (
            <MainLayout>
                <Maintenance />
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
        element: (
            <ScrollToTop>
                <DashboardLayout />
            </ScrollToTop>
        ),
        errorElement: (
            <DashboardLayout>
                <Maintenance />
            </DashboardLayout>
        ),
        children: [
            { index: true, element: <DashboardPage /> },
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
        element: (
            <ScrollToTop>
                <ShopManagementLayout />
            </ScrollToTop>
        ),
        errorElement: <Maintenance />,
        children: [
            { index: true, element: <ShopManagement /> },
        ],
    },
    { path: ":shopname", element: <ShopPage /> },
    { path: "*", element: <NotFound /> },
]);

function AppRoutes() {
    return (
        <Suspense fallback={<FullScreenLoading />}>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default AppRoutes;