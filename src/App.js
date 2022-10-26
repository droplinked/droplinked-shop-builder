import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Crashpunks2 from "./pages/test/crashpunks2";
import ScrollTop from "./services/scroll-top/ScrollTop";
import OrderProvider from "./context/order/OrdersContext";
import LoadingPage from "./pages/publics/loading/Loading-page";
import ShippingPage from "./pages/customer/buy-process-pages/shipping/Shipping-page";
import ShopWrapper from "./pages/customer/shop-wrapper/shop-wrapper";
import Enquiry from './pages/publics/enquiry/Enquiry'
import ViewCollection from "./pages/Producer/view-collection/View-collection";

const PageWrapper = lazy(() => import("./pages/Page-wrapper/PageWrapper"));
const LandingPage = lazy(() => import("./pages/publics/landing/Landing-page"));
const TermsPage = lazy(() => import("./pages/publics/terms/Terms-page"));
const PrivacyPage = lazy(() => import("./pages/publics/privacy/Privacy-page"));
const RegisterPage = lazy(() =>
  import("./pages/Producer/register/register-page")
);

const EmailVerifyPage = lazy(() =>
  import("./pages/publics/email-verify/Email-verification-page")
);
const AccountRecovery = lazy(() =>
  import("./pages/publics/account-recovery/Account-recovery")
);
const ThankForRegisterPage = lazy(() =>
  import("./pages/publics/thanks-for-register/ThankForRegister-page")
);
const InventoryPage = lazy(() =>
  import("./pages/Producer/ims/Inventory-page")
);
const ViewMerchPage = lazy(() =>
  import("./pages/Producer/view-merch/View-merch-page")
);
const AddProductPage = lazy(() =>
  import("./pages/Producer/add-product/Add-product-page")
);

const CollectionMainPage = lazy(() =>
  import("./pages/Producer/collection/Collection-page")
);
const ShopPage = lazy(() => import("./pages/publics/shop/Shop-page"));
const MerchPage = lazy(() => import("./pages/customer/merch/Merch-page"));
const CollectionPage = lazy(() => import("./pages/customer/collection/Collection-page"));
const CheckoutPage = lazy(() =>
  import("./pages/customer/buy-process-pages/checkout/Checkout-page")
);
const AddressPage = lazy(() =>
  import("./pages/customer/buy-process-pages/address/Address-Page")
);
const PaymentPage = lazy(() =>
   import("./pages/customer/buy-process-pages/payment/payment-page")
 )

const SettingsPage = lazy(() => import("./pages/settings/Settings-page"));

const IncomingOrderPage = lazy(() =>
  import("./pages/Producer/incomin-order/IncomingOrder-page")
);

const PurchasHistoryPage = lazy(() =>
  import("./pages/purchase-history/PurchaseHistory")
);
const Producer = lazy(() =>
  import("./pages/Producer/producer-wrapper/Producer-wrapper-page")
);
const Notifications = lazy(() =>
  import("./pages/publics/notifications/Notifications-page")
);
const CollectionIframe = lazy(() =>
  import("./pages/customer/collection-iframe/CollectionIfram-page")
);
//const Test = lazy(() => import("./pages/test/Test-page"));


function App() {
  return (
    <BrowserRouter>
      <ScrollTop>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
          <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/" element={<PageWrapper />}>
              <Route index element={<LandingPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />

              <Route path="register" element={<RegisterPage />} />

              {/* register */}
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
                  element={<AccountRecovery />}
                />
              <Route path="settings" element={<SettingsPage />} />

              {/* producer pages */}
              <Route path="producer" element={<Producer />}>
                <Route path="ims" element={<InventoryPage />} />
                <Route path="merch/:id" element={<ViewMerchPage />} />
               
                <Route path="add-product" element={<AddProductPage />} />
                {/* <Route path="ruleset" element={<RuleSetPage />} /> */}
                <Route path="collection" element={<CollectionMainPage />} />
                <Route
                  path="collection/:collectionId"
                  element={<ViewCollection />}
                />
                <Route
                  path="orders"
                  element={
                    <OrderProvider>
                      <IncomingOrderPage />
                    </OrderProvider>
                  }
                />
              </Route>
              {/* producer pages */}
              <Route path=":shopname" element={<ShopWrapper />}>

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

              </Route>

              <Route path="/purchseHistory" element={<PurchasHistoryPage />} />
              <Route path="/crashpunks2" element={<Crashpunks2 />} />

              <Route path="/notifications" element={<Notifications />} />
              <Route
                path="/collection-iframe/:shopname/:collectionId"
                element={<CollectionIframe />}
              />
            </Route>
          </Routes>
        </Suspense>
      </ScrollTop>
    </BrowserRouter>
  );
}

export default App;
