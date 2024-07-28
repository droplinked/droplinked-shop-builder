import DashboardLayout from "components/layouts/app/dashboard/DashboardLayout"
import MainLayout from "components/layouts/app/main/mainLayout"
import ShopManagementLayout from "components/layouts/app/shop-management/ShopManagementLayout"
import AffiliateLayout from "components/layouts/pages/affiliate/AffiliateLayout"
import NotFound from "pages/404/404"
import ShopProduct from "pages/affiliate/product/ShopProduct"
import AffiliateProducts from "pages/affiliate/products/AffiliateProducts"
import Shops from "pages/affiliate/shops/Shops"
import Shop from "pages/affiliate/shopSingle/Shop"
import ResetPassPage from "pages/auth-pages/reset-pass-page/ResetPassPage"
import ThankForRegisterPage from "pages/auth-pages/thank-for-regsiter-page/ThankForRegisterPage"
import VerifyEmailPage from "pages/auth-pages/verify-email-page/Email-verification-page"
import Blogs from "pages/blogs/Blogs"
import BlogForm from "pages/blogs/parts/blog-form/BlogForm"
import Blog from "pages/blogs/parts/blog/Blog"
import Collections from "pages/collections/Collections"
import DashboardPage from "pages/dashboard/DashboardPage"
import Gamification from "pages/gamification/Gamification"
import NFTs from "pages/nfts/NFTs"
import Orders from "pages/orders/Orders"
import Products from "pages/product/list/products"
import ProductOrder from "pages/product/order/ProductOrder"
import ProductTypes from "pages/product/types/ProductTypes"
import AboutUs from "pages/public-pages/about/AboutUs"
import AcceptInvitation from "pages/public-pages/accept-invitation/AcceptInvitation"
import ContactUs from "pages/public-pages/contact-us/ContactUs"
import Enquiry from "pages/public-pages/enquiry-page/EnquiryPage"
import HomePage from "pages/public-pages/homePage/HomePage"
import DigitalProductPage from "pages/public-pages/landings/digital-product-page/DigitalProductPage"
import PhysicalProductPage from "pages/public-pages/landings/physical-product-page/PhysicalProductPage"
import PODProductPage from "pages/public-pages/landings/pod-product-page/PODProductPage"
import ROIPage from "pages/public-pages/landings/roi-page/ROIPage"
import TokenPayPage from "pages/public-pages/landings/tokenpay-page/TokenPayPage"
import LoadingPage from "pages/public-pages/loading-page/LoadingPage"
import PricingPage from "pages/public-pages/pricing/PricingPage"
import PrivacyPage from "pages/public-pages/privacy-page/PrivacyPage"
import ShopPage from "pages/public-pages/shop-page/ShopPage"
import TermsPage from "pages/public-pages/terms-page/TermsPage"
import Admins from "pages/register-pages/pages/admins/Admins"
import TileDesign from "pages/register-pages/pages/tile-design/TileDesign"
import RegisterShopInfo from "pages/register-pages/pages/shop-info/ShopInfo"
import SimpleRegistration from "pages/register-pages/pages/simple-registration/SimpleRegistration"
import RegisterPagesWrapper from "pages/register-pages/RegisterPageWrapper"
import ShopManagement from "pages/shop-management/ShopManagement"
import SubscriptionPlans from "pages/subscription-plans/SubscriptionPlans"
import React, { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import DppPage from "pages/public-pages/landings/dpp-page/DppPage"

const ProductSingle = lazy(() => import("pages/product/single"))
const Requests = lazy(() => import("pages/affiliate/requests/Requests"))
const Notifications = lazy(
  () => import("pages/affiliate/notifications/Notifications")
)
const CouponsSetting = lazy(
  () => import("pages/register-pages/pages/coupons/CouponsSetting")
)
const DesignPage = lazy(
  () => import("pages/register-pages/pages/design/DesignPage")
)
const TechnicalPage = lazy(() => import("pages/register-pages/pages/technical"))
const PublicBlogs = lazy(() => import("pages/public-pages/blogs/Blogs"))
const PublicBlog = lazy(() => import("pages/public-pages/blogs/blog/Blog"))

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="enquiry" element={<Enquiry />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="email-confirmation" element={<ThankForRegisterPage />} />
          <Route path="tokenpay" element={<TokenPayPage />} />
          <Route path="physical-product" element={<PhysicalProductPage />} />
          <Route path="digital-product" element={<DigitalProductPage />} />
          <Route path="pod-product" element={<PODProductPage />} />
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

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="url-registration" element={<SimpleRegistration />} />
          <Route path="settings" element={<RegisterPagesWrapper />}>
            <Route path="shop-info" element={<RegisterShopInfo />} />
            <Route path="design" element={<DesignPage />} />
            <Route path="tile" element={<TileDesign />} />
            <Route path="technical" element={<TechnicalPage />} />
            <Route path="coupons" element={<CouponsSetting />} />
            <Route path="admins" element={<Admins />} />
          </Route>
          <Route path="products">
            <Route index element={<Products />} />
            <Route path="types" element={<ProductTypes />} />
            <Route path="order/:productID" element={<ProductOrder />} />
            <Route path="create/:type" element={<ProductSingle />} />
            <Route path=":productId" element={<ProductSingle />} />
          </Route>
          <Route path="collections" element={<Collections />} />
          <Route path="orders" element={<Orders />} />
          <Route path="affiliate" element={<AffiliateLayout />}>
            <Route index element={<AffiliateProducts />} />
            <Route path="stores" element={<Shops />} />
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
          <Route path="nfts" element={<NFTs />} />
          <Route path="blogs">
            <Route index element={<Blogs />} />
            <Route path="create" element={<BlogForm />} />
            <Route path=":slug" element={<Blog />} />
          </Route>
          <Route path="plans" element={<SubscriptionPlans />} />
          <Route path="gamification" element={<Gamification />} />
        </Route>

        <Route path="shop-management" element={<ShopManagementLayout />}>
          <Route index element={<ShopManagement />} />
        </Route>

        <Route path=":shopname" element={<ShopPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes