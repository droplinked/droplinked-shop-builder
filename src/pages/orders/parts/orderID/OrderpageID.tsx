import { useDisclosure } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import OrderModal from 'components/modals/order-modal/OrderModal'
import React from 'react'

function OrderpageID({ order }) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <AppTypography fontSize="14px" cursor="pointer" onClick={onOpen}>{order?._id}</AppTypography>
      {isOpen && <OrderModal orderID={order._id} show={isOpen} close={onClose} />}
    </>
  )
}

export default OrderpageID