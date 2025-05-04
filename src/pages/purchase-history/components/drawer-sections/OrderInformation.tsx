import { Flex, Spinner } from '@chakra-ui/react';
import { IOrderDetails } from 'lib/apis/order/interfaces';
import React from 'react';
import CustomerInfoSection from './CustomerInfoSection';
import ShippingSection from './ShippingSection';
import CommissionSection from './CommissionSection';
import PaymentDetailsSection from './PaymentDetailsSection';

interface Props {
    orderData: IOrderDetails;
    isFetching: boolean;
}

export default function OrderInformation({ orderData, isFetching }: Props) {
    if (isFetching) {
        return (
            <Flex justifyContent="center">
                <Spinner color='#fff' size="lg" />
            </Flex>
        )
    }

    const { customer, shippings, commision, details, trackingInfo, giftCard } = orderData;

    return (
        <Flex flexDirection="column" gap={4}>
            <CustomerInfoSection customer={customer} details={details} />
            <ShippingSection shippings={shippings} />
            <CommissionSection commission={commision} />
            <PaymentDetailsSection details={details} trackingInfo={trackingInfo} giftCard={giftCard} />
        </Flex >
    );
}
