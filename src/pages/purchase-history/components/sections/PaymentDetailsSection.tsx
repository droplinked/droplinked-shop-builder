import { Flex } from '@chakra-ui/react';
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';
import ExternalLink from 'components/redesign/external-link/ExternalLink';
import React from 'react';
import InfoWrapper from '../InfoWrapper';
import TitledText from '../TitledText';
import { IOrderDetails } from 'lib/apis/order/interfaces';

interface PaymentDetailsProps {
    details: IOrderDetails["details"];
    trackingInfo: IOrderDetails["trackingInfo"];
}

export default function PaymentDetailsSection({ details, trackingInfo }: PaymentDetailsProps) {
    return (
        <InfoWrapper
            title='Payment Details'
            flexProps={{ p: 0 }}
            textProps={{
                pt: { base: 4, md: 6 },
                px: { base: 4, md: 6 },
            }}
        >
            <PaymentSummary details={details} />
            <PaymentMethodAndTracking details={details} trackingInfo={trackingInfo} />
        </InfoWrapper>
    );
}

function PaymentSummary({ details }) {
    return (
        <Flex
            direction="column"
            gap={4}
            borderBottom="1px solid #292929"
            px={{ base: 4, md: 6 }}
            pb={{ base: 4, md: 6 }}
        >
            <TitledText
                title='Total Cart'
                direction='row'
                text={<FormattedPrice price={details.cart} fontSize={14} fontWeight={500} />}
            />
            <TitledText
                title='Total Products'
                direction='row'
                text={<FormattedPrice price={details.products} fontSize={14} fontWeight={500} />}
            />
            <TitledText
                title='Tax'
                direction='row'
                text={<FormattedPrice price={details.tax} fontSize={14} fontWeight={500} />}
            />
            <TitledText
                title='Shipping'
                direction='row'
                text={<FormattedPrice price={details.shipping} fontSize={14} fontWeight={500} />}
            />
            <TitledText
                title='Total Net Profit'
                direction='row'
                text={<FormattedPrice price={details.profit} fontSize={14} fontWeight={700} />}
            />
        </Flex>
    );
}

function PaymentMethodAndTracking({ details, trackingInfo }) {
    return (
        <Flex
            direction="column"
            gap={4}
            px={{ base: 4, md: 6 }}
            pb={{ base: 4, md: 6 }}
        >
            <TitledText
                title='Payment Method'
                direction='row'
                text={details.paidWith}
            />
            {trackingInfo.map((item, index) => (
                <TitledText
                    key={index}
                    title={item.title}
                    direction='row'
                    text={item.trackings.map((tracking, index) => (
                        <ExternalLink
                            key={index}
                            href={tracking.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            hasArrow
                        >
                            {tracking.name}
                        </ExternalLink>
                    ))}
                />
            ))}
        </Flex>
    );
}
