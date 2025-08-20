import { Link as ChakraLink, Flex, Text } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import IframeAwareLink from 'components/redesign/iframe-aware-link/IframeAwareLink'
import React from 'react'
import { Link } from 'react-router-dom'
import { appVersion } from 'utils/app/variable'

function FooterLegal() {
    const { t } = useLocaleResources('layout/PublicLayout')
    const currentYear = new Date().getFullYear()

    const LEGAL_LINKS = [
        { to: '/privacy', label: t('Footer.FooterLegal.privacyAndDataCollection') },
        { to: '/terms', label: t('Footer.FooterLegal.termsOfService') }
    ] as const

    return (
        <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ base: "flex-start", md: "center" }}
            gap={4}
            padding={{ base: 4, md: "unset" }}
            fontSize={14}
            color="text.subtext.placeholder.dark"
        >
            <DotSeparatedList>
                <Text>{t('Footer.FooterLegal.copyright', { year: currentYear })}</Text>
                <Text>{appVersion}</Text>
            </DotSeparatedList>

            <DotSeparatedList>
                {LEGAL_LINKS.map(({ to, label }) => (
                    <IframeAwareLink key={label} to={to}>
                        {label}
                    </IframeAwareLink>
                ))}
            </DotSeparatedList>
        </Flex>
    )
}

export default FooterLegal