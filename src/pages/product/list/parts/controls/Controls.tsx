import { useDisclosure } from '@chakra-ui/react';
import PopOverMenu from 'components/common/PopoverMenu/PopOverMenu';
import useStack from 'functions/hooks/stack/useStack';
import useHookStore from 'functions/hooks/store/useHookStore';
import useAppToast from 'functions/hooks/toast/useToast';
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import useAppWeb3 from 'functions/hooks/web3/useWeb3';
import { IproductUpdateServices } from 'lib/apis/product/interfaces';
import { productUpdateServices } from 'lib/apis/product/productServices';
import AppErrors from 'lib/utils/statics/errors/errors';
import ProductSingleModel from 'pages/product/single/model/model';
import ButtonsProductClass from 'pages/product/single/parts/buttons/model/ButtonProductModel';
import React, { useCallback, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import ConfirmationModal from './parts/confirmation-modal/ConfirmationModal';
import DetailsProduct from './parts/details/DetailsProduct';

export type action = "DELETE" | "DUPLICATE"

function ControlsListProduct({ productID, product, fetch }) {
    const [action, setAction] = useState<action>("DELETE")
    const { mutateAsync } = useMutation((params: IproductUpdateServices) => productUpdateServices(params))
    const { isOpen, onOpen, onClose } = useDisclosure()
    const detailModal = useDisclosure()
    const { shopNavigate } = useCustomNavigate()
    const { showToast } = useAppToast()
    const stack = useStack()
    const { validate, record } = ButtonsProductClass
    const appWeb3 = useAppWeb3()
    const { app: { user: { wallets } } } = useHookStore()

    const publish = useCallback(async () => {
        try {
            const state = ProductSingleModel.refactorData(product)
            await validate({ draft: false, state })

            // Digital product record
            if (state.product_type === "DIGITAL" && state.sku[0].recordData.status === "NOT_RECORDED") await record({ method: (data: any) => appWeb3.web3({ method: "record", params: data, chain: state?.digitalDetail?.chain, wallets, stack }), product: state, stacks: stack })

            await mutateAsync({ productID: state._id, params: { publish_product: true } })
            showToast({ message: AppErrors.product.your_product_published, type: "success" })
            fetch()
        } catch (error) {
            const message = error?.message || error?.response?.data?.data?.message
            showToast({ message: message ? message : "Oops! Something went wrong", type: "error" })

        }
    }, [productID, fetch, product, wallets, stack.stxAddress])

    const handleActionSelect = (action: action) => {
        setAction(action)
        onOpen()
    }

    const items = useMemo(() => {
        const list = [
            {
                caption: "Edit",
                onClick: () => shopNavigate(`products/${productID}`)
            },
            {
                caption: "Delete",
                onClick: () => handleActionSelect("DELETE")
            },
            {
                caption: "View Details",
                onClick: detailModal.onOpen
            },
            {
                caption: "Duplicate Product",
                onClick: () => handleActionSelect("DUPLICATE")
            }
        ]
        if (product?.publish_status === "DRAFTED") list.push({
            caption: "Publish",
            onClick: publish
        })
        if (product?.product_type === 'PRINT_ON_DEMAND' && product?.publish_status === "PUBLISHED") list.push({
            caption: "Order Product Sample",
            onClick: () => shopNavigate(`products/order/${productID}`)
        })
        if(product?.publish_status === "PUBLISHED") list.push({
            caption: "Draft",
            onClick: async () => await mutateAsync({ productID, params: { publish_product: false } }).then(()=> fetch())
        })

        return list
    }, [product])

    return (
        <>
            <PopOverMenu items={items} />
            <ConfirmationModal open={isOpen} close={onClose} fetch={fetch} productID={productID} action={action} />
            {detailModal.isOpen && <DetailsProduct close={detailModal.onClose} open={detailModal.isOpen} productID={product._id} />}
        </>
    )
}

export default ControlsListProduct