import { Divider, Flex, Heading } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useEffect } from 'react'
import ShopList from './shop-list/ShopList'

function ShopManagement() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <Flex justifyContent={"center"} marginBlock={"190px"}>
            <Flex
                width={"700px"}
                direction={"column"}
                gap={5}
                border={" 1px solid rgba(44, 207, 162, 0.00)"}
                borderRadius={34}
                padding={9}
                bgColor={"rgba(20, 20, 20, 0.75)"}
            >
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Heading m={0} fontSize={24} color={"primary"}>Manage Your Shops</Heading>
                    <AppIcons.MultiShopManagement />
                </Flex>

                <AppTypography fontSize={16} color={"#808080"}>Here you can manage all your shops in one place. Easily create, edit, and switch between shops</AppTypography>

                <Divider m={0} borderColor={"#808080"} />

                <ShopList />
            </Flex>
        </Flex>
    )
}

export default ShopManagement