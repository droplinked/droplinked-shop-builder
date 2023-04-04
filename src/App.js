import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import LoadingPage from "./pages/publics/loading/Loading-page";
//import ShippingPage from "./pages/customer/shipping/Shipping-page";
import Enquiry from "./pages/public-pages/enquiry-page/EnquiryPage";
// import ProducerCollection from "./pages/Producer/producer-collection/producer-collection";
import UserWrapper from "./pages/user-wrapper/user-wrapper";
// import Shops from "./pages/affiliate/shops/shops";
// import AffiliateShop from "./pages/affiliate/shop/shop";
// import AffiliateProduct from "./pages/affiliate/product/product";
// import RequestsPage from "./pages/affiliate/requests/request";
import EditProductPage from "./pages/Producer/edit-product/EditProductPage";
// import AdminPage from "./pages/admin/AdminPage";
import AdminWrapper from "./pages/admin-wrapper/AdminWrapper";
import RegisterPagesWrapper from "./pages/register-pages/RegisterPageWrapper";
import RegisterShopInfo from "./pages/register-pages/pages/shop-info/ShopInfo";
import ContactInfo from "./pages/register-pages/pages/contact-info/ContactInfo";
import DesignPage from "./pages/register-pages/pages/design/DesignPage";
import ProductsPage from "./pages/products/ProductsPage";
import RulePage from "./pages/rules-page/RulesPage";

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
const RegisterPage = lazy(() =>
  import("./pages/Producer/register/register-page")
);

const EmailVerifyPage = lazy(() =>
  import("./pages/publics/email-verify/Email-verification-page")
);
const ResetPassPage = lazy(() =>
  import("./pages/auth-pages/reset-pass-page/ResetPassPage")
);
const ThankForRegisterPage = lazy(() =>
  import("./pages/publics/thanks-for-register/ThankForRegister-page")
);
// const InventoryPage = lazy(() => import("./pages/Producer/ims/Inventory-page"));
// const ViewMerchPage = lazy(() =>
//   import("./pages/Producer/view-merch/View-merch-page")
// );
const AddProductPage = lazy(() =>
  import("./pages/Producer/add-product/Add-product-page")
);

const CollectionMainPage = lazy(() =>
  import("./pages/Producer/collection/Collection-page")
);
const ShopPage = lazy(() => import("./pages/publics/shop/Shop-page"));
const MerchPage = lazy(() => import("./pages/customer/merch/Merch-page"));
const CollectionPage = lazy(() =>
  import("./pages/publics/collection/Collection-page")
);
// const CheckoutPage = lazy(() =>
//   import("./pages/customer/checkout/Checkout-page")
// );
// const AddressPage = lazy(() => import("./pages/customer/address/Address-Page"));
// const PaymentPage = lazy(() => import("./pages/customer/payment/payment-page"));

// const SettingsPage = lazy(() =>
//   import("./pages/customer/settings/Settings-page")
// );

const IncomingOrderPage = lazy(() =>
  import("./pages/Producer/incomin-order/IncomingOrder-page")
);

// const PurchasHistoryPage = lazy(() =>
//   import("./pages/customer/purchase-history/PurchaseHistory")
// );
// const Producer = lazy(() =>
//   import("./pages/Producer/producer-wrapper/Producer-wrapper-page")
// );
// const Notifications = lazy(() =>
//   import("./pages/publics/notifications/Notifications-page")
// );
// const CollectionIframe = lazy(() =>
//   import("./pages/publics/collection-iframe/CollectionIfram-page")
// );

// const AddproductTest = lazy(() =>
//   import("./pages/test/test-add-product-page/add-product-test")
// );

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/enquiry" element={<Enquiry />} />

          <Route path="/" element={<PageWrapper />}>
            {/* without login  */}
            <Route index element={<LandingPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route
              path="email-confirmation"
              element={<ThankForRegisterPage />}
            />
            <Route
              path="email-verification/:token"
              element={<EmailVerifyPage />}
            />
            <Route
              path="producer/account-recovery/:token"
              element={<ResetPassPage />}
            />
            {/* without login  */}

            {/* <Route path="settings" element={<SettingsPage />} />
            <Route path="/purchseHistory" element={<PurchasHistoryPage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route
              path="/collection-iframe/:shopname/:collectionId"
              element={<CollectionIframe />}
            /> */}

            {/* producer pages */}
            {/* <Route path="producer" element={<UserWrapper />}>
              <Route path="ims" element={<InventoryPage />} />
              <Route path="merch/:id" element={<EditProductPage />} />
              <Route path="add-product" element={<AddProductPage />} />
              <Route path="collection" element={<CollectionMainPage />} />
              <Route
                path="collection/:collectionId"
                element={<ProducerCollection />}
              />
              <Route path="orders" element={<IncomingOrderPage />} />
              <Route path="addproduct-template" element={<AddproductTest />} />
            </Route> */}

            <Route path=":shopname/c" element={<AdminWrapper />}>
              <Route path="register" element={<RegisterPagesWrapper />}>
                <Route path="shop-info" element={<RegisterShopInfo />} />
                <Route path="contact-info" element={<ContactInfo />} />
                <Route path="design" element={<DesignPage />} />
              </Route>
              <Route path="products" element={<ProductsPage />} />
              <Route path="add-product" element={<AddProductPage />} />
              <Route path="product/:productId" element={<EditProductPage />} />
              <Route path="collections" element={<CollectionMainPage />} />
              <Route path="orders" element={<IncomingOrderPage />} />
              <Route path="rules" element={<RulePage />} />
            </Route>
            <Route path=":shopname" element={<UserWrapper />}>
              <Route index element={<ShopPage />} />
              <Route path="merch/:merchId" element={<MerchPage />} />
              <Route
                path="collection/:collectionId"
                element={<CollectionPage />}
              />
            </Route>
            {/* producer pages */}
            {/* <Route path=":shopname" element={<UserWrapper />}>
              <Route index element={<ShopPage />} />
              <Route path="merch/:merchId" element={<MerchPage />} />
              <Route
                path="collection/:collectionId"
                element={<CollectionPage />}
              />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="address" element={<AddressPage />} />
              <Route path="shipping" element={<ShippingPage />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="admin" element={<AdminPage />} />
            </Route> */}

            {/* producer pages */}
            {/* <Route path="affiliate" element={<UserWrapper />}>
              <Route path="shops" element={<Shops />} />
              <Route path="shop/hungryartist" element={<AffiliateShop />} />
              <Route
                path="product/4578465442138754"
                element={<AffiliateProduct />}
              />
              <Route path="requests" element={<RequestsPage />} />
            </Route> */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
