import { Flex } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import React from 'react'

function DesignPageButtons() {
    return (
        <Flex justifyContent="space-between">
            <BasicButton variant='outline' sizes='large'>back</BasicButton>
            <Flex gap="16px">
                <BasicButton variant='ghost' sizes='large'>Reset</BasicButton>
                <BasicButton sizes='large'>Next</BasicButton>
            </Flex>
        </Flex>
    )
}

export default DesignPageButtons