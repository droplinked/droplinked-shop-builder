import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import LoadingPage from "pages/public-pages/loading-page/LoadingPage";
import DashboardLayout from "components/layouts/app/dashboard/DashboardLayout";
import Products from "pages/product/list/products";
import Collections from "pages/collections/Collections";
import Orders from "pages/orders/Orders";
import RegisterPagesWrapper from "pages/register-pages/RegisterPageWrapper";
import AffiliateLayout from "components/layouts/pages/affiliate/AffiliateLayout";
import Shops from "pages/affiliate/shops/Shops";
import RegisterShopInfo from "pages/register-pages/pages/shop-info/ShopInfo";
import MainLayout from 'components/layouts/app/main/mainLayout'
import NotFound from 'pages/404/404'
import Enquiry from 'pages/public-pages/enquiry-page/EnquiryPage'
import ContactInfo from 'pages/register-pages/pages/contact-info/ContactInfo'
import LandingPage from 'pages/public-pages/landing-page/LandingPage'
import TermsPage from 'pages/public-pages/terms-page/TermsPage'
import PrivacyPage from 'pages/public-pages/privacy-page/PrivacyPage'
import ShopPage from 'pages/public-pages/shop-page/ShopPage'
import VerifyEmailPage from 'pages/auth-pages/verify-email-page/Email-verification-page'
import ResetPassPage from 'pages/auth-pages/reset-pass-page/ResetPassPage'
import ThankForRegisterPage from 'pages/auth-pages/thank-for-regsiter-page/ThankForRegisterPage'
import Shop from 'pages/affiliate/shopSingle/Shop'
import ShopProduct from 'pages/affiliate/product/ShopProduct'
import ProductTypes from "pages/product/types/ProductTypes";

const ProductSingle = lazy(() => import("pages/product/single"))
const Requests = lazy(() => import("pages/affiliate/requests/Requests"))
const Notifications = lazy(() => import("pages/affiliate/notifications/Notifications"))
const CouponsSetting = lazy(() => import("pages/register-pages/pages/coupons/CouponsSetting"))
const DesignPage = lazy(() => import("pages/register-pages/pages/design/DesignPage"))
const TechnicalPage = lazy(() => import("pages/register-pages/pages/technical"))

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/">
            <Route index element={<LandingPage />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="email-confirmation" element={<ThankForRegisterPage />} />
            <Route path="email-verification/:token" element={<VerifyEmailPage />} />
            <Route path="producer/account-recovery/:token" element={<ResetPassPage />} />
          </Route>

          <Route path=":shopname/c" element={<DashboardLayout />}>
            <Route path="register" element={<RegisterPagesWrapper />}>
              <Route path="shop-info" element={<RegisterShopInfo />} />
              <Route path="contact-info" element={<ContactInfo />} />
              <Route path="design" element={<DesignPage />} />
              <Route path="technical" element={<TechnicalPage />} />
            </Route>
            <Route path="settings" element={<RegisterPagesWrapper />}>
              <Route path="shop-info" element={<RegisterShopInfo />} />
              <Route path="contact-info" element={<ContactInfo />} />
              <Route path="design" element={<DesignPage />} />
              <Route path="technical" element={<TechnicalPage />} />
              <Route path="coupons" element={<CouponsSetting />} />
            </Route>
            <Route path="products">
              <Route index element={<Products />} />
              <Route path="types" element={<ProductTypes />} />
              <Route path="create/:type" element={<ProductSingle />} />
              <Route path=":productId" element={<ProductSingle />} />
            </Route>
            <Route path="collections" element={<Collections />} />
            <Route path="orders" element={<Orders />} />
            <Route path="affiliate" element={<AffiliateLayout />}>
              <Route index element={<Shops />} />
              <Route path="shops">
                <Route index element={<Shops />} />
                <Route path=":shopName">
                  <Route index element={<Shop />} />
                  <Route path=":productID" element={<ShopProduct />} />
                </Route>
              </Route>
              <Route path="requests" element={<Requests />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
          </Route>
          <Route path=":shopname" element={<ShopPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
