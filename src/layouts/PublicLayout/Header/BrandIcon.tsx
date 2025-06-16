import { Box, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import DroplinkedTypography from 'assets/brand-identity/DroplinkedTypography'
import { HamburgermenuLg } from 'assets/icons/Navigation/HamburgerMenu/HamburgermenuLg'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import React from 'react'
import { Link } from "react-router-dom"
import MobileDrawer from './MobileDrawer/MobileDrawer'

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

    const content = (
        <>
            <IconWrapper
                as={showHamburgerMenu ? "button" : "div"}
                width={10}
                height={10}
                bg="transparent"
                icon={
                    showHamburgerMenu
                        ? <HamburgermenuLg color='#fff' onClick={onToggle} />
                        : <Drop3 width="24px" height="24px" color='#fff' />
                }
            />
            <DroplinkedTypography width={typography.width} height={typography.height} color='#fff' />
        </>
    )

    if (showHamburgerMenu) return (
        <>
            <Box {...flexContainerStyles}>{content}</Box>
            <MobileDrawer isOpen={isOpen} onClose={onClose} />
        </>
    )

    return <Link to="/" {...flexContainerStyles}>{content}</Link>
}

export default BrandIcon