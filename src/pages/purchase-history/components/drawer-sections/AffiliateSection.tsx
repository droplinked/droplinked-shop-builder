import { Flex } from '@chakra-ui/react';
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';
import React from 'react';
import InfoWrapper from '../drawer-components/InfoWrapper';
import TitledText from '../drawer-components/TitledText';
import { IOrderDetails } from 'lib/apis/order/interfaces';

interface AffiliateProps {
    affiliate: IOrderDetails["affiliates"];
}

export default function AffiliateSection({ affiliate }: AffiliateProps) {
    return (
        affiliate.map((item, index) => (
            <InfoWrapper title={`Affiliate ${index + 1}`} key={index}>
                <Flex direction="column" gap={4}>
                    <TitledText
                        title='Publisher'
                        direction='row'
                        text={item.publisher}
                    />
                    <TitledText
                        title='Publisher Profit'
                        direction='row'
                        text={<FormattedPrice price={item.publisherProfit} fontSize={14} fontWeight={500} />}
                    />
                    <TitledText
                        title='Total'
                        direction='row'
                        text={<FormattedPrice price={item.total} fontSize={14} fontWeight={500} />}
                    />
                </Flex>
            </InfoWrapper>
        ))
    );
}
