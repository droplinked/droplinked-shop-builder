import { Box, Flex , Text } from "@chakra-ui/react"
import { useState } from "react"
import { useAddress } from "../../../context/address/AddressContext"

import FormInput from "../../shared/FormInput/FormInput"
import BasicButton from "../../shared/BasicButton/BasicButton"
import ModalContainer from "../modal-container/modal-container"


export default function EmailModal({close , loading}) {



    return (
        <ModalContainer close={close}>
             
            <Box>

            <Text color='#fff' w='100%' textAlign='center' mb='20px' fontWeight='600'  fontSize={{ base: '14px', md: '20px' }}>Please enter your email address</Text>

                <FormInput
                    mb='30px'
                    placeholder={"Email"}
                  //  isError={(error == "line1") && "Address line1 is required"}
                />

                <Flex
                    justifyContent='space-between'
                    alignItems='center'
                    p='0px'
                    w='100%'
                >
                    <BasicButton w='45%' p='12px 16px' click={close} loading={loading} disabled={loading} >Cancel</BasicButton>
                    <BasicButton w='45%' p='12px 16px'  loading={loading} disabled={loading}>Submit</BasicButton>
                </Flex>
            </Box>
        </ModalContainer>
    )
}