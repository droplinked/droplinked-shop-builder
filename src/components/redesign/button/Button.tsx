import { Box, ButtonProps, Button as ChakraButton } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

export interface AppButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

const styles = {
  primary: {
    border: "primary.default",
    background: "primary.default",
    text: "black"
  },
  secondary: {
    borderColor: "neutral.gray.800",
    background: "neutral.gray.800",
    text: "neutral.white"
  },
  outline: {
    borderColor: "neutral.gray.600",
    background: "transparent",
    text: "neutral.white"
  },
  ghost: {
    borderColor: "transparent",
    background: "transparent",
    text: "neutral.white"
  },
  disabled: {
    borderColor: "neutral.gray.850",
    background: "neutral.gray.850",
    text: "#737373"
  }
}

const getStyles = (variant: string, isDisabled: boolean) => {
  if (isDisabled) return styles.disabled
  return styles[variant] || styles.outline
}

const Button = ({ variant = "primary", children, ...props }: AppButtonProps) => {
  const { isDisabled, iconLeft, iconRight } = props
  const { borderColor, background, text } = getStyles(variant, isDisabled)

  return (
    <ChakraButton
      variant={variant}
      display="flex"
      flexShrink={0}
      alignItems="center"
      gap="6px"
      border="1px solid"
      borderColor={borderColor}
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
      {iconLeft && <Box>{iconLeft}</Box>}
      {children}
      {iconRight && <Box>{iconRight}</Box>}
    </ChakraButton>
  )
}

export default Button