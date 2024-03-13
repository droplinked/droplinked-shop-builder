import { Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import useAppToast from 'functions/hooks/toast/useToast';
import { deleteProductTileService } from 'lib/apis/product/productServices';
import { productContext } from 'pages/product/single/context';
import React, { useContext } from 'react';
import { useMutation } from 'react-query';

interface Props {
    isOpen: boolean;
    close: () => void;
    selectedTile: any
}

function ProductTileDeleteConfirmationModal({ isOpen, close, selectedTile }: Props) {
    const { isLoading, mutateAsync } = useMutation(() => deleteProductTileService(selectedTile._id))
    const { state: { productTile }, methods: { updateState } } = useContext(productContext)
    const { showToast } = useAppToast()
    const handleDeleteProductTile = async () => {
        try {
            await mutateAsync()
            updateState("productTile", [...productTile.filter(t => t._id !== selectedTile._id)])
            close()
        } catch (error) {
            showToast({ type: "error", message: "Something went wrong!" })
        }
    }

    return (
        <AppModal open={isOpen} close={close} size="3xl" isCentered={true} contentProps={{ paddingX: 3, paddingY: 6 }}>
            <Flex direction={"column"} gap={6}>
                <AppTypography fontSize={"16px"} fontWeight={600} color={"#FFFFFF"}>Delete product title</AppTypography>
                <AppTypography fontSize="14px" fontWeight={400} color={"#FFFFFF"}>
                    Are you sure you want to delete this product title?
                </AppTypography>
                <Flex justify="flex-end" alignItems="center" gap={4}>
                    <BasicButton sizes='medium' variant="outline" onClick={() => close()}>No</BasicButton>
                    <BasicButton sizes='medium' isLoading={isLoading} isDisabled={isLoading} onClick={handleDeleteProductTile}>Yes</BasicButton>
                </Flex>
            </Flex>
        </AppModal>
    )
}

export default ProductTileDeleteConfirmationModal