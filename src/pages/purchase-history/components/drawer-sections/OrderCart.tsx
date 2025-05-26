import { Flex } from '@chakra-ui/react';
import React from 'react';
import { IOrders } from '../../interface';
import { IOrderDetails } from 'services/order/interfaces';
import CartItem from '../drawer-components/CartItem';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';

interface Props {
    orderData: IOrderDetails;
    isFetching: boolean;
    rowData: IOrders,
}

export default function OrderCart({ orderData, isFetching }: Props) {
    const { items } = orderData ?? {}

    return (
        <AppSkeleton isLoaded={!isFetching} borderRadius={16}>
            <Flex direction="column" gap={4}>
                {items?.map((item, index) => {
                    return (
                        <CartItem key={item.productId} item={item} />
                    )
                })}
            </Flex>
        </AppSkeleton>
    )
}
