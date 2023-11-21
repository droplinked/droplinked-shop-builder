import { Box, HStack, SimpleGrid, Switch, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { printServicesServices } from 'lib/apis/product/productServices'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext } from 'react'
import { useQuery } from 'react-query'
import classes from './style.module.scss'
import IconBlockchain from 'components/common/iconBlockchain/IconBlockchain';

function ProductM2m() {
    const { data } = useQuery({
        queryFn: printServicesServices,
        queryKey: "printServicesServices",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })
    const { state: { m2m_services }, methods: { updateState } } = useContext(productContext)

    const updateM2M = useCallback((checked: boolean, id: string) => {
        updateState('m2m_services', checked ? [...m2m_services, id] : m2m_services.filter(el => el !== id))
    }, [m2m_services, updateState])

    const checked = useCallback((id: string) => m2m_services.includes(id), [m2m_services])

    return (
        <VStack align="stretch" spacing="16px">
            <AppTypography fontSize='14px'>Customer Wallet Options</AppTypography>
            <SimpleGrid columns={3} justifyContent="space-between" spacing={5}>
                {data?.data?.data && data?.data?.data.map((item: any, key: number) => (
                    <HStack spacing="5px" key={key}>
                        <Switch className={classes.switch} isChecked={checked(item?._id)} onChange={el => updateM2M(el.target.checked, item?._id)} outline="none !important" boxShadow="none !important" size='md' />
                        <Box><IconBlockchain blockchain={item?.name.toUpperCase()} props={{ width: "20px", height: "20px" }} /></Box>
                        <AppTypography fontSize='14px'>{item?.name}</AppTypography>
                    </HStack>
                ))}
            </SimpleGrid>
        </VStack>
    )
}

export default ProductM2m