import { Flex, Spinner } from '@chakra-ui/react';
import { IOrderDetails } from 'services/order/interfaces';
import React from 'react';
import CustomerInfoSection from './CustomerInfoSection';
import ShippingSection from './ShippingSection';
import CommissionSection from './CommissionSection';
import PaymentDetailsSection from './PaymentDetailsSection';
import AffiliateSection from './AffiliateSection';

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

    const { customer, shippings, commision, details, trackingInfo, giftCard, affiliates, orderInformation } = orderData;
    const isPhysical = !!customer.address

    return (
        <Flex flexDirection="column" gap={4}>
            <CustomerInfoSection
                customer={customer}
                details={details}
                isPhysical={isPhysical}
            />

            {isPhysical && <ShippingSection shippings={shippings} />}

            {!!affiliates && <AffiliateSection affiliate={affiliates} />}

            <CommissionSection commission={commision} />

            <PaymentDetailsSection
                details={details}
                trackingInfo={trackingInfo}
                giftCard={giftCard}
                isPhysical={isPhysical}
                orderId={orderInformation.orderId}
            />
        </Flex >
    );
}
