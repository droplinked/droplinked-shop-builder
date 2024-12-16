import { ModalBody } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import Button from 'components/redesign/button/Button';
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import useAppToast from 'functions/hooks/toast/useToast';
import { IproductDeleteServices, IproductState } from 'lib/apis/product/interfaces';
import { duplicateProductService, productDeleteServices } from 'lib/apis/product/productServices';
import * as React from 'react';
import { useMutation } from 'react-query';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    product: IproductState;
    reFetch: () => void;
    type: "DELETE" | "DUPLICATE"
}

function ConfirmationModal({ isOpen, onClose, product, reFetch, type }: Props) {
    const deleteDescription = "Are you sure you want to delete this product? You will no longer have access to this product."
    const duplicateDescription = "Are you sure you want to duplicate this product? "
    const deleteMutation = useMutation((params: IproductDeleteServices) => productDeleteServices(params))
    const duplicateMutation = useMutation(() => duplicateProductService(product._id))
    const isLoading = deleteMutation.isLoading || duplicateMutation.isLoading
    const { showToast } = useAppToast()

    const handleAction = async () => {
        try {
            if (type === "DELETE") {
                await deleteMutation.mutateAsync({ productID: product._id })
                showToast({ message: "The product has been deleted!", type: "success" })
            } else {
                await duplicateMutation.mutateAsync()
                showToast({ message: "The product has been duplicated!", type: "success" })
            }
        } catch (error) {
            showToast({ message: "Oops! Something went wrong", type: "error" })
        }
        finally {
            reFetch()
            onClose()
        }
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "xl", isCentered: true }}
            modalContentProps={{ width: "600px", gap: 0, paddingBlock: 0, bg: "#141414" }}
        >
            <ModalHeaderData
                icon={
                    <ModalHeaderIconWrapper>
                        {type === "DELETE" ? <AppIcons.WhiteTrash /> : <AppIcons.Copy style={{ transform: "scaleX(-1)" }} />}
                    </ModalHeaderIconWrapper>
                }
                title={type === "DELETE" ? "Delete Product" : "Duplicate Product"}
                description={type === "DELETE" ? deleteDescription : duplicateDescription}
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" },
                    paddingBottom: { lg: "36px !important", md: "32px !important", base: "16px !important" }
                }}
            />
            <ModalBody bg={"#141414"} justifyContent={"space-between"} mb="8" overflow={"hidden"} display="flex">
                <Button disabled={isLoading} onClick={onClose} variant='secondary'>
                    Cancel
                </Button>
                <Button isLoading={isLoading} onClick={handleAction}>
                    {type === "DELETE" ? "Delete Product" : "Duplicate Product"}
                </Button>
            </ModalBody>
        </AppModal>
    );
}

export default ConfirmationModal;