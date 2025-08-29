import React from "react";
import AffiliateProductsPage from "./AffiliateProductsPage";

export function meta() {
    return [
        { title: "Affiliate Product Marketplace | Droplinked" },
        {
            name: "description",
            content: "Discover and promote a wide range of digital and physical products in the Droplinked affiliate marketplace. Start earning commissions today.",
        },
        {
            name: "keywords",
            content: "affiliate products, product catalog, promote products, earn rewards, commission, Web3 products, e-commerce marketplace",
        },
        {
            property: "og:title",
            content: "Affiliate Product Marketplace | Droplinked",
        },
        {
            property: "og:description",
            content: "Discover and promote a wide range of digital and physical products in the Droplinked affiliate marketplace. Start earning commissions today.",
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
