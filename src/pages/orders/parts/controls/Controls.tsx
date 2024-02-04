import React from 'react'
import PopOverMenu from 'components/common/PopoverMenu/PopOverMenu'
import { useDisclosure } from '@chakra-ui/react';
import OrderModal from 'components/modals/order-modal/OrderModal';

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