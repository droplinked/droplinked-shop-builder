import { Menu, MenuButton, MenuItem, MenuList, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import AppButton from 'components/redesign/button/AppButton'
import AppModal from 'components/redesign/modal/AppModal'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { deleteInvoiceService } from 'services/invoice/invoiceServices'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { INVOICES_QUERY_KEY } from '../../InvoiceManagement'

export default function InvoiceTableMenu({ invoice }) {
    const { t } = useLocaleResources('invoice-management');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    return (
        <>
            <Menu isLazy>
                <MenuButton as="button"><AppIcons.Dots /></MenuButton>
                <MenuList
                    border="1px solid"
                    borderColor="neutral.gray.800"
                    borderRadius={8}
                    padding={0}
                    overflow="hidden"
                    bgColor="neutral.gray.1000"
                    zIndex={10}
                    sx={{
                        "button": {
                            display: "flex",
                            alignItems: "center",
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
                        <MenuItem
                            icon={<AppIcons.Edit />}
                            onClick={() => navigate(`/analytics/invoice-management/edit/${invoice._id}`)}
                        >
                            {t('InvoiceTableMenu.actions.edit')}
                        </MenuItem>
                    }

                    <MenuItem icon={<AppIcons.RedTrash />} color="#FF2244" onClick={onOpen}>
                        {t('InvoiceTableMenu.actions.delete')}
                    </MenuItem>
                </MenuList>
            </Menu>
            {isOpen && <ConfirmInvoiceDeleteModal isOpen={isOpen} onClose={onClose} invoiceId={invoice._id} />}
        </>
    )
}

function ConfirmInvoiceDeleteModal({ invoiceId, isOpen, onClose }) {
    const { t } = useLocaleResources('invoice-management');
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
                message: error.response?.data?.data?.message || t('common:error'),
                type: "error"
            })
        }
    }

    return (
        <AppModal modalRootProps={{ isOpen, onClose, size: "md", isCentered: true }}>
            <ModalBody>
                <AppTypography textAlign="center" fontSize={16} fontWeight={500} color="white">{t('InvoiceTable.deleteConfirm.message')}</AppTypography>
            </ModalBody>
            <ModalFooter display="flex" justifyContent="space-between">
                <AppButton variant='outlined' isDisabled={isLoading} onClick={onClose}>{t('common:cancel')}</AppButton>
                <AppButton isDisabled={isLoading} isLoading={isLoading} onClick={handleDelete}>{t('InvoiceTableMenu.actions.delete')}</AppButton>
            </ModalFooter>
        </AppModal>
    )
}  