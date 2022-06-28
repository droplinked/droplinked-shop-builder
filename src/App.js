import "./App.scss";
import NotFound from "./layout/general pages/notfound/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./sevices/context/context";
import ProfileContextProvider from "./sevices/context/ProfileContext";
import CartContextProvider from "./sevices/context/CartContext";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContext } from "./sevices/context/Toast-context";
import Footer from "./components/features/footer/Footer";
import MainHeader from "./components/features/header/MainHeader";
import HomeWrapper from "./components/Structure/new wrapper/HomeWrapper";
import CreatorPage from "./layout/creator/CreatorPage";
import PostPage from "./layout/postpage/PostPage";
import HomePage from "./layout/landing page/HomePage";
import BuyProduct from "./layout/buy product/BuyProduct";
import Terms from "./layout/terms/Terms";
import Privacy from "./layout/privacy/Privacy";
import Crashpunks from "./layout/crashpunk/crashpunks"; //crashpunks page
import Address from "./layout/buy proccess/address/Address";
import Shipping from "./layout/buy proccess/shiping/Shipping";
import Payments from "./layout/buy proccess/payment/Payments";
import Confirm from "./layout/confirm/Confirm";
import Settings from "./layout/general pages/settings/Setting";
import ThankPage from "./layout/registering/thanks for register/ThankForRegister";
import PersonalInfo from "./layout/registering/personal info/PersonalInfo";
import ShopInfo from "./layout/registering/shop info/ShopInfo";
import ImsSelect from "./layout/registering/IMS select/ImsSelect";
import RegisterPayment from "./layout/registering/register payment page/RegisterPayment";
import ScrollTop from "./components/features/scrolltop/ScrollTop";
//import ShopPage from "./layout/Producer pages/Main page/shop page/Shop-page-component";
import ImsMainPage from "./layout/Producer pages/IMS pages/ImsMainPage";
import AddProductPage from "./layout/Producer pages/add product page/Add-product-page";
import RuleSetPage from "./layout/Producer pages/ruleset page/RuleSet-page-component";
import CollectionMainPage from "./layout/Producer pages/collection pages/Collection main page/Collection-mainpage-component";
import AddCollectionPage from "./layout/Producer pages/collection pages/add collection page/Add-collection-component";

import AccountRecoveryPage from "./layout/registering/account recovery page/Account-recovery-page";
import VerificationEmailPage from "./layout/registering/verifi-email-page/Email-verification-component";
import ViewMerchPage from "./layout/Producer pages/IMS pages/view merch page/View-merch-component";
import DimsMerchPage from "./layout/customer pages/merch page/dims-Merch-page-component";
import CheckoutPage from "./layout/customer pages/checkout page/checkout-page";
import ShopifyMerchViewPage from "./layout/Producer pages/IMS pages/shopify-merch-view/Shopify-merch-view-page";
import ShopPage from "./layout/general pages/shop page/shop-page";
import CollectionPage from "./layout/general pages/collectiom page/collection-page-component";
import Checkout from "./layout/checkout/Checkout"
import AddressPage from "./layout/address_page/AddressPage"
import RegisterStructure from "./layout/registering/register structure/RegisterStructure"
import ProducerWrapper from "./layout/Producer pages/Producer wrapper/Producer-wrapper"
import PaymentPage from "./layout/buying/payment page/Payment-page"

function App() {
  return (
    <div style={{ backgroundColor: "#222" }}>
         <CartContextProvider>
          <ProfileContextProvider>
           <ChakraProvider>
             <WalletProvider>
               <BrowserRouter>
                <ToastContext>
                    <ScrollTop>
                      <Routes>
                        <Route path="/" element={<HomeWrapper />}>

                        <Route index element={<HomePage />} />
                        <Route exact path="terms" element={<Terms />} />
                        <Route exact path="privacy" element={<Privacy />} />

                        {/* register pages */}
                        <Route exact  path="register" element={<RegisterStructure />}>
                          <Route  path="personalInfo" element={<PersonalInfo />} />
                          <Route  path="shopInfo" element={<ShopInfo />} />
                          <Route  path="IMSSelect" element={<ImsSelect />} />
                          {/* <Route  path="/payment" element={<RegisterPayment />} /> */}
                        </Route>

                      
                        <Route exact path="emailConfirmation" element={<ThankPage />} />
                        <Route exact path="email-verification/:token" element={<VerificationEmailPage />}   />

                      {/* producer pages */}
                        <Route exact path="producer" element={<ProducerWrapper />}>
                          <Route  path="ims" element={<ImsMainPage />} />
                          <Route  path="Merch/:id" element={<ViewMerchPage />} />
                          <Route  path="addProduct" element={<AddProductPage />} />
                          <Route  path="ruleset"  element={<RuleSetPage />}  />
                          <Route  path="collection"   element={<CollectionMainPage />}  />
                          <Route  path="collection/addCollection"  element={<AddCollectionPage />}  />
                          <Route  path="account-recovery/:token"  element={<AccountRecoveryPage />} />
                        </Route> 

                      {/* shop pages */}
                        <Route exact path=":shopname" element={<ProducerWrapper />}>
                           <Route index element={<ShopPage />} />
                          <Route path="merch/:merchId" element={<DimsMerchPage />} />
                          <Route path="collection/:collectionId"  element={<CollectionPage />}  />
                        </Route>
                        
                        <Route exact path="checkout" element={<Checkout />} />
                        <Route exact path="/creatorpage" element={<CreatorPage />} />
                        <Route exact path="/crashpunks" element={<CreatorPage />} />
                        <Route exact path="/product/:id" element={<BuyProduct />} />
					            	<Route exact path="/address" element={<AddressPage />} />
                        <Route exact path="/payment" element={<PaymentPage />} /> 

                        {/* <Route path="/postpage" element={<PostPage />} /> */}

                        {/* <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/address" element={<Address />} />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/payment" element={<Payments />} /> 
                        <Route path="/confirm" element={<Confirm />} />*/}

                        <Route path="/test"  element={<ShopifyMerchViewPage />}  />
                        <Route path="/*" element={<NotFound />} />

                        </Route>
                      </Routes>
                    </ScrollTop>
                </ToastContext>
              </BrowserRouter>
            </WalletProvider>
          </ChakraProvider>
        </ProfileContextProvider>
      </CartContextProvider>
    </div>
  );
}

export default App;
