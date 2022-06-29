import React, { useState, useEffect } from "react";
// chakra
import { Flex, Heading } from "@chakra-ui/react";
// component
import CheckoutItem from "./CheckoutItem";

function CheckoutItemsContainer({ priceCost }) {
	// send variant here
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

	// cost state
	const [cost, setCost] = useState(0);

	useEffect(() => {
		// set cost to state
		setCost(
			variant
				.map((v) => v.cost)
				.reduce((first, last) => {
					return first + last;
				}, 0)
		);
		// send price state cost
		priceCost(cost);
	}, [variant]);

	return (
		<div>
			<Flex flexDirection={"column"}>
				{/* show the items */}
				{variant && variant.length ? (
					variant.map((valItem, i) => (
						<CheckoutItem
							key={i}
							img={valItem.img}
							title={valItem.title}
							options={valItem.options}
							amount={valItem.amount}
							cost={valItem.cost}
						/>
					))
				) : (
					// cart empty error
					<Heading>Cart is empty</Heading>
				)}
			</Flex>
		</div>
	);
}

export default CheckoutItemsContainer;
