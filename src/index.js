import React from "react";
import { ClientProvider } from '@micro-stacks/react'
import { createRoot } from "react-dom/client";
import "assest/style/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { appDeveloment } from "lib/utils/app/variable";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} >
        <ClientProvider appName="droplinked" appIconUrl="." network={appDeveloment ? "testnet" : "mainnet"}>
          <App />
        </ClientProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

serviceWorkerRegistration.unregister();
