import { Button, useDisclosure } from "@chakra-ui/react"
import AuthModal from "components/modals/auth-modal/AuthModal"
import { MODAL_TYPE } from "pages/public-pages/homePage/HomePage"
import React from "react"

function SignInButton() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button
                border="1px solid"
                borderColor="neutral.white"
                borderRadius={8}
                padding="12px 16px"
                bg="none"
                fontSize={14}
                fontWeight={500}
                color="neutral.white"
                onClick={onOpen}
                _hover={{}}
                _active={{}}
            >
                Sign In
            </Button>
            <AuthModal show={isOpen} close={onClose} type={MODAL_TYPE.SIGNIN} />
        </>
    )
}

export default SignInButton