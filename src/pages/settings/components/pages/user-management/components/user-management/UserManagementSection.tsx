import { Box } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import PremiumBadge from 'pages/settings/components/common/PremiumBadge'
import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import UserManagementTable from './UserManagementTable'
import UpgradePlan from './upgrade-plan/UpgradePlan'
import useAppStore from 'lib/stores/app/appStore'

export default function UserManagementSection() {
    const { shop } = useAppStore()
    const { subscriptionId } = shop ?? {}
    const isPremiumOrHigher = subscriptionId?.type !== "STARTER" || subscriptionId?.type !== "BUSINESS"

    return (
        <SectionContainer
            title="User Management"
            description='Add or remove team members by entering their email addresses. An invite with the required instructions to join the account will be sent.'
            badge={
                <PremiumBadge />
            }
            rightContent={
                <Box
                    color={"#179ef8"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"6px"}
                    fontWeight={500}
                >
                    <AppIcons.BluePlus style={{ display: "inline-block" }} />
                    New User
                </Box>
            }
        >
            {subscriptionId?.type && isPremiumOrHigher ? <UserManagementTable /> : <UpgradePlan />}
        </SectionContainer>
    )
}
