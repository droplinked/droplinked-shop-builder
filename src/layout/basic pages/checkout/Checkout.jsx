
import { useState, useEffect } from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../sevices/hooks/useCart"

import ButtonComponent from "../../../components/button component/Button-component"
import CheckoutShopItem from "./CheckoutShopItem"
function Checkout() {

	const [cost, setCost] = useState(0);
	const [cartBaseShop, setCart] = useState([]);

	const { cart } = useCart();
	let navigate = useNavigate();

	const getCheckoutCart = () => {
		let shopArray = cart.map(item => item.shopID.name)
		let shops = [...new Set(shopArray)];

		return shops
	}

	useEffect(() => {
		if (cart != null) {
			let newCart = []
			let shops = getCheckoutCart()
			shops.map(shopname => {
				let totalPrice = 0;
				let items = []
				cart.forEach(item => {
					if (item.shopID.name == shopname) {
						items.push(item)
						totalPrice += item.price
					}
				})
				newCart.push({ shopName: shopname, items: items, total: totalPrice, shipping: 5 })
			})
			setCart(newCart)
		}
	}, [cart])



	return (
		<Flex
			w="100%"
			maxW="980px"
			m="0px auto"
			px={{ base: "20px", md: "80px" }}
			flexDirection="column"
		>

			<Text
				fontSize={{ base: "20px", md: "24px" }}
				fontWeight="600"
				color="#fff"
				m="0px auto 40px auto"
			>
				Check out
			</Text>
			{(cartBaseShop.length > 0) &&
				<>
					{cartBaseShop.map(item => {
						return <CheckoutShopItem shopItem={item} />
					})
					}
				</>
			}

			<Flex
				w="100%"
				justifyContent="end"
				mt="30px"
			>
				<Box
					w={{ base: "150px", md: "200px" }}
					h={{ base: "40px", md: "40px" }}
					borderRadius="15px"
					overflow="hidden"
				>
					<ButtonComponent>Checkout</ButtonComponent>
				</Box>
			</Flex>

		</Flex>
	);
}

export default Checkout;
