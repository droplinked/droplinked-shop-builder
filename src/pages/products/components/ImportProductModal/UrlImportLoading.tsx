import { Flex, Text } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import React from 'react'
import loadingAnimation from '../../utils/ImportProductLoadingAnimation.json'

export default function UrlImportLoading() {
    return (
        <Flex flexDirection="column" alignItems="center" gap="64px">
            <Lottie
                animationData={loadingAnimation}
                loop={true}
                style={{ width: '300px', height: '204px' }}
            />


            <Flex flexDirection="column" alignItems="center">
                <Text color="#fff" fontSize={18} fontWeight={500} mb={1}>Importing Inventory</Text>
                <Text color="text.subtext.placeholder.dark">Please standby.</Text>
                <Text color="text.subtext.placeholder.dark">We're currently importing the item(s) from the provided URL.</Text>
            </Flex>
        </Flex>
    )
}
