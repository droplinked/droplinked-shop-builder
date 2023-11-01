import { Image } from '@chakra-ui/image'
import { Box, Flex, VStack } from '@chakra-ui/layout'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import PreviewTypo from '../../../../../parts/typo/PreviewTypo'
import PreviewSocials from './parts/socials/PreviewSocials'

function PreviewProfile() {
    const { shop } = useProfile()
    const { state: { shop: { logo } } } = useContext(designContext)

    return (
        <VStack align="stretch" spacing="15px">
            <VStack align="stretch" spacing="15px" padding="30px 20px" backgroundColor="#141414">
                <Flex justifyContent="center">
                    {logo && <Image width="70%" borderRadius="100%" src={logo} />}
                </Flex>
                <Flex justifyContent="center"><PreviewTypo fontSize="14px" color="#FFF">{shop?.name}</PreviewTypo></Flex>
                <PreviewSocials />
            </VStack>
        </VStack>
    )
}

export default PreviewProfile