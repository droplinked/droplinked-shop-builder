import { Box, Flex, Text } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import AppImage from "components/common/image/AppImage"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import React from "react"

interface Props {
    product: any,
    isLastOne: boolean
}

function ProductItem({ product, isLastOne }: Props) {
    const { imageSrc, title, stats, price } = product

    return (
        <Flex
            align="center"
            gap={4}
            borderBottom={isLastOne ? "none" : "1px solid #292929"}
            padding={4}
            cursor="pointer"
            onClick={() => console.log("Hello")}
        >
            <AppImage
                width={12}
                height={12}
                borderRadius={4}
                src={imageSrc}
                alt={title}
                objectFit="cover"
            />

            <Flex flex={1} justifyContent="space-between">
                <Flex direction="column" gap={1}>
                    <Text fontSize={14} color="#FFF">{title}</Text>
                    {stats && <Text fontSize={12} color="#7B7B7B">{stats}</Text>}
                </Flex>

                {price && <FormattedPrice price={12} fontSize={14} abbreviationProps={{ color: "7B7B7B" }} />}
            </Flex>

            <Box flexShrink={0}>
                <AppIcons.ChevronRight />
            </Box>
        </Flex>
    )
}

export default ProductItem