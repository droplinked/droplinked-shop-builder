import React from "react";
import PartnerPage from "./PartnerPage";

export function meta() {
    return [
        { title: "Crossmint Partnership: Agentic Commerce Solutions | 3 Months Free | Droplinked" },
        {
            name: "description",
            content: "Power your agentic commerce with Crossmint + Droplinked. Get 3 months free Pro Plan. Build intelligent Web3 stores with AI-powered commerce tools and seamless NFT integration.",
        },
        {
            name: "keywords",
            content: "Crossmint, agentic commerce, AI commerce, intelligent shopping, Web3 payments, NFT commerce, automated commerce, smart contracts, blockchain payments",
        },
        {
            property: "og:title",
            content: "Crossmint Partnership: Agentic Commerce Solutions | Droplinked",
        },
        {
            property: "og:description",
            content: "Power your agentic commerce with Crossmint + Droplinked. Get 3 months free Pro Plan. Build intelligent Web3 stores with AI-powered commerce tools.",
        },
        {
            property: "og:type",
            content: "website",
        },
        {
            name: "twitter:card",
            content: "summary_large_image",
        },
        {
            name: "robots",
            content: "index, follow",
        },
    ];
}

export default function PartnerPageCrossmint() {
    return <PartnerPage partnerId="crossmint" />;
}
