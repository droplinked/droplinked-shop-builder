import { Box, Flex, VStack } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useMemo } from 'react'

interface IProps {
    boxes: Array<"price" | "description" | "title">
    title?: string
    image?: string
}
function ProductTypeDetail({ boxes, image, title }: IProps) {
    const { state: { pod_blank_product_id }, store: { state: { product_types, product_printful } } } = useContext(productContext)

    const getDetail = useMemo(() => {
        if (product_printful) {
            return {
                image: image || product_printful?.image,
                title: title || product_printful?.title,
                price: "$34.4 USD",
                description: product_printful?.description
            }
        }
        return null
    }, [pod_blank_product_id, product_printful, title, image])

    return (
        <>
            {getDetail && (
                <Flex gap={3} alignItems="center">
                    <Box width="fit-content">
                        <AppImage width="40px" height="50px" borderRadius="8px" src={getDetail?.image} />
                    </Box>
                    <VStack width="100%" align="stretch" color="#C2C2C2">
                        {boxes.map((el, key) => (
                            <AppTypography key={key} fontSize='14px' fontWeight={el === "title" ? "bold" : "normal"}>{getDetail[el]}</AppTypography>
                        ))}
                    </VStack>
                </Flex>
            )}
        </>
    )
}

export default ProductTypeDetail