import React, { useState, useEffect } from "react";
import { Flex, Button, Heading, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"
import { useToasty } from "../../../sevices/hooks/useToastify"
import { useCart } from "../../../sevices/hooks/useCart"

import AddressComponent from "../../../components/shared/Address/address-component"
import axios from "axios";
import Loading from "../../../components/shared/loading/Loading"
import AddressForm from "../../../components/Forms/Address-form/AddressForm-component"


function AddressPage() {

	const [addressList, setAddressList] = useState(null);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [addressModal, setAddressModal] = useState(false);

	let navigate = useNavigate();
	const { errorToast, successToast } = useToasty();
	let token = JSON.parse(localStorage.getItem("token"));


	if (!token) navigate("/")

	const getAddressList = () => {
		axios.get(`${BasicURL}/address`, {
			headers: { Authorization: "Bearer " + token },
		})
			.then(e => setAddressList(e.data.data.addressBooks))
			.catch(e => console.log(e.response.data))
	};


	useEffect(() => {
		getAddressList();
	}, []);


	const toggleAddressForm = () => {
		setAddressModal(p => !p)
	}


	const ProccessToPayment = () => {
		if (selectedAddress == null) {
			errorToast("Please select an address")
			return
		}

		axios.post(`${BasicURL}/cart/checkout-address`, { addressBookID: selectedAddress },
			{ headers: { Authorization: "Bearer " + token }, })
			.then(e => {
				successToast("Address added successfully")
				navigate('/payment')
			})
			.catch(e => {
				errorToast(e.response.data)
			})
	}


	return (
		<Flex
			justifyContent='center'
			alignItems='center'
			w='100%'
			h='auto'
			px={{ base: "20px", md: "80px" }}
		>
			<Box
				w='100%'
				maxW='800px'
				m='auto'
			>

				{(addressList == null)
					?
					<Loading />
					:
					<>
						{addressList.map(address => {
							return <AddressComponent address={address} selected={selectedAddress} setSelect={setSelectedAddress} />
						})}
						<Box mt='40px'></Box>
						{(addressModal)
							?
							<AddressForm
							 close={toggleAddressForm}
							 type={"CUSTOMER"}
							  />
							:
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
								onClick={toggleAddressForm}
							>
								+ Add new address
							</Flex>
						}

						<Flex w="100%" mt="40px" justifyContent="space-between" alignItems="center" >
							<Button w="30%" bgColor="#8053ff" color="#fff" fontSize="20px" fontWeight="600" _hover={{ borderColor: "#4d4d4d", color: "#222" }}>
								Back
							</Button>
							<Button w="30%" bgColor="#8053ff" color="#fff" fontSize="20px" fontWeight="600" _hover={{ borderColor: "#4d4d4d", color: "#222" }} onClick={ProccessToPayment}	>
								Payment
							</Button>

						</Flex>
					</>

				}

			</Box>
		</Flex>
	);
}

export default AddressPage;
