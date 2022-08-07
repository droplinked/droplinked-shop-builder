//  use this component for show collection iframe code  in snipped modal 
import { Flex, Code, Box } from "@chakra-ui/react"
import { useToasty } from "../../../context/toastify/ToastContext"

import BasicButton from "../../shared/BasicButton/BasicButton"

const IframeSnipped = ({ code, close }) => {

    const { successToast } = useToasty()

    const embed = () => {
        navigator.clipboard.writeText(code).then(function () {
            successToast('Copying to clipboard was successful!');
        });
    }


    return (
        <Flex
            pos='fixed'
            zIndex='10'
            top='0'
            left='0'
            overflow='auto'
            h='100%'
            w='100%'
            bgColor='rgba(0, 0, 0, 0.4)'
            justifyContent='center'
            alignItems='center'
        >
            <Flex
                bgColor='black'
                w='90%'
                h='auto'
                py='30px'
                px='15px'
                maxW='600px'
                borderRadius='12px'
                flexDir='column'
                alignItems='flex-end'
            >
                <Code
                    whiteSpace='pre-line'
                    children={code}
                    bgColor='black'
                    fontSize={{ base: "12px", md: '16px' }}
                    color='#8059ff'
                    w='100%'
                    h='auto'
                />
                <Flex
                    mt='20px'
                    w={{ base: '100%', md: '350px' }}
                    h='35px'
                    justifyContent='space-between'
                >
                    <Box w={{ base: '100px', md: '150px' }}><BasicButton fontSize={{base:'14px' , md:"16px"}} click={embed} >Click to copy</BasicButton></Box>
                    <Box w={{ base: '100px', md: '150px' }}><BasicButton bgColor='red' fontSize={{base:'14px' , md:"16px"}} click={close}>Cancel</BasicButton></Box>
                </Flex>
            </Flex>

        </Flex>
    )
}

export default IframeSnipped