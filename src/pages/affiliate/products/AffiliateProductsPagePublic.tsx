import React from "react";
import AffiliateProductsPage from "./AffiliateProductsPage";

export function meta() {
    return [
        { title: "Onchain Affiliate Marketplace | Co-Sell Products | Droplinked" },
        {
            name: "description",
            content: "Join the Droplinked onchain affiliate network. Discover products, launch stores, accept digital crypto assets and fiat, and earn with automated commission payouts.",
        },
        {
            name: "keywords",
            content: "Onchain Affiliate, Affiliate Marketplace, Co-selling Platform, Automated Commissions",
        },
        {
            property: "og:title",
            content: "Onchain Affiliate Marketplace | Co-Sell Products | Droplinked",
        },
        {
            property: "og:description",
            content: "Join the Droplinked onchain affiliate network. Discover products, launch stores, accept digital crypto assets and fiat, and earn with automated commission payouts.",
        },
    ];
}

export async function clientLoader() {
    return {
        isPublic: true,
    };
}

export default function AffiliateProductsPagePublic() {
    return <AffiliateProductsPage />;
}
