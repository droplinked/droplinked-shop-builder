import { Flex, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { TFunction } from 'i18next'
import { usePartnerContext } from '../context/partner.context'
import WalletVerificationModal from './WalletVerificationModal/WalletVerificationModal'
import LandingText from './common/LandingText'

interface ProPlanProps {
    t: TFunction;
}

export default function ProPlan({ t }: ProPlanProps) {
    const { planDurationMonths } = usePartnerContext();
    return (
        <Flex
            direction={{ base: "column", lg: "row" }}
            justifyContent="space-between"
            gap={{ lg: 6 }}
            border="1px solid #333"
            borderRadius={24}
            overflow="hidden"
        >
            <Content planDurationMonths={planDurationMonths} t={t} />
            <Image
                maxWidth={{ base: "100%", lg: "50%" }}
                src="https://upload-file-droplinked.s3.amazonaws.com/a27dff144c2ed4e705c1941ec92244ccdd6514bfc28e31c8e35763d6f2f94867.png"
                objectFit="contain"
            />
        </Flex>
    )
}

interface ContentProps {
    planDurationMonths: number;
    t: TFunction;
}

function Content({ planDurationMonths, t }: ContentProps) {
    return (
        <Flex
            direction="column"
            alignItems="flex-start"
            gap={{ base: 4, md: 8 }}
            padding={{ base: 4, md: 8 }}
        >
            <Flex direction="column" gap={{ base: 1, xl: 2 }}>
                <AppTypography fontSize={{ base: 18, md: 20 }} fontWeight={700} color="white">
                    {t('proPlan.title', { planDurationMonths })}
                </AppTypography>
                <LandingText>
                    {t('proPlan.description', { planDurationMonths })}
                </LandingText>
            </Flex>
            <WalletVerificationModal t={t} />
        </Flex>
    )
}