import { Box, Flex, Text } from "@chakra-ui/react"

import CheckoutItem from "./CheckoutItem"

export default function CheckoutShopItem({ shopItem }) {

    // console.log(shopItem)
    return (<>
        <Box>
            <Box
                w="100%"
                mb="10px"
                borderBottom='1px'
                borderColor='#ccc'
            >
                <Text
                    fontSize={{ base: "14px", md: "18px" }}
                    fontWeight="600"
                    color="white"
                >
                    {shopItem.shopName}
                </Text>
            </Box>

            {shopItem.items.map(item => {
                return <CheckoutItem product={item} />
            })}

            <Box
                mt="15px"
            >
                <Text
                    color="#fff"
                    fontSize="16px"
                >
                    Total cost : $ 100
                </Text>
                <Text
                mt="10px"
                    color="#fff"
                    fontSize="16px"
                >
                   Shipping : $ 100
                </Text>
            </Box>

        </Box>
    </>)
}