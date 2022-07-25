import "./App.scss";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/wallet/WalletContext";
import ProfileContextProvider from "./context/profile/ProfileContext";
import CartContextProvider from "./context/cart/CartContext";
import { ChakraProvider } from "@chakra-ui/react";
import  ToastContext  from "./context/toastify/ToastContext";
import AddressContext from "./context/address/AddressContext";
import ScrollTop from "./services/scroll-top/ScrollTop";
import OrderContextProvider from "./context/order/OrdersContext"
import NotContextProvider from "./context/notifications/NotificationsContext"


import PageWrapper from "./pages/Page-wrapper/PageWrapper";
import LandingPage from "./pages/landing/Landing-page";
import TermsPage from "./pages/terms/Terms-page";
import PrivacyPage from "./pages/privacy/Privacy-page";
import RegisterPage from "./pages/Registering-pages/register/Register-page";
import PersonalPage from "./pages/Registering-pages/register-personal/Personal-page";
import RegisterShop from "./pages/Registering-pages/register-shop/Shop-page";
import RegisterIms from "./pages/Registering-pages/register-ims/Ims-page";
import EmailVerifyPage from "./pages/email-verify/Email-verification-page";
import AccountRecoveryPage from "./pages/account-recovery/Account-recovery-page";
import ThankForRegisterPage from "./pages/thanks-for-register/ThankForRegister-page";
import InventoryPage from "./pages/Producer-pages/ims/Inventory-page";
import ViewMerchPage from "./pages/Producer-pages/view-merch/View-merch-page";
import AddProductPage from "./pages/Producer-pages/add-product/Add-product-page";
import RuleSetPage from "./pages/Producer-pages/rulesets/RuleSet-page";
import CollectionMainPage from "./pages/Producer-pages/collection/Collection-page";
import ShopPage from "./pages/shop/Shop-page";
import MerchPage from "./pages/merch/Merch-page";
import CollectionPage from "./pages/collection/Collection-page";
import CheckoutPage from "./pages/buy-process-pages/checkout/Checkout-page";
import AddressPage from "./pages/buy-process-pages/address/Address-Page";
import PaymentPage from "./pages/buy-process-pages/payment/Payment-page";
import CreatorPage from "./pages/Crashpunks-page/CreatorPage";
import BuyProduct from "./pages/buy-crashpunks/BuyProduct";
import SettingsPage from "./pages/settings/Settings-page";
import IncomingOrderPage from "./pages/Producer-pages/incomin-order/IncomingOrder-page";
import Creator from "./pages/creator/CreatorPage";
import PurchasHistoryPage from "./pages/purchase-history/PurchaseHistory"

function App() {
  return (
    <ToastContext>
      <CartContextProvider>
        <ProfileContextProvider>
          <ChakraProvider>
            <WalletProvider>
              <AddressContext>
                <OrderContextProvider>
                  <NotContextProvider>
                  <BrowserRouter>
                    <ScrollTop>
                      <Routes>
                        <Route path="/" element={<PageWrapper />}>
                          <Route index element={<LandingPage />} />
                          <Route path="terms" element={<TermsPage />} />
                          <Route path="privacy" element={<PrivacyPage />} />
                          <Route path="register" element={<RegisterPage />}>
                            <Route
                              path="personalInfo"
                              element={<PersonalPage />}
                            />
                            <Route path="shopInfo" element={<RegisterShop />} />
                            <Route path="IMSSelect" element={<RegisterIms />} />
                          </Route>
                          <Route
                            path="emailConfirmation"
                            element={<ThankForRegisterPage />}
                          />
                          <Route
                            path="email-verification/:token"
                            element={<EmailVerifyPage />}
                          />
                          <Route path="settings" element={<SettingsPage />} />
                          <Route
                            path="producer/ims"
                            element={<InventoryPage />}
                          />
                          <Route
                            path="producer/Merch/:id"
                            element={<ViewMerchPage />}
                          />
                          <Route
                            path="producer/account-recovery/:token"
                            element={<AccountRecoveryPage />}
                          />
                          <Route
                            path="producer/addProduct"
                            element={<AddProductPage />}
                          />
                          <Route
                            path="producer/ruleset"
                            element={<RuleSetPage />}
                          />
                          <Route
                            path="producer/collection"
                            element={<CollectionMainPage />}
                          />
                          <Route
                            path="producer/orders"
                            element={<IncomingOrderPage />}
                          />
                          <Route path=":shopname" element={<ShopPage />} />
                          <Route
                            path=":shopname/merch/:merchId"
                            element={<MerchPage />}
                          />
                          <Route
                            path=":shopname/collection/:collectionId"
                            element={<CollectionPage />}
                          />
                          <Route path="/purchseHistory" element={<PurchasHistoryPage />} />
                          <Route path="checkout" element={<CheckoutPage />} />
                          <Route path="/address" element={<AddressPage />} />
                          <Route path="/payment" element={<PaymentPage />} />
                          <Route path="/crashpunks" element={<CreatorPage />} />
                          <Route path="/product/:id" element={<BuyProduct />} />
                          <Route path="/creatorpage" element={<Creator />} />
                        </Route>
                      </Routes>
                    </ScrollTop>
                  </BrowserRouter>
                  </NotContextProvider>
                </OrderContextProvider>
              </AddressContext>
            </WalletProvider>
          </ChakraProvider>
        </ProfileContextProvider>
      </CartContextProvider>
    </ToastContext>
  );
}

export default App;