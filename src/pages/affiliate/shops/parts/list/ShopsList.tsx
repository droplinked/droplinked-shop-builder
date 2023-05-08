import { VStack } from '@chakra-ui/react'
import { shopPublicRecordedService } from 'lib/apis/shop/shopServices'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import ShopsContainer from './parts/container/ShopsContainer'
import ShopsListSkeleton from './parts/skeleton/ShopsListSkeleton'

function ShopsList() {
    const { mutate, data, isLoading } = useMutation(() => shopPublicRecordedService())

    useEffect(() => {
        mutate()
    }, [])

    return (
        <>
            {isLoading ? <ShopsListSkeleton /> : (
                <VStack align={"stretch"}>
                    {data?.data?.data && data.data.data.map((el: any, key: number) => <ShopsContainer shop={el} key={key} />)}
                </VStack>
            )}
        </>
    )
}

export default ShopsList