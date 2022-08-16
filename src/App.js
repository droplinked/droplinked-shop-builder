import "./App.scss";
//import RegisterShop from "./pages/Registering-pages/register-shop/Shop-page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/wallet/WalletContext";
import { ChakraProvider } from "@chakra-ui/react";
import { lazy, Suspense } from "react";

import ShopContextProvider from "./context/shop/ShopContext";
import ProfileContextProvider from "./context/profile/ProfileContext";
import CartContextProvider from "./context/cart/CartContext";
import ToastContext from "./context/toastify/ToastContext";
import AddressContext from "./context/address/AddressContext";
import ScrollTop from "./services/scroll-top/ScrollTop";
import OrderContextProvider from "./context/order/OrdersContext";
import NotContextProvider from "./context/notifications/NotificationsContext";
import LoadingPage from "./pages/loading/Loading-page";

//const OtherComponent = React.lazy(() => import('./OtherComponent'));
const PageWrapper = lazy(() => import("./pages/Page-wrapper/PageWrapper"));
const LandingPage = lazy(() => import("./pages/landing/Landing-page"));
//import LandingPage from "./pages/landing/Landing-page";
const TermsPage = lazy(() => import("./pages/terms/Terms-page"));
//import TermsPage from "./pages/terms/Terms-page";
const PrivacyPage = lazy(() => import("./pages/privacy/Privacy-page"));
//import PrivacyPage from "./pages/privacy/Privacy-page";
const RegisterPage = lazy(() =>
  import("./pages/Registering-pages/register/Register-page")
);
//import RegisterPage from "./pages/Registering-pages/register/Register-page";

const RegisterIms = lazy(() =>
  import("./pages/Registering-pages/register-ims/Ims-page")
);
//import RegisterIms from "./pages/Registering-pages/register-ims/Ims-page";
const EmailVerifyPage = lazy(() =>
  import("./pages/email-verify/Email-verification-page")
);
// import EmailVerifyPage from "./pages/email-verify/Email-verification-page";
const AccountRecoveryPage = lazy(() =>
  import("./pages/account-recovery/Account-recovery-page")
);
// import AccountRecoveryPage from "./pages/account-recovery/Account-recovery-page";
const ThankForRegisterPage = lazy(() =>
  import("./pages/thanks-for-register/ThankForRegister-page")
);
//import ThankForRegisterPage from "./pages/thanks-for-register/ThankForRegister-page";
const InventoryPage = lazy(() =>
  import("./pages/Producer-pages/ims/Inventory-page")
);
//import InventoryPage from "./pages/Producer-pages/ims/Inventory-page";
const ViewMerchPage = lazy(() =>
  import("./pages/Producer-pages/view-merch/View-merch-page")
);
//import ViewMerchPage from "./pages/Producer-pages/view-merch/View-merch-page";
const AddProductPage = lazy(() =>
  import("./pages/Producer-pages/add-product/Add-product-page")
);
//import AddProductPage from "./pages/Producer-pages/add-product/Add-product-page";
const RuleSetPage = lazy(() =>
  import("./pages/Producer-pages/rulesets/RuleSet-page")
);
//import RuleSetPage from "./pages/Producer-pages/rulesets/RuleSet-page";
const CollectionMainPage = lazy(() =>
  import("./pages/Producer-pages/collection/Collection-page")
);
//import CollectionMainPage from "./pages/Producer-pages/collection/Collection-page";
const ShopPage = lazy(() => import("./pages/shop/Shop-page"));
//import ShopPage from "./pages/shop/Shop-page";
const MerchPage = lazy(() => import("./pages/merch/Merch-page"));
// import MerchPage from "./pages/merch/Merch-page";
const CollectionPage = lazy(() => import("./pages/collection/Collection-page"));
//import CollectionPage from "./pages/collection/Collection-page";
const CheckoutPage = lazy(() =>
  import("./pages/buy-process-pages/checkout/Checkout-page")
);
//import CheckoutPage from "./pages/buy-process-pages/checkout/Checkout-page";
const AddressPage = lazy(() =>
  import("./pages/buy-process-pages/address/Address-Page")
);
//import AddressPage from "./pages/buy-process-pages/address/Address-Page";
const PaymentPage = lazy(() =>
  import("./pages/buy-process-pages/payment/Payment-page")
);
//import PaymentPage from "./pages/buy-process-pages/payment/Payment-page";
const CreatorPage = lazy(() => import("./pages/Crashpunks-page/CreatorPage"));
//import CreatorPage from "./pages/Crashpunks-page/CreatorPage";
const BuyProduct = lazy(() => import("./pages/buy-crashpunks/BuyProduct"));
//import BuyProduct from "./pages/buy-crashpunks/BuyProduct";
const SettingsPage = lazy(() => import("./pages/settings/Settings-page"));
//import SettingsPage from "./pages/settings/Settings-page";
const IncomingOrderPage = lazy(() =>
  import("./pages/Producer-pages/incomin-order/IncomingOrder-page")
);
//import IncomingOrderPage from "./pages/Producer-pages/incomin-order/IncomingOrder-page";
const Creator = lazy(() => import("./pages/creator/CreatorPage"));
//import Creator from "./pages/creator/CreatorPage";
const PurchasHistoryPage = lazy(() =>
  import("./pages/purchase-history/PurchaseHistory")
);
//import PurchasHistoryPage from "./pages/purchase-history/PurchaseHistory";
const Producer = lazy(() =>
  import("./pages/producer-wrapper/Producer-wrapper-page")
);
//import Producer from "./pages/producer-wrapper/Producer-wrapper-page";
const Notifications = lazy(() =>
  import("./pages/notifications/Notifications-page")
);
//import Notifications from "./pages/notifications/Notifications-page";
const CollectionIframe = lazy(() =>
  import("./pages/collection-iframe/CollectionIfram-page")
);
//import CollectionIframe from "./pages/collection-iframe/CollectionIfram-page";
const Test = lazy(() => import("./pages/test/Test-page"));
//import Test from "./pages/test/Test-page";
const ShopInfoComponent = lazy(() =>
  import("./pages/settings/shop-info-component/Shop-info-component")
);
//import ShopInfoComponent from "./pages/settings/shop-info-component/Shop-info-component"

function App() {
  return (
    <ToastContext>
      <CartContextProvider>
        <ProfileContextProvider>
          <ChakraProvider>
            <WalletProvider>
              <AddressContext>
                <NotContextProvider>
                  <ShopContextProvider>
                    <BrowserRouter>
                      <ScrollTop>

                        <Suspense fallback={<LoadingPage />}>
                          <Routes>
                            <Route path="/" element={<PageWrapper />}>
                              <Route index element={<LandingPage />} />
                              <Route path="terms" element={<TermsPage />} />
                              <Route path="privacy" element={<PrivacyPage />} />
                              <Route path="register" element={<RegisterPage />}>
                                <Route
                                  path="shopInfo"
                                  element={<ShopInfoComponent />}
                                />
                                <Route
                                  path="IMSSelect"
                                  element={<RegisterIms />}
                                />
                              </Route>
                              <Route
                                path="emailConfirmation"
                                element={<ThankForRegisterPage />}
                              />
                              <Route
                                path="email-verification/:token"
                                element={<EmailVerifyPage />}
                              />
                              <Route
                                path="settings"
                                element={<SettingsPage />}
                              />

                              <Route path="producer" element={<Producer />}>
                                <Route path="ims" element={<InventoryPage />} />
                                <Route
                                  path="Merch/:id"
                                  element={<ViewMerchPage />}
                                />
                                <Route
                                  path="account-recovery/:token"
                                  element={<AccountRecoveryPage />}
                                />
                                <Route
                                  path="addProduct"
                                  element={<AddProductPage />}
                                />
                                <Route
                                  path="ruleset"
                                  element={<RuleSetPage />}
                                />
                                <Route
                                  path="collection"
                                  element={<CollectionMainPage />}
                                />
                                <Route
                                  path="orders"
                                  element={
                                    <OrderContextProvider>
                                      <IncomingOrderPage />
                                    </OrderContextProvider>
                                  }
                                />
                              </Route>

                              <Route path=":shopname" element={<ShopPage />} />
                              <Route
                                path=":shopname/merch/:merchId"
                                element={<MerchPage />}
                              />
                              <Route
                                path=":shopname/collection/:collectionId"
                                element={<CollectionPage />}
                              />
                              <Route
                                path="/purchseHistory"
                                element={<PurchasHistoryPage />}
                              />
                              <Route
                                path="checkout"
                                element={<CheckoutPage />}
                              />
                              <Route
                                path="/address"
                                element={<AddressPage />}
                              />
                              <Route
                                path="/payment"
                                element={<PaymentPage />}
                              />
                              <Route
                                path="/crashpunks"
                                element={<CreatorPage />}
                              />
                              <Route
                                path="/product/:id"
                                element={<BuyProduct />}
                              />
                              <Route
                                path="/creatorpage"
                                element={<Creator />}
                              />
                              <Route
                                path="/notifications"
                                element={<Notifications />}
                              />
                              <Route
                                path="/collection-iframe/:shopname/:collectionId"
                                element={<CollectionIframe />}
                              />
                              <Route path="/test" element={<Test />} />
                            </Route>
                          </Routes>
                        </Suspense>
                      </ScrollTop>
                    </BrowserRouter>
                  </ShopContextProvider>
                </NotContextProvider>
              </AddressContext>
            </WalletProvider>
          </ChakraProvider>
        </ProfileContextProvider>
      </CartContextProvider>
    </ToastContext>
  );
}

export default App;
