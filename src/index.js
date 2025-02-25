import { ChakraProvider } from "@chakra-ui/react";
import "assets/style/index.css";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { theme } from "./theme";

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
)

serviceWorkerRegistration.unregister()