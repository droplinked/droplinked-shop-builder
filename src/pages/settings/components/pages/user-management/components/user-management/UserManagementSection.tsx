import { useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import UserManagementTable from './UserManagementTable'
import UpgradePlan from '../../../../common/upgrade-plan/UpgradePlan'
import useAppStore from 'stores/app/appStore'
import InviteUserModal from './InviteUserModal'
import { useQuery } from 'react-query'
import { getInvitationsService } from 'services/user/services'
import AccessLevelBadge from 'components/redesign/access-level-badge/AccessLevelBadge'
import BlueButton from 'components/redesign/button/BlueButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function UserManagementSection() {
    const { isFetching, data, refetch } = useQuery({ queryKey: ["userManagementTable"], queryFn: () => getInvitationsService() })
    const { shop } = useAppStore()
    const { subscription } = shop ?? {}
    const { subscriptionId } = subscription ?? {}
    const isPremiumOrHigher = (subscriptionId?.type && subscriptionId?.type !== "STARTER" && subscriptionId?.type !== "BUSINESS")
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { t } = useLocaleResources('settings');

    return (
        <SectionContainer
            title={t('UserManagement.title')}
            description={t('UserManagement.description')}
            badge={
                <AccessLevelBadge justLevel level="Premium" />
            }
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
                        {t('UserManagement.newUser')}
                    </BlueButton>
                </>
            }
        >
            {isPremiumOrHigher ? <UserManagementTable data={data} isFetching={isFetching} /> : <UpgradePlan />}
            <InviteUserModal refetch={refetch} isOpen={isOpen} onClose={onClose} />
        </SectionContainer>
    )
}
