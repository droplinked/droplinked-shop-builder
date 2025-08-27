import type { Config } from "@react-router/dev/config";

export default {
    appDirectory: "src",
    ssr: false,
    async prerender(args) {
        return [
            "/",
            "/enquiry",
            "/terms",
            "/about",
            "/contact-us",
            "/privacy",
            "/physical-inventory",
            "/digital-goods",
            "/products-on-demand",
            "/tokenpay",
            "/payment-links",
            "/product-tiles",
            "/tokenizing-products",
            "/onchain-subscriptions",
            "/custom-tokens",
            "/metaverse-store",
            "/book-demo",
            "/d3",
            "/unstoppable-domains",
            "/polygon",
            "/crossmint",
            "/gaia",
            "/onchain-affiliate",
            "/roi",
            "/dpp",
            "/plans",
            "/rewards",
            "/explore",
            "/blogs",
            "/affiliate/products"
        ]
    },
} satisfies Config;
