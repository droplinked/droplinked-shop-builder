import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import React from 'react'
import ShippingAvailabilityPopover from '../ShippingAvailability/ShippingAvailabilityPopover'
import StarRating from './StarRating'

interface BaseProps {
    product: any
}

type ProductCardProps =
    | (BaseProps & { onProductSelect: (product: any) => void })
    | (BaseProps & { showShippingPopover: boolean; onProductDelete?: () => void })

function PODProductCard(props: ProductCardProps) {
    const { product } = props
    const isSelectMode = 'onProductSelect' in props
    const isDeleteMode = 'onProductDelete' in props && !!props.onProductDelete
    const hasShippingPopover = 'showShippingPopover' in props

    const borderStyle = isDeleteMode ? '1.5px solid #2BCFA1' : '1px solid #292929'
    const backgroundColor = isDeleteMode ? 'rgba(43, 207, 161, 0.10)' : 'transparent'
    const dividerColor = isDeleteMode ? '#616161' : '#292929'

    return (
        <Flex
            alignItems="center"
            gap={4}
            border={borderStyle}
            borderRadius={8}
            padding={3}
            sx={{ fontSize: 14 }}
            bg={backgroundColor}
            _hover={{ 'button': { opacity: 1 } }}
        >
            <AppImage w={14} h={14} borderRadius={4} src={product?.image} />

            <Flex flex={1} direction="column" gap={2}>
                <Text fontWeight={500} color="#FFF">{product?.title}</Text>
                <Flex alignItems="center" gap={4}>
                    {product?.priceRange && (
                        <>
                            <Text color="#B1B1B1">{product.priceRange}</Text>
                            <Divider h={5} orientation="vertical" borderColor={dividerColor} />
                        </>
                    )}

                    <StarRating rate={product?.rating} />

                    {hasShippingPopover && (
                        <>
                            <Divider h={5} orientation="vertical" borderColor={dividerColor} />
                            <ShippingAvailabilityPopover />
                        </>
                    )}
                </Flex>
            </Flex>

            {isSelectMode && (
                <Text
                    as="button"
                    padding="10px 14px"
                    fontWeight={500}
                    color="#2BCFA1"
                    onClick={() => props.onProductSelect(product)}
                    opacity={0}
                    transition="opacity 0.2s"
                >
                    Select
                </Text>
            )}

            {isDeleteMode && (
                <Box as="button" type="button" padding="10px" onClick={props.onProductDelete}>
                    <AppIcons.RedTrash />
                </Box>
            )}
        </Flex>
    )
}

export default PODProductCard