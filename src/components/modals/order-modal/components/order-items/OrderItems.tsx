import { Flex } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import orderModalContext from '../../context'
import CartItemBadge from './components/CartItemBadge'

function OrderItems() {
    const { order } = useContext(orderModalContext)
    const image = faker.image.avatar()

    return (
        <Flex direction={"column"} gap={"24px"}>
            <AppTypography fontSize={"16px"} fontWeight={500} color={"#FFFFFF"}>Cart</AppTypography>
            <Flex direction={"column"} gap={"16px"}>
                {[1, 2, 3].map((Item, index) =>
                    <Flex justifyContent={"space-between"} key={index}>
                        {/* left part */}
                        <Flex alignItems={"center"} gap={"16px"}>
                            <AppImage src={image} width="48px" height="48px" borderRadius="4px" />
                            <Flex direction={"column"} gap={"5px"}>
                                <Flex alignItems={"center"} gap={"8px"}>
                                    <AppTypography fontSize={"14px"} color={"#FFFFFF"}>Citrus Burst Orange Shoes</AppTypography>
                                </Flex>
                                <Flex alignItems={"center"} gap={"5px"}>
                                    <CartItemBadge text="Standard Shipping" />
                                    <CartItemBadge text="XL" />
                                    <CartItemBadge text="Red" />
                                </Flex>
                            </Flex>
                        </Flex>

                        {/* quantity */}
                        <AppTypography fontSize={"14px"} fontWeight={500} color={"#C2C2C2"}>x2</AppTypography>

                        {/* right part */}
                        <Flex direction={"column"}>
                            <Flex alignItems={"center"} gap={"8px"}>
                                <CartItemBadge text='2.45%' colorScheme='green' />
                                <AppTypography fontSize={"14px"} fontWeight={500} color={"#FFFFFF"}>{`$${5555}`}</AppTypography>
                            </Flex>
                            <Flex></Flex>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}

export default OrderItems