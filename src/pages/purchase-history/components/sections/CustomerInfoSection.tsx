import { Flex } from '@chakra-ui/react';
import React from 'react';
import InfoWrapper from '../InfoWrapper';
import TitledText from '../TitledText';
import { IOrderDetails } from 'lib/apis/order/interfaces';

interface CustomerInfoProps {
    customer: IOrderDetails["customer"];
}

export default function CustomerInfoSection({ customer }: CustomerInfoProps) {
    return (
        <InfoWrapper title='Customer Information'>
            <Flex direction="column" gap={6}>
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection={{ base: "column", md: "row" }}
                >
                    <TitledText text={customer?.name} title='Full Name' />
                    <TitledText text={customer?.email} title='Email Address' />
                </Flex>
                <TitledText text={customer.address} title='Shipping Address' />
            </Flex>
        </InfoWrapper>
    );
}
