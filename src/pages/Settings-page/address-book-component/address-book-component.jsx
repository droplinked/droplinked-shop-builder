import { Flex, Button, Box } from '@chakra-ui/react'
import { useAddress } from "../../../sevices/hooks/useAddress"
import { useState } from "react"

import AddressComponent from "../../../components/shared/Address/address-component"
import AddressForm from "../../../components/Forms/Address-form/AddressForm-component"
import Loading from "../../../components/shared/loading/Loading"

export default function AddressBookComponent() {

    const [addressModal, setAddressModal] = useState(false);

    const { addressList } = useAddress()

    const toggleAddressForm = () => {
        setAddressModal(p => !p)
    }

    return (
        <Box
            p='0px'
            w='100%'
        >
            {(addressList == [])
                ?
                <Loading />
                :
                <>
                    {addressList.map((address, i) => {
                        if (address.addressType != "SHOP")
                            return <AddressComponent
                                key={i}
                                address={address}
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


                </>

            }
        </Box>
    )
}