import { Button } from "@chakra-ui/react"

export default function ButtonComponent({ children,click, ...otherprops }) {

    return (
        <Button
            w="100%"
            h="100%"
            bgColor="#8053ff"
            color="#fff"
            fontSize="20px"
            fontWeight="600"
            _hover={{ borderColor: "#4d4d4d", color: "#222" }}
            onClick={click}
            {...otherprops}
        >
            {children}
        </Button>
    )
}