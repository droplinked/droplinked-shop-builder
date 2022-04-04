import './App.scss';
import MainPage from './layout/mainpage/MainPage'
import NotFound from './layout/notfound/NotFound'
import Buy from './layout/buy/Buy'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { WalletProvider } from "./sevices/context/context"
import Checkout from "./layout/checkout/Checkout"
import Address from "./layout/address/Address"
import Payments from "./layout/payment/Payments"
import CartContextProvider from "./sevices/context/CartContext"
import AddressContextProvider from "./sevices/context/AddressContext"
import Shipping from "./layout/shiping/Shipping"
import Confirm from "./layout/confirm/Confirm"
import Main from "./layout/landing/Main"
import Test from "./layout/crashpunk/Test.jsx"
import Test1 from "./layout/test/Test1"
function App() {
  return (
   
    <CartContextProvider>
    <BrowserRouter>
      <WalletProvider>
       <Routes>
          <Route  exact path="/" element={<Main />} />
          <Route   path="/crashpunks" element={<Test />} />
          <Route   path="/main" element={<MainPage />} />
          <Route   path="/test123" element={<Test1 />} />
          <Route   path="/checkout" element={<Checkout />} />
          
             <Route   path="/address" element={
               <AddressContextProvider>
                <Address />
              </AddressContextProvider>
             } />
             <Route   path="/buy/:buyId" element={<Buy />} />
          <Route   path="/Shipping" element={<Shipping />} />
          <Route   path="/payment" element={<Payments />} />
          <Route   path="/confirm" element={<Confirm />} />
          <Route   path="/test123" element={<Test1 />} />
          <Route   path="/*" element={<NotFound />} />
       </Routes>
      </WalletProvider>
    </BrowserRouter>
    </CartContextProvider>
    
  );
}

export default App;
