import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import orderModalContext from '../context'
import CartItemBadge from './components/CartItemBadge'

function OrderItems() {
    const { order } = useContext(orderModalContext)

    return (
        <Flex direction={"column"} gap={"24px"}>
            <AppTypography fontSize={"16px"} fontWeight={500} color={"#FFFFFF"}>Cart</AppTypography>
            <Flex direction={"column"} gap={"16px"}>
                {order?.items.map((item) =>
                    <Flex justifyContent={"space-between"} key={item._id}>
                        {/* left part */}
                        <Flex alignItems={"center"} gap={"16px"}>
                            <AppImage src={item.image} width="48px" height="48px" borderRadius="4px" />
                            <Flex direction={"column"} gap={"5px"}>
                                <Flex alignItems={"center"} gap={"8px"}>
                                    <AppTypography fontSize={"14px"} color={"#FFFFFF"}>{item.title}</AppTypography>
                                    {item.isAffiliate && <CartItemBadge text={"Affiliate"} colorScheme='green' />}
                                </Flex>
                                <Flex alignItems={"center"} gap={"5px"}>
                                    {item.shipping && <CartItemBadge text={item.shipping} />}
                                    <CartItemBadge text={item.size.title} />
                                    <CartItemBadge text={item.color.title} />
                                </Flex>
                            </Flex>
                        </Flex>

                        {/* quantity */}
                        <AppTypography fontSize={"14px"} fontWeight={500} color={"#C2C2C2"}>x{item.quantity}</AppTypography>

                        {/* right part */}
                        <Flex direction={"column"} gap={"5px"}>
                            <Flex alignItems={"center"} gap={"8px"}>
                                {item.isAffiliate && <CartItemBadge text={item.percent} colorScheme='green' />}
                                <AppTypography fontSize={"14px"} fontWeight={500} color={"#FFFFFF"}>{`$${item?.price?.toFixed(2) || 0}`}</AppTypography>
                            </Flex>
                            {item.isGated &&
                                <Flex alignItems={"center"} gap={"4px"}>
                                    <AppIcons.GrayGatedIcon />
                                    <AppTypography fontSize={"10px"} color={"#FFFFFF"}>Gated Product</AppTypography>
                                </Flex>
                            }
                            {item.isDiscounted &&
                                <Flex alignItems={"center"} gap={"4px"}>
                                    <AppIcons.GrayDiscountIcon />
                                    <AppTypography fontSize={"10px"} color={"#FFFFFF"}>{`$${item.discountAmount?.toFixed(2) || 0} Discount`}</AppTypography>
                                </Flex>
                            }
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}

export default OrderItems