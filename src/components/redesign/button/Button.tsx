import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';
import React from 'react';

export interface AppButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
}

const styles = {
  primary: {
    border: "#2BCFA1",
    background: "#2BCFA1",
    text: "black"
  },
  secondary: {
    border: "#292929",
    background: "#292929",
    text: "white"
  },
  outline: {
    border: "#616161",
    background: "transparent",
    text: "white"
  },
  disabled: {
    border: "#262626",
    background: "#262626",
    text: "#737373"
  }
}

const getStyles = (variant: string, isDisabled: boolean) => {
  if (isDisabled) return styles.disabled
  return styles[variant] || styles.outline
}

const Button = ({ variant = "primary", children, ...props }: AppButtonProps) => {
  const { border, background, text } = getStyles(variant, props.isDisabled)

  return (
    <ChakraButton
      variant={variant}
      display="flex"
      flexShrink={0}
      alignItems="center"
      gap="6px"
      border={`1px solid ${border}`}
      borderRadius={8}
      paddingBlock={3}
      paddingInline={{ base: 4, lg: 5 }}
      bgColor={background}
      fontSize={{ base: 14, lg: 16 }}
      fontWeight={400}
      color={text}
      iconSpacing={0}
      _hover={{}}
      _active={{}}
      sx={{
        "p": { fontSize: "14px", fontWeight: "500" }
      }}
      {...props}
    >
      {children}
    </ChakraButton>
  )
}

export default Button