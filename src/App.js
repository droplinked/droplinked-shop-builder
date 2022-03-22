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
function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
       <Routes>
          <Route  exact path="/" element={<MainPage />} />
          <Route   path="/buy/:buyId" element={<Buy />} />
          <Route   path="/checkout" element={<Checkout />} />
          <Route   path="/address" element={<Address />} />
          <Route   path="/payments" element={<Payments />} />
          <Route   path="/*" element={<NotFound />} />
       </Routes>
      </WalletProvider>
    </BrowserRouter>
  );
}

export default App;
