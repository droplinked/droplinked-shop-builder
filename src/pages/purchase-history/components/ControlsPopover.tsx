import { useDisclosure } from '@chakra-ui/react'
import { InvoiceMd } from 'assets/icons/Finance/Invoice/InvoiceMd'
import { CloseMd } from 'assets/icons/Sign/Close/CloseMd'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import React from 'react'
import { isOrderCancelled } from '../helpers'
import CancelOrderModal from './CancelOrderModal'
import OrderDetails from './OrderDetails'
import { IOrders } from '../interface'

interface Props {
    rowData: IOrders;
    isCancelled?: boolean;
}

/**
 * ControlsPopover component displays a popover with controls for order actions
 * @param rowData - The order data to display in the popover
 * @param isCancelled - Optional boolean indicating if the order is cancelled
 */

export default function ControlsPopover({ rowData, isCancelled }: Props) {
    const { isOpen: isCancelModalOpen, onClose: onCancelModalClose, onOpen: onCancelModalOpen } = useDisclosure()
    const { isOpen: isDetailsDrawerOpen, onClose: onDetailsDrawerClose, onOpen: onDetailsDrawerOpen } = useDisclosure()

    // Use helper function if isCancelled is not provided
    const orderIsCancelled = isCancelled ?? isOrderCancelled(rowData.status);

    return (
        <>
            <TableMenu
                items={[
                    {
                        icon: <InvoiceMd color='#fff' />,
                        onClick: onDetailsDrawerOpen,
                        title: "Order Details",
                        color: "#fff"
                    },
                    {
                        icon: <CloseMd color='#FF2244' />,
                        onClick: onCancelModalOpen,
                        title: "Cancel",
                        color: "#FF2244",
                        isDisabled: orderIsCancelled,
                    }
                ]}
            />
            <CancelOrderModal isOpen={isCancelModalOpen} onClose={onCancelModalClose} orderID={rowData._id} />
            <OrderDetails rowData={rowData} isOpen={isDetailsDrawerOpen} onClose={onDetailsDrawerClose} />
        </>
    )
}
