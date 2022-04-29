import "./App.scss";
import NotFound from "./layout/notfound/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./sevices/context/context";
import ProfileContextProvider from "./sevices/context/ProfileContext";
import CartContextProvider from "./sevices/context/CartContext";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./components/features/footer/Footer";
import MainHeader from "./components/features/header/MainHeader";
import HomeWrapper from "./components/Structure/new wrapper/HomeWrapper";
import CreatorPage from "./layout/creator/CreatorPage";
import PostPage from "./layout/postpage/PostPage";
import CollectionPage from "./layout/collection page/CollectionPage";
import Checkout from "./layout/checkout/Checkout"
import HomePage from "./layout/homepage test/HomePage";
import BuyProduct from "./layout/buy product/BuyProduct";
import Terms from "./layout/terms/Terms";
import Privacy from "./layout/privacy/Privacy";
import Crashpunks from "./layout/crashpunk/crashpunks";
//import Product from "./layout/product/Product"
import Main from "./layout/landing/Main";
import ProctuPageTest from "./layout/product list test/ProctuPageTest";
import Address from "./layout/address/Address"

function App() {
  return (
    <div style={{ backgroundColor: "#222" }}>
      <ProfileContextProvider>
        <ChakraProvider>
          <CartContextProvider>
            <BrowserRouter>
              <WalletProvider>
                <MainHeader />
                <HomeWrapper>
                  <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/creatorpage" element={<CreatorPage />} />
                    <Route path="/postpage" element={<PostPage />} />
                    <Route
                      path="/collectionpage"
                      element={<CollectionPage />}
                    />
                     <Route path="/cart" element={<Checkout />} />
                     <Route path="/address" element={<Address />} />
                    <Route path="/productList" element={<ProctuPageTest />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/crashpunks" element={<Crashpunks />} />
                    <Route path="/product/:id" element={<BuyProduct />} />
                    <Route path="/*" element={<NotFound />} />
                  </Routes>
                </HomeWrapper>
                <Footer />
              </WalletProvider>
            </BrowserRouter>
          </CartContextProvider>
        </ChakraProvider>
      </ProfileContextProvider>
    </div>
  );
}

export default App;
