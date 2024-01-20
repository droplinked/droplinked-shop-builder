import { HStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';

import React from 'react'

interface IProps {
    data: any
}

function CollectionProductList({ data }: IProps) {

    return (
        <HStack>
            {data?.productCollectionID?.ruleSetID ? data?.productCollectionID?.ruleSetID?.gated ? <AppIcons.GatedIcon /> : <AppIcons.DiscountIcon /> : null}
            <AppTypography fontSize='12px'>{data?.productCollectionID?.title}</AppTypography>
        </HStack>
    )
}

export default CollectionProductList