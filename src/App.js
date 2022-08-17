import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/wallet/WalletContext";
import { ChakraProvider } from "@chakra-ui/react";
import { lazy, Suspense } from "react";

import ShopProvider from "./context/shop/ShopContext";
import ProfileProvider from "./context/profile/ProfileContext";
import CartProvider from "./context/cart/CartContext";
import ToastifyProvider from "./context/toastify/ToastContext";
import AddressProvider from "./context/address/AddressContext";
import ScrollTop from "./services/scroll-top/ScrollTop";
import OrderContextProvider from "./context/order/OrdersContext";
import NotificationProvider from "./context/notifications/NotificationsContext";
import LoadingPage from "./pages/loading/Loading-page";

const PageWrapper = lazy(() => import("./pages/Page-wrapper/PageWrapper"));
const LandingPage = lazy(() => import("./pages/landing/Landing-page"));
const TermsPage = lazy(() => import("./pages/terms/Terms-page"));
const PrivacyPage = lazy(() => import("./pages/privacy/Privacy-page"));
const RegisterPage = lazy(() =>
  import("./pages/Registering-pages/register/Register-page")
);

const RegisterIms = lazy(() =>
  import("./pages/Registering-pages/register-ims/Ims-page")
);
const EmailVerifyPage = lazy(() =>
  import("./pages/email-verify/Email-verification-page")
);
const AccountRecovery = lazy(() =>
  import("./pages/account-recovery/Account-recovery")
);
const ThankForRegisterPage = lazy(() =>
  import("./pages/thanks-for-register/ThankForRegister-page")
);
const InventoryPage = lazy(() =>
  import("./pages/Producer-pages/ims/Inventory-page")
);
const ViewMerchPage = lazy(() =>
  import("./pages/Producer-pages/view-merch/View-merch-page")
);
const AddProductPage = lazy(() =>
  import("./pages/Producer-pages/add-product/Add-product-page")
);
const RuleSetPage = lazy(() =>
  import("./pages/Producer-pages/rulesets/RuleSet-page")
);
const CollectionMainPage = lazy(() =>
  import("./pages/Producer-pages/collection/Collection-page")
);
const ShopPage = lazy(() => import("./pages/shop/Shop-page"));
const MerchPage = lazy(() => import("./pages/merch/Merch-page"));
const CollectionPage = lazy(() => import("./pages/collection/Collection-page"));
const CheckoutPage = lazy(() =>
  import("./pages/buy-process-pages/checkout/Checkout-page")
);
const AddressPage = lazy(() =>
  import("./pages/buy-process-pages/address/Address-Page")
);
const PaymentPage = lazy(() =>
  import("./pages/buy-process-pages/payment/Payment-page")
);
const CreatorPage = lazy(() => import("./pages/Crashpunks-page/CreatorPage"));
const BuyProduct = lazy(() => import("./pages/buy-crashpunks/BuyProduct"));

const SettingsPage = lazy(() => import("./pages/settings/Settings-page"));

const IncomingOrderPage = lazy(() =>
  import("./pages/Producer-pages/incomin-order/IncomingOrder-page")
);
const Creator = lazy(() => import("./pages/creator/CreatorPage"));
const PurchasHistoryPage = lazy(() =>
  import("./pages/purchase-history/PurchaseHistory")
);
const Producer = lazy(() =>
  import("./pages/producer-wrapper/Producer-wrapper-page")
);
const Notifications = lazy(() =>
  import("./pages/notifications/Notifications-page")
);
const CollectionIframe = lazy(() =>
  import("./pages/collection-iframe/CollectionIfram-page")
);
const Test = lazy(() => import("./pages/test/Test-page"));
const ShopInfoComponent = lazy(() =>
  import("./pages/settings/shop-info-component/Shop-info-component")
);

function App() {
  return (
    <ToastifyProvider>
      <CartProvider>
        <ProfileProvider>
          <ChakraProvider>
            <WalletProvider>
              <AddressProvider>
                <NotificationProvider>
                  <ShopProvider>
                    <BrowserRouter>
                      <ScrollTop>
                        <Suspense fallback={<LoadingPage />}>
                          <Routes>
                            <Route path="/" element={<PageWrapper />}>
                              <Route index element={<LandingPage />} />
                              <Route path="terms" element={<TermsPage />} />
                              <Route path="privacy" element={<PrivacyPage />} />

                              {/* register */}
                              <Route path="register" element={<RegisterPage />}>
                                <Route
                                  path="shop-info"
                                  element={<ShopInfoComponent />}
                                />
                                <Route
                                  path="ims-type"
                                  element={<RegisterIms />}
                                />
                              </Route>
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
                                path="settings"
                                element={<SettingsPage />}
                              />

                              {/* producer pages */}
                              <Route path="producer" element={<Producer />}>
                                <Route path="ims" element={<InventoryPage />} />
                                <Route
                                  path="merch/:id"
                                  element={<ViewMerchPage />}
                                />
                                <Route
                                  path="account-recovery/:token"
                                  element={<AccountRecovery />}
                                />
                                <Route
                                  path="add-product"
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
                              {/* producer pages */}

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
                  </ShopProvider>
                </NotificationProvider>
              </AddressProvider>
            </WalletProvider>
          </ChakraProvider>
        </ProfileProvider>
      </CartProvider>
    </ToastifyProvider>
  );
}

export default App;
