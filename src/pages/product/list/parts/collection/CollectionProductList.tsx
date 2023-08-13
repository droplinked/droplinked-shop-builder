import { HStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppBadge from 'components/common/badge/AppBadge';
import AppTypography from 'components/common/typography/AppTypography';
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers';
import React from 'react'

interface IProps {
    data: any
}

function CollectionProductList({ data }: IProps) {

    return (
        <HStack>
            {data?.productCollectionID?.ruleSetID?.gated ? <AppIcons.GatedIcon /> : <AppIcons.DiscountIcon />}
            <AppTypography size='14px'>{data?.productCollectionID?.title}</AppTypography>
        </HStack>
    )
}

export default CollectionProductList