import { FlexProps, TextProps } from '@chakra-ui/react'
import React from 'react'
import { AnimatedTextContainer, TextContent } from './StyledComponents';



interface Props extends FlexProps {
  text?: string | number | readonly string[];
  fontSize?: TextProps["fontSize"];
  fontWeight?: TextProps["fontWeight"];
  color?: TextProps["color"];
  isVertical?: boolean;
}

export default function AnimatedLoadingText({ text, fontSize, fontWeight, color, isVertical, ...rest }: Props) {
  const defaultText = "Lorem ipsum dolor sit amet consectetur adipisicing elit";

  return (
    <AnimatedTextContainer {...rest}>
      <TextContent
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={color || "#fff"}
        isVertical={isVertical}
      >
        {text || defaultText}
      </TextContent>
    </AnimatedTextContainer>
  );
}
