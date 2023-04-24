import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "./pages/public-pages/loading-page/LoadingPage";

const MainLayout = lazy(() =>
  import("layouts/main/mainLayout")
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
const DashboardLayout = lazy(() => import("layouts/dashboard/DashboardLayout"));
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

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>

          <Route path="/" element={<MainLayout />}>
            <Route path="/enquiry" element={<Enquiry />} />
            <Route index element={<LandingPage />} />
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
            </Route>
            <Route path="products" element={<ProductsPage />} />
            <Route path="add-product" element={<ProductSingle />} />
            <Route path="product/:productId" element={<ProductSingle />} />
            <Route path="collections" element={<CollectionMainPage />} />
            <Route path="add-collection" element={<AddCollectionPage />} />
            <Route path="orders" element={<OrderPage />} />
            <Route path="rules" element={<RulePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter >
  );
}

export default App;
