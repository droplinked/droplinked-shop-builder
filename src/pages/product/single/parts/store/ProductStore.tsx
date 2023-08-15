import { IpodAvailableVariantsService, IpodPrintPositionsService, IpodProductService, IproviderIDService } from 'lib/apis/pod/interfaces'
import { podAvailableVariantsService, podPrintPositionsService, podProductService, providerIDService } from 'lib/apis/pod/services'
import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import { productContext } from '../../context'

interface IProps {
    children: any
}

function ProductStore({ children }: IProps) {
    const { state: { pod_blank_product_id, prodviderID }, productID, methods: { updateState }, store: { methods: { update } } } = useContext(productContext)
    const providerService = useMutation((params: IpodProductService) => podProductService(params))
    const availableVariants = useMutation((params: IpodAvailableVariantsService) => podAvailableVariantsService(params))
    const printPositions = useMutation((params: IpodPrintPositionsService) => podPrintPositionsService(params))
    const provider = useMutation((params: IproviderIDService) => providerIDService(params))

    // Get providers
    useEffect(() => {
        if (pod_blank_product_id) providerService.mutate({ pod_blank_product_id }, {
            onSuccess: res => {
                const data = res.data?.data
                update("variants", data)
                availableVariants.mutate({ productId: data._id, provider: data.provider }, {
                    onSuccess: (res: any) => update("available_variant", res?.data?.data)
                })
                printPositions.mutate({ productId: data._id, provider: data.provider }, {
                    onSuccess: (res: any) => update("print_positions", res?.data?.data)
                })
            }
        })
    }, [pod_blank_product_id])

    // Get product types
    useEffect(() => {
        if (prodviderID) provider.mutate({ prodviderID }, {
            onSuccess: res => {
                const data = res.data?.data
                update("product_types", data)
                if (!productID) updateState("pod_blank_product_id", data[0]._id)
            }
        })
    }, [prodviderID, productID])

    return children
}

export default ProductStore