import { Box, Flex, Text } from "@chakra-ui/react"
import { ChevronleftMd } from "assets/icons/Navigation/ChevronLeft/ChevronleftMd"
import { ChevronrightMd } from "assets/icons/Navigation/ChevronRight/ChevronrightMd"
import AppImage from "components/common/image/AppImage"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import React from "react"
import { useNavigate } from "react-router-dom"
import { TopSeller } from "services/dashboard/interfaces"

interface Props {
    product: TopSeller
}

function ProductItem({ product }: Props) {
    const navigate = useNavigate()
    const { isRTL } = useLocaleResources("analyticsPage")

    const { productMedia, productName, totalAmountCombined } = product
    const imageURL = (productMedia.find(m => m.isMain) ?? productMedia[0])?.thumbnail

    return (
        <Flex align="center" gap={4} padding={{ base: 4, xl: "16px 24px" }}>
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
                flexWrap="wrap"
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="space-between"
                gap={6}
            >
                <Text fontSize={14} color="text.white">{productName}</Text>
                {totalAmountCombined &&
                    <FormattedPrice
                        price={totalAmountCombined}
                        abbreviationProps={{ color: "text.subtext.placeholder.dark" }}
                        fontSize={14}
                    />
                }
            </Flex>

            <Box
                as="button"
                flexShrink={0}
                padding="10px"
                onClick={() => navigate("/analytics/products")}
            >
                {isRTL ? <ChevronleftMd color='white' /> : <ChevronrightMd color='white' />}
            </Box>
        </Flex>
    )
}

export default ProductItem