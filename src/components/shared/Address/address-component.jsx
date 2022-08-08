import {
    Box,
    Text,
    Flex,
    Button,
} from "@chakra-ui/react"
import { useAddress } from "../../../context/address/AddressContext"
import { useState } from "react"

import SmallModal from "../../Modal/Small-modal/Small-modal-component"
import AddressForm from "../../Forms/Address-form/AddressForm-component"

// (address) formta in props {
//      addressLine1: string
//      addressLine2: string
//      addressType: "CUSTOMER" | SHOP
//      city: string
//      country: string
//      firstname: string
//      lastname: string
//      state: string
//      zip: string
//      _id: id
// }

// if (selectAble) be true can select address by click on component
// and set address id in (setSelect)

// (selected) is address id we seleceted

// if(deleteable) be true ability to remove address

export default function AddressComponent({ address, selected, setSelect, selectAble, deleteable }) {

    // state for disable button
    const [disableBtn, setDisableBtn] = useState(false)
    // state for open and close address form
    const [openAddressForm, setOpenAddressForm] = useState(false)
    // state for open and close delete modal
    const [deleteModal, setDeleteModal] = useState(false)


    const { deleteAddress } = useAddress()


    // delete button only show if deleteable be true
    const deleteAddressFunc = async () => {
        setDisableBtn(true)
        await deleteAddress(address._id)
        setDisableBtn(false)
        setDeleteModal(false)
    }

    // if selectAble be true set address id to selected 
    const selectAddress = () => {
        if (selectAble == true) {
            setSelect(address._id)
        }
    }

    return (
        <>
            {(openAddressForm == false)
                ?
                <Box h="auto" mb="4" border='1px' borderRadius="15px" p="24px 20px 16px 20px"
                    borderColor={(selectAble == true && address._id == selected) ? "#8053ff" : '#555'}
                    cursor={(selectAble == true) ? "pointer" : "auto"}
                    onClick={selectAddress}
                >

                    <Text fontSize="18px" fontWeight="600" color="#fff" mb="10px">{address.country} - {address.city}</Text>
                    <Text fontSize="16px" fontWeight="500" color="#ddd" mb="4px">{address.addressLine1}</Text>
                    <Text fontSize="16px" fontWeight="500" color="#ddd" mb="20px">{address.state} {address.zip} </Text>

                    <Flex alignItems='center' justifyContent='flex-end' >
                        <Flex alignItems='center' flexDirection='row-reverse' justifyContent="space-between" w={{ base: "45%", md: "40%" }}>

                            <Button
                                bgColor="#4A4A4A"
                                color='#fff'
                                w="45%" h="35px"
                                fontSize={{ base: "12px", md: "16px" }}
                                _hover={{ borderColor: "#4d4d4d", color: "#222" }}
                                onClick={() => { setOpenAddressForm(true) }}
                            >Edit</Button>
                            {(deleteable == true) &&
                                <Button
                                    bgColor="#8053ff"
                                    color='#fff'
                                    w="45%" h="35px"
                                    fontSize={{ base: "12px", md: "16px" }}
                                    _hover={{ borderColor: "#4d4d4d", color: "#222" }}
                                    onClick={() => setDeleteModal(true)}
                                >Delete</Button>
                            }

                        </Flex>
                    </Flex>

                    {/* delete address modal */}
                    {deleteModal &&
                        <SmallModal
                            text={`Are you sure want to delete this address ?`}
                            show={deleteModal}
                            hide={() => setDeleteModal(false)}
                            click={deleteAddressFunc}
                            loading={disableBtn}
                        />
                    }
                    {/* delete address modal */}
                </Box>
                :
                <AddressForm
                    close={() => setOpenAddressForm(false)}
                    addressBook={address}
                    type={address.addressType}
                />
            }

        </>
    )
}