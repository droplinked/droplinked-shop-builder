import { useDisclosure } from '@chakra-ui/react'
import { InvoiceMd } from 'assets/icons/Finance/Invoice/InvoiceMd'
import { CloseMd } from 'assets/icons/Sign/Close/CloseMd'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import React from 'react'
import CancelOrderModal from './CancelOrderModal'

interface Props {
    id: string
    isCancelled: boolean,
}

export default function ControlsPopover({ id, isCancelled }: Props) {
    const { isOpen: isCancelModalOpen, onClose: onCancelModalClose, onOpen: onCancelModalOpen } = useDisclosure()

    return (
        <>
            <TableMenu
                items={[
                    {
                        icon: <InvoiceMd color='#fff' />,
                        onClick: () => console.log("hi"),
                        title: "Order Details",
                        color: "#fff"
                    },
                    {
                        icon: <CloseMd color='#FF2244' />,
                        onClick: onCancelModalOpen,
                        title: "Cancel",
                        color: "#FF2244",
                        isDisabled: isCancelled,
                    }
                ]}
            />
            <CancelOrderModal isOpen={isCancelModalOpen} onClose={onCancelModalClose} orderID={id} />
        </>
    )
}
