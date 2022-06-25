import { useState, useEffect } from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import ContentWrapper from "../../components/Structure/content-wrapper/Content-wrapper-component";

// components
import CheckoutTitle from "./CheckoutTitle";
import CheckoutItem from "./checkout_item/CheckoutItem";
import CheckoutItemsContainer from "./checkout_item/CheckoutItemsContainer";

function Checkout() {
	const [cost, setCost] = useState(0);

	return (
		<ContentWrapper>
			<Flex
				flexDirection={"column"}
				alignItems="self-start"
				margin={"auto"}
				width={["100%", "50%", "100%", "100%", "100%"]}
				// width=""
				color="white"
			>
				<Box paddingBottom={"5"}>
					<CheckoutTitle title={"Your rders"} />
				</Box>

				<CheckoutItemsContainer
					priceCost={(vItem) => {
						setCost(vItem);
						console.log(vItem);
					}}
				/>

				<Flex
					alignItems="center"
					justifyContent={"space-between"}
					padding="2"
					width="100%"
					marginTop={"7"}
				>
					{/* total price */}
					<Text justifySelf={"end"}>Total rice : ${cost}</Text>
					{/* checkout button */}
					<Button backgroundColor={"#8053FF"} justifySelf={"end"}>
						Checkout
					</Button>
				</Flex>
			</Flex>
		</ContentWrapper>
	);
}

export default Checkout;
