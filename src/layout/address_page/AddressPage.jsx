import React, { useState, useEffect } from "react";
import { Flex, Button, Heading, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import ContentWrapper from "../../components/Structure/content-wrapper/Content-wrapper-component";
import AddressForm from "./AddressForm";
import AddressComponent from "../../components/Address component/address-component"

function AddressPage() {
	// states
	// open address form modal
	const [openModal, setOpenModal] = useState(false);
	// navigate to dashboard state
	const [navigateDashboard, setNavigateDashboard] = useState(false);
	// address list state
	const [addressList, setAddressList] = useState([]);

	// shop name - local storage
	const { shopName } = JSON.parse(localStorage.getItem("profile"));
	// userToken - local storage
	const userToken = JSON.parse(localStorage.getItem("token"));
	
	let navigate = useNavigate();

	// get address list request function
	const getAddressList = async () => {
		// response
		const response = await fetch(`https://dev-api.droplinked.com/address`, {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${userToken}`,
			},
		});
		// get json
		const json = await response.json();

		// set address array to state
		setAddressList(json.data.address);
	};

	useEffect(() => {
		getAddressList();
	}, []);

	return (
		<ContentWrapper>

			<AddressComponent />
			<AddressComponent />
			<AddressComponent />

			<Flex
				w="100%"
				border='1px'
				borderColor='#fff'
				borderRadius="15px"
				p="24px 20px 16px 20px"
				justifyContent="center"
				alignItems="center"
				color="#fff"
				fontSize="20px"
				fontWeight="600"
				_hover={{ borderColor: "#8053ff", color: "#8053ff" }}
				cursor="pointer"
			>
				+ Add new address
			</Flex>

			<Flex
				w="100%"
				mt="40px" justifyContent="space-between"
				alignItems="center"
			>
				<Button
					w="30%"
					bgColor="#8053ff"
					color="#fff"
					fontSize="20px"
					fontWeight="600"
					_hover={{ borderColor: "#4d4d4d", color: "#222" }}
				>
					Back
				</Button>
				<Button
					w="30%"
					bgColor="#8053ff"
					color="#fff"
					fontSize="20px"
					fontWeight="600"
					_hover={{ borderColor: "#4d4d4d", color: "#222" }}
					onClick={()=>{navigate("/payment")}}
				>
					Payment
				</Button>

			</Flex>




			{/* back to profile navigate */}

			{/* {navigateDashboard && (
				<Navigate to={`/shop/${shopName}`} replace={true}></Navigate>
			)}
			<Flex flexDirection={"column"} color="white">
				 */}
			{/* show open modal and back to profile button */}
			{/* 
				{!openModal && (
					<>
				
						<Heading fontSize={"20"} textAlign="left" fontWeight={"hairline"}>
							Address form, please fill in the form below and then click on the
							add to cart button at the bottom of the form.
						</Heading>

					
						<Flex justifyContent={"center"} marginTop="5">
					
							<Button
								marginX={"2"}
								backgroundColor={"#8053FF"}
								_hover={{
									backgroundColor: "#6053FF",
								}}
								onClick={() => {
									setOpenModal(true);
								}}
							>
								Open form
							</Button>

							<Button
								marginX={"2"}
								backgroundColor={"#8053FF"}
								_hover={{
									backgroundColor: "#6053FF",
								}}
								onClick={() => setNavigateDashboard(true)}
							>
								Back to profile
							</Button>
						</Flex>
					</>
				)}
				 */}


			{/* <Flex>
					{openModal && (
						<AddressForm
							cancelForm={(v) => {
								setOpenModal(!v);
							}}
						/>
					)}
				</Flex>
			</Flex> */}
		</ContentWrapper>
	);
}

export default AddressPage;
