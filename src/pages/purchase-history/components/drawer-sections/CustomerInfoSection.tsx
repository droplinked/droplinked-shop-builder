import { Flex } from '@chakra-ui/react'
import React from 'react'
import InfoWrapper from '../drawer-components/InfoWrapper'
import TitledText from '../drawer-components/TitledText'
import { IOrderDetails } from 'services/order/interfaces'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface CustomerInfoProps {
    customer: IOrderDetails["customer"]
    details: IOrderDetails["details"]
    isPhysical: boolean
}

export default function CustomerInfoSection({ customer, details, isPhysical }: CustomerInfoProps) {
    const { t } = useLocaleResources("purchaseHistory")

    return (
        <InfoWrapper title={t("CustomerInfoSection.customerInformation")}>
            <Flex direction="column" gap={6}>
                <Flex
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    flexDirection={{ base: "column", md: "row" }}
                    gap={{ base: 6, md: 0 }}
                >
                    {isPhysical && <TitledText text={customer?.name} title={t("CustomerInfoSection.fullName")} />}
                    <TitledText text={customer?.email} title={t("CustomerInfoSection.emailAddress")} />
                </Flex>
                {isPhysical && <TitledText text={customer?.phone} title={t("CustomerInfoSection.mobileNumber")} />}
                {isPhysical && <TitledText text={customer.address} title={t("CustomerInfoSection.shippingAddress")} />}
                {!!details.note && <TitledText text={details.note} title={t("CustomerInfoSection.additionalDetails")} />}
            </Flex>
        </InfoWrapper>
    )
}
