import {
    Box,
    Text,
    Flex,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from "@chakra-ui/react"
import { useAddress } from "../../../context/address/AddressContext"
import { useState } from "react"

import AddressForm from "../../Forms/Address-form/AddressForm-component"


export default function AddressComponent({ address, selected, setSelect, selecable, deleteable }) {

    const [disableBtn, setDisableBtn] = useState(false)
    const [openAddressForm, setOpenAddressForm] = useState(false)

    const { deleteAddress } = useAddress()
    const { isOpen, onOpen, onClose } = useDisclosure()


    const deleteAddressFunc = async () => {
        setDisableBtn(true)
        await deleteAddress(address._id)
        setDisableBtn(false)
        onClose()
    }

    const selectAddress = () => {
        if(selecable == true){
            setSelect(address._id)
        }
    }

    return (
        <>
            {(openAddressForm == false)
                ?
                <Box h="auto" mb="4" border='1px' borderRadius="15px" p="24px 20px 16px 20px"
                    borderColor={(selecable == true && address._id == selected) ? "#8053ff" : '#555'}
                    cursor={(selecable == true)?"pointer":"auto"}
                    onClick={selectAddress}
                >

                    <Text fontSize="18px" fontWeight="600" color="#fff" mb="10px">{address.country} - {address.city}</Text>
                    <Text fontSize="16px" fontWeight="500" color="#ddd" mb="4px">{address.addressLine1}</Text>
                    <Text fontSize="16px" fontWeight="500" color="#ddd" mb="20px">{address.state} {address.zip} </Text>

                    <Flex alignItems='center' justifyContent="space-between"  >
                        <Box w={{ base: "45%", md: "30%" }}>
                            {(selecable == true) &&
                                <Button
                                    w='100%'
                                    fontSize={{ base: "12px", md: "16px" }}
                                    color="#fff"
                                    fontWeight="600"
                                    bgColor="#8053ff"
                                    h="35px"
                                    _hover={{ bgColor: "4d4d4d", color: "#222" }}
                                    onClick={selectAddress}
                                >
                                    Select address
                                </Button>
                            }

                        </Box>


                        <Flex alignItems='center' flexDirection='row-reverse' justifyContent="space-between" w={{ base: "45%", md: "40%" }}>

                            <Button 
                            bgColor="#4A4A4A"
                            color='#fff'
                             w="45%" h="35px"
                                fontSize={{ base: "12px", md: "16px" }}
                                _hover={{ borderColor: "#4d4d4d", color: "#222" }}
                                onClick={() =>{ setOpenAddressForm(true)}}
                            >Edit</Button>
                            {(deleteable == true) &&
                                <Button 
                                 bgColor="#8053ff"
                                 color='#fff'
                                  w="45%" h="35px"
                                    fontSize={{ base: "12px", md: "16px" }}
                                    _hover={{ borderColor: "#4d4d4d", color: "#222" }}
                                    onClick={onOpen}
                                >Delete</Button>
                            }

                        </Flex>
                    </Flex>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent
                            bgColor="#222"
                        >
                            <ModalHeader color='#fff'>Delete Address</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody color='#fff'>
                                Are you sure want to delete this address ?
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    bgColor="#8053ff"
                                    mr={3} onClick={onClose}
                                    disabled={disableBtn}
                                >
                                    Close
                                </Button>
                                <Button
                                    w='40%'
                                    color='#fff'
                                    bgColor='red'
                                    variant='ghost'
                                    disabled={disableBtn}
                                    onClick={deleteAddressFunc}
                                >Delete</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

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