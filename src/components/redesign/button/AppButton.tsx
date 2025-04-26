import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import buttonStyles from './AppButtonStyles'

export interface AppButtonProps extends ButtonProps {
  variant?: 'normal' | 'filled' | 'outlined' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  iconLeft?: ReactElement | null
  iconRight?: ReactElement | null
}

/**
 * Button Component - A flexible, styled button with variant/size support
 * 
 * Features multiple variants (normal, filled, outlined, secondary) and sizes (sm, md, lg)
 * Supports left and right icons, and all ChakraUI button props
 */
const AppButton = ({  variant = 'filled',  size = 'md',  children,  iconLeft, iconRight, ...props }: AppButtonProps) => {
  const { isDisabled } = props
  
  // Ensure we have a valid variant, default to 'filled' if not
  const safeVariant = (variant && buttonStyles.variant[variant]) ? variant : 'filled';
  const buttonStyle = buttonStyles.variant[safeVariant];
  const sizeStyle = buttonStyles.size[size] || buttonStyles.size.md;
  const stateStyle = isDisabled ? buttonStyle.disabled  : buttonStyle.default;
  
  return (
    <ChakraButton
      display="flex"
      flexShrink={0}
      alignItems="center"
      justifyContent="center"
      height={sizeStyle.height}
      border="1px solid"
      borderColor={stateStyle.borderColor}
      borderRadius={sizeStyle.borderRadius}
      bgColor={stateStyle.background}
      color={stateStyle.color}
      fontSize={sizeStyle.fontSize}
      fontWeight={500}
      iconPadding={0}
      iconSpacing={sizeStyle.gap}
      leftIcon={iconLeft}
      rightIcon={iconRight}
      _hover={!isDisabled ? buttonStyle.hover : {}}
      _active={!isDisabled ? buttonStyle.pressed : {}}
      _disabled={{ ...buttonStyle.disabled, cursor: "not-allowed" }}
      sx={{
        'svg': {
          stroke: 'currentColor',
          fill: 'none',
          path: {
            stroke: 'currentColor',
          }
        }
      }}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}

export default AppButton