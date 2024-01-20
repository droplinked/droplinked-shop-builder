import { IpodAvailableVariantsService, IpodPrintPositionsService, IpodProductService, IproviderIDService } from 'lib/apis/pod/interfaces'
import { podAvailableVariantsService, podPrintPositionsService, podProductService, providerIDService } from 'lib/apis/pod/services'
import React, { useCallback, useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import { productContext } from '../../context'
import ProductModel from '../../model'

interface IProps {
    children: any
}

function ProductStore({ children }: IProps) {
    const { state: { pod_blank_product_id, prodviderID, printful_template_id }, productID, methods: { updateState, setSync }, store: { methods: { update } } } = useContext(productContext)
    const providerService = useMutation((params: IpodProductService) => podProductService(params))
    const availableVariants = useMutation((params: IpodAvailableVariantsService) => podAvailableVariantsService(params))
    const printPositions = useMutation((params: IpodPrintPositionsService) => podPrintPositionsService(params))
    const provider = useMutation((params: IproviderIDService) => providerIDService(params))

    const getAvailable = useCallback(({ productId, provider, templateID }: IpodAvailableVariantsService) => {
        availableVariants.mutate({ productId, provider, templateID }, {
            onSuccess: (res: any) => update("available_variant", res?.data?.data)
        })
    }, [])

    // Get providers
    useEffect(() => {
        if ((pod_blank_product_id && !ProductModel.isPrintful(prodviderID)) || (productID && pod_blank_product_id)) {
            providerService.mutate({ pod_blank_product_id }, {
                onSuccess: res => {
                    const data = res.data?.data
                    update("variants", data)
                    const body: IpodAvailableVariantsService = ProductModel.isPrintful(prodviderID) ? { productId: pod_blank_product_id, provider: prodviderID, templateID: printful_template_id } : { productId: data.id, provider: prodviderID }
                    getAvailable(body)
                    if (!ProductModel.isPrintful(prodviderID)) printPositions.mutate(body, {
                        onSuccess: (res: any) => update("print_positions", res?.data?.data)
                    })
                }
            })
        }
    }, [pod_blank_product_id, printful_template_id, prodviderID, productID])

    // Get product types
    useEffect(() => {
        if (prodviderID) provider.mutate({ prodviderID }, {
            onSuccess: res => {
                const data = res.data?.data
                update("product_types", data)
                if (!productID && !ProductModel.isPrintful(prodviderID)) updateState("pod_blank_product_id", data[0]._id)
            }
        })
    }, [prodviderID, productID])

    // Update sync
    useEffect(() => {
        setSync(!(providerService.isLoading || availableVariants.isLoading || printPositions.isLoading || provider.isLoading))
    }, [providerService.isLoading, availableVariants.isLoading, printPositions.isLoading, provider.isLoading])

    return children
}

export default ProductStore