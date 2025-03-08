import { HStack } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import AppLabel from 'components/redesign/label/AppLabel';
import { ShopSubscriptionData } from 'lib/apis/subscription/interfaces';
import * as React from 'react';
interface props {
    currentSubData: {
        icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
        title: string
    };
    data: {
        data: ShopSubscriptionData
    };
}
function PlanBadge({ currentSubData, data }: props) {
    return (
        <HStack gap={"1rem"} flexWrap={"wrap"}>
            <HStack>
                <currentSubData.icon stroke='neutral.white' color='neutral.white' />
                <AppTypography color={"neutral.white"} fontWeight={500} fontSize={"24px"}>
                    {currentSubData.title}
                </AppTypography>
            </HStack>
            <AppLabel
                variant="muted"
                size={"36"}
                status={data.data.status === "ACTIVE" ? "success" : "error"}
                text={data.data.status}
                leftIcon={AppIcons.Available} />
        </HStack>
    );
}

export default PlanBadge;