import { useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import PremiumBadge from 'pages/settings/components/common/PremiumBadge'
import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import UserManagementTable from './UserManagementTable'
import UpgradePlan from '../../../../common/upgrade-plan/UpgradePlan'
import useAppStore from 'lib/stores/app/appStore'
import InviteUserModal from './InviteUserModal'
import Button from 'components/redesign/button/Button'
import { useQuery } from 'react-query'
import { getInvitationsService } from 'lib/apis/user/services'

export default function UserManagementSection() {
    const { isFetching, data, refetch } = useQuery({ queryKey: ["userManagementTable"], queryFn: () => getInvitationsService() })
    const { shop } = useAppStore()
    const { subscription } = shop ?? {}
    const { subscriptionId } = subscription ?? {}
    const isPremiumOrHigher = (subscriptionId?.type && subscriptionId?.type !== "STARTER" && subscriptionId?.type !== "BUSINESS")
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <SectionContainer
            title="User Management"
            description='Add or remove team members by entering their email addresses. An invite with the required instructions to join the account will be sent.'
            badge={
                <PremiumBadge />
            }
            rightContent={
                <Button
                    variant={"outline"}
                    border={"none"}
                    bg={"none"}
                    color={"#179ef8"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"6px"}
                    fontWeight={500}
                    onClick={onOpen}
                    isDisabled={!isPremiumOrHigher}
                >
                    <AppIcons.BluePlus style={{ display: "inline-block" }} />
                    New User
                </Button>
            }
        >
            {isPremiumOrHigher ? <UserManagementTable data={data} isFetching={isFetching} /> : <UpgradePlan />}
            <InviteUserModal refetch={refetch} isOpen={isOpen} onClose={onClose} />
        </SectionContainer>
    )
}
