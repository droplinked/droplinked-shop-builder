import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { ChakraProvider } from "@chakra-ui/react";
import { WalletProvider } from "./context/wallet/WalletContext";
import ToastifyProvider from "./context/toastify/ToastContext";
import CartProvider from "./context/cart/CartContext";
import ProfileProvider from "./context/profile/ProfileContext";
import AddressProvider from "./context/address/AddressContext";
import NotificationProvider from "./context/notifications/NotificationsContext";
import ShopProvider from "./context/shop/ShopContext";

ReactDOM.render(
  <React.StrictMode>
    <ToastifyProvider>
      <ProfileProvider>
        <CartProvider>
          <ChakraProvider>
            <WalletProvider>
              <AddressProvider>
                <NotificationProvider>
                  <ShopProvider>
                    <App />
                  </ShopProvider>
                </NotificationProvider>
              </AddressProvider>
            </WalletProvider>
          </ChakraProvider>
        </CartProvider>
      </ProfileProvider>
    </ToastifyProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
