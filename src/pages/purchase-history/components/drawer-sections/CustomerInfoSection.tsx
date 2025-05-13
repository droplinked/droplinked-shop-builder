import { Flex } from '@chakra-ui/react';
import React from 'react';
import InfoWrapper from '../drawer-components/InfoWrapper';
import TitledText from '../drawer-components/TitledText';
import { IOrderDetails } from 'lib/apis/order/interfaces';

interface CustomerInfoProps {
    customer: IOrderDetails["customer"];
    details: IOrderDetails["details"];
    isPhysical: boolean;
}

export default function CustomerInfoSection({ customer, details, isPhysical }: CustomerInfoProps) {
    return (
        <InfoWrapper title='Customer Information'>
            <Flex direction="column" gap={6}>
                <Flex
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    flexDirection={{ base: "column", md: "row" }}
                    gap={{ base: 6, md: 0 }}
                >
                    {isPhysical && <TitledText text={customer?.name} title='Full Name' />}
                    <TitledText text={customer?.email} title='Email Address' />
                </Flex>
                {isPhysical && <TitledText text={customer?.phone} title='Mobile Number' />}
                {isPhysical && <TitledText text={customer.address} title='Shipping Address' />}
                {!!details.note && <TitledText text={details.note} title='Additional Details' />}
            </Flex>
        </InfoWrapper>
    );
}
