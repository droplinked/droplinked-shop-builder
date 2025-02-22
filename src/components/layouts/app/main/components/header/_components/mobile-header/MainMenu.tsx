import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { Link } from 'react-router-dom'
import SignInButton from '../sign-in-button/SignInButton'

export default function MainMenu({ isVisible, onSubMenuClick }) {
    return (
        <Flex
            position="fixed"
            top="56px"
            right={isVisible ? "0" : "-100%"}
            bottom={0}
            width="100%"
            flexDirection="column"
            justifyContent="space-between"
            paddingBlock={{ base: 4, md: 6 }}
            paddingInline={{ base: 4, md: 9, lg: "60px", xl: "72px" }}
            bgColor="#141414"
            transition="0.4s"
            zIndex={10}
        >
            <Flex direction="column" gap={9}>
                <MenuItem label="Products" onClick={onSubMenuClick} />
                <MenuItem label="Pricing" linkTo="/plans" />
                <MenuItem label="About Us" linkTo="/about" />
            </Flex>
            <SignInButton />
        </Flex>
    )
}

function MenuItem({ label, onClick, linkTo }: { label: string, onClick?: () => void, linkTo?: string }) {
    if (linkTo) {
        return (
            <Link to={linkTo}>
                <AppTypography
                    color="#fff"
                    fontSize={20}
                    fontWeight={700}
                    cursor="pointer"
                >
                    {label}
                </AppTypography>
            </Link>
        )
    }

    return (
        <AppTypography
            color="#fff"
            fontSize={20}
            fontWeight={700}
            cursor="pointer"
            onClick={onClick}
        >
            {label}
        </AppTypography>
    )
}