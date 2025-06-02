import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/subscription/en.json'
import localAr from 'locales/subscription/ar.json'

function PopularPlanBadge() {
    const { t } = useLocaleResources('subscription', { en: localEn, ar: localAr })

    return (
        <Flex
            position="absolute"
            top={0}
            left="50%"
            transform="translate(-50%, -50%)"
            alignItems="center"
            gap={2}
            paddingBlock={2}
            paddingInline={4}
            borderRadius="200px"
            bgColor="main.primary"
            whiteSpace="nowrap"
        >
            <AppIcons.PopularPlanMedal />
            <AppTypography textTransform="uppercase" fontSize={14} fontWeight={600} color="#000">
                {t('plans.mostPopular')}
            </AppTypography>
        </Flex>
    )
}

export default PopularPlanBadge