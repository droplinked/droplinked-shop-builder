import React, { useState, useEffect } from "react";
import { Flex, Button, Heading } from "@chakra-ui/react";
import ContentWrapper from "../../components/Structure/content-wrapper/Content-wrapper-component";
import { Navigate } from "react-router-dom";
import AddressForm from "./AddressForm";

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
			{/* back to profile navigate */}
			{navigateDashboard && (
				<Navigate to={`/shop/${shopName}`} replace={true}></Navigate>
			)}
			<Flex flexDirection={"column"} color="white">
				{/* show open modal and back to profile button */}
				{!openModal && (
					<>
						{/* header notice */}
						<Heading fontSize={"20"} textAlign="left" fontWeight={"hairline"}>
							Address form, please fill in the form below and then click on the
							add to cart button at the bottom of the form.
						</Heading>

						{/* buttons */}
						<Flex justifyContent={"center"} marginTop="5">
							{/* open form button */}
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

							{/* back to profile button */}
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

				{/* address form section modal */}
				<Flex>
					{openModal && (
						<AddressForm
							cancelForm={(v) => {
								setOpenModal(!v);
							}}
						/>
					)}
				</Flex>
			</Flex>
		</ContentWrapper>
	);
}

export default AddressPage;
