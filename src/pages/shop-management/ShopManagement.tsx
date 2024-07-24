import { Box, Divider, Flex, Heading } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useEffect } from 'react'
import ShopList from './shop-list/ShopList'

function ShopManagement() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <Flex justifyContent={"center"} marginBlock={"120px"}>
            <Box
                borderRadius={34}
                padding={"1px"}
                background={"linear-gradient(180deg ,rgba(20, 20, 20, 0.75), #2BCFA1)"}
            >
                <Flex
                    width={700}
                    flexDirection={"column"}
                    gap={5}
                    borderRadius={"inherit"}
                    padding={"44px 52px"}
                    background={"rgba(20, 20, 20, 0.85)"}
                >
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <Heading m={0} fontSize={24} color={"primary"}>Manage Your Shops</Heading>
                        <AppIcons.MultiShopManagement />
                    </Flex>

                    <AppTypography fontSize={16} color={"#808080"}>Here you can manage all your shops in one place. Easily create, edit, and switch between shops</AppTypography>

                    <Divider borderColor={"#808080"} />

                    <ShopList />
                </Flex>
            </Box>
        </Flex>
    )
}

export default ShopManagement