import { Center, Flex, Text } from '@chakra-ui/react'
import { DocumentdownloadMd } from 'assets/icons/Action/DocumentDownload/DocumentdownloadMd'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import { IDetailedTransaction } from 'lib/apis/credit/interfaces'
import React from 'react'
import { formatDateToLongStyle } from 'utils/helpers'
import StatusBadge from '../StatusBadge'
import TypeColumn from './TypeColumn'

interface TransactionCardProps {
    transaction?: IDetailedTransaction
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
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
                <TypeColumn type={type} amountType={amountType} />
                <Flex align="center" gap={4}>
                    <StatusBadge status={status} />
                    {(id && status === "SUCCESS") && (
                        <Center
                            as="a"
                            href={`/invoice/${id}`}
                            target="_blank"
                            rel="noreferrer"
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
                <InfoRow label="Amount">
                    <FormattedPrice price={amount} />
                </InfoRow>

                <InfoRow label="Date">
                    <Text color="text.white" fontSize={14}>
                        {createdAt ? formatDateToLongStyle(new Date(createdAt)) : '—'}
                    </Text>
                </InfoRow>

                <InfoRow label="Transaction ID">
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