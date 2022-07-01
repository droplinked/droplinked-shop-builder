
import { useState, useEffect } from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../sevices/hooks/useCart"

import ButtonComponent from "../../../components/button component/Button-component"
import CheckoutShopItem from "./CheckoutShopItem"
import Loading from "../../../components/features/loading/Loading"

function Checkout() {

	const [cartBaseShop, setCart] = useState([]);

	const { cart } = useCart();
	let navigate = useNavigate();

	const getCheckoutCart = () => {
		let shopArray = cart.map(item => item.shopID.name)
		let shops = [...new Set(shopArray)];
		return shops
	}

	const getShipping = () => {
		let shipping;
		let shopArray = cart.map(item => item.shopID.name)
		let shops = [...new Set(shopArray)];
		shipping = (shops.length * 5)
		return shipping
	}

	const getTotalPrice = () => {
		let total = cart.map(item => { return (item.price * item.quantity) })
		total = total.reduce((a, b) => a + b, 0)
		return total
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
						totalPrice += (item.price * item.quantity)
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
			{(cart == null)
				?
				<Loading />
				:
				<>
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
							{cartBaseShop.map((item , i) => {
								return <CheckoutShopItem key={i} shopItem={item} />
							})
							}
						</>
					}

					<Flex
						w="100%"
						justifyContent="space-between"
						borderTop='1px' borderColor='white'
						pt="20px"
					>

						<Box>
							<Text
								color="#fff"
								fontSize={{ base: "18px", md: "22px" }}
								fontWeight="600"
							>
								Merchs cost : $ {getTotalPrice()}
							</Text>
							<Text
								color="#fff"
								fontSize={{ base: "18px", md: "22px" }}
								fontWeight="600"
								mt="5px"
							>
								Shipping total : $ {getShipping()}
							</Text>
						</Box>

						<Box
							w={{ base: "150px", md: "200px" }}
							h={{ base: "40px", md: "40px" }}
							borderRadius="15px"
							overflow="hidden"
							mt="33px"
						>
							<ButtonComponent
								click={() => { navigate('/address') }}
							>Checkout</ButtonComponent>
						</Box>
					</Flex>
				</>
			}
		</Flex>
	);
}

export default Checkout;
