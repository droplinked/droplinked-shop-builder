import React from "react";
import { useRef } from "react";
import { Flex, Button, Box, Heading, Stack, Input } from "@chakra-ui/react";
import { toast } from "react-toastify";

function AddressForm({ cancelForm }) {
	// refs
	const firstName = useRef();
	const lastName = useRef();
	const address = useRef();
	const country = useRef();
	const city = useRef();
	const state = useRef();
	const zip = useRef();

	// main pink color code
	const pinkMainColorCode = "#8053FF";

	// userToken - local storage
	const userToken = JSON.parse(localStorage.getItem("token"));

	// handle post form
	const handlePostAddressForm = async () => {
		// check the refs is empty or not
		if (
			firstName.current.value.length &&
			lastName.current.value.length &&
			address.current.value.length &&
			country.current.value.length &&
			city.current.value.length &&
			state.current.value.length &&
			zip.current.value.length
		) {
			// object of data
			const data = {
				addressLine1: address.current.value,
				addressLine2: "",
				country: country.current.value,
				city: city.current.value,
				state: state.current.value,
				zip: zip.current.value,
				addressType: "CUSTOMER",
			};

			// post data to the server
			const response = await fetch(`https://dev-api.droplinked.com/address`, {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${userToken}`,
				},
				redirect: "follow",
				referrerPolicy: "no-referrer",
				body: JSON.stringify(data),
			});

			// get json of response
			const json = await response.json();

			// check the success
			if (json.status === "success") {
				cancelForm(true);
				toast.success("Address is submited");
			}
		} else {
			// empty error
			toast.error("Field is empty");
		}
	};

	return (
		<Flex flexDirection={"column"} width="100%">
			{/* address  */}
			<Heading paddingBottom={"5"} fontWeight="hairline">
				Address form
			</Heading>

			<Stack
				direction={"column"}
				spacing="7"
				width="70%"
				margin={"auto"}
				marginTop="10"
			>
				<Stack spacing={"4"} direction="row">
					{/* first name */}

					<Input
						id="first-name"
						focusBorderColor={pinkMainColorCode}
						placeholder="First name"
						backgroundColor={"#333335"}
						ref={firstName}
					/>

					{/* lastname */}

					<Input
						id="last-name"
						focusBorderColor={pinkMainColorCode}
						placeholder="Last name"
						backgroundColor={"#333335"}
						ref={lastName}
					/>
				</Stack>
				<Box>
					{/* address line 1 */}
					<Input
						id="address-line"
						focusBorderColor={pinkMainColorCode}
						placeholder="Address line 1"
						backgroundColor={"#333335"}
						ref={address}
					/>
				</Box>
				<Stack spacing={"4"} direction="row">
					{/* country */}
					<Input
						id="country"
						focusBorderColor={pinkMainColorCode}
						placeholder="Country"
						backgroundColor={"#333335"}
						ref={country}
					/>
					{/* city */}
					<Input
						id="city"
						focusBorderColor={pinkMainColorCode}
						placeholder="City"
						backgroundColor={"#333335"}
						ref={city}
					/>
				</Stack>
				<Stack spacing={"4"} direction="row">
					{/* state */}
					<Input
						id="state"
						focusBorderColor={pinkMainColorCode}
						placeholder="State"
						backgroundColor={"#333335"}
						ref={state}
					/>
					{/* zip */}
					<Input
						id="zip"
						focusBorderColor={pinkMainColorCode}
						placeholder="Zip"
						backgroundColor={"#333335"}
						type={"number"}
						ref={zip}
					/>
				</Stack>
			</Stack>

			<Flex margin={"auto"} justifyContent="space-around" padding={"10"}>
				{/* save */}
				<Button
					marginX={"2"}
					backgroundColor={"#8053FF"}
					_hover={{
						backgroundColor: "#6053FF",
					}}
					onClick={handlePostAddressForm}
				>
					save
				</Button>
				{/* cancel */}
				<Button
					marginX={"2"}
					backgroundColor={"#8053FF"}
					_hover={{
						backgroundColor: "#6053FF",
					}}
					onClick={() => cancelForm(true)}
				>
					cancel
				</Button>
			</Flex>
		</Flex>
	);
}

export default AddressForm;
