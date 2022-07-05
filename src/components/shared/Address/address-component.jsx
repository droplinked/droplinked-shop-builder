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
import { useAddress } from "../../../sevices/hooks/useAddress"
import { useState } from "react"

export default function AddressComponent({ address, selected, setSelect }) {

    const [disableBtn, setDisableBtn] = useState(false)

    const { deleteAddress } = useAddress()
    const { isOpen, onOpen, onClose } = useDisclosure()


    const deleteAddressFunc = async () => {
        setDisableBtn(true)
        await deleteAddress(address._id)
        setDisableBtn(false)
        onClose()
    }

    return (
        <Box h="auto" mb="4" border='1px' borderRadius="15px" p="24px 20px 16px 20px"
            borderColor={(address._id == selected) ? "#8053ff" : '#555'}
        >

            <Text fontSize="18px" fontWeight="600" color="#fff" mb="10px">{address.country} - {address.city}</Text>
            <Text fontSize="16px" fontWeight="500" color="#ddd" mb="4px">{address.addressLine1}</Text>
            <Text fontSize="16px" fontWeight="500" color="#ddd" mb="20px">{address.state} {address.zip} </Text>

            <Flex alignItems='center' justifyContent="space-between">
                <Button
                    w={{ base: "45%", md: "30%" }}
                    fontSize={{ base: "12px", md: "16px" }}
                    color="#fff"
                    fontWeight="600"
                    bgColor="#8053ff"
                    h="35px"
                    _hover={{ bgColor: "4d4d4d", color: "#222" }}
                    onClick={() => setSelect(address._id)}
                >
                    Select address
                </Button>

                <Flex alignItems='center' justifyContent="space-between" w={{ base: "45%", md: "40%" }}>
                    <Button colorScheme='red' w="45%" h="35px"
                        fontSize={{ base: "12px", md: "16px" }}
                        onClick={onOpen}
                    >Delete</Button>
                    <Button colorScheme='messenger' w="45%" h="35px"
                        fontSize={{ base: "12px", md: "16px" }}
                    //  onClick=
                    >Edit</Button>
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
    )
}