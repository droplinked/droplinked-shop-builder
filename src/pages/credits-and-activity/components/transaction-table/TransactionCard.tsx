import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import { IDetailedTransaction } from 'services/credit/interfaces'
import React from 'react'
import TypeColumn from './TypeColumn'
import StatusBadge from '../StatusBadge'
import { formatDateToLongStyle } from 'utils/helpers'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface TransactionCardProps {
    transaction?: IDetailedTransaction
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
    const { t } = useLocaleResources("creditsAndActivity")
    const { amount, createdAt, id, type, amountType, status } = transaction ?? {}

    return (
        <Flex gap={4} flexDirection="column" p={4} bg="#141414" borderRadius="8px" border="1px solid" borderColor="neutral.gray.800">
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <TypeColumn type={type} amountType={amountType} />
                <StatusBadge status={status} />
            </Flex>
            <Flex flexDirection="column" gap={4} p={4} background="neutral.gray.1000" borderRadius="8px">
                <Flex justifyContent="space-between" alignItems="center">
                    <AppTypography color="text.subtext.placeholder.dark" fontSize={14}>{t("transactionTable.card.amount")}</AppTypography>
                    <FormattedPrice price={amount} />
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                    <AppTypography color="text.subtext.placeholder.dark" fontSize={14}>{t("transactionTable.card.date")}</AppTypography>
                    <AppTypography color="#fff" fontSize={14}>{formatDateToLongStyle(new Date(createdAt))}</AppTypography>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                    <AppTypography color="text.subtext.placeholder.dark" fontSize={14}>{t("transactionTable.card.transactionId")}</AppTypography>
                    <AppTypography color="#fff" fontSize={14}>{id}</AppTypography>
                </Flex>
            </Flex>
        </Flex>
    )
}
