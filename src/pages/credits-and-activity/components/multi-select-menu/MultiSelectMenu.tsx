import { useMediaQuery } from '@chakra-ui/react'
import React from "react"
import MultiSelectMenuDesktop from './desktop/MultiSelectMenuDesktop'
import MultiSelectMenuMobile from './mobile/MultiSelectMenuMobile'

export default function MultiSelectMenu() {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")

    const items = [
        {
            label: "Referral",
            value: "REFERRAL"
        }, {
            label: "Credits",
            value: "CREDIT_BALANCE"
        },
        {
            label: "Reward",
            value: "GAMIFICATION_REWARD"
        },
        {
            label: "Subscription",
            value: "SUBSCRIPTION_UPDATE"
        },
        {
            label: "Withdrawal",
            value: "WITHDRAW"
        },
        {
            label: "Order",
            value: "ORDER"
        }
    ]

    if (isSmallerThan768) {
        return <MultiSelectMenuMobile items={items} />
    }

    return (
        <MultiSelectMenuDesktop items={items} />
    )
}
