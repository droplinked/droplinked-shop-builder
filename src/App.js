import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import LoadingPage from "./pages/public-pages/loading-page/LoadingPage";
import Enquiry from "./pages/public-pages/enquiry-page/EnquiryPage";
import EditProductPage from "./pages/prodcut-pages/edit-product-page/EditProductPage";
import AdminWrapper from "./pages/wrappers/admin-wrapper/AdminWrapper";
import RegisterPagesWrapper from "./pages/register-pages/RegisterPageWrapper";
import RegisterShopInfo from "./pages/register-pages/pages/shop-info/ShopInfo";
import ContactInfo from "./pages/register-pages/pages/contact-info/ContactInfo";
import DesignPage from "./pages/register-pages/pages/design/DesignPage";
import ProductsPage from "./pages/prodcut-pages/products-page/ProductsPage";
import RulePage from "./pages/admin-pages/rules-page/RulesPage";

const PageWrapper = lazy(() => import("./pages/Page-wrapper/PageWrapper"));
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

const AddProductPage = lazy(() =>
  import("./pages/prodcut-pages/add-product-page/AddProductPage")
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

const OrderPage = lazy(() =>
  import("./pages/admin-pages/orders-page/OrderPage")
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/enquiry" element={<Enquiry />} />

          <Route path="/" element={<PageWrapper />}>
            <Route index element={<LandingPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route
              path="email-confirmation"
              element={<ThankForRegisterPage />}
            />
            <Route
              path="email-verification/:token"
              element={<VerifyEmailPage />}
            />
            <Route
              path="producer/account-recovery/:token"
              element={<ResetPassPage />}
            />

            <Route path=":shopname/c" element={<AdminWrapper />}>
              <Route path="register" element={<RegisterPagesWrapper />}>
                <Route path="shop-info" element={<RegisterShopInfo />} />
                <Route path="contact-info" element={<ContactInfo />} />
                <Route path="design" element={<DesignPage />} />
              </Route>
              <Route path="settings" element={<RegisterPagesWrapper />}>
                <Route path="shop-info" element={<RegisterShopInfo />} />
                <Route path="contact-info" element={<ContactInfo />} />
                <Route path="design" element={<DesignPage />} />
              </Route>
              <Route path="products" element={<ProductsPage />} />
              <Route path="add-product" element={<AddProductPage />} />
              <Route path="product/:productId" element={<EditProductPage />} />
              <Route path="collections" element={<CollectionMainPage />} />
              <Route path="add-collection" element={<AddCollectionPage />} />
              <Route path="orders" element={<OrderPage />} />
              <Route path="rules" element={<RulePage />} />
            </Route>
            <Route path=":shopname" element={<ShopPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
