import React from "react";
import PartnerPage from "./PartnerPage";

export function meta() {
    return [
        { title: "D3 Network Members: Get 6 Months Free Pro Plan | ApeCoin, Shiba, Core Chain | Droplinked" },
        {
            name: "description",
            content: "D3 Network community members get 6 months free! Join with ApeCoin (.ape), Victorin (.vic), Shiba Inu (.shib), Core Chain (.core) domains. Build your Web3 business with premium tools.",
        },
        {
            name: "keywords",
            content: "D3 Network, ApeCoin, Shiba Inu, Core Chain, Victorin, .ape domains, .shib domains, .core domains, .vic domains, Web3 community, crypto domains, blockchain business",
        },
        {
            property: "og:title",
            content: "D3 Network Members: Get 6 Months Free Pro Plan | Droplinked",
        },
        {
            property: "og:description",
            content: "D3 Network community members get 6 months free! Join with ApeCoin, Shiba Inu, Core Chain, and Victorin domains. Build your Web3 business with premium tools.",
        },
        {
            property: "og:type",
            content: "website",
        }
    ];
}

export default function PartnerPageD3() {
    return <PartnerPage partnerId="d3" />;
}
