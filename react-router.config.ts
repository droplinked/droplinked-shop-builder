import type { Config } from "@react-router/dev/config";

export default {
    appDirectory: "src",
    ssr: false,
    async prerender(args) {
        return [
            "/404",
            "/onboarding",
            "/",
            "/physical-inventory",
            "/enquiry",
            "/terms",
            "/about",
            "/contact-us",
            "/privacy",
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
            "/base",
            "/onchain-affiliate",
            "/roi",
            "/dpp",
            "/plans",
            "/rewards"
        ]
    },
} satisfies Config;
