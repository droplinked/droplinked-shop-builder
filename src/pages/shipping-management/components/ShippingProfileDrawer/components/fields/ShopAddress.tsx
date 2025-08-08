import { Flex, SimpleGrid, Text } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from 'pages/shipping-management/components/common/SectionContainer'
import React from 'react'

interface Props {
    address: any
}

export default function ShopAddress({ address }: Props) {
    const { t } = useLocaleResources("common")

    const fullName = `${address?.firstName} ${address?.lastName}`

    return (
        <Flex direction="column" gap={4}>
            <Text fontWeight={500} color="text.white">Store Address</Text>

            <SectionContainer title={fullName}>
                <Flex
                    minHeight="100px"
                    direction="column"
                    gap={3}
                    padding={4}
                >
                    <AddressDetail label={t("common:address.fields.addressLine1")} value={address?.addressLine1} />
                    <AddressDetail label={t("common:address.fields.addressLine2")} value={address?.addressLine2} />
                    <SimpleGrid columns={2} gap={3}>
                        <AddressDetail label={t("common:address.fields.country")} value={address?.country} />
                        <AddressDetail label={t("common:address.fields.state")} value={address?.state} />
                        <AddressDetail label={t("common:address.fields.city")} value={address?.city} />
                        <AddressDetail label={t("common:address.fields.zip")} value={address?.zip} />
                    </SimpleGrid>
                </Flex>
            </SectionContainer>
        </Flex>
    )
}

function AddressDetail({ label, value }: { label: string, value?: string }) {
    if (!value) return null

    return (
        <Flex direction="column" gap={1} fontSize={14}>
            <Text fontWeight={400} color="text.subtext.placeholder.dark">{label}</Text>
            <Text fontWeight={500} color="text.white">{value}</Text>
        </Flex>
    )
}