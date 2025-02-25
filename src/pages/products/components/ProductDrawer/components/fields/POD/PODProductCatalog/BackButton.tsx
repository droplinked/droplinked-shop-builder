import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import React from 'react'

function BackButton({ onBackClick }: { onBackClick: () => void }) {
    return (
        <Flex
            as="button"
            type='button'
            alignItems="center"
            gap="6px"
            fontSize={14}
            fontWeight={500}
            color="#FFF"
            onClick={onBackClick}
        >
            <AppIcons.BackArrow />
            Back
        </Flex>
    )
}

export default BackButton