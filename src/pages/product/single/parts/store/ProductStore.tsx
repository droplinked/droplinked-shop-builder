import { IpodProductService, IproviderIDService } from 'lib/apis/pod/interfaces'
import { podProductService, providerIDService } from 'lib/apis/pod/services'
import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import { productContext } from '../../context'

interface IProps {
    children: any
}

function ProductStore({ children }: IProps) {
    const { state: { pod_blank_product_id }, store: { methods: { update } } } = useContext(productContext)
    const providerService = useMutation((params: IpodProductService) => podProductService(params))

    // Get providers
    useEffect(() => {
        if (pod_blank_product_id) providerService.mutate({ pod_blank_product_id }, { onSuccess: res => update("variants", res.data?.data) })
    }, [pod_blank_product_id])

    return children
}

export default ProductStore