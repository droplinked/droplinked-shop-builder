import AppTypography from 'components/common/typography/AppTypography';
import { ShopSubscriptionData } from 'services/subscription/interfaces';
import * as React from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localEn from 'locales/subscription/en.json';
import localAr from 'locales/subscription/ar.json';

interface props {
    currentSubData: {
        title: string
    };
    data: ShopSubscriptionData
}

function PlanDescription({ currentSubData, data }: props) {
    const { t } = useLocaleResources('subscription', { en: localEn, ar: localAr });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(undefined, { year: "numeric", "month": "long", day: "numeric" });
    };

    if (data.subscriptionId.type === "STARTER") { return null }

    return (
        currentSubData.title === "PlanCard.enterprise.title" ?
            <AppTypography color={"#B1B1B1"} fontWeight={400} fontSize={"16px"}>
                {t('CurrentPlan.activeMessage', {
                    plan: t(currentSubData.title),
                    startDate: formatDate(data.startsAt),
                    endDate: formatDate(data.expiresAt)
                })}
            </AppTypography>
            :
            <AppTypography color={"#B1B1B1"} fontWeight={400} fontSize={"16px"}>
                {t('CurrentPlan.activeMessageWithPrice', {
                    plan: t(currentSubData.title),
                    price: data.paidAmount?.toFixed(2),
                    period: data.monthLength === 1 ? t('Plans.cycles.monthly') : data.monthLength === 12 ? t('Plans.cycles.annual') : t('Plans.cycles.threeYear'),
                    startDate: formatDate(data.startsAt),
                    endDate: formatDate(data.expiresAt)
                })}
            </AppTypography>
    );
}

export default PlanDescription;