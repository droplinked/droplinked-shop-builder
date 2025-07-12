import { Flex, Spinner, Text } from "@chakra-ui/react"
import React from "react"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

const LoadingState = () => {
    const { t } = useLocaleResources('onboarding')
    
    return (
        <Flex
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="1rem"
        >
            <Spinner color="#fff" />
            <Text
                fontWeight={500}
                fontSize={14}
                color="#fff"
            >
                {t('shopSetup.uploads.fileUpload.uploading')}
            </Text>
        </Flex>
    )
}

export default LoadingState
