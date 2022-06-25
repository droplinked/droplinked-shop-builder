import {
	Box,
	Flex,
	Image,
	Heading,
	Text,
	useNumberInput,
	HStack,
	Button,
	Input,
} from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import { AiFillCloseCircle } from "react-icons/ai";

function CheckoutItem({ img, title, options, amount, cost }) {
	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
			defaultValue: amount,
			min: 1,
		});

	const inc = getIncrementButtonProps();
	const dec = getDecrementButtonProps();
	const input = getInputProps();

	return (
		<Flex
			flexDirection={["column", "column", "row", "row"]}
			backgroundColor={"#333335"}
			color="white"
			borderRadius={"7px"}
			padding="7"
			marginY={"2"}
			// width="rem"
			alignItems="center"
		>
			<Box>
				{/* image */}
				<Image src={img} alt={title} paddingX="3" />
			</Box>

			<Flex
				flexDirection={"column"}
				justifyContent={"center"}
				paddingX="5"
				// height="50%"
				// alignItems="center"
			>
				<Box>
					{/* title */}
					<Text fontSize={"xl"} marginY="3" fontWeight="bold">
						{title}
					</Text>
				</Box>

				{/* show options */}
				<Box>
					{options && options.length ? (
						options.map((varItem) => {
							// get key name and options value
							const [keyItem, valueItem] = Object.entries(varItem)[0];
							return (
								<>
									<Box paddingX={"0.5"}>
										<Flex>
											{/* key name */}
											<Text fontWeight="light">{keyItem}</Text> :{/* value  */}
											<Text color={"gray"} paddingX="0.5">
												{valueItem}
											</Text>
										</Flex>
									</Box>
								</>
							);
						})
					) : (
						// show no options
						<small>No Variant !</small>
					)}
				</Box>
			</Flex>
			<Box paddingY={"5"}>
				{/* amount */}
				<HStack
					// maxWidth={["75%", "75%", "30%", "30%", "25%", "25%"]}
					marginX="5"
					display="flex"
					justifyContent="center"
				>
					{/* minus button */}
					<Button backgroundColor={"#8053FF"} {...dec}>
						-
					</Button>
					<Input textAlign="center" padding="2px" margin="2" {...input} />
					{/* plus button */}
					<Button backgroundColor={"#8053FF"} {...inc}>
						+
					</Button>
				</HStack>
			</Box>
			<Box>
				<Box cursor={"pointer"} margin="5">
					<AiFillCloseCircle size={"22"} />
				</Box>
			</Box>
		</Flex>
	);
}

CheckoutItem.defaultProps = {
	title: "Special Product",
	img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxUBsOivOjpqkB0iYoJXlAuPwBpKquHUoiA&usqp=CAU",
	variant: [
		{
			size: "xl",
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
