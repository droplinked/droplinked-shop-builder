import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import { IDetailedTransaction } from 'lib/apis/credit/interfaces'
import React from 'react'
import TypeColumn from './TypeColumn'
import StatusBadge from '../StatusBadge'
import { formatDateToLongStyle } from 'utils/helpers'

interface TransactionCardProps {
    transaction?: IDetailedTransaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
    const { amount, createdAt, id, type, amountType, status } = transaction ?? {};

    return (
        <Flex gap={4} flexDirection="column" p={4} bg="#141414" borderRadius="8px" border="1px solid" borderColor="neutral.gray.800">
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <TypeColumn type={type} amountType={amountType} />
                <StatusBadge status={status} />
            </Flex>
            <Flex flexDirection="column" gap={4} p={4} background="neutral.gray.1000" borderRadius="8px">
                <Flex justifyContent="space-between" alignItems="center">
                    <AppTypography color="text.subtext.placeholder.dark" fontSize={14}>Amount</AppTypography>
                    <FormattedPrice price={amount} />
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                    <AppTypography color="text.subtext.placeholder.dark" fontSize={14}>Date</AppTypography>
                    <AppTypography color="#fff" fontSize={14}>{formatDateToLongStyle(createdAt)}</AppTypography>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                    <AppTypography color="text.subtext.placeholder.dark" fontSize={14}>Transaction ID</AppTypography>
                    <AppTypography color="#fff" fontSize={14}>{id}</AppTypography>
                </Flex>
            </Flex>
        </Flex>
    )
}
