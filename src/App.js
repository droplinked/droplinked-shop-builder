import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import OrderProvider from "./context/order/OrdersContext";
import LoadingPage from "./pages/publics/loading/Loading-page";
import ShippingPage from "./pages/customer/shipping/Shipping-page";
import Enquiry from './pages/publics/enquiry/Enquiry'
import ViewCollection from "./pages/Producer/view-collection/View-collection";
import UserWrapper from "./pages/user-wrapper/user-wrapper"

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
  import("./pages/customer/checkout/Checkout-page")
);
const AddressPage = lazy(() =>
  import("./pages/customer/address/Address-Page")
);
const PaymentPage = lazy(() =>
   import("./pages/customer/buy-process-pages/payment/payment-page")
 )

const SettingsPage = lazy(() => import("./pages/customer/settings/Settings-page"));

const IncomingOrderPage = lazy(() =>
  import("./pages/Producer/incomin-order/IncomingOrder-page")
);

const PurchasHistoryPage = lazy(() =>
  import("./pages/customer/purchase-history/PurchaseHistory")
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
        <Suspense fallback={<LoadingPage />}>
          <Routes>

          <Route path="/enquiry" element={<Enquiry />} />

            <Route path="/" element={<PageWrapper />}>

            {/* without login  */}
              <Route index element={<LandingPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="email-confirmation" element={<ThankForRegisterPage />}/>
              <Route path="email-verification/:token"  element={<EmailVerifyPage />} />
              <Route path="producer/account-recovery/:token"  element={<AccountRecovery />}  />
            {/* without login  */}


              <Route path="settings" element={<SettingsPage />} />
              <Route path="/purchseHistory" element={<PurchasHistoryPage />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/collection-iframe/:shopname/:collectionId" element={<CollectionIframe />}/>

              {/* producer pages */}
              <Route path="producer" element={<UserWrapper />}>
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
              <Route path=":shopname" element={<UserWrapper />}>

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

              
            </Route>
          </Routes>
        </Suspense>
    </BrowserRouter>
  );
}

export default App;
