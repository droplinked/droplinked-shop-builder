import { Flex, Text } from '@chakra-ui/react'
import AppBadge from 'components/redesign/badge/AppBadge'
import React from 'react'
import { formatUnderlinedText, truncateText } from '../helpers'
import { IOrders } from '../interface'
import ControlsPopover from './ControlsPopover'
import DateCell from './DateCell'

interface Props {
    item: IOrders
}

export default function MobileCards({ item }: Props) {
    const { _id, status, updatedAt, customerAddressBook, customerEmail } = item

    const isPaymentValid = status === "PAYMENT_CONFIRMED" || status === "INITIALIZED_FOR_PAYMENT";

    // Prepare customer display name
    const customerDisplayName = customerAddressBook
        ? (customerAddressBook.firstName + " " + customerAddressBook.lastName)
        : customerEmail;

    return (
        <Flex gap={4} flexDirection="column" p={4} bg="#141414" borderRadius="8px" border="1px solid" borderColor="neutral.gray.800">
            <Flex justifyContent="space-between" alignItems="center">
                <Text color="#fff" fontSize={14} title={_id}>{truncateText(_id, isPaymentValid ? 8 : 15)}</Text>

                <Flex gap={4}>
                    <AppBadge
                        text={formatUnderlinedText(status)}
                        textTransform="capitalize"
                        size='24'
                        status={status === "PAYMENT_CONFIRMED" ? "success" : status === "INITIALIZED_FOR_PAYMENT" ? "pending" : "error"}
                    />
                    <ControlsPopover rowData={item} isCancelled={status === "CANCELED"} />
                </Flex>
            </Flex>
            <Flex flexDirection="column" gap={4} p={4} background="neutral.gray.1000" borderRadius="8px">
                <Flex justifyContent="space-between" alignItems="center">
                    <Text color="text.subtextPlaceholder.dark" fontSize={14}>Customer</Text>
                    <Text color="#fff" fontSize={14} title={customerDisplayName}>{truncateText(customerDisplayName)}</Text>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                    <Text color="text.subtextPlaceholder.dark" fontSize={14}>Date</Text>
                    <DateCell date={updatedAt} />
                </Flex>
            </Flex>
        </Flex>
    )
}
