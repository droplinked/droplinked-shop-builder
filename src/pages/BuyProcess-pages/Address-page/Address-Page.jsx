import React, { useState } from "react";
import { Flex, Button, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext"
import { useAddress } from "../../../context/address/AddressContext"
import { addCheckoutAddress } from "../../../api/BaseUser-apis/Cart-api"

import AddressComponent from "../../../components/shared/Address/address-component"
import Loading from "../../../components/shared/loading/Loading"
import AddressForm from "../../../components/Forms/Address-form/AddressForm-component"


function AddressPage() {

	// navigate if not user
	let navigate = useNavigate();
	let token = JSON.parse(localStorage.getItem("token"));
	if (!token) navigate("/")

	const [selectedAddress, setSelectedAddress] = useState(null);
	const [addressModal, setAddressModal] = useState(false);


	const { errorToast, successToast } = useToasty();
	const { addressList } = useAddress()




	const toggleAddressForm = () => {
		setAddressModal(p => !p)
	}


	const ProccessToPayment = async () => {
		if (selectedAddress == null) {
			errorToast("Please select an address")
			return
		}
		let result = await addCheckoutAddress(selectedAddress)
		if (result == true) {
			successToast("Address added successfully")
			navigate('/payment')
		}else{
			errorToast(result)
		}
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

				{(addressList == [])
					?
					<Loading />
					:
					<>
						{addressList.map((address, i) => {
							return <AddressComponent
								key={i}
								address={address}
								selected={selectedAddress}
								setSelect={setSelectedAddress}
								selecable={true}
								deleteable={true}
							/>
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
