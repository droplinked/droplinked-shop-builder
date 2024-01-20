import React from "react";
import { ClientProvider } from '@micro-stacks/react'
import ReactDOM from "react-dom";
import "assest/style/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { appDeveloment } from "lib/utils/app/variable";
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} >
        <ClientProvider appName="droplinked" appIconUrl="." network={appDeveloment ? "testnet" : "mainnet"}>
          <App />
        </ClientProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();
