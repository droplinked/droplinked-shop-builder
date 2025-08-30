import React from "react";
import PartnerPage from "./PartnerPage";

export function meta() {
    return [
        { title: "Droplinked x Polygon | Claim Your Free 3-Month Pro Plan" },
        {
            name: "description",
            content: "An exclusive offer for .polygon domain holders! Verify your domain to claim 3 months of the Droplinked Pro Plan for free to start building your onchain business.",
        },
        {
            name: "keywords",
            content: ".polygon domain perks, Droplinked Polygon promo, Free e-commerce plan, Web3 domain benefits",
        },
        {
            property: "og:title",
            content: "Droplinked x Polygon | Claim Your Free 3-Month Pro Plan",
        },
        {
            property: "og:description",
            content: "An exclusive offer for .polygon domain holders! Verify your domain to claim 3 months of the Droplinked Pro Plan for free to start building your onchain business.",
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
