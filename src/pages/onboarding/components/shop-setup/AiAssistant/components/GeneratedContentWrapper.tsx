import { Flex, Text } from '@chakra-ui/react'
import { Refresh1Md } from 'assets/icons/Action/Refresh1/Refresh1Md'
import BlueButton from 'components/redesign/button/BlueButton'
import React from 'react'

interface Props {
    children: React.ReactNode
    onRetry?: () => void
    isLoading?: boolean
    title: string
}

export default function GeneratedContentWrapper({ children, onRetry, title, isLoading }: Props) {
    return (
        <Flex flexDirection="column" gap={4}>
            <Flex justifyContent="space-between" alignItems="center">
                <Text color="#fff" fontSize="16px" fontWeight="500">{title}</Text>
                <BlueButton
                    iconSpacing="6px"
                    fontSize="14"
                    fontWeight="400"
                    color="#2BCFA1"
                    leftIcon={<Refresh1Md color={isLoading ? '#737373' : '#2BCFA1'} />}
                    onClick={onRetry}
                    cursor={isLoading ? 'not-allowed' : 'pointer'}
                    isDisabled={isLoading}
                >
                    Generate Again
                </BlueButton>
            </Flex>
            {children}
        </Flex>
    )
}
