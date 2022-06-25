import React, { useState } from "react";
import CheckoutItem from "./CheckoutItem";
import { Flex } from "@chakra-ui/react";

function CheckoutItemsContainer({ priceCost }) {
	const [variant, setVariant] = useState([
		{
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxUBsOivOjpqkB0iYoJXlAuPwBpKquHUoiA&usqp=CAU",
			title: "Best Product",
			options: [
				{
					size: "xl",
				},
				{
					color: "red",
				},
			],
			amount: 1,
			cost: 25,
		},
		{
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxUBsOivOjpqkB0iYoJXlAuPwBpKquHUoiA&usqp=CAU",
			title: "Best Product",
			options: [
				{
					size: "xl",
				},
				{
					color: "red",
				},
			],
			amount: 1,
			cost: 25,
		},
		{
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxUBsOivOjpqkB0iYoJXlAuPwBpKquHUoiA&usqp=CAU",
			title: "Best Product",
			options: [
				{
					size: "xl",
				},
				{
					color: "red",
				},
			],
			amount: 1,
			cost: 25,
		},
	]);

	const [cost, setCost] = useState(0);

	setCost(
		variant
			.map((v) => v.cost)
			.reduce((first, last) => {
				return first + last;
			}, 0)
	);

	priceCost(cost);

	return (
		<div>
			<Flex flexDirection={"column"}>
				{variant.map((valItem) => (
					<CheckoutItem
						img={valItem.img}
						title={valItem.title}
						options={valItem.options}
						amount={valItem.amount}
						cost={valItem.cost}
					/>
				))}
			</Flex>
		</div>
	);
}

export default CheckoutItemsContainer;
