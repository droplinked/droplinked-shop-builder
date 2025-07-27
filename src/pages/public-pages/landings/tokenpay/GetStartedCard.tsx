import { Flex, Image } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { Link } from 'react-router-dom'

export default function GetStartedCard() {
    const { t } = useLocaleResources('public-pages/landings/tokenpay')

    return (
        <Flex
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="start"
            height={{ base: "auto", md: "20rem" }}
            width="100%"
        >
            <Link to={AUTH_ROUTES.SIGN_UP}>
                <AppButton m={6}>
                    {t('getStarted')}
                </AppButton>
            </Link>

            <Image
                position="relative"
                bottom={{ base: "unset", md: "7rem", xl: "10rem" }}
                width="648px"
                transform={{ base: "scale(1)", md: "scale(0.8)", xl: "scale(1)" }}
                src='https://upload-file-droplinked.s3.amazonaws.com/2720d8ad58aa50ab3db0cd0170cfa32400c7810f9e0009d9476be8b6c768f77b.png'
                alt='get-started-card'
            />
        </Flex>
    )
}