import { Box, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

import CheckoutItem from "./CheckoutItem"

export default function CheckoutShopItem({ shopItem }) {
    const navigate = useNavigate()

    const clickOnShopname = () => {
        navigate(`/${shopItem.shopName}`)
    }

    return (<>
        <Box mb="50px">
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
                    cursor='pointer'
                    onClick={clickOnShopname}
                >
                    Shop: {shopItem.shopName}
                </Text>
            </Box>

            {shopItem.items.map((item, i) => {
                return <CheckoutItem key={i} product={item} />
            })}

            <Box
                mt="15px"
            >
                <Text
                    color="#fff"
                    fontSize="16px"
                >
                    Items: ${shopItem.total}
                </Text>
                <Text
                    mt="5px"
                    color="#fff"
                    fontSize="16px"
                >
                    Shipping: $5
                </Text>
            </Box>

        </Box>
    </>)
}