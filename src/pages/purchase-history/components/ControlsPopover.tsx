import { useDisclosure } from '@chakra-ui/react'
import { InvoiceMd } from 'assets/icons/Finance/Invoice/InvoiceMd'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import React from 'react'
import { IOrders } from '../interface'
import OrderDetails from './OrderDetails'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    rowData: IOrders;
}

/**
 * ControlsPopover component displays a popover with controls for order actions
 * @param rowData - The order data to display in the popover
 */

export default function ControlsPopover({ rowData }: Props) {
    const { t } = useLocaleResources("purchaseHistory")
    const { isOpen: isDetailsDrawerOpen, onClose: onDetailsDrawerClose, onOpen: onDetailsDrawerOpen } = useDisclosure()

    return (
        <>
            <TableMenu
                items={[
                    {
                        icon: <InvoiceMd color='#fff' />,
                        onClick: onDetailsDrawerOpen,
                        title: t("order_details"),
                        color: "#fff"
                    }
                ]}
            />
            <OrderDetails rowData={rowData} isOpen={isDetailsDrawerOpen} onClose={onDetailsDrawerClose} />
        </>
    )
}
