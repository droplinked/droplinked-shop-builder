import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import React, { useState } from 'react'
import useAppStore from 'stores/app/appStore';
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTES } from 'constants/authRoutes';
import useFollowStatus from '../../hook/useFollowStatus';
import ProPlanUpgradeModal from '../pro-plan-modal/ProPlanUpgradeModal';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface Props {
    grantProPlan?: ReturnType<typeof useFollowStatus>['grantProPlan'];
}

export default function PageHeader({ grantProPlan }: Props) {
    const [unlockedMonths, setUnlockedMonths] = useState<number | undefined>();
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isLoggedIn } = useAppStore();
    const navigate = useNavigate();
    const { t } = useLocaleResources('public-pages/landings/social-quests');

    const description = isLoggedIn ? t('heroBrowser.pageHeader.completeToUnlock') : t('heroBrowser.pageHeader.registerToQualify');

    const onClick = async () => {
        if (!isLoggedIn) return navigate(AUTH_ROUTES.SIGN_IN)

        setLoading(true)
        try {
            const result = await grantProPlan();
            if (result.success) {
                setUnlockedMonths(result.unlockedMonths);
                onOpen()
            }
        }
        catch (error) {
            console.error('Error granting Pro Plan:', error);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Flex justifyContent="space-between" alignItems="start" padding={6}>
            <Flex flexDirection="column" gap={1}>
                <Text fontSize={18} fontWeight={500} color="text.white">{t('heroBrowser.pageHeader.greeting')}</Text>
                <Text fontSize={14} color="text.subtext.placeholder.dark">{description}</Text>
            </Flex>
            <AppButton onClick={onClick} isLoading={loading}>
                {isLoggedIn ? t('heroBrowser.pageHeader.activateAccount') : t('getStarted')}
            </AppButton>

            <ProPlanUpgradeModal isOpen={isOpen} onClose={onClose} unlockedMonths={unlockedMonths} />
        </Flex>
    )
}
