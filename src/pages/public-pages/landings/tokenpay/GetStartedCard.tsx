import { Flex, useBreakpointValue } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { AUTH_ROUTES } from 'constants/authRoutes'
import React from 'react'
import { Link } from 'react-router-dom'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/landings/tokenpay/en.json'
import localAr from 'locales/public-pages/landings/tokenpay/ar.json'

export default function GetStartedCard() {
    const { t } = useLocaleResources('public-pages/landings/tokenpay', {
        en: localEn,
        ar: localAr
    })
    const bottomAmount = useBreakpointValue({ base: "unset", md: "7rem", xl: "10rem" })
    const transformAmount = useBreakpointValue({ base: "scale(1)", md: "scale(0.8)", xl: "scale(1)" })

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
                    {t('getStartedCard.getStarted')}
                </AppButton>
            </Link>

            <img
                style={{
                    position: "relative",
                    bottom: bottomAmount,
                    transform: transformAmount
                }}
                alt='get-started-card'
                width="648px"
                src='https://upload-file-droplinked.s3.amazonaws.com/2720d8ad58aa50ab3db0cd0170cfa32400c7810f9e0009d9476be8b6c768f77b.png'
            />
        </Flex>
    )
}