import { Box, ModalFooter } from '@chakra-ui/react'
import { WarningLg } from 'assets/icons/Sign/Warning/WarningLg'
import Button from 'components/redesign/button/Button'
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useAppToast from 'hooks/toast/useToast'
import { cancelOrderById } from 'lib/apis/orders/orderServices'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'

interface Props {
    isOpen: boolean,
    onClose: () => void,
    orderID: string
}

/**
    * CancelOrderModal component displays a modal for confirming order cancellation
    * @param isOpen - Boolean indicating if the modal is open
    * @param onClose - Function to close the modal
    * @param orderID - ID of the order to be cancelled
 */

export default function CancelOrderModal({ isOpen, onClose, orderID }: Props) {
    const { mutateAsync, isLoading } = useMutation(() => cancelOrderById(orderID))
    const queryClient = useQueryClient();
    const { showToast } = useAppToast();

    const handleCancelOrder = async () => {
        try {
            await mutateAsync()
            onClose()
            showToast({ message: "Order cancelled successfully", type: "success" })

            // Invalidate the purchase history query to refresh the data
            queryClient.invalidateQueries(["purchase-history-query"])
        } catch (error) {
            showToast({ message: "An error occurred while cancelling the order", type: "error" })
        }
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "xl", isCentered: true }}
            modalContentProps={{ gap: 0, paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" }, bgColor: "neutral.background", }}
        >
            <ModalHeaderData
                icon={
                    <ModalHeaderIconWrapper>
                        <WarningLg color='#fff' />
                    </ModalHeaderIconWrapper>
                }
                title="Confirm Order Cancellation"
                description={`You are about to cancel order ${orderID}. This action cannot be undone. Are you sure you want to continue?`}
                descriptionProps={{
                    color: "text.subtextPlaceholder.light !important",
                }}

            />
            <ModalFooter mt="38px" display="flex" gap={6}>
                <Box width="50%">
                    <Button width="100%" variant='secondary' onClick={onClose}>Close</Button>
                </Box>
                <Box width="50%">
                    <Button width="100%" variant='ghost' background="system.error" onClick={handleCancelOrder} isLoading={isLoading}>Yes, Cancel Order</Button>
                </Box>
            </ModalFooter>
        </AppModal>
    )
}
