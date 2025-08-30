import { ChakraProvider } from "@chakra-ui/react"
import "assets/style/App.scss"
import "assets/style/index.css"
import AppGDPR from "components/common/app-gdpr/AppGDPR"
import AppToastify from "components/common/toastify/AppToastify"
import FullScreenLoading from "components/redesign/fullscreen-loading/FullScreenLoading"
import "lib/i18n"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { QueryClient, QueryClientProvider } from "react-query"
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from "react-router"
import { theme } from "./chakraTheme"
import { getLanguageFromCookie, isRTLLanguage, setHTMLAttributes } from "./utils/languageUtils"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

export function Layout({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation()

    useEffect(() => {
        // Get language from cookie on client side
        const cookieLanguage = getLanguageFromCookie()

        // If language in cookie differs from current i18n language, update it
        if (cookieLanguage !== i18n.language) {
            i18n.changeLanguage(cookieLanguage)
        }

        // Set HTML attributes based on language
        setHTMLAttributes(cookieLanguage)
    }, [i18n])

    // Get initial language for SSR
    const initialLanguage = typeof window !== 'undefined' ? getLanguageFromCookie() : 'en'
    const isRTL = isRTLLanguage(initialLanguage)

    return (
        <html lang={initialLanguage} dir={isRTL ? 'rtl' : 'ltr'}>
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Powering the Next Generation of Commerce. Droplinked is an infrastructure network supporting onchain inventory management and sales tracking for digital and physical goods."
                />
                <link rel="manifest" href="/manifest.json" />

                {/* Google Analytics */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-C81Y33TK9F"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-C81Y33TK9F');
                            gtag('config', 'G-DB498XSD55');
                        `,
                    }}
                />

                {/* Microsoft Clarity */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function (c, l, a, r, i, t, y) {
                                c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                                t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
                                y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
                            })(window, document, "clarity", "script", "gnyqesyfrp");
                        `,
                    }}
                />

                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
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
    )
}

export default function Root() {
    const navigation = useNavigation()
    const isNavigating = Boolean(navigation.location)

    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <AppToastify />
                <AppGDPR />
                {isNavigating && <FullScreenLoading />}
                <Outlet />
            </ChakraProvider>
        </QueryClientProvider>
    )
}
