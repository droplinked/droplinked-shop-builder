import { Box, VStack } from '@chakra-ui/react'
import AppModal, { IAppModal } from 'components/common/modal/AppModal'
import AppTypography from 'components/common/typography/AppTypography'
import { productByIdServices } from 'lib/apis/product/productServices'
import { IproductByIdServices } from 'lib/apis/product/interfaces'
import React, { useCallback, useEffect } from 'react'
import { useMutation } from 'react-query'
import detailsProductContext from './context'
import DetailsProductInformation from './parts/information/DetailsProductInformation'
import DetailsProductInSku from './parts/sku/DetailsProductInSku'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'

interface Iprops extends IAppModal {
    productID: string
}

function DetailsProduct({ close, open, productID }: Iprops) {
    const { mutate, isLoading, data } = useMutation((params: IproductByIdServices) => productByIdServices(params))
    const { shop } = useProfile()

    const fetch = useCallback(() => mutate({ productID, shopname: shop.name }), [productID, shop])

    useEffect(() => fetch(), [])

    return (
        <>
            <AppModal close={close} open={open} size="2xl" title="Product Details">
                <detailsProductContext.Provider value={{ product: data?.data?.data, fetch }}>
                    <VStack align="stretch" color="#C2C2C2" spacing="20px">
                        <AppSkeleton isLoaded={!isLoading}>
                            <VStack align="stretch" spacing="0">
                                <AppTypography size='16px' weight='bolder'>Sales Information</AppTypography>
                                <Box padding={3}><DetailsProductInformation /></Box>
                            </VStack>
                        </AppSkeleton>
                        <AppSkeleton isLoaded={!isLoading}>
                            <VStack align="stretch" spacing="0">
                                <AppTypography size='16px' weight='bolder'>Product Data</AppTypography>
                                <Box padding={3}><DetailsProductInSku /></Box>
                            </VStack>
                        </AppSkeleton>
                    </VStack>
                </detailsProductContext.Provider>
            </AppModal>
        </>
    )
}

export default DetailsProduct