import { Box, Text } from "@chakra-ui/react"
import React, { ReactNode } from "react"

interface DropMessageProps {
    isDragActive: boolean
    title?: ReactNode
    dropDescription?: string
}

const DropMessage = ({ isDragActive, title, dropDescription }: DropMessageProps) => {
    if (isDragActive) {
        return (
            <Text
                fontSize={14}
                color="#fff"
            >
                Drop the file here ...
            </Text>
        )
    }

    return (
        <>
            {title ? title : (
                <Text
                    fontSize={14}
                    color="#fff"
                >
                    <Box
                        display="inline"
                        fontWeight={600}
                        color="#179EF8"
                        textDecoration="underline"
                    >
                        Click
                    </Box>{" "}
                    or drag & drop here
                </Text>
            )}
            <Text
                fontSize={12}
                color="#7B7B7B"
            >
                {dropDescription}
            </Text>
        </>
    )
}

export default DropMessage
