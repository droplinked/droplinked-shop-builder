import { Flex } from '@chakra-ui/react';
import { IOrderDetails } from 'lib/apis/order/interfaces';
import React from 'react';
import CustomerInfoSection from './drawerSections/CustomerInfoSection';
import ShippingSection from './drawerSections/ShippingSection';
import CommissionSection from './drawerSections/CommissionSection';
import PaymentDetailsSection from './drawerSections/PaymentDetailsSection';

interface Props {
    orderData: IOrderDetails;
    isFetching: boolean;
}

export default function OrderInformation({ orderData, isFetching }: Props) {
    if (isFetching || !orderData) {
        return null;
    }

    const { customer, shippings, commision, details, trackingInfo } = orderData;

    return (
        <Flex flexDirection="column" gap={4}>
            <CustomerInfoSection customer={customer} />
            <ShippingSection shippings={shippings} />
            <CommissionSection commission={commision} />
            <PaymentDetailsSection details={details} trackingInfo={trackingInfo} />
        </Flex>
    );
}
