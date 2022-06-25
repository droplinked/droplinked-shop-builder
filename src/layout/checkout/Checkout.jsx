import React from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import ContentWrapper from "../../components/Structure/content-wrapper/Content-wrapper-component";

// components
import CheckoutTitle from "./CheckoutTitle";
import CheckoutItem from "./checkout_item/CheckoutItem";
import CheckoutItemsContainer from "./checkout_item/CheckoutItemsContainer";

function checkout() {
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

				{/* items */}
				<CheckoutItemsContainer />

				<Box alignSelf={"end"} alignItems="end" justifyContent={"end"}>
					{/* total price */}
					<Text>Total Price : 30$</Text>
					{/* checkout button */}
					<Button>Checkout</Button>
				</Box>
			</Flex>
		</ContentWrapper>
	);
}

export default checkout;
