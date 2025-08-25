import { ChakraProvider } from "@chakra-ui/react";
import "assets/style/index.css";
import "assets/style/App.scss";
import AppGDPR from 'components/common/app-gdpr/AppGDPR';
import AppToastify from 'components/common/toastify/AppToastify';
import 'lib/i18n';
import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";
import { theme } from "./theme";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

export function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <AppToastify />
                <AppGDPR />
                <Outlet />
            </ChakraProvider>
        </QueryClientProvider>
    )
}
