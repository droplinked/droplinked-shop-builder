
import { useState, useEffect } from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/cart/CartContext"

import BasicButton from "../../../components/shared/BasicButton/BasicButton"
import CheckoutShopItem from "./CheckoutShopItem"
import Loading from "../../../components/shared/loading/Loading"

function CheckoutPage() {

	const [cartBaseShop, setCart] = useState([]);

	const { cart } = useCart();
	let navigate = useNavigate();


	// get shops of items
	const getshops = () => {
		let shopArray = cart.items.map(item => item.shopName)
		let shops = [...new Set(shopArray)];
		return shops
	}


	//get total price of all items
	const getTotalPrice = () => {
		let total = cartBaseShop.map( item => { return (item.total + 5) })
		total = total.reduce((a, b) => a + b, 0)
		return total
	}

	// build new cart based shop name 
	useEffect(() => {
		if (cart != null) {
			let newCart = []
			let shops = getshops()

			shops.map(shopname => {
				let totalPrice = 0;
				let items = []
				cart.items.forEach(item => {
					if (item.shopName == shopname) {
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
				<Text
					fontSize={{ base: "20px", md: "24px" }}
					fontWeight="600"
					color="#fff"
					m="0px auto 40px auto"
				>
					Empty
				</Text>
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
							{cartBaseShop.map((shop , i) => {
								return <CheckoutShopItem key={i} shopItem={shop} />
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
								{/* Shipping total : $ {getShipping()} */}
							</Text>
						</Box>

						<Box
							w={{ base: "150px", md: "200px" }}
							h={{ base: "40px", md: "40px" }}
							borderRadius="15px"
							overflow="hidden"
							//mt="33px"
						>
							<BasicButton
								click={() => { navigate('/address') }}
							>Checkout</BasicButton>
						</Box>
					</Flex>
				</>
			}
		</Flex>
	);
}

export default CheckoutPage;
