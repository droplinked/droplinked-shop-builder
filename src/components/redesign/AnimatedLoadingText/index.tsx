import { Flex, FlexProps, Text, TextProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

const AnimatedTextContainer = styled(Flex)`
  position: relative;
  width: 100%;
  overflow: hidden;
  filter: blur(5px)
`

const TextContent = styled(Text)`
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
      90deg,
      rgba(20, 20, 20, 0) 0%,
      rgba(20, 20, 20, 0.9) 20%,
      rgba(20, 20, 20, 0.9) 80%,
      rgba(20, 20, 20, 0) 100%
    );
    animation: shine 2s linear infinite alternate;
  }

  @keyframes shine {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`

interface Props extends FlexProps {
    text?: string | number | readonly string[];
    fontSize?: TextProps["fontSize"];
    fontWeight?: TextProps["fontWeight"];
    color?: TextProps["color"];
}

export default function AnimatedLoadingText({ text, fontSize, fontWeight, color, ...rest }: Props) {
    const defaultText = "Lorem ipsum dolor sit amet consectetur adipisicing elit";

    return (
        <AnimatedTextContainer {...rest}>
            <TextContent
                fontSize={fontSize}
                fontWeight={fontWeight}
                color={color || "#fff"}
            >
                {text || defaultText}
            </TextContent>
        </AnimatedTextContainer>
    );
}
