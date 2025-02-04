import { Flex, Text } from "@chakra-ui/react"
import styled from "@emotion/styled"

export const AnimatedTextContainer = styled(Flex)`
  position: relative;
  width: 100%;
  overflow: hidden;
  filter: blur(5px)
`

export const TextContent = styled(Text) <{ isVertical?: boolean }>`
  line-height: 1.5;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      ${props => props.isVertical ? '180deg' : '90deg'},
      rgba(20, 20, 20, 0) 0%,
      rgba(20, 20, 20, 0.9) 20%,
      rgba(20, 20, 20, 0.9) 80%,
      rgba(20, 20, 20, 0) 100%
    );
    animation: shine 2s linear infinite alternate;
  }

  @keyframes shine {
    0% {
      transform: ${props => props.isVertical ? 'translateY(-100%)' : 'translateX(-100%)'};
    }
    100% {
      transform: ${props => props.isVertical ? 'translateY(100%)' : 'translateX(100%)'};
    }
  }
`