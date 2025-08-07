import { Center, Flex, Text } from '@chakra-ui/react'
import { DocumentdownloadMd } from 'assets/icons/Action/DocumentDownload/DocumentdownloadMd'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import React from 'react'
import { IDetailedTransaction } from 'services/credit/interfaces'
import { formatDateToLongStyle } from 'utils/helpers'
import StatusBadge from '../StatusBadge'
import TypeColumn from './TypeColumn'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface TransactionCardProps {
    transaction?: IDetailedTransaction
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
    const { t } = useLocaleResources("creditsAndActivity")
    const { amount, createdAt, id, type, amountType, status } = transaction ?? {}

    return (
        <Flex
            direction="column"
            gap={4}
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={8}
            p={4}
            bg="#141414"
        >
            <Flex justify="space-between" align="start">
                <Flex direction="column" gap={1}>
                    <TypeColumn type={type} amountType={amountType} />
                    {transaction?.description && (
                        <Text color="text.subtext.placeholder.dark" fontSize={12}>
                            {transaction.description}
                        </Text>
                    )}
                </Flex>

                <Flex align="center" gap={4}>
                    <StatusBadge status={status as "SUCCESS" | "FAILED"} />
                    {(id && status === "SUCCESS") && (
                        <Center
                            as="a"
                            href={`/invoice/${id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            w={10}
                            h={10}
                        >
                            <DocumentdownloadMd color="#FFF" />
                        </Center>
                    )}
                </Flex>
            </Flex>

            <Flex
                direction="column"
                gap={4}
                borderRadius={8}
                p={4}
                bg="neutral.gray.1000"
            >
                <InfoRow label={t("TransactionCard.card.amount")}>
                    <FormattedPrice price={amount} />
                </InfoRow>

                <InfoRow label={t("common:date")}>
                    <Text color="text.white" fontSize={14}>
                        {createdAt ? formatDateToLongStyle(new Date(createdAt)) : '—'}
                    </Text>
                </InfoRow>

                <InfoRow label={t("TransactionCard.card.transactionId")}>
                    <Text color="text.white" fontSize={14}>
                        {id || '—'}
                    </Text>
                </InfoRow>
            </Flex>
        </Flex>
    )
}

const InfoRow = ({ label, children }) => (
    <Flex justify="space-between" align="center" gap={4}>
        <Text color="text.subtext.placeholder.dark" fontSize={14}>
            {label}
        </Text>
        {children}
    </Flex>
)