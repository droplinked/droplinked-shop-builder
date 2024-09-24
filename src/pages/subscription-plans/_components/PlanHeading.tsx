import { Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import { subscriptionPlanMap } from 'lib/utils/helpers/helpers';
import React, { JSX } from 'react';

interface Props {
    planTitle: string,
    fontSize?: number;
    iconSize?: number;
}

function PlanHeading({ planTitle, fontSize = 16, iconSize = 16 }: Props) {
    const { icon: SubscriptionIcon, title } = subscriptionPlanMap[planTitle]

    return (
        <Flex
            alignItems={"center"}
            gap={2}
            sx={{
                svg: { width: `${iconSize}px`, height: `${iconSize}px` }
            }}
        >
            <SubscriptionIcon />
            <AppTypography fontSize={fontSize} fontWeight={700} color={"white"}>{title}</AppTypography>
        </Flex>
    )
}

export default PlanHeading