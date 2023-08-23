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
    const { state: { pod_blank_product_id }, store: { state: { product_types } } } = useContext(productContext)

    const getDetail = useMemo(() => {
        if (product_types.length) {
            const data = product_types.find(el => el._id === pod_blank_product_id)
            return {
                image: image || data?.image,
                title: title || data?.title,
                price: "34.4 USD",
                description: data?.description
            }
        }
        return null
    }, [pod_blank_product_id, product_types, title, image])
    console.log("getDetail", getDetail?.image);


    return (
        <>
            {getDetail && (
                <Flex gap={3} alignItems="center" padding="20px" borderRadius="8px" backgroundColor="#171717">
                    <Box width="fit-content">
                        <AppImage width="40px" height="50px" borderRadius="8px" src={getDetail?.image} />
                    </Box>
                    <VStack width="100%" align="stretch" color="#C2C2C2">
                        {boxes.map((el, key) => (
                            <AppTypography key={key} size='14px' weight={el === "title" ? "bolder" : "normal"}>{getDetail[el]}</AppTypography>
                        ))}
                    </VStack>
                </Flex>
            )}
        </>
    )
}

export default ProductTypeDetail