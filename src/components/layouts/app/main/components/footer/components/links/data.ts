export interface IData {
    parentTitle: string,
    childs: Array<{
        title: string,
        link: string
    }>
}
export const data: Array<IData> = [
    {
        parentTitle: "Platform Features",
        childs: [
            {
                title: "Physical Inventory",
                link: "/physical-product"
            },
            {
                title: "Digital Goods",
                link: "/digital-product"
            },
            {
                title: "Product on Demand",
                link: "/pod-product"
            },
            {
                title: "Onchain Afilliate",
                link: "/onchain-affiliate"
            },
            {
                title: "Payment Links",
                link: "/payment-links"
            },
            {
                title: "Product Tiles",
                link: "/product-tiles"
            },
            {
                title: "Tokenizing Products",
                link: "/tokenizing-products"
            },
            // {
            //     title: "Onchain Subscriptions",
            //     link: "https://www.linkedin.com/company/droplinked"
            // },
        ]
    },
    {
        parentTitle: "Resources",
        childs: [
            {
                title: "DPP",
                link: "/dpp"
            },
            {
                title: "DIMST",
                link: "/roi"
            },
            {
                title: "Tokenpay",
                link: "/tokenpay"
            },
            {
                title: "Metaverse Showroom",
                link: "/metaverse-store"
            },
            {
                title: "Custom Tokens",
                link: "/custom-tokens"
            },
        ]
    },
    {
        parentTitle: "Support",
        childs: [
            // {
            //     title: "Contact Us",
            //     link: "/"
            // },
            {
                title: "Brand Assets",
                link: "https://drive.google.com/file/d/1b5cggMs0D94Dl2e92-JIP_NPAMK2pjrr/view?usp=sharing"
            },
            {
                title: "Developer Kit",
                link: "https://droplinked.gitbook.io/droplinked-store-front-help-center/library/droplinked-tools"
            },
            {
                title: "Help Center",
                link: "https://droplinked.gitbook.io/droplinked-store-front-help-center/about-us/what-is-droplinked"
            },
        ]
    },
    {
        parentTitle: "Company",
        childs: [
            {
                title: "Home",
                link: "/"
            },
            {
                title: "Pricing",
                link: "/plans"
            },
            {
                title: "About",
                link: "/about"
            },
        ]
    }
]