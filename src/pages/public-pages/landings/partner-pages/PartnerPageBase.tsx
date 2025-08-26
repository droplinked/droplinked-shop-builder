import React from "react";
import PartnerPage from "./PartnerPage";

export function meta() {
    return [
        { title: "Base Network Partnership: Onchain Business Solutions | Agentic Commerce | Droplinked" },
        {
            name: "description",
            content: "Build onchain businesses with Base + Droplinked. Tokenize digital assets, physical inventory, and domains. Empower creators and communities with agentic commerce solutions on Base network.",
        },
        {
            name: "keywords",
            content: "Base network, Coinbase Base, onchain business, tokenize assets, digital IP tokenization, physical inventory, creators economy, Web3 commerce, agentic commerce, Base blockchain",
        },
        {
            property: "og:title",
            content: "Base Network Partnership: Onchain Business Solutions | Droplinked",
        },
        {
            property: "og:description",
            content: "Build onchain businesses with Base + Droplinked. Tokenize digital assets, physical inventory, and domains. Empower creators and communities with agentic commerce solutions.",
        },
        {
            property: "og:type",
            content: "website",
        }
    ];
}

export default function PartnerPageBase() {
    return <PartnerPage partnerId="base" />;
}
