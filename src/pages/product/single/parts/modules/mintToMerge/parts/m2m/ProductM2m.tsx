import { Box, HStack, SimpleGrid, Switch } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import { printServicesServices } from 'lib/apis/product/productServices'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import classes from './style.module.scss'
import IconBlockchain from 'components/common/iconBlockchain/IconBlockchain';

function ProductM2m() {
    const { mutate, data } = useMutation(() => printServicesServices())
    const { state: { m2m_services }, methods: { updateState } } = useContext(productContext)

    useEffect(() => mutate(), [])

    const updateM2M = useCallback((checked: boolean, id: string) => {
        updateState('m2m_services', checked ? [...m2m_services, id] : m2m_services.filter(el => el !== id))
    }, [m2m_services, updateState])

    const checked = useCallback((id: string) => m2m_services.includes(id), [m2m_services])

    return (
        <SimpleGrid columns={3} justifyContent="space-between" spacing={5}>
            {data?.data?.data && data?.data?.data.map((item: any, key: number) => (
                <HStack spacing="5px" key={key}>
                    <Switch className={classes.switch} isChecked={checked(item?._id)} onChange={el => updateM2M(el.target.checked, item?._id)} outline="none !important" boxShadow="none !important" size='md' />
                    <Box><IconBlockchain blockchain={item?.name.toUpperCase()} props={{ width: "20px", height: "20px" }} /></Box>
                    <AppTypography size='14px'>{item?.name}</AppTypography>
                </HStack>
            ))}
        </SimpleGrid>
    )
}

export default ProductM2m