import { Flex } from '@chakra-ui/react'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import React from 'react'
import InfoWrapper from '../drawer-components/InfoWrapper'
import TitledText from '../drawer-components/TitledText'
import { IOrderDetails } from 'services/order/interfaces'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface AffiliateProps {
    affiliate: IOrderDetails["affiliates"]
}

export default function AffiliateSection({ affiliate }: AffiliateProps) {
    const { t } = useLocaleResources("purchaseHistory")

    return (
        affiliate.map((item, index) => (
            <InfoWrapper title={`${t("common:affiliate")} ${index + 1}`} key={index}>
                <Flex direction="column" gap={4}>
                    <TitledText
                        title={t("AffiliateSection.publisher")}
                        direction='row'
                        text={item.publisher}
                    />
                    <TitledText
                        title={t("AffiliateSection.publisherProfit")}
                        direction='row'
                        text={<FormattedPrice price={item.publisherProfit} fontSize={14} fontWeight={500} />}
                    />
                    <TitledText
                        title={t("AffiliateSection.total")}
                        direction='row'
                        text={<FormattedPrice price={item.total} fontSize={14} fontWeight={500} />}
                    />
                </Flex>
            </InfoWrapper>
        ))
    )
}
