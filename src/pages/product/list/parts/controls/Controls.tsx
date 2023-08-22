import React, { useCallback, useMemo } from 'react'
import PopOverMenu from 'components/common/PopoverMenu/PopOverMenu'
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import { useDisclosure } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { productUpdateServices } from 'lib/apis/product/productServices';
import { IproductUpdateServices } from 'lib/apis/product/interfaces';
import useAppToast from 'functions/hooks/toast/useToast';
import AppErrors from 'lib/utils/statics/errors/errors';
import ButtonsProductClass from 'pages/product/single/parts/buttons/model/ButtonProductModel';
import ProductSingleModel from 'pages/product/single/model/model';
import ConfirmDeleteProduct from './parts/delete/ConfirmDeleteCollection';
import DetailsProduct from './parts/details/DetailsProduct';

function ControlsListProduct({ productID, product, fetch }) {
    const { mutateAsync } = useMutation((params: IproductUpdateServices) => productUpdateServices(params))
    const { isOpen, onOpen, onClose } = useDisclosure()
    const detailModal = useDisclosure()
    const { shopNavigate } = useCustomNavigate()
    const { showToast } = useAppToast()

    const publish = useCallback(async () => {
        try {
            await ButtonsProductClass.validate({ draft: false, state: ProductSingleModel.refactorData(product) })
            await mutateAsync({ productID, params: { publish_product: true } })
            showToast(AppErrors.product.your_product_published, "success")
            fetch()
        } catch (error) {
            const message = error?.message || error?.response?.data?.data?.message
            showToast(message ? message : "Oops! Something went wrong", "error")

        }
    }, [productID, fetch, product])

    const items = useMemo(() => {
        const list = [
            {
                caption: "Edit",
                onClick: () => shopNavigate(`products/${productID}`)
            },
            {
                caption: "Delete",
                onClick: onOpen
            },
            {
                caption: "View Details",
                onClick: detailModal.onOpen
            }
        ]
        if (product?.publish_status === "DRAFTED") list.push({
            caption: "Publish",
            onClick: publish
        })

        return list
    }, [product])

    return (
        <>
            <PopOverMenu items={items} />
            <ConfirmDeleteProduct close={onClose} open={isOpen} productID={productID} fetch={fetch} />
            {detailModal.isOpen && <DetailsProduct close={detailModal.onClose} open={detailModal.isOpen} productID={product._id} />}
        </>
    )
}

export default ControlsListProduct