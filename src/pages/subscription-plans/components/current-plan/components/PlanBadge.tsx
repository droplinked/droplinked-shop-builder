import { HStack, IconProps } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import AppLabel from 'components/redesign/label/AppLabel';
import { ShopSubscriptionData } from 'services/subscription/interfaces';
import * as React from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localEn from 'locales/subscription/en.json';
import localAr from 'locales/subscription/ar.json';

interface props {
    currentSubData: {
        icon: React.ComponentType<IconProps> ,
        title: string
    };
    data: ShopSubscriptionData
}

function PlanBadge({ currentSubData, data }: props) {
    const { t } = useLocaleResources('subscription', { en: localEn, ar: localAr });

    return (
        <HStack gap={"1rem"} flexWrap={"wrap"}>
            <HStack>
                <currentSubData.icon stroke='white' color='white' />
                <AppTypography color={"neutral.white"} fontWeight={500} fontSize={"24px"}>
                    {t(currentSubData.title)}
                </AppTypography>
            </HStack>
            <AppLabel
                variant="muted"
                size={"36"}
                status={data.status === "ACTIVE" ? "success" : "error"}
                text={t(data.status === "ACTIVE" ? 'currentPlan.status' : 'currentPlan.inactive')}
                leftIcon={AppIcons.Available} />
        </HStack>
    );
}

export default PlanBadge;