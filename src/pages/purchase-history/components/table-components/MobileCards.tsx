import { Flex, Text } from '@chakra-ui/react'
import AppBadge from 'components/redesign/badge/AppBadge'
import React from 'react'
import { formatUnderlinedText, getCustomerDisplayName, getStatusColorScheme, truncateText } from '../../helpers'
import { IOrders } from '../../interface'
import ControlsPopover from '../ControlsPopover'
import DateCell from './DateCell'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    item: IOrders
}

export default function MobileCards({ item }: Props) {
    const { t } = useLocaleResources("purchaseHistory")

    const { _id, status, updatedAt, customerAddressBook, customerEmail } = item

    // Prepare customer display name
    const customerDisplayName = getCustomerDisplayName(customerAddressBook, customerEmail)
    const isPaymentValid = status !== "CANCELED"
    const statusColorScheme = getStatusColorScheme(status)

    return (
        <Flex gap={4} flexDirection="column" p={4} bg="#141414" borderRadius="8px" border="1px solid" borderColor="neutral.gray.800">
            <Flex justifyContent="space-between" alignItems="center">
                <Text color="#fff" fontSize={14} title={_id}>{truncateText(_id, isPaymentValid ? 8 : 15)}</Text>

                <Flex gap={4}>
                    <AppBadge
                        text={formatUnderlinedText(status)}
                        textTransform="capitalize"
                        size='24'
                        status={statusColorScheme}
                    />
                    <ControlsPopover rowData={item} />
                </Flex>
            </Flex>
            <Flex flexDirection="column" gap={4} p={4} background="neutral.gray.1000" borderRadius="8px">
                <Flex justifyContent="space-between" alignItems="center">
                    <Text color="text.subtext.placeholder.dark" fontSize={14}>{t("customer")}</Text>
                    <Text color="#fff" fontSize={14} title={customerDisplayName}>{truncateText(customerDisplayName)}</Text>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                    <Text color="text.subtext.placeholder.dark" fontSize={14}>{t("date")}</Text>
                    <DateCell date={updatedAt} />
                </Flex>
            </Flex>
        </Flex>
    )
}
