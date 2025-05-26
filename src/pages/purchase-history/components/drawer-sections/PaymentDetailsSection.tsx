import { Flex } from '@chakra-ui/react';
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';
import ExternalLink from 'components/redesign/external-link/ExternalLink';
import React from 'react';
import InfoWrapper from '../drawer-components/InfoWrapper';
import TitledText from '../drawer-components/TitledText';
import { IOrderDetails } from 'services/order/interfaces';
import ClipboardText from 'components/common/clipboardText/ClipboardText';

interface PaymentDetailsProps {
    details: IOrderDetails["details"];
    trackingInfo: IOrderDetails["trackingInfo"];
    giftCard?: IOrderDetails["giftCard"];
    isPhysical: boolean;
    orderId: string;
}

export default function PaymentDetailsSection({ details, trackingInfo, giftCard, isPhysical, orderId }: PaymentDetailsProps) {
    return (
        <InfoWrapper
            title='Payment Details'
            flexProps={{ p: 0 }}
            textProps={{
                pt: { base: 4, md: 6 },
                px: { base: 4, md: 6 },
            }}
        >
            <PaymentSummary details={details} giftCard={giftCard} isPhysical={isPhysical} />
            <PaymentMethodAndTracking details={details} trackingInfo={trackingInfo} orderId={orderId} />
        </InfoWrapper>
    );
}

function PaymentSummary({ details, giftCard, isPhysical }) {
    const appliedGiftCard = !!giftCard?.amount
    const hasRuleset = !!giftCard?.ruleset

    return (
        <Flex
            direction="column"
            gap={4}
            borderBottom="1px solid #292929"
            px={{ base: 4, md: 6 }}
            pb={{ base: 4, md: 6 }}
        >
            {appliedGiftCard && (
                <TitledText
                    title='Discount'
                    direction='row'
                    text={
                        <FormattedPrice price={giftCard.amount} fontSize={14} fontWeight={500} />
                    }
                />
            )}
            {hasRuleset && (
                <TitledText
                    title='Discount Ruleset'
                    direction='row'
                    text={<FormattedPrice price={giftCard.ruleset} fontSize={14} fontWeight={500} />}
                />
            )}
            <TitledText
                title='Total Products'
                direction='row'
                text={<FormattedPrice price={details.products} fontSize={14} fontWeight={500} />}
            />
            {details.cost && <TitledText
                title='Total Cost'
                direction='row'
                text={<FormattedPrice price={details.cost} fontSize={14} fontWeight={500} />}
            />
            }
            <TitledText
                title='Total Cart'
                direction='row'
                text={<FormattedPrice price={details.cart} fontSize={14} fontWeight={500} />}
            />
            <TitledText
                title='Tax'
                direction='row'
                text={<FormattedPrice price={details.tax} fontSize={14} fontWeight={500} />}
            />
            {isPhysical &&
                <TitledText
                    title='Shipping'
                    direction='row'
                    text={<FormattedPrice price={details.shipping} fontSize={14} fontWeight={500} />}
                />
            }
            <TitledText
                title='Total Net Profit'
                direction='row'
                text={<FormattedPrice price={details.profit} fontSize={14} fontWeight={700} />}
            />
        </Flex>
    );
}

function PaymentMethodAndTracking({ details, trackingInfo, orderId }) {
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
            <TitledText
                title='Order ID'
                direction='row'
                text={orderId}
                rightContent={<ClipboardText text={orderId} />}
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
