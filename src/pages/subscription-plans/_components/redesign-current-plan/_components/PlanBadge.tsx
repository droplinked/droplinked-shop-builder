import { HStack } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppBadge from 'components/common/badge/AppBadge';
import AppTypography from 'components/common/typography/AppTypography';
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
                <currentSubData.icon stroke='#fff' color='#fff' />
                <AppTypography color={"#fff"} fontWeight={500} fontSize={"24px"}>
                    {currentSubData.title}
                </AppTypography>
            </HStack>
            <AppBadge
                backgroundColor={"#80EDCF1A"}
                color={"#2BCFA1"}
                padding={"8px"}
                pr={"10px"}
                variant={"default"}
                status={data.data.status === "ACTIVE" ? "green" : "red"}
                text={data.data.status}
                icon={AppIcons.Available} />
        </HStack>
    );
}

export default PlanBadge;