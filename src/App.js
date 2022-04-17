import "./App.scss";
import NotFound from "./layout/notfound/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./sevices/context/context";
import Checkout from "./layout/checkout/Checkout";
import Address from "./layout/address/Address";
import CartContextProvider from "./sevices/context/CartContext";
import Confirm from "./layout/confirm/Confirm";
import Main from "./layout/landing/Main";
import Test from "./layout/crashpunk/Test.jsx";

import { ChakraProvider } from "@chakra-ui/react";
import Products from "./components/pages/products/Products";
//import MainHeader from "./components/features/header/MainHeader";
import Footer from "./components/features/footer/Footer";
import MainWrapper from "./components/Structure/page wrapper/MainWrapper";
import Collectoins from "./components/pages/nft/Collections";
import Product from "./layout/product/Product";
import Creadit from "./layout/payment/Creadit";
import Shipping from "./layout/shiping/Shipping"
import Header from "./components/features/old header/Header"
import NewProduct from "./layout/newProduct/NewProduct"
import MainHeader from "./components/features/header/MainHeader"
import Test1 from "./layout/test/Test1"

function App() {
  return (
    <ChakraProvider>
      <CartContextProvider>
        <BrowserRouter>
          <WalletProvider>
            
              {/* <MainHeader /> */}
              {/* <MainWrapper> */}
                <Routes>
                  <Route exact path="/" element={<Test1 />} />
                  <Route path="/crashpunks" element={<Test />} />
                  <Route path="/collection123" element={<Collectoins />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/shopping" element={<Checkout />} />
                  <Route path="/address" element={<Address />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/payment" element={<Creadit />} />
                  <Route path="/confirm" element={<Confirm />} />
                  <Route path="/test123" element={<Test1 />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              {/* </MainWrapper>
              <Footer /> */}
            
          </WalletProvider>
        </BrowserRouter>
      </CartContextProvider>
    </ChakraProvider>
  );
}

export default App;
