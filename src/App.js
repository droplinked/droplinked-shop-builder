import "./App.scss";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./sevices/context/context";
import ProfileContextProvider from "./sevices/context/ProfileContext";
import CartContextProvider from "./sevices/context/CartContext";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContext } from "./sevices/context/Toast-context";
import ScrollTop from "./components/features/scrolltop/ScrollTop";


//import HomeWrapper from "./components/Structure/new wrapper/HomeWrapper";
//import CreatorPage from "./layout/creator/CreatorPage";
//import HomePage from "./layout/landing page/HomePage";
//import BuyProduct from "./layout/buy product/BuyProduct";
//import Terms from "./layout/general pages/terms/Terms";
//import Privacy from "./layout/general pages/privacy/Privacy";
//import Crashpunks from "./layout/crashpunk/crashpunks"; //crashpunks page
//import ThankPage from "./layout/registering/thanks for register/ThankForRegister";
//import PersonalInfo from "./layout/registering/personal info/PersonalInfo";
//import ShopInfo from "./layout/registering/shop info/ShopInfo";
//import ImsSelect from "./layout/registering/IMS select/ImsSelect";
//import RegisterPayment from "./layout/registering/register payment page/RegisterPayment";

//import ShopPage from "./layout/Producer pages/Main page/shop page/Shop-page-component";
//import ImsMainPage from "./layout/Producer pages/IMS pages/ImsMainPage";
//import AddProductPage from "./layout/Producer pages/add product page/Add-product-page";
//import RuleSetPage from "./layout/Producer pages/ruleset page/RuleSet-page-component";
//import CollectionMainPage from "./layout/Producer pages/collection pages/Collection main page/Collection-mainpage-component";
//import AddCollectionPage from "./layout/Producer pages/collection pages/add collection page/Add-collection-component";

//import AccountRecoveryPage from "./layout/registering/account recovery page/Account-recovery-page";
//import VerificationEmailPage from "./layout/registering/verifi-email-page/Email-verification-component";
//import ViewMerchPage from "./layout/Producer pages/IMS pages/view merch page/View-merch-component";
//import DimsMerchPage from "./layout/customer pages/merch page/dims-Merch-page-component";
//import ShopifyMerchViewPage from "./layout/Producer pages/IMS pages/shopify-merch-view/Shopify-merch-view-page";
//import ShopPage from "./layout/basic pages/shop page/shop-page";
//import CollectionPage from "./layout/basic pages/collectiom page/collection-page-component";
//import Checkout from "./layout/basic pages/checkout/Checkout"
//import AddressPage from "./layout/basic pages/address_page/AddressPage"
//import RegisterStructure from "./layout/registering/register structure/RegisterStructure"
//import ProducerWrapper from "./layout/Producer pages/Producer wrapper/Producer-wrapper"
//import PaymentPage from "./layout/basic pages/payment page/Payment-page"
//import SettingsPage from "./layout/basic pages/settings-page/Settings-page"


import PageWrapper from "./pages/Page-wrapper/PageWrapper"
import LandingPage from "./pages/Landing-page/Landing-page";
import TermsPage from "./pages/Terms-page/Terms-page"
import PrivacyPage from "./pages/Privacy-page/Privacy-page"
import RegisterPage from "./pages/Registering-pages/Register-page/Register-page"
import PersonalPage from "./pages/Registering-pages/Register-personal-page/Personal-page"
import RegisterShop from "./pages/Registering-pages/Register-shop-page/Shop-page"
import RegisterIms from "./pages/Registering-pages/Register-ims-page/Ims-page";
import EmailVerifyPage from "./pages/EmailVerify-page/Email-verification-page"
import AccountRecoveryPage from "./pages/AccountRecovery-page/Account-recovery-page"
import ThankForRegisterPage from "./pages/ThanksForRegister-page/ThankForRegister-page"
import InventoryPage from "./pages/Producer-pages/IMS pages/Inventory-page"
import ViewMerchPage from "./pages/Producer-pages/ViewMerch-page/View-merch-page"
import AddProductPage from "./pages/Producer-pages/AddProduct-page/Add-product-page"
import RuleSetPage from "./pages/Producer-pages/Rulesets-page/RuleSet-page"
import CollectionMainPage from "./pages/Producer-pages/Collection-page/Collection-page"
import ShopPage from "./pages/Shop-page/Shop-page"
import MerchPage from "./pages/Merch-page/Merch-page"
import CollectionPage from "./pages/Collection-page/Collection-page"
import CheckoutPage from "./pages/BuyProcess-pages/Checkout-page/Checkout-page"
import AddressPage from "./pages/BuyProcess-pages/Address-page/Address-Page"
import PaymentPage from "./pages/BuyProcess-pages/Payment-page/Payment-page"
import CreatorPage from "./pages/Crashpunks-page/CreatorPage"
import BuyProduct from "./pages/BuyCrashpunks-page/BuyProduct"
import SettingsPage from "./pages/Settings-page/Settings-page"


function App() {
  return (
    
         <CartContextProvider>
          <ProfileContextProvider>
           <ChakraProvider>
             <WalletProvider>
               <BrowserRouter>
                <ToastContext>
                    <ScrollTop>
                      <Routes>
                        <Route path="/" element={<PageWrapper />}>

                        <Route index element={<LandingPage />} />
                        <Route  path="terms" element={<TermsPage />} />
                        <Route  path="privacy" element={<PrivacyPage />} />

                        
                        <Route   path="register" element={<RegisterPage />}>
                          <Route  path="personalInfo" element={<PersonalPage />} />
                          <Route  path="shopInfo" element={<RegisterShop />} />
                          <Route  path="IMSSelect" element={<RegisterIms />} />
                        </Route>
  
                        <Route  path="emailConfirmation" element={<ThankForRegisterPage />} />
                        <Route  path="email-verification/:token" element={<EmailVerifyPage />}   />
                        <Route  path="settings" element={<SettingsPage />} />


                        <Route  path="producer/ims" element={<InventoryPage />} />
                        <Route  path="producer/Merch/:id" element={<ViewMerchPage />} />
                        <Route  path="producer/account-recovery/:token"  element={<AccountRecoveryPage />} />
                        <Route  path="producer/addProduct" element={<AddProductPage />} />
                        <Route  path="producer/ruleset"  element={<RuleSetPage />}  />
                        <Route  path="producer/collection"   element={<CollectionMainPage />}  />
                

                        <Route  path=":shopname" element={<ShopPage /> }/>
                        <Route path=":shopname/merch/:merchId" element={<MerchPage />} />
                        <Route path=":shopname/collection/:collectionId"  element={<CollectionPage />}  />
   
                        <Route  path="checkout" element={<CheckoutPage />} />
                        <Route  path="/address" element={<AddressPage />} />
                        <Route  path="/payment" element={<PaymentPage />} />  
                        <Route  path="/crashpunks" element={<CreatorPage />} />
                        <Route  path="/product/:id" element={<BuyProduct />} />
                       
                        {/* <Route path="/*" element={<NotFound />} /> */}

                        </Route>
                      </Routes>
                    </ScrollTop>
                </ToastContext>
              </BrowserRouter>
            </WalletProvider>
          </ChakraProvider>
        </ProfileContextProvider>
      </CartContextProvider>
    
  );
}

export default App;
