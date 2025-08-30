import React from "react";
import PartnerPage from "./PartnerPage";

export function meta() {
    return [
        { title: "Build on Base with Droplinked | Onchain & Agentic Commerce" },
        {
            name: "description",
            content: "Launch and grow your business on the Base network with Droplinked. Our agentic commerce tools make it simple to tokenize assets and sell onchain.",
        },
        {
            name: "keywords",
            content: "Build on Base, Onchain Commerce Base, Droplinked Base, Agentic Commerce",
        },
        {
            property: "og:title",
            content: "Build on Base with Droplinked | Onchain & Agentic Commerce",
        },
        {
            property: "og:description",
            content: "Launch and grow your business on the Base network with Droplinked. Our agentic commerce tools make it simple to tokenize assets and sell onchain.",
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
