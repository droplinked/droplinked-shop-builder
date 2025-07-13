import { Flex } from '@chakra-ui/react'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import React from 'react'
import InfoWrapper from '../drawer-components/InfoWrapper'
import TitledText from '../drawer-components/TitledText'
import { IOrderDetails } from 'services/order/interfaces'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface ShippingProps {
    shippings: IOrderDetails["shippings"]
}

export default function ShippingSection({ shippings }: ShippingProps) {
    const { t } = useLocaleResources("purchaseHistory")

    return (
        <InfoWrapper title={t("shipping")}>
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
    )
}