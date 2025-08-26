import React from "react";
import PartnerPage from "./PartnerPage";

export function meta() {
    return [
        { title: "Unstoppable Domains Members: Get 3 Months Free Pro Plan | Droplinked" },
        {
            name: "description",
            content: "Exclusive offer for Unstoppable Domains holders! Get 3 months of Droplinked Pro Plan free. Launch your Web3 shop with enterprise tools, NFT integration, and decentralized commerce features.",
        },
        {
            name: "keywords",
            content: "Unstoppable Domains, Web3 domains, decentralized domains, NFT storefront, blockchain commerce, crypto payments, Web3 shop builder, domain holders benefits",
        },
        {
            property: "og:title",
            content: "Unstoppable Domains Members: Get 3 Months Free Pro Plan | Droplinked",
        },
        {
            property: "og:description",
            content: "Exclusive offer for Unstoppable Domains holders! Get 3 months of Droplinked Pro Plan free. Launch your Web3 shop with enterprise tools and NFT integration.",
        },
        {
            property: "og:type",
            content: "website",
        }
    ];
}

export default function PartnerPageUnstoppableDomains() {
    return <PartnerPage partnerId="unstoppableDomains" />;
}
