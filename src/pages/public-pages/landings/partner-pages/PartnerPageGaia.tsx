import React from "react";
import PartnerPage from "./PartnerPage";

export function meta() {
    return [
        { title: "Gaia Partnership: Powering Agentic Commerce | Droplinked" },
        {
            name: "description",
            content: "Partner with Gaia to power agentic commerce. Enable creators and communities to grow their businesses onchain together with tokenized assets, digital IP, and enterprise-level tools.",
        },
        {
            name: "keywords",
            content: "Gaia, agentic commerce, onchain business, tokenized assets, digital IP, NFT integration, creator economy, blockchain commerce, decentralized storefront",
        },
        {
            property: "og:title",
            content: "Gaia Partnership: Powering Agentic Commerce | Droplinked",
        },
        {
            property: "og:description",
            content: "Partner with Gaia to enable creators and communities to grow their businesses onchain together. Tokenize assets, manage digital IP, and scale with enterprise tools.",
        },
        {
            property: "og:type",
            content: "website",
        }
    ];
}

export default function PartnerPageGaia() {
    return <PartnerPage partnerId="gaia" />;
}
