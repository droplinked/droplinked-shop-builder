import React from "react";
import PartnerPage from "./PartnerPage";

export function meta() {
    return [
        { title: "Droplinked x Unstoppable Domains | Claim Your Free Pro Plan" },
        {
            name: "description",
            content: "Exclusive offer for Unstoppable Domains members! Verify your domain ownership to claim 3 months of the Droplinked Pro Plan for free and start selling with our tools.",
        },
        {
            name: "keywords",
            content: "Unstoppable Domains perks, Droplinked promo, Free e-commerce plan, Web3 domain benefits",
        },
        {
            property: "og:title",
            content: "Droplinked x Unstoppable Domains | Claim Your Free Pro Plan",
        },
        {
            property: "og:description",
            content: "Exclusive offer for Unstoppable Domains members! Verify your domain ownership to claim 3 months of the Droplinked Pro Plan for free and start selling with our tools.",
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
