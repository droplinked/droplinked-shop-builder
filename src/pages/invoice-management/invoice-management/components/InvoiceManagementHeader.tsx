import { Flex, Heading } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import AppButton from 'components/redesign/button/AppButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function InvoiceManagementHeader() {
    const { t } = useLocaleResources('invoice-management');
    const navigate = useNavigate()

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
            <AppButton iconLeft={<AppIcons.BlackPlus />} onClick={() => navigate("/analytics/invoice-management/create")}>
                {t('InvoiceManagementHeader.newInvoice')}
            </AppButton>
        </Flex>
    );
}

export default InvoiceManagementHeader