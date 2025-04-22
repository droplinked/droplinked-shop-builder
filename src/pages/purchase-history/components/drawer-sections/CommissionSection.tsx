import { Flex } from '@chakra-ui/react';
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';
import React from 'react';
import InfoWrapper from '../drawer-components/InfoWrapper';
import TitledText from '../drawer-components/TitledText';
import { IOrderDetails } from 'lib/apis/order/interfaces';

interface CommissionProps {
    commission: IOrderDetails["commision"];
}

export default function CommissionSection({ commission }: CommissionProps) {
    return (
        <InfoWrapper title='Commision'>
            <Flex direction="column" gap={4}>
                {!!commission.droplinked &&
                    <TitledText
                        title='Droplinked'
                        direction='row'
                        text={<FormattedPrice price={commission.droplinked} fontSize={14} fontWeight={500} />}
                    />}

                {!!commission.stripe &&
                    <TitledText
                        title='Stripe'
                        direction='row'
                        text={<FormattedPrice price={commission.stripe} fontSize={14} fontWeight={500} />}
                    />}
            </Flex>
        </InfoWrapper>
    );
}
