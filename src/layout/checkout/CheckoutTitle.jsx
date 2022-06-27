import React from "react";
// chakra
import { Heading } from "@chakra-ui/react";

function CheckoutTitle({ title }) {
	return (
		<Heading color={"white"} fontWeight={"hairline"}>
			{title}
		</Heading>
	);
}

CheckoutTitle.defaultProps = {
	title: "Your order",
};

export default CheckoutTitle;
