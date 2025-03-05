import { Box, Flex, Text } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import AppImage from "components/common/image/AppImage"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import { TopSeller } from "lib/apis/dashboard/interfaces"
import React from "react"
import { useNavigate } from "react-router-dom"

interface Props {
    product: TopSeller
    isLastItem: boolean
}

function ProductItem({ product, isLastItem }: Props) {
    const { productMedia, productName, totalAmountCombined } = product
    const navigate = useNavigate()

    const imageURL = (productMedia.find(m => m.isMain) ?? productMedia[0])?.thumbnail

    return (
        <Flex
            align="center"
            gap={4}
            borderBottom={isLastItem ? "none" : "1px solid neutral.gray.800"}
            padding={4}
        >
            <AppImage
                width={12}
                height={12}
                borderRadius={4}
                src={imageURL}
                alt={productName}
                objectFit="cover"
            />

            <Flex
                flex={1}
                flexDirection={{ base: "column", md: "row" }}
                flexWrap="wrap"
                justifyContent="space-between"
                gap={1}
            >
                <Text fontSize={14} color="#FFF">{productName}</Text>
                {totalAmountCombined && <FormattedPrice price={totalAmountCombined} fontSize={14} abbreviationProps={{ color: "#7B7B7B" }} />}
            </Flex>

            <Box
                as="button"
                flexShrink={0}
                onClick={() => navigate("/analytics/products")}
            >
                <AppIcons.ChevronRight color="white" />
            </Box>
        </Flex>
    )
}

export default ProductItem