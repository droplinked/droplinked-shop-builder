import logo from './logo.svg';
import './App.scss';
import MainPage from './layout/MainPage'
import NotFound from './layout/NotFound'
import Buy from './layout/Buy'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { WalletProvider } from "./components/context/context"
import Checkout from "./components/checkout/Checkout"
import Address from "./components/Address/Address"
import Payments from "./components/Payments/Payments"
import CartContextProvider from "../src/components/context/CartContext"
import AddressContextProvider from "../src/components/context/AddressContext"
import Shipping from "../src/components/shipping/Shipping"
import Confirm from "./components/confirm-page/Confirm"
import Main from "./components/pages/main/Main"
import Test from "./components/pages/crshpunk/Test.jsx"
function App() {
  return (
   
    <CartContextProvider>
    <BrowserRouter>
      <WalletProvider>
       <Routes>
          <Route  exact path="/" element={<Main />} />
          <Route   path="/crashpunks" element={<Test />} />
          <Route   path="/main" element={<MainPage />} />
          <Route   path="/buy/:buyId" element={<Buy />} />
          <Route   path="/checkout" element={<Checkout />} />
          
             <Route   path="/address" element={
               <AddressContextProvider>
                <Address />
              </AddressContextProvider>
             } />
          <Route   path="/Shipping" element={<Shipping />} />
          <Route   path="/payment" element={<Payments />} />
          <Route   path="/confirm" element={<Confirm />} />
          <Route   path="/*" element={<NotFound />} />
       </Routes>
      </WalletProvider>
    </BrowserRouter>
    </CartContextProvider>
    
  );
}

export default App;
