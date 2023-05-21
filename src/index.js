import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";

import ToastifyProvider from "./context/toastify/ToastContext";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient ()

ReactDOM.render(
  <React.StrictMode>
    <ToastifyProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </QueryClientProvider>
    </ToastifyProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();
