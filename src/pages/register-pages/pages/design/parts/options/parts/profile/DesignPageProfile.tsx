import { VStack } from '@chakra-ui/react'
import React from 'react'
import DesignPageCard from '../card/DesignPageCard'
import OptionSocial from './parts/social/OptionSocial'
import OptionAvatar from './parts/upload/OptionAvatar'

function DesignPageProfile() {
    return (
        <DesignPageCard title='Store Profile' section='profile' isRequired>
            <VStack align="stretch" spacing="24px">
                <OptionAvatar />
                <OptionSocial />
            </VStack>
        </DesignPageCard>
    )
}

export default DesignPageProfile