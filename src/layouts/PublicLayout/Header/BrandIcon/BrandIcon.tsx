import { Box, Link as ChakraLink, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import DroplinkedTypography from 'assets/brand-identity/DroplinkedTypography'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import IframeAwareLink from 'components/redesign/iframe-aware-link/IframeAwareLink'
import React from 'react'
import { Link } from "react-router-dom"
import MobileDrawer from '../MobileDrawer/MobileDrawer'
import HamburgerMenuButton from './HamburgerMenuButton'

const BrandIcon = () => {
    const { isOpen, onClose, onToggle } = useDisclosure()
    const { showHamburgerMenu, typography } = useBreakpointValue({
        base: {
            showHamburgerMenu: true,
            typography: { width: "107px", height: "20px" }
        },
        md: {
            showHamburgerMenu: true,
            typography: { width: "129px", height: "24px" }
        },
        xl: {
            showHamburgerMenu: false,
            typography: { width: "129px", height: "24px" }
        }
    })

    const flexContainerStyles = { display: 'flex', alignItems: 'center', gap: 3 }
    const typographyComponent = <DroplinkedTypography {...typography} color='#fff' />
    const iconComponent = (
        <IconWrapper
            as={showHamburgerMenu ? "button" : "div"}
            width={10}
            height={10}
            bg="transparent"
            icon={
                showHamburgerMenu
                    ? <HamburgerMenuButton isOpen={isOpen} onToggle={onToggle} />
                    : <Drop3 width="24px" height="24px" color='#fff' />
            }
        />
    )

    if (showHamburgerMenu) return (
        <>
            <Box {...flexContainerStyles}>
                {iconComponent}
                <IframeAwareLink to='/' chakraProps={{ textDecoration: 'none' }}>
                    {typographyComponent}
                </IframeAwareLink>
            </Box>
            <MobileDrawer isOpen={isOpen} onClose={onClose} />
        </>
    )

    return (
        <IframeAwareLink 
            to="/" 
            chakraProps={{ 
                width: "200px", 
                textDecoration: 'none',
                ...flexContainerStyles 
            }}
        >
            {iconComponent}
            {typographyComponent}
        </IframeAwareLink>
    )
}

export default BrandIcon