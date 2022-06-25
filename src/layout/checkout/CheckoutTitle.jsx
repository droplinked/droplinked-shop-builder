import React from "react";
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
