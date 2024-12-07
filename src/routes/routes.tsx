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
import NFTs from "pages/nfts/NFTs";
import Orders from "pages/orders/Orders";
import Products from "pages/product/list/products";
import ProductOrder from "pages/product/order/ProductOrder";
import ConnectEventAccount from "pages/product/single/parts/event/connect-event-account/ConnectEventAccount";
import EventsList from "pages/product/single/parts/event/events-list/EventsList";
import ProductTypes from "pages/product/types/ProductTypes";
import AboutUs from "pages/public-pages/about/AboutUs";
import AcceptInvitation from "pages/public-pages/accept-invitation/AcceptInvitation";
import ContactUs from "pages/public-pages/contact-us/ContactUs";
import Enquiry from "pages/public-pages/enquiry-page/EnquiryPage";
import HomePage from "pages/public-pages/homePage/HomePage";
import AffiliatePage from "pages/public-pages/landings/affiliate-page/AffiliatePage";
import AffiliateSassPage from "pages/public-pages/landings/affiliate-sass-page/AffiliateSassPage";
import CustomTokenPage from "pages/public-pages/landings/custom-token-page/CustomTokenPage";
import D3Page from "pages/public-pages/landings/d3-page/D3Page";
import DigitalProductPage from "pages/public-pages/landings/digital-product-page/DigitalProductPage";
import DppPage from "pages/public-pages/landings/dpp-page/DppPage";
import MetaverseStorePage from "pages/public-pages/landings/metaverse-store-page/MetaverseStorePage";
import PaymentLinkPage from "pages/public-pages/landings/payment-link-page/PaymentLinkPage";
import PhysicalProductPage from "pages/public-pages/landings/physical-product-page/PhysicalProductPage";
import PODProductPage from "pages/public-pages/landings/pod-product-page/PODProductPage";
import ProductTilePage from "pages/public-pages/landings/product-tile-page/ProductTilePage";
import ROIPage from "pages/public-pages/landings/roi-page/ROIPage";
import TokenizingProductsPage from "pages/public-pages/landings/tokenizing-products-page/TokenizingProductsPage";
import TokanpayPage from "pages/public-pages/landings/tokenpay-page/TokanpayPage";
import PricingPage from "pages/public-pages/pricing/PricingPage";
import PrivacyPage from "pages/public-pages/privacy-page/PrivacyPage";
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
import ShopManagement from "pages/shop-management/ShopManagement";
import SubscriptionPlans from "pages/subscription-plans/SubscriptionPlans";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ProductSingle = lazy(() => import("pages/product/single"));
const CouponsSetting = lazy(() => import("pages/register-pages/pages/coupons/CouponsSetting"));
const DesignPage = lazy(() => import("pages/register-pages/pages/design/DesignPage"));
const TechnicalPage = lazy(() => import("pages/register-pages/pages/technical"));
const PublicBlogs = lazy(() => import("pages/public-pages/blogs/Blogs"));
const PublicBlog = lazy(() => import("pages/public-pages/blogs/blog/Blog"));

function AppRoutes() {
    return (
        <Suspense fallback={<FullScreenLoading />}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="signup" element={<HomePage isAuth={true} />} />
                    <Route path="enquiry" element={<Enquiry />} />
                    <Route path="terms" element={<TermsPage />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="contact-us" element={<ContactUs />} />
                    <Route path="privacy" element={<PrivacyPage />} />
                    <Route path="email-confirmation" element={<ThankForRegisterPage />} />
                    <Route path="physical-product" element={<PhysicalProductPage />} />
                    <Route path="digital-product" element={<DigitalProductPage />} />
                    <Route path="pod-product" element={<PODProductPage />} />
                    <Route path="tokenpay" element={<TokanpayPage />} />
                    <Route path="payment-links" element={<PaymentLinkPage />} />
                    <Route path="product-tiles" element={<ProductTilePage />} />
                    <Route path="tokenizing-products" element={<TokenizingProductsPage />} />
                    <Route path="affiliate-sass" element={<AffiliateSassPage />} />
                    <Route path="custom-tokens" element={<CustomTokenPage />} />
                    <Route path="metaverse-store" element={<MetaverseStorePage />} />
                    <Route path="onchain-affiliate" element={<AffiliatePage />} />
                    <Route path="d3" element={<D3Page />} />
                    <Route path="accept-invitation/:invitationId" element={<AcceptInvitation />} />
                    <Route path="roi" element={<ROIPage />} />
                    <Route path="dpp" element={<DppPage />} />
                    <Route path="blogs">
                        <Route index element={<PublicBlogs />} />
                        <Route path=":slug" element={<PublicBlog />} />
                    </Route>
                    <Route path="email-verification/:token" element={<VerifyEmailPage />} />
                    <Route path="producer/account-recovery/:token" element={<ResetPassPage />} />
                    <Route path="plans" element={<PricingPage />} />
                </Route>

                <Route path="analytics" element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="registration" element={<SimpleRegistration />} />
                    <Route path="settings" element={<RegisterPagesWrapper />}>
                        <Route path="shop-info" element={<RegisterShopInfo />} />
                        <Route path="design" element={<DesignPage />} />
                        <Route path="tile" element={<TileDesign />} />
                        <Route path="technical" element={<TechnicalPage />} />
                        <Route path="coupons" element={<CouponsSetting />} />
                        <Route path="admins" element={<Admins />} />
                        <Route path="payment-link-design" element={<PaymentLink />} />
                    </Route>
                    <Route path="products">
                        <Route index element={<Products />} />
                        <Route path="types" element={<ProductTypes />} />
                        <Route path="order/:productID" element={<ProductOrder />} />
                        <Route path="create/:type" element={<ProductSingle />} />
                        <Route path=":productId" element={<ProductSingle />} />
                        <Route path="connect-event-account" element={<ConnectEventAccount />} />
                        <Route path="events-list" element={<EventsList />} />
                    </Route>
                    <Route path="collections" element={<Collections />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="affiliate">
                        <Route path="market" element={<AffiliateMarket />} />
                        <Route path="products">
                            <Route index element={<AffiliateProductsLayout />} />
                            <Route path=":slug" element={<AffiliateProductsSinglePage />} />
                        </Route>
                        <Route path="stores">
                            <Route index element={<AffiliateStores />} />
                            <Route path=":shopId">
                                <Route index element={<AffiliateStoresProfile />} />
                                <Route path=":slug" element={<AffiliateProductsSinglePage />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="nfts" element={<NFTs />} />
                    <Route path="blogs">
                        <Route index element={<Blogs />} />
                        <Route path="create" element={<BlogForm />} />
                        <Route path=":slug" element={<Blog />} />
                    </Route>
                    <Route path="plans" element={<SubscriptionPlans />} />
                    <Route path="gamification" element={<Gamification />} />
                    <Route path="invoice-management" element={<InvoiceManagement />} />
                    <Route path="invoice-management/create" element={<CreateInvoice />} />
                    <Route path="invoice-management/edit/:invoiceId" element={<CreateInvoice />} />
                </Route>

                <Route path="shop-management" element={<ShopManagementLayout />}>
                    <Route index element={<ShopManagement />} />
                </Route>

                <Route path=":shopname" element={<ShopPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;