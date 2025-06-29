import { Box, Divider, Flex, Heading } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import ShopList from './shop-list/ShopList'

function ShopManagement() {
    const { t } = useLocaleResources('shop');

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
                        <Heading m={0} fontSize={24} color={"neutral.white"}>{t('main.title')}</Heading>
                        <AppIcons.MultiShopManagement />
                    </Flex>

                    <AppTypography fontSize={16} color={"#808080"}>{t('main.description')}</AppTypography>

                    <Divider borderColor={"#808080"} />

                    <ShopList />
                </Flex>
            </Box>
        </Flex>
    )
}

export default ShopManagement