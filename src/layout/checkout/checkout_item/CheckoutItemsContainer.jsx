import React, { useState, useEffect } from "react";
import CheckoutItem from "./CheckoutItem";
import { Flex, Heading } from "@chakra-ui/react";

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

	useEffect(() => {
		setCost(
			variant
				.map((v) => v.cost)
				.reduce((first, last) => {
					return first + last;
				}, 0)
		);
		priceCost(cost);
	}, [variant]);

	return (
		<div>
			<Flex flexDirection={"column"}>
				{variant && variant.length ? (
					variant.map((valItem) => (
						<CheckoutItem
							img={valItem.img}
							title={valItem.title}
							options={valItem.options}
							amount={valItem.amount}
							cost={valItem.cost}
						/>
					))
				) : (
					<Heading>Cart is empty</Heading>
				)}
			</Flex>
		</div>
	);
}

export default CheckoutItemsContainer;
