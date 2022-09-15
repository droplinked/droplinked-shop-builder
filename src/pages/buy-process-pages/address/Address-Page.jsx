import React, { useState } from "react";
import { Flex, Button, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext"
import { useAddress } from "../../../context/address/AddressContext"
import { addCheckoutAddress } from "../../../api/base-user/Cart-api"
import { createCheckout } from "../../../api/producer/Shopify-api"
import { useCart } from "../../../context/cart/CartContext"
import { useProfile } from "../../../context/profile/ProfileContext";

import AddressComponent from "../../../components/shared/Address/address-component"
import Loading from "../../../components/shared/loading/Loading"
import AddressForm from "../../../components/Modal/Address/Address-modal"


function AddressPage() {

	// navigate if not user
	let navigate = useNavigate();
	const { profile } = useProfile();
	let token = JSON.parse(localStorage.getItem("token"));
	if (!token) navigate("/")

	const [selectedAddress, setSelectedAddress] = useState(null);
	const [addressModal, setAddressModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const { errorToast, successToast } = useToasty();
	const { addressList } = useAddress()
	const { cart } = useCart();


	const toggleAddressForm = () => {
		setAddressModal(p => !p)
	}

	// const ProccessToPayment = async () => {
	// 	if (selectedAddress == null) {
	// 		errorToast("Please choose an address")
	// 		return
	// 	}
	// 	setLoading(true)
	// 	let result = await addCheckoutAddress(selectedAddress)
	// 	setLoading(false)
	// 	if (result == true) {
	// 		successToast("Address successfully added")
	// 		navigate('/payment')
	// 	} else {
	// 		errorToast(result)
	// 	}
	// }


	const ProccessToPayment = async () => {
		if (selectedAddress == null) {
			errorToast("Please choose an address")
			return
		}
		

		let addressObj = {
			first_name: selectedAddress.firstname,
			last_name: selectedAddress.lastname,
			country: selectedAddress.country,
			province: selectedAddress.state,
			city: selectedAddress.city,
			address1: selectedAddress.addressLine1,
			address2: selectedAddress.addressLine2,
			zip: selectedAddress.zip,
			phone: ""
		}
		let itemsArray = cart.map(item => {return {variant_id: item.variant.id , quantity:item.amount}})
		let data = {
				checkout:{
					billing_address:addressObj,
					shipping_address:addressObj,
					line_items:itemsArray,
					email:profile.email
				}
		}
		setLoading(true)
		let result = await createCheckout(cart[0].shopName , data)
		setLoading(false)
		if(result.status == "success"){
			let checkoutId = {
				checkoutId: result.data.checkout.token,
				shopName:cart[0].shopName
			}
			localStorage.setItem('checkout_id', JSON.stringify(checkoutId))
			successToast("Address successfully added")
			navigate('/shipping')
		}else{
			errorToast(result.reason)
			errorToast(result.reason);
		}
		setLoading(false)
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
							if (address.addressType != "SHOP") {
								return <AddressComponent
									key={i}
									address={address}
									selected={selectedAddress}
									setSelect={setSelectedAddress}
									selectAble={true}
									deleteable={true}
								/>
							}
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
							<Button w="30%" bgColor="#8053ff" color="#fff" fontSize="20px" fontWeight="600" _hover={{ borderColor: "#4d4d4d", color: "#222" }} disabled={loading}
								onClick={() => { navigate('/checkout') }}>
								Back
							</Button>
							<Button w="30%" bgColor="#8053ff" color="#fff" fontSize="20px" fontWeight="600" _hover={{ borderColor: "#4d4d4d", color: "#222" }} disabled={loading} onClick={ProccessToPayment}>
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
