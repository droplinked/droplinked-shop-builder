import "./App.scss";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "./pages/public-pages/loading-page/LoadingPage";
import { useProfile } from "hooks/useProfile/useProfile";

const MainLayout = lazy(() =>
  import("layouts/app/main/mainLayout")
);
const NotFound = lazy(() =>
  import("pages/404/404")
);
const Enquiry = lazy(() =>
  import("./pages/public-pages/enquiry-page/EnquiryPage")
);
const RegisterPagesWrapper = lazy(() =>
  import("./pages/register-pages/RegisterPageWrapper")
);
const RegisterShopInfo = lazy(() =>
  import("./pages/register-pages/pages/shop-info/ShopInfo")
);
const ContactInfo = lazy(() =>
  import("./pages/register-pages/pages/contact-info/ContactInfo")
);
const DesignPage = lazy(() =>
  import("./pages/register-pages/pages/design/DesignPage")
);
const TechnicalPage = lazy(() =>
  import("./pages/register-pages/pages/technical")
);
const ProductsPage = lazy(() =>
  import("./pages/prodcut-pages/products-page/ProductsPage")
);
const RulePage = lazy(() => import("./pages/admin-pages/rules-page/RulesPage"));
const DashboardLayout = lazy(() => import("layouts/app/dashboard/DashboardLayout"));
const LandingPage = lazy(() =>
  import("./pages/public-pages/landing-page/LandingPage")
);
const TermsPage = lazy(() =>
  import("./pages/public-pages/terms-page/TermsPage")
);
const PrivacyPage = lazy(() =>
  import("./pages/public-pages/privacy-page/PrivacyPage")
);
const VerifyEmailPage = lazy(() =>
  import("./pages/auth-pages/verify-email-page/Email-verification-page")
);
const ResetPassPage = lazy(() =>
  import("./pages/auth-pages/reset-pass-page/ResetPassPage")
);
const ThankForRegisterPage = lazy(() =>
  import("./pages/auth-pages/thank-for-regsiter-page/ThankForRegisterPage")
);
const CollectionMainPage = lazy(() =>
  import(
    "./pages/admin-pages/collections-pages/collection-page/CollectionsPage"
  )
);
const AddCollectionPage = lazy(() =>
  import(
    "./pages/admin-pages/collections-pages/add-collection-page/AddCollectionPage"
  )
);
const ShopPage = lazy(() => import("./pages/public-pages/shop-page/ShopPage"));
const ProductSingle = lazy(() => import("pages/product/single"));

const OrderPage = lazy(() =>
  import("./pages/admin-pages/orders-page/OrderPage")
);

const AffiliateLayout = lazy(() =>
  import("layouts/pages/affiliate/AffiliateLayout")
);

const Shops = lazy(() => import("pages/affiliate/shops/Shops"))
const Shop = lazy(() => import("pages/affiliate/shopSingle/Shop"))
const ShopProduct = lazy(() => import("pages/affiliate/product/ShopProduct"))
const Requests = lazy(() => import("pages/affiliate/requests/Requests"))
const Notifications = lazy(() => import("pages/affiliate/notifications/Notifications"))
const Products = lazy(() => import("pages/product/list/products"))
const Collections = lazy(() => import("pages/collections/Collections"))
const Rules = lazy(() => import("pages/rules/Rules"))

function App() {
  const { profile } = useProfile();

  return (
    <BrowserRouter>
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

            <Route path=":shopname/c" element={profile ? <DashboardLayout /> : <Navigate replace to={"/"} />}>
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
              </Route>
              <Route path="products">
                <Route index element={<Products />} />
                <Route path="create" element={<ProductSingle />} />
                <Route path=":productId" element={<ProductSingle />} />
              </Route>
              <Route path="collections" element={<CollectionMainPage />} />
              <Route path="add-collection" element={<AddCollectionPage />} />
              <Route path="orders" element={<OrderPage />} />
              <Route path="rules" element={<Rules />} />
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
    </BrowserRouter >
  );
}

export default App;
