import { Flex } from '@chakra-ui/react'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import React from 'react'
import InfoWrapper from '../drawer-components/InfoWrapper'
import TitledText from '../drawer-components/TitledText'
import { IOrderDetails } from 'services/order/interfaces'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface PaymentDetailsProps {
    details: IOrderDetails["details"]
    trackingInfo: IOrderDetails["trackingInfo"]
    giftCard?: IOrderDetails["giftCard"]
    isPhysical: boolean
    orderId: string
}

export default function PaymentDetailsSection({ details, trackingInfo, giftCard, isPhysical, orderId }: PaymentDetailsProps) {
    const { t } = useLocaleResources("purchaseHistory")

    return (
        <InfoWrapper
            title={t("PaymentDetailsSection.paymentDetails")}
            flexProps={{ p: 0 }}
            textProps={{
                pt: { base: 4, md: 6 },
                px: { base: 4, md: 6 },
            }}
        >
            <PaymentSummary details={details} giftCard={giftCard} isPhysical={isPhysical} />
            <PaymentMethodAndTracking details={details} trackingInfo={trackingInfo} orderId={orderId} />
        </InfoWrapper>
    )
}

function PaymentSummary({ details, giftCard, isPhysical }) {
    const { t } = useLocaleResources("purchaseHistory")

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
                    title={t("PaymentDetailsSection.discount")}
                    direction='row'
                    text={
                        <FormattedPrice price={giftCard.amount} fontSize={14} fontWeight={500} />
                    }
                />
            )}
            {hasRuleset && (
                <TitledText
                    title={t("PaymentDetailsSection.discountRuleset")}
                    direction='row'
                    text={<FormattedPrice price={giftCard.ruleset} fontSize={14} fontWeight={500} />}
                />
            )}
            <TitledText
                title={t("PaymentDetailsSection.totalProducts")}
                direction='row'
                text={<FormattedPrice price={details.products} fontSize={14} fontWeight={500} />}
            />
            {details.cost && <TitledText
                title={t("PaymentDetailsSection.totalCost")}
                direction='row'
                text={<FormattedPrice price={details.cost} fontSize={14} fontWeight={500} />}
            />
            }
            <TitledText
                title={t("PaymentDetailsSection.totalCart")}
                direction='row'
                text={<FormattedPrice price={details.cart} fontSize={14} fontWeight={500} />}
            />
            <TitledText
                title={t("PaymentDetailsSection.tax")}
                direction='row'
                text={<FormattedPrice price={details.tax} fontSize={14} fontWeight={500} />}
            />
            {isPhysical &&
                <TitledText
                    title={t("PaymentDetailsSection.shipping")}
                    direction='row'
                    text={<FormattedPrice price={details.shipping} fontSize={14} fontWeight={500} />}
                />
            }
            <TitledText
                title={t("PaymentDetailsSection.totalNetProfit")}
                direction='row'
                text={<FormattedPrice price={details.profit} fontSize={14} fontWeight={700} />}
            />
        </Flex>
    )
}

function PaymentMethodAndTracking({ details, trackingInfo, orderId }) {
    const { t } = useLocaleResources("purchaseHistory")

    return (
        <Flex
            direction="column"
            gap={4}
            px={{ base: 4, md: 6 }}
            pb={{ base: 4, md: 6 }}
        >
            <TitledText
                title={t("PaymentDetailsSection.paymentMethod")}
                direction='row'
                text={details.paidWith}
            />
            <TitledText
                title={t("PaymentDetailsSection.orderId")}
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
                        <InteractiveText
                            key={index}
                            to={tracking.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            hasExternalIcon
                        >
                            {tracking.name}
                        </InteractiveText>
                    ))}
                />
            ))}
        </Flex>
    )
}