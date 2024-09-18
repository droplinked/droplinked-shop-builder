import { Menu, MenuButton, MenuItem, MenuList, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import AppModal from 'components/redesign/modal/AppModal'
import useAppToast from 'functions/hooks/toast/useToast'
import { deleteInvoiceService } from 'lib/apis/invoice/invoiceServices'
import Button from 'pages/invoice-management/components/Button'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { INVOICES_QUERY_KEY } from '../../InvoiceManagement'

export default function InvoiceTableMenu({ invoice }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    return (
        <>
            <Menu>
                <MenuButton as={"button"}><AppIcons.Dots /></MenuButton>
                <MenuList
                    width={"144px !important"}
                    border={"1px solid #292929"}
                    borderRadius={8}
                    padding={0}
                    overflow={"hidden"}
                    bgColor={"#1C1C1C"}
                    zIndex={10}
                    sx={{
                        "button": {
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            px: 4,
                            py: 3,
                            fontSize: 16,
                            fontWeight: 500,
                            bgColor: "inherit",
                            borderBottom: "inherit",
                            _last: { borderBottom: "none" }
                        }
                    }}
                >
                    {invoice.status === "ACTIVE" &&
                        <MenuItem onClick={() => navigate(`/dashboard/invoice-management/edit/${invoice._id}`)}>
                            <AppIcons.Edit />
                            Edit
                        </MenuItem>
                    }
                    <MenuItem color={"#FF2244"} onClick={onOpen}>
                        <AppIcons.RedTrash />
                        Delete
                    </MenuItem>
                </MenuList>
            </Menu>
            {isOpen && <ConfirmInvoiceDeleteModal isOpen={isOpen} onClose={onClose} invoiceId={invoice._id} />}
        </>
    )
}

function ConfirmInvoiceDeleteModal({ invoiceId, isOpen, onClose }) {
    const queryClient = useQueryClient()
    const { isLoading, mutateAsync: deleteInvoice } = useMutation(() => deleteInvoiceService(invoiceId))
    const { showToast } = useAppToast()

    const handleDelete = async () => {
        try {
            await deleteInvoice()
            onClose()
            queryClient.invalidateQueries(INVOICES_QUERY_KEY)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        catch (error) {
            showToast({
                message: error.response?.data?.data?.message || "Something went wrong. Please try again",
                type: "error"
            })
        }
    }

    return (
        <AppModal modalRootProps={{ isOpen, onClose, size: "md", isCentered: true }}>
            <ModalBody>
                <AppTypography textAlign={"center"} fontSize={16} fontWeight={500} color={"white"}>Are you sure you want to delete this invoice?</AppTypography>
            </ModalBody>
            <ModalFooter display={"flex"} justifyContent={"space-between"}>
                <Button variant='ghost' isDisabled={isLoading} onClick={onClose}>Cancel</Button>
                <Button isDisabled={isLoading} isLoading={isLoading} onClick={handleDelete}>Delete</Button>
            </ModalFooter>
        </AppModal>
    )
}  