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
            title={t("payment_details")}
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
                    title={t("discount")}
                    direction='row'
                    text={
                        <FormattedPrice price={giftCard.amount} fontSize={14} fontWeight={500} />
                    }
                />
            )}
            {hasRuleset && (
                <TitledText
                    title={t("discount_ruleset")}
                    direction='row'
                    text={<FormattedPrice price={giftCard.ruleset} fontSize={14} fontWeight={500} />}
                />
            )}
            <TitledText
                title={t("total_products")}
                direction='row'
                text={<FormattedPrice price={details.products} fontSize={14} fontWeight={500} />}
            />
            {details.cost && <TitledText
                title={t("total_cost")}
                direction='row'
                text={<FormattedPrice price={details.cost} fontSize={14} fontWeight={500} />}
            />
            }
            <TitledText
                title={t("total_cart")}
                direction='row'
                text={<FormattedPrice price={details.cart} fontSize={14} fontWeight={500} />}
            />
            <TitledText
                title={t("tax")}
                direction='row'
                text={<FormattedPrice price={details.tax} fontSize={14} fontWeight={500} />}
            />
            {isPhysical &&
                <TitledText
                    title={t("shipping")}
                    direction='row'
                    text={<FormattedPrice price={details.shipping} fontSize={14} fontWeight={500} />}
                />
            }
            <TitledText
                title={t("total_net_profit")}
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
                title={t("payment_method")}
                direction='row'
                text={details.paidWith}
            />
            <TitledText
                title={t("order_id")}
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