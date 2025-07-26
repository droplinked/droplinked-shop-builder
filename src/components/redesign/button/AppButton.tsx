import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import buttonStylesModule from './AppButtonStyles'

export interface AppButtonProps extends ButtonProps {
    variant?: 'normal' | 'filled' | 'outlined' | 'secondary'
    size?: 'sm' | 'md' | 'lg'
    useOriginalIconColor?: boolean 
}

/**
 * Button Component - A flexible, styled button with variant/size support
 *
 * Features multiple variants (normal, filled, outlined, secondary) and sizes (sm, md, lg)
 * Supports left and right icons, and all ChakraUI button props
 * 
 * @param {object} props - Component props
 * @param {('normal'|'filled'|'outlined'|'secondary')} [props.variant='filled'] - Button style variant
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Button size
 * @param {ReactElement|null} [props.leftIcon] - Icon to display on the left side
 * @param {ReactElement|null} [props.rightIcon] - Icon to display on the right side
 * @param {React.ReactNode} props.children - Button content
 * @param {boolean} [props.isDisabled] - Whether the button is disabled
 */
function sizeIcon(icon: React.ReactElement | undefined, size: number) {
  if (!icon) return undefined;
  // If the icon is a string (e.g., 'svg') or a function (component), inject width/height
  if (typeof icon.type === 'string' || typeof icon.type === 'function') {
    return React.cloneElement(icon as React.ReactElement<any>, { width: size, height: size });
  }
  // Otherwise, return as-is
  return icon;
}

const AppButton = ({
    variant = 'filled',
    size = 'md',
    children,
    leftIcon,
    rightIcon,
    useOriginalIconColor = false,
    ...props
}: AppButtonProps) => {
    const { isDisabled } = props

    // Get styles based on variant and size
    const { variantStyle, sizeStyle } = buttonStylesModule.helpers.getStyles(variant, size)
    const { borderColor, background, color, hover, active } = buttonStylesModule.helpers.getStateStyles(
        variantStyle,
        isDisabled
    )

    // Get icon size from style helper
    const iconSize = buttonStylesModule.helpers.getIconSize(size);

    // Only apply icon styling if preserveIconColor is false
    const iconStyling = useOriginalIconColor ? {} : buttonStylesModule.helpers.getIconStyling()

    // Clone icons with enforced size only if SVG
    const sizedLeftIcon = sizeIcon(leftIcon, iconSize);
    const sizedRightIcon = sizeIcon(rightIcon, iconSize);

    // Override any custom props when disabled to ensure consistent styling
    const finalProps = { ...props }
    if (isDisabled) {
        // Remove any custom color/style props that would override disabled styles
        delete finalProps.color;
        delete finalProps.borderColor;
        delete finalProps.bg;
        delete finalProps.bgColor;
        delete finalProps.backgroundColor;
    }

    return (
        <ChakraButton
            display="flex"
            flexShrink={0}
            alignItems="center"
            justifyContent="center"
            height={sizeStyle.height}
            border="1px solid"
            borderColor={borderColor}
            borderRadius={sizeStyle.borderRadius}
            bgColor={background}
            color={color}
            fontSize={sizeStyle.fontSize}
            fontWeight={500}
            iconSpacing={sizeStyle.gap}
            leftIcon={sizedLeftIcon}
            rightIcon={sizedRightIcon}
            _hover={hover}
            _active={active}
            _disabled={{ 
                cursor: 'not-allowed', 
                opacity: 0.6
            }}
            sx={iconStyling}
            {...finalProps}
        >
            {children}
        </ChakraButton>
    )
}

export default AppButton
