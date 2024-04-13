import { ChakraProvider } from "@chakra-ui/react";
import { ClientProvider } from '@micro-stacks/react';
import "assest/style/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { appDevelopment } from "lib/utils/app/variable";
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { theme } from "./theme";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} >
        <ClientProvider appName="droplinked" appIconUrl="." network={appDevelopment ? "testnet" : "mainnet"}>
          <App />
        </ClientProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

serviceWorkerRegistration.unregister();
