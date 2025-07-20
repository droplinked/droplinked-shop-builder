import { Flex } from '@chakra-ui/react'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import React from 'react'
import InfoWrapper from '../drawer-components/InfoWrapper'
import TitledText from '../drawer-components/TitledText'
import { IOrderDetails } from 'services/order/interfaces'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface CommissionProps {
    commission: IOrderDetails["commision"]
}

export default function CommissionSection({ commission }: CommissionProps) {
    const { t } = useLocaleResources("purchaseHistory")

    return (
        <InfoWrapper title={t("CommissionSection.commission")}>
            <Flex direction="column" gap={4}>
                {!!commission.droplinked &&
                    <TitledText
                        title={t("CommissionSection.droplinked")}
                        direction='row'
                        text={<FormattedPrice price={commission.droplinked} fontSize={14} fontWeight={500} />}
                    />}

                {!!commission.stripe &&
                    <TitledText
                        title={t("CommissionSection.stripe")}
                        direction='row'
                        text={<FormattedPrice price={commission.stripe} fontSize={14} fontWeight={500} />}
                    />}
            </Flex>
        </InfoWrapper>
    )
}

