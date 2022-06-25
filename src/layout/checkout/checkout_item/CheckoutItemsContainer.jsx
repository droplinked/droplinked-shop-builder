import React, { useState } from "react";
import CheckoutItem from "./CheckoutItem";
import { Flex } from "@chakra-ui/react";

function CheckoutItemsContainer({ priceCost }) {
	const [variant, setVariant] = useState([
		{
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxUBsOivOjpqkB0iYoJXlAuPwBpKquHUoiA&usqp=CAU",
			title: "Best Product",
			options: [],
			amount: 1,
			cost: 25,
		},
		{
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxUBsOivOjpqkB0iYoJXlAuPwBpKquHUoiA&usqp=CAU",
			title: "Best Product",
			options: [],
			amount: 1,
			cost: 25,
		},
		{
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxUBsOivOjpqkB0iYoJXlAuPwBpKquHUoiA&usqp=CAU",
			title: "Best Product",
			options: [],
			amount: 1,
			cost: 25,
		},
	]);

	return (
		<div>
			<Flex flexDirection={"column"}>
				<CheckoutItem />
				<CheckoutItem />
				<CheckoutItem />
				<CheckoutItem />
			</Flex>
		</div>
	);
}

export default CheckoutItemsContainer;
