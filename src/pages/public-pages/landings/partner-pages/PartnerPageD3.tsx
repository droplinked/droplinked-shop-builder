import React from "react";
import PartnerPage from "./PartnerPage";

export function meta() {
    return [
        { title: "Droplinked x D3 | Claim Your Free 6-Month Pro Plan" },
        {
            name: "description",
            content: "Exclusive offer for D3 Network members! Verify ownership of your .ape, .vic, .shib, or .core domain to claim 6 months of the Droplinked Pro Plan for free.",
        },
        {
            name: "keywords",
            content: "D3 Network perks, Droplinked D3 promo, .ape domain benefits, Free onchain store",
        },
        {
            property: "og:title",
            content: "Droplinked x D3 | Claim Your Free 6-Month Pro Plan",
        },
        {
            property: "og:description",
            content: "Exclusive offer for D3 Network members! Verify ownership of your .ape, .vic, .shib, or .core domain to claim 6 months of the Droplinked Pro Plan for free.",
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
