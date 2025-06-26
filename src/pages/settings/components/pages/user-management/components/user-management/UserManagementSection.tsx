import { useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AccessLevelBadge from 'components/redesign/access-level-badge/AccessLevelBadge'
import BlueButton from 'components/redesign/button/BlueButton'
import { getInvitationsService } from 'lib/apis/user/services'
import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import { useQuery } from 'react-query'
import useAppStore from 'stores/app/appStore'
import UpgradePlan from '../../../../common/upgrade-plan/UpgradePlan'
import InviteUserModal from './InviteUserModal'
import UserManagementTable from './UserManagementTable'

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
            badge={<AccessLevelBadge justLevel level="Premium" />}
            rightContent={
                <>
                    <BlueButton
                        fontSize={12}
                        fontWeight={500}
                        onClick={onOpen}
                        sx={{ path: { stroke: !isPremiumOrHigher && "#4F4F4F" } }}
                        isDisabled={!isPremiumOrHigher}
                    >
                        <AppIcons.BluePlus style={{ display: "inline-block", width: "16px", height: "16px" }} />
                        New User
                    </BlueButton>
                </>
            }
        >
            {isPremiumOrHigher ? <UserManagementTable data={data} isFetching={isFetching} /> : <UpgradePlan />}
            <InviteUserModal refetch={refetch} isOpen={isOpen} onClose={onClose} />
        </SectionContainer>
    )
}
