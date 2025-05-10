import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import buttonStylesModule from './AppButtonStyles'

export interface AppButtonProps extends ButtonProps {
    variant?: 'normal' | 'filled' | 'outlined' | 'secondary'
    size?: 'sm' | 'md' | 'lg'
    iconLeft?: ReactElement | null
    iconRight?: ReactElement | null
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
 * @param {ReactElement|null} [props.iconLeft] - Icon to display on the left side
 * @param {ReactElement|null} [props.iconRight] - Icon to display on the right side
 * @param {React.ReactNode} props.children - Button content
 * @param {boolean} [props.isDisabled] - Whether the button is disabled
 */
const AppButton = ({
    variant = 'filled',
    size = 'md',
    children,
    iconLeft,
    iconRight,
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

    // Only apply icon styling if preserveIconColor is false
    const iconStyling = useOriginalIconColor ? {} : buttonStylesModule.helpers.getIconStyling()

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
            leftIcon={iconLeft}
            rightIcon={iconRight}
            _hover={hover}
            _active={active}
            _disabled={{ cursor: 'not-allowed' }}
            sx={iconStyling}
            {...props}
        >
            {children}
        </ChakraButton>
    )
}

export default AppButton
