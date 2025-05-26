import { Flex } from '@chakra-ui/react';
import React from 'react';
import InfoWrapper from '../drawer-components/InfoWrapper';
import TitledText from '../drawer-components/TitledText';
import { IOrderDetails } from 'services/order/interfaces';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface CustomerInfoProps {
    customer: IOrderDetails["customer"];
    details: IOrderDetails["details"];
    isPhysical: boolean;
}

export default function CustomerInfoSection({ customer, details, isPhysical }: CustomerInfoProps) {
    const { t } = useLocaleResources("purchaseHistory");

    return (
        <InfoWrapper title={t("customer_information")}>
            <Flex direction="column" gap={6}>
                <Flex
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    flexDirection={{ base: "column", md: "row" }}
                    gap={{ base: 6, md: 0 }}
                >
                    {isPhysical && <TitledText text={customer?.name} title={t("full_name")} />}
                    <TitledText text={customer?.email} title={t("email_address")} />
                </Flex>
                {isPhysical && <TitledText text={customer?.phone} title={t("mobile_number")} />}
                {isPhysical && <TitledText text={customer.address} title={t("shipping_address")} />}
                {!!details.note && <TitledText text={details.note} title={t("additional_details")} />}
            </Flex>
        </InfoWrapper>
    );
}
