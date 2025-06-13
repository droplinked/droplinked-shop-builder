import { Box, Link as ChakraLink, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import DroplinkedTypography from 'assets/brand-identity/DroplinkedTypography'
import { HamburgermenuLg } from 'assets/icons/Navigation/HamburgerMenu/HamburgermenuLg'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import React from 'react'
import { Link } from "react-router-dom"
import MobileDrawer from './MobileDrawer/MobileDrawer'

const BrandIcon = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                        ? <HamburgermenuLg color='#fff' onClick={onOpen} />
                        : <Drop3 width="24px" height="24px" color='#fff' />
                }
            />
            <DroplinkedTypography width={typography.width} height={typography.height} color='#fff' />
        </>
    )

    return (
        <>
            {showHamburgerMenu
                ? <Box {...flexContainerStyles}>{content}</Box>
                : <ChakraLink as={Link} to="/" {...flexContainerStyles}>{content}</ChakraLink>
            }
            <MobileDrawer isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default BrandIcon