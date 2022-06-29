import { useState } from "react";
// chakra
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// components
import ContentWrapper from "../../../components/Structure/content-wrapper/Content-wrapper-component";
import CheckoutTitle from "./CheckoutTitle";
import CheckoutItemsContainer from "./checkout_item/CheckoutItemsContainer";

function Checkout() {
	const [cost, setCost] = useState(0);

	let navigate = useNavigate();

	return (
		<ContentWrapper>
			<Flex
				flexDirection={"column"}
				alignItems="self-start"
				margin={"auto"}
				width={["100%", "50%", "100%", "100%", "100%"]}
				color="white"
			>
				{/* checkout header */}
				<Box paddingBottom={"5"}>
					<CheckoutTitle title={"Your orders"} />
				</Box>

				{/* checkout item container */}
				<CheckoutItemsContainer
					// get price count
					priceCost={(vItem) => {
						setCost(vItem);
					}}
				/>

				<Flex
					alignItems="center"
					justifyContent={"space-between"}
					padding="2"
					width="100%"
					marginTop={"7"}
				>
					{/* total price */}
					<Text justifySelf={"end"}>Total rice : ${cost}</Text>
					{/* checkout button */}
					<Button backgroundColor={"#8053FF"} justifySelf={"end"} onClick={()=>{ navigate("/Address")}}>
						Next
					</Button>
				</Flex>
			</Flex>
		</ContentWrapper>
	);
}

export default Checkout;
