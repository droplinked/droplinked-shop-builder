import { Box, Link as ChakraLink, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import DroplinkedTypography from 'assets/brand-identity/DroplinkedTypography'
import { HamburgermenuLg } from 'assets/icons/Navigation/HamburgerMenu/HamburgermenuLg'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import React from 'react'
import { Link } from "react-router-dom"
import { MouseEvent } from 'types/eventTypes'
import MobileDrawer from './MobileDrawer'

const BrandIcon = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isMobile = useBreakpointValue({ base: true, lg: false })

    const handleHamburgerClick = (event: MouseEvent) => {
        event.stopPropagation()
        onOpen()
    }

    const flexContainerStyles = { display: 'flex', alignItems: 'center', gap: 3 }

    const content = (
        <>
            <IconWrapper
                width={10}
                height={10}
                bg="transparent"
                icon={
                    isMobile
                        ? <HamburgermenuLg color='#fff' onClick={handleHamburgerClick} />
                        : <Drop3 width="24px" height="24px" color='#fff' />
                }
            />
            <DroplinkedTypography width="127px" height="24px" color='#fff' />
        </>
    )

    return (
        <>
            {isMobile
                ? <Box {...flexContainerStyles}>{content}</Box>
                : <ChakraLink as={Link} to="/" {...flexContainerStyles}>{content}</ChakraLink>
            }
            <MobileDrawer isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default BrandIcon