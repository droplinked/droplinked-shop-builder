import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import AppToastify from "common/toastify/AppToastify";
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <AppToastify />
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} >
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();
