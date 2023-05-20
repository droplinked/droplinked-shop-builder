import React from 'react'
import PopOverMenu from 'components/shared/PopoverMenu/PopOverMenu'
import { useDisclosure } from '@chakra-ui/react';
import OrderModal from 'modals/order-modal/OrderModal';

function ControlsListOrder({ order }) {
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <>
            <PopOverMenu items={[
                {
                    caption: "View",
                    onClick: onOpen
                }
            ]} />
            <OrderModal order={order} show={isOpen} close={onClose} />
        </>
    )
}

export default ControlsListOrder