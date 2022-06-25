import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import ContentWrapper from "../../components/Structure/content-wrapper/Content-wrapper-component";

// components
import CheckoutTitle from "./CheckoutTitle";
import CheckoutItem from "./checkout_item/CheckoutItem";

function checkout() {
	return (
		<ContentWrapper>
			<Flex flexDirection={"column"} alignItems="self-start">
				<CheckoutTitle />

				{/* items */}
				<Flex flexDirection={"column"}>
					<CheckoutItem />
					<CheckoutItem />
					<CheckoutItem />
					<CheckoutItem />
				</Flex>
			</Flex>
		</ContentWrapper>
	);
}

export default checkout;
