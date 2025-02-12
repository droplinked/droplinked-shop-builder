import { ChakraProps, Flex } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

const AnimatedContainer = styled(Flex) <{ isDisabled?: boolean }>`
    position: relative;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 0.5px;
    background: ${props => props.isDisabled ? 'transparent' : 'linear-gradient(to right, #2BCFA100, #2BCFA11A)'};
    ${props => props.isDisabled && `
        border: 1px solid var(--Neutral-Gray-800, #292929);
    `}

    &:before, &:after {
        content: '';
        z-index: -1;
        position: absolute;
        width: calc(100% + 1px);
        height: calc(100% + 1px);
        top: 0px;
        left: 0px;
        border-radius: 8px;
        background: linear-gradient(45deg,#2BCFA1, #179EF8, #FFD951, #9C4EFF,#2BCFA1, #179EF8, #FFD951, #9C4EFF);
        background-size: 200% 200%;
        animation: border 5s linear infinite;
        opacity: ${props => props.isDisabled ? 0 : 0.2};
    }

    &:after {
        filter: blur(10px);
    }

    @keyframes border {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 200% 100%; }
    }
`

interface Props {
    children: React.ReactNode
    flexProps?: ChakraProps
    isDisabled?: boolean
    onClick?: () => void
}

export default function AnimatedBox({ children, flexProps, isDisabled, onClick }: Props) {
    return (
        <AnimatedContainer
            isDisabled={isDisabled}
            {...flexProps}
            {...(!isDisabled && { onClick: onClick })}
        >
            {children}
        </AnimatedContainer>
    )
}
