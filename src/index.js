import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { Provider } from "react-redux";
import { store } from './store/store';
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";

import ToastifyProvider from "./context/toastify/ToastContext";
import CartProvider from "./context/cart/CartContext";

ReactDOM.render(
  <React.StrictMode>
    <ToastifyProvider>
      <Provider store={store}>
            <CartProvider>
              <ChakraProvider theme={theme}>
                      <App />
              </ChakraProvider>
            </CartProvider>
      </Provider>
    </ToastifyProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();
