import { useDisclosure } from '@chakra-ui/react';
import PopOverMenu from 'components/common/PopoverMenu/PopOverMenu';
import useStack from 'functions/hooks/stack/useStack';
import useAppToast from 'functions/hooks/toast/useToast';
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import useAppWeb3 from 'functions/hooks/web3/useWeb3';
import { IproductUpdateServices } from 'lib/apis/product/interfaces';
import { productUpdateServices } from 'lib/apis/product/productServices';
import useAppStore, { useLegalUsage } from 'lib/stores/app/appStore';
import productTypeLegalUsageMap from 'lib/utils/heper/productTypeLegalUsageMap';
import AppErrors from 'lib/utils/statics/errors/errors';
import ProductSingleModel from 'pages/product/single/model/model';
import ButtonsProductClass from 'pages/product/single/parts/buttons/model/ButtonProductModel';
import React, { useCallback, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import PaymentLinkModal from '../payment-link/PaymentLinkModal';
import ConfirmationModal from './parts/confirmation-modal/ConfirmationModal';
import DetailsProduct from './parts/details/DetailsProduct';
import ProductOrdersModal from '../product-orders/ProductOrdersModal';

export type action = "DELETE" | "DUPLICATE"

function ControlsListProduct({ productID, product, fetch }) {
    const shopLegalUsage = useLegalUsage()
    const [action, setAction] = useState<action>("DELETE")
    const { mutateAsync } = useMutation((params: IproductUpdateServices) => productUpdateServices(params))
    const { isOpen, onOpen, onClose } = useDisclosure()
    const detailModal = useDisclosure()
    const { shopNavigate } = useCustomNavigate()
    const { showToast } = useAppToast()
    const stack = useStack()
    const { validate, record } = ButtonsProductClass
    const appWeb3 = useAppWeb3()
    const { user: { wallets } } = useAppStore()
    const paymentLinkModal = useDisclosure()
    const productOrdersModal = useDisclosure()

    const publish = useCallback(async () => {
        try {
            const state = ProductSingleModel.refactorData(product)
            await validate({ draft: false, state })

            const shop = JSON.parse(localStorage.getItem('appStore')).state.shop;
            // Digital product record
            if (state.product_type === "DIGITAL" && state.sku[0].recordData.status === "NOT_RECORDED") await record({ method: (data: any) => appWeb3.web3({ method: "record", params: data, chain: state?.digitalDetail?.chain, wallets, stack }), product: state, stacks: stack, shop })

            await mutateAsync({ productID: state._id, params: { publish_product: true } })
            showToast({ message: AppErrors.product.your_product_published, type: "success" })
            fetch()
        } catch (error) {
            const message = error?.message || error?.response?.data?.data?.message
            showToast({ message: message ? message : "Oops! Something went wrong", type: "error" })

        }
    }, [productID, fetch, product, wallets, stack.stxAddress])

    const handleActionSelect = (action: action) => {
        if (action === "DELETE") {
            setAction(action)
            onOpen()
            return
        }

        const { errorMessage, key } = productTypeLegalUsageMap[product.product_type]
        const legalUsage = shopLegalUsage.find(obj => obj.key === key)
        if ((legalUsage.remaining === "Unlimited" || +legalUsage.remaining > 0)) {
            setAction(action)
            onOpen()
        }
        else showToast({ message: errorMessage, type: "error" })
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
                caption: "Orders",
                onClick: () => productOrdersModal.onOpen()
            },
            {
                caption: "Duplicate Product",
                onClick: () => handleActionSelect("DUPLICATE")
            },
            {
                caption: "Get payment link",
                onClick: () => paymentLinkModal.onOpen()
            },
        ]
        if (product?.publish_status === "DRAFTED") list.push({
            caption: "Publish",
            onClick: publish
        })
        if (product?.product_type === 'PRINT_ON_DEMAND' && product?.publish_status === "PUBLISHED") list.push({
            caption: "Order Product Sample",
            onClick: () => shopNavigate(`products/order/${productID}`)
        })
        if (product?.publish_status === "PUBLISHED") list.push({
            caption: "Draft",
            onClick: async () => await mutateAsync({ productID, params: { publish_product: false } }).then(() => fetch())
        })

        return list
    }, [product])

    return (
        <>
            <PopOverMenu items={items} />
            <ConfirmationModal open={isOpen} close={onClose} fetch={fetch} productID={productID} action={action} />
            {detailModal.isOpen && <DetailsProduct close={detailModal.onClose} open={detailModal.isOpen} productID={product._id} />}
            {paymentLinkModal.isOpen && <PaymentLinkModal isOpen={paymentLinkModal.isOpen} onClose={paymentLinkModal.onClose} productID={product._id} />}
            {productOrdersModal.isOpen && <ProductOrdersModal open={productOrdersModal.isOpen} close={productOrdersModal.onClose} productId={product._id} />}
        </>
    )
}

export default ControlsListProduct