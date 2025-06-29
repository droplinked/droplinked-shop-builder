import { Layout1Md } from "assets/icons/StyleDesigner/Layout1/Layout1Md"
import { AffiliateMd } from "assets/icons/System/Affiliate/AffiliateMd"
import { BuildingMd } from "assets/icons/System/Building/BuildingMd"
import { SubscriptionMd } from "assets/icons/System/Subscription/SubscriptionMd"
import React from "react"

const publicHeaderLinks = [
    {
        label: 'Pricing',
        href: '/plans',
        icon: React.createElement(SubscriptionMd, { color: "#fff" })
    },
    {
        label: 'Affiliate',
        href: '/affiliate/products',
        icon: React.createElement(AffiliateMd, { color: "#fff" })
    },
    {
        label: 'Blog',
        href: '/blogs',
        icon: React.createElement(Layout1Md, { color: "#fff" })
    },
    {
        label: 'About',
        href: '/about',
        icon: React.createElement(BuildingMd, { color: "#fff" })
    }
]

export default publicHeaderLinks
