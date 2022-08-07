//  use this component for show collection iframe code  in snipped modal 
import { Flex, Code, Box } from "@chakra-ui/react"
import { useToasty } from "../../../context/toastify/ToastContext"

import BasicButton from "../../shared/BasicButton/BasicButton"
import ModalContainer from "../modal-container/modal-container"

const IframeSnipped = ({ code, close }) => {

    const { successToast } = useToasty()

    const embed = () => {
        navigator.clipboard.writeText(code).then(function () {
            successToast('Copying to clipboard was successful!');
        });
    }


    return (
        <ModalContainer close={close}>
            <Code
                whiteSpace='pre-line'
                children={code}
                bgColor='#141414'
                fontSize={{ base: "12px", md: '16px' }}
                color='#8059ff'
                w='100%'
                h='auto'
                borderRadius='8px'
                p='5px'
            />
            <Flex
                mt='20px'
                mb={{base:'-40px' ,md:'-20px'}}
                w='100%'
                h='35px'
                justifyContent='space-between'
            >
                <Box w={{ base: '100px', md: '150px' }}><BasicButton bgColor='#4A4A4A' fontSize={{ base: '14px', md: "16px" }} click={close}>Cancel</BasicButton></Box>
                <Box w={{ base: '100px', md: '150px' }}><BasicButton fontSize={{ base: '14px', md: "16px" }} click={embed} >Click to copy</BasicButton></Box>
            </Flex>
        </ModalContainer>
    )
}

export default IframeSnipped