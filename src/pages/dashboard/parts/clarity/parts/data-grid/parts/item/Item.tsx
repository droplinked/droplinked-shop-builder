import { Flex } from '@chakra-ui/react';
import AppCard from 'components/common/card/AppCard';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import AppTypography from 'components/common/typography/AppTypography';
import clarityContext from 'pages/dashboard/parts/clarity/context';
import React, { useContext } from 'react';

interface Props {
    title: string;
    value: any
}

function Item({ title, value }: Props) {
    const { isLoading } = useContext(clarityContext)

    return (
        <AppCard>
            <Flex direction={"column"} gap={1}>
                <AppTypography fontSize={16} color={"#fff"}>{title}</AppTypography>
                <AppSkeleton isLoaded={!isLoading}>
                    <AppTypography fontSize={28} fontWeight={500} color={"#fff"}>{value}</AppTypography>
                </AppSkeleton>
            </Flex>
        </AppCard>
    )
}

export default Item