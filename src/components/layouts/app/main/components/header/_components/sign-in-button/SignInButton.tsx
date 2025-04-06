import { Button } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"

function SignInButton() {
    const navigate = useNavigate()

    return (
        <Button
            border="1px solid"
            borderColor="neutral.white"
            borderRadius={8}
            padding="12px 16px"
            bg="none"
            fontSize={14}
            fontWeight={500}
            color="neutral.white"
            _hover={{}}
            _active={{}}
            onClick={() => navigate('/onboarding?entry=signin')}
        >
            Sign In
        </Button>
    )
}

export default SignInButton