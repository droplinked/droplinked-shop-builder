import React from "react";
import PartnerPage from "./PartnerPage";

export function meta() {
    return [
        { title: "Polygon Domain Holders: Get 3 Months Free Pro Plan | .polygon Domains | Droplinked" },
        {
            name: "description",
            content: "Exclusive for .polygon domain holders! Get 3 months of Droplinked Pro Plan free. Build your Polygon-powered Web3 store with advanced NFT integration and enterprise tools.",
        },
        {
            name: "keywords",
            content: "Polygon domains, .polygon, Polygon network, MATIC, Web3 store, NFT marketplace, Polygon ecosystem, blockchain commerce, crypto payments, decentralized commerce",
        },
        {
            property: "og:title",
            content: "Polygon Domain Holders: Get 3 Months Free Pro Plan | Droplinked",
        },
        {
            property: "og:description",
            content: "Exclusive for .polygon domain holders! Get 3 months of Droplinked Pro Plan free. Build your Polygon-powered Web3 store with advanced NFT integration.",
        },
        {
            property: "og:type",
            content: "website",
        }
    ];
}

export default function PartnerPagePolygon() {
    return <PartnerPage partnerId="polygon" />;
}
