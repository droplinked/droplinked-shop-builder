import { Flex } from '@chakra-ui/react';
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';
import { IOrderDetails } from 'lib/apis/order/interfaces';
import React from 'react';
import InfoWrapper from './InfoWrapper';
import TitledText from './TitledText';
import ExternalLink from 'components/redesign/external-link/ExternalLink';

interface Props {
    orderData: IOrderDetails;
    isFetching: boolean;
}

export default function OrderInformation({ orderData, isFetching }: Props) {
    const { customer, shippings, commision, details, trackingInfo } = orderData ?? {}

    if (isFetching) {
        return null
    }

    return (
        <Flex flexDirection="column" gap={4}>
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

            <InfoWrapper title='Shipping'>
                <Flex direction="column" gap={4}>
                    {shippings.map((item, index) => (
                        <TitledText
                            key={index}
                            direction='row'
                            text={<FormattedPrice price={item.value} fontSize={14} fontWeight={500} />}
                            title={item.title}
                        />
                    ))}
                </Flex>
            </InfoWrapper>

            <InfoWrapper title='Commision'>
                <Flex direction="column" gap={4}>
                    {commision.droplinked &&
                        <TitledText
                            title='Droplinked'
                            direction='row'
                            text={<FormattedPrice price={commision.droplinked} fontSize={14} fontWeight={500} />}
                        />}

                    {commision.stripe &&
                        <TitledText
                            title='Stripe'
                            direction='row'
                            text={<FormattedPrice price={commision.stripe} fontSize={14} fontWeight={500} />}
                        />}
                </Flex>
            </InfoWrapper>

            <InfoWrapper
                title='Payment Details'
                flexProps={{ p: 0 }}
                textProps={{
                    pt: { base: 4, md: 6 },
                    px: { base: 4, md: 6 },
                }}
            >
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
                    {trackingInfo.map((item, index) => {
                        return (
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
                        )
                    })}
                </Flex>
            </InfoWrapper>
        </Flex>
    )
}
