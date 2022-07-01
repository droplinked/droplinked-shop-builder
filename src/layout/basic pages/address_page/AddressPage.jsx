import React, { useState, useEffect } from "react";
import { Flex, Button, Heading, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"
import {useToasty} from "../../../sevices/hooks/useToastify"

import ContentWrapper from "../../../components/Structure/content-wrapper/Content-wrapper-component";
import AddressForm from "./AddressForm";
import AddressComponent from "../../../components/Address component/address-component"
import axios from "axios";
import Loading from "../../../components/features/loading/Loading"

function AddressPage() {

	const [addressList, setAddressList] = useState(null);
	const [selectedAddress, setSelectedAddress] = useState(null);

	let navigate = useNavigate();
	const {errorToast , successToast} = useToasty();

	let token = JSON.parse(localStorage.getItem("token"));

	if (!token) navigate("/")

	const getAddressList = async () => {
		axios.get(`${BasicURL}/address`, {
			headers: { Authorization: "Bearer " + token },
		})
			.then(e => setAddressList(e.data.data.addressBooks))
			.catch(e => console.log(e.response.data))
	};

	useEffect(() => {
		getAddressList();
	}, []);

	const ProccessToPayment = () => {
		if(selectedAddress == null){
			errorToast("Please select an address")
			return
		}
		navigate('/payment')
	}

	return (
		<ContentWrapper>

			{(addressList == null)
				?
				<Loading />
				:
				<>
					{addressList.map(address => {
						return <AddressComponent address={address} selected={selectedAddress} setSelect={setSelectedAddress} />
					})}

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


		</ContentWrapper>
	);
}

export default AddressPage;
