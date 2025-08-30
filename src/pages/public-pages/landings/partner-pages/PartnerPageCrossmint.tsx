import React from "react";
import PartnerPage from "./PartnerPage";

export function meta() {
    return [
        { title: "Droplinked x Crossmint | Claim Your Free 3-Month Pro Plan" },
        {
            name: "description",
            content: "Exclusive offer for Crossmint members! Get 3 free months of the Droplinked Pro Plan to build your marketplace and sell with our agentic commerce tools.",
        },
        {
            name: "keywords",
            content: "Crossmint perks, Droplinked Crossmint, Agentic commerce, Sell NFTs",
        },
        {
            property: "og:title",
            content: "Droplinked x Crossmint | Claim Your Free 3-Month Pro Plan",
        },
        {
            property: "og:description",
            content: "Exclusive offer for Crossmint members! Get 3 free months of the Droplinked Pro Plan to build your marketplace and sell with our agentic commerce tools.",
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
