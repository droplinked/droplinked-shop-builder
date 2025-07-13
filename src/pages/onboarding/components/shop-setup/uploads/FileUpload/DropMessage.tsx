import { Box, Text } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface DropMessageProps {
    isDragActive: boolean
    title?: ReactNode
    dropDescription?: string
}

const DropMessage = ({ isDragActive, title, dropDescription }: DropMessageProps) => {
    const { t } = useLocaleResources('onboarding')
    
    if (isDragActive) {
        return (
            <Text
                fontSize={14}
                color="#fff"
            >
                {t('shopSetup.uploads.fileUpload.dropHere')}
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
                    {t('shopSetup.uploads.fileUpload.clickOrDrag')}
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
