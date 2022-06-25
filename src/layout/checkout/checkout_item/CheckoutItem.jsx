import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
// import {Box} from

function CheckoutItem({ img, title, variant, amount, cost }) {
	return (
		<Flex
			backgroundColor={"#333335"}
			color="white"
			borderRadius={"7px"}
			padding="10"
			marginY={"2"}
			width="50rem"
		>
			{/* image */}
			<Image src={img} alt={title} width="25" marginRight={"5"} />

			<Flex flexDirection={"column"} justifyContent={"center"}>
				{/* title */}
				<Heading fontSize={"xl"} marginY="3" fontWeight="semiBold">
					{title}
				</Heading>

				{variant ? (
					variant.map((varItem) => {
						const [keyItem, valueItem] = Object.entries(varItem)[0];
						return (
							<>
								<Box paddingX={"0.5"}>
									<Flex>
										<Text>{keyItem}</Text> :
										<Text color={"gray"} paddingX="0.5">
											{" "}
											{valueItem}
										</Text>
									</Flex>
								</Box>
							</>
						);
					})
				) : (
					<small>No Variant !</small>
				)}
			</Flex>
		</Flex>
	);
}

CheckoutItem.defaultProps = {
	title: "Special Product",
	img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxUBsOivOjpqkB0iYoJXlAuPwBpKquHUoiA&usqp=CAU",
	variant: [
		{
			size: "xll",
		},
		{
			color: "red",
		},
	],
	amount: 1,
	cost: 50,
};

CheckoutItem.propTypes = {
	title: PropTypes.string,
	img: PropTypes.string,
	variant: PropTypes.array,
	amount: PropTypes.number,
};

export default CheckoutItem;
