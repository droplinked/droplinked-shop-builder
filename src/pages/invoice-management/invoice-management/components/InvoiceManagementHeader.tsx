import { Flex, Heading } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import AppButton from 'components/redesign/button/AppButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import UpgradePlanModalContainer from 'components/modals/upgrade-plan-modal/UpgradePlanModalContainer'
import useUpgradeHandler from 'hooks/subscription/useUpgradeHandler'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusSm } from 'assets/icons/Sign/Plus/PlusSm'

function InvoiceManagementHeader() {
    const { handleFeatureAccess, isUpgradeModalOpen, closeUpgradeModal } = useUpgradeHandler('ENTERPRISE');
    const { t } = useLocaleResources('invoice-management');
    const navigate = useNavigate()

    const handleCreateInvoice = () => {
        handleFeatureAccess(() => {
            navigate("/analytics/invoice-management/create");
        });
    }

    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
            gap={{ base: 4, md: 0 }}
        >
            <Flex direction="column" gap={1}>
                <Heading as="h2" fontSize={28} fontWeight={600} color="white">{t('InvoiceManagementHeader.title')}</Heading>
                <AppTypography fontSize={16} color="neutral.gray.500">{t('InvoiceManagementHeader.description')}</AppTypography>
            </Flex>
            <AppButton leftIcon={<PlusSm />} onClick={handleCreateInvoice}>
                {t('InvoiceManagementHeader.newInvoice')}
            </AppButton>
            
            <UpgradePlanModalContainer
                isOpen={isUpgradeModalOpen}
                onClose={closeUpgradeModal}
                initialActiveTab="enterprise"
            />
        </Flex>
    );
}

export default InvoiceManagementHeader