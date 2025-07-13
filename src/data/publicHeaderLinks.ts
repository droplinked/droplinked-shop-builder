import { Layout1Md } from "assets/icons/StyleDesigner/Layout1/Layout1Md"
import { AffiliateMd } from "assets/icons/System/Affiliate/AffiliateMd"
import { BuildingMd } from "assets/icons/System/Building/BuildingMd"
import { SubscriptionMd } from "assets/icons/System/Subscription/SubscriptionMd"
import { TFunction } from "i18next"
import React from "react"

const getPublicHeaderLinks = (t: TFunction) => [
    {
        label: t('publicHeaderLinks.pricing'),
        href: '/plans',
        icon: React.createElement(SubscriptionMd, { color: "#fff" })
    },
    {
        label: t('publicHeaderLinks.affiliate'),
        href: '/affiliate/products',
        icon: React.createElement(AffiliateMd, { color: "#fff" })
    },
    {
        label: t('publicHeaderLinks.blog'),
        href: '/blogs',
        icon: React.createElement(Layout1Md, { color: "#fff" })
    },
    {
        label: t('publicHeaderLinks.about'),
        href: '/about',
        icon: React.createElement(BuildingMd, { color: "#fff" })
    }
]

export default getPublicHeaderLinks
