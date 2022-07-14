import "./App.scss";

//
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./sevices/context/context";
import ProfileContextProvider from "./context/profile/ProfileContext";
import CartContextProvider from "./context/cart/CartContext";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContext } from "./sevices/context/Toast-context";
import AddressContext from "./sevices/context/AddressContext";
import ScrollTop from "./services/ScrollTop/ScrollTop";
import OrderContextProvider from "./sevices/context/OrdersContext"

import PageWrapper from "./pages/Page-wrapper/PageWrapper";
import LandingPage from "./pages/Landing-page/Landing-page";
import TermsPage from "./pages/Terms-page/Terms-page";
import PrivacyPage from "./pages/Privacy-page/Privacy-page";
import RegisterPage from "./pages/Registering-pages/Register-page/Register-page";
import PersonalPage from "./pages/Registering-pages/Register-personal-page/Personal-page";
import RegisterShop from "./pages/Registering-pages/Register-shop-page/Shop-page";
import RegisterIms from "./pages/Registering-pages/Register-ims-page/Ims-page";
import EmailVerifyPage from "./pages/EmailVerify-page/Email-verification-page";
import AccountRecoveryPage from "./pages/AccountRecovery-page/Account-recovery-page";
import ThankForRegisterPage from "./pages/ThanksForRegister-page/ThankForRegister-page";
import InventoryPage from "./pages/Producer-pages/IMS pages/Inventory-page";
import ViewMerchPage from "./pages/Producer-pages/ViewMerch-page/View-merch-page";
import AddProductPage from "./pages/Producer-pages/AddProduct-page/Add-product-page";
import RuleSetPage from "./pages/Producer-pages/Rulesets-page/RuleSet-page";
import CollectionMainPage from "./pages/Producer-pages/Collection-page/Collection-page";
import ShopPage from "./pages/Shop-page/Shop-page";
import MerchPage from "./pages/Merch-page/Merch-page";
import CollectionPage from "./pages/Collection-page/Collection-page";
import CheckoutPage from "./pages/BuyProcess-pages/Checkout-page/Checkout-page";
import AddressPage from "./pages/BuyProcess-pages/Address-page/Address-Page";
import PaymentPage from "./pages/BuyProcess-pages/Payment-page/Payment-page";
import CreatorPage from "./pages/Crashpunks-page/CreatorPage";
import BuyProduct from "./pages/BuyCrashpunks-page/BuyProduct";
import SettingsPage from "./pages/Settings-page/Settings-page";
import IncomingOrderPage from "./pages/Producer-pages/IncominOrder-page/IncomingOrder-page";
import Creator from "./pages/Creator-page/CreatorPage";
import PurchasHistoryPage from "./pages/PurchaseHistory-page/PurchaseHistory"

function App() {
  return (
    <ToastContext>
      <CartContextProvider>
        <ProfileContextProvider>
          <ChakraProvider>
            <WalletProvider>
              <AddressContext>
                <OrderContextProvider>
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