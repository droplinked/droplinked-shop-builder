//  use this component for show collection iframe code  in snipped modal 
//  or collection Api url 
import { Flex, Code, Box } from "@chakra-ui/react"
import { useToasty } from "../../context/toastify/ToastContext"
import { useState } from "react"

import BasicButton from "../../common/BasicButton/BasicButton"
import ModalWrapper from "../modal-wrapper/ModalWrapper"

const IframeModal = ({show, link, code, close }) => {

    // use this state for switch between api and iframe component
    const [showType, setShowType] = useState("IFRAME")

    const { successToast } = useToasty()

    // this function set code to clipboard
    const embed = () => {
        if (showType === "IFRAME") {
            navigator.clipboard.writeText(code).then(function () {
                successToast('Copying to clipboard was successful!');
            });
        } else {
            navigator.clipboard.writeText(link).then(function () {
                successToast('Copying to clipboard was successful!');
            });
        }
    }


    return (
        <ModalWrapper show={show} close={close}>
            {/* top buttons */}
            <Flex
                justifyContent='space-between'
                w='100%'
                bgColor='#4a4a4a'
                mb='20px'
                borderRadius='8px'
                overflow='hidden'
            >
                <Box
                    bgColor={(showType === "API") ? "#222" : "#4a4a4a"}
                    color={(showType === "API") ? "white" : "#222"}
                    borderRadius='8px'
                    w='50%'
                    textAlign='center'
                    cursor='pointer'
                    py='5px'
                    onClick={() => { setShowType("API") }}
                    transition='0.4s'
                >Using API</Box>
                <Box
                    transition='0.4s'
                    bgColor={(showType === "IFRAME") ? "#222" : "#4a4a4a"}
                    color={(showType === "IFRAME") ? "white" : "#222"}
                    borderRadius='8px'
                    py='5px'
                    w='50%'
                    textAlign='center'
                    cursor='pointer'
                    onClick={() => { setShowType("IFRAME") }}
                >Via iframe</Box>

            </Flex>
            {/* top buttons */}
            {/* component for show content (ifrmae of url) */}
            {(showType === "IFRAME")
                ?
                <Code
                    whiteSpace='pre-line'
                    children={code}
                    bgColor='subLayer'
                    fontSize={{ base: "12px", md: '16px' }}
                    color='#8059ff'
                    w='100%'
                    h='auto'
                    borderRadius='8px'
                    p='5px'
                />
                :
                <Box
                    whiteSpace='pre-line'
                    bgColor='subLayer'
                    fontSize={{ base: "12px", md: '16px' }}
                    color='#8059ff'
                    w='100%'
                    h='auto'
                    borderRadius='8px'
                    p='5px'
                >{link}</Box>
            }
            {/* component for show content (ifrmae of url) */}

            {/* botom buttons */}
            <Flex
                mt='20px'
                mb={{ base: '-40px', md: '-20px' }}
                w='100%'
                h='35px'
                justifyContent='space-between'
            >
                <Box w={{ base: '100px', md: '150px' }}><BasicButton bgColor='#4A4A4A' fontSize={{ base: '14px', md: "16px" }} onClick={close} cancelType={true}>Cancel</BasicButton></Box>
                <Box w={{ base: '100px', md: '150px' }}><BasicButton fontSize={{ base: '14px', md: "16px" }} onClick={embed} >Click to copy</BasicButton></Box>
            </Flex>
            {/* botom buttons */}
        </ModalWrapper>
    )
}

export default IframeModal