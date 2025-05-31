import { Center, Flex, Spinner, Text } from '@chakra-ui/react'
import { DocumentdownloadMd } from 'assets/icons/Action/DocumentDownload/DocumentdownloadMd'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import useDownloadFile from 'hooks/useDownloadFile/useDownloadFile'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { IDetailedTransaction } from 'services/credit/interfaces'
import { downloadCreditChangeInvoice } from 'services/credit/services'
import { formatDateToLongStyle } from 'utils/helpers'
import StatusBadge from '../StatusBadge'
import TypeColumn from './TypeColumn'

interface TransactionCardProps {
    transaction?: IDetailedTransaction
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
    const { amount, createdAt, id, type, amountType, status } = transaction ?? {}
    const { t } = useLocaleResources("creditsAndActivity")
    const { download, isLoading } = useDownloadFile({
        fetcher: downloadCreditChangeInvoice,
        fileNameResolver: () => `${Date.now()}.xlsx`
    })

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
                <TypeColumn type={type} amountType={amountType} />
                <Flex align="center" gap={4}>
                    <StatusBadge status={status} />
                    {id && (
                        <Center
                            as="button"
                            w={10}
                            h={10}
                            onClick={() => id && download(id)}
                            disabled={isLoading}
                        >
                            {isLoading ? <Spinner /> : <DocumentdownloadMd color="#FFF" />}
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
                <InfoRow label={t("transactionTable.card.amount")}>
                    <FormattedPrice price={amount} />
                </InfoRow>

                <InfoRow label={t("transactionTable.card.date")}>
                    <Text color="text.white" fontSize={14}>
                        {createdAt ? formatDateToLongStyle(new Date(createdAt)) : '—'}
                    </Text>
                </InfoRow>

                <InfoRow label={t("transactionTable.card.transactionId")}>
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