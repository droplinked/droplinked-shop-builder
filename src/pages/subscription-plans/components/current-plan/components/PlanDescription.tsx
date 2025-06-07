import AppTypography from 'components/common/typography/AppTypography';
import { ShopSubscriptionData } from 'lib/apis/subscription/interfaces';
import * as React from 'react';

interface props {
    currentSubData: {
        icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
        title: string
    };
    data: ShopSubscriptionData
}

function PlanDescription({ currentSubData, data }: props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(undefined, { year: "numeric", "month": "long", day: "numeric" });
    };
    if (data.subscriptionId.type === "STARTER") { return null }
    return (
        currentSubData.title === "Enterprise" ?
            <AppTypography color={"#B1B1B1"} fontWeight={400} fontSize={"16px"}>
                {`You are subscribed to the ${currentSubData.title}, active from ${formatDate(data.startsAt)}, to ${formatDate(data.expiresAt)}.`}
            </AppTypography>
            :
            <AppTypography color={"#B1B1B1"} fontWeight={400} fontSize={"16px"}>
                {`You are subscribed to the ${currentSubData.title} for $${data.paidAmount?.toFixed(2)} per ${data.monthLength === 1 ? "month" : data.monthLength === 12 ? "year" : "5-Year"}, active from ${formatDate(data.startsAt)}, to ${formatDate(data.expiresAt)}.`}
            </AppTypography>
    );
}

export default PlanDescription;