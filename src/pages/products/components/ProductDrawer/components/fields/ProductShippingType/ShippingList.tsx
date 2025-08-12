import { Flex } from '@chakra-ui/react'
import { EditLg } from 'assets/icons/Action/Edit/EditLg'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import AppSelect from 'components/redesign/select/AppSelect'
import useProductForm from 'pages/products/hooks/useProductForm'
import { ShippingProfile } from 'pages/shipping-management/types/shipping'
import React from 'react'

interface ShippingListProps {
    shippingProfiles: ShippingProfile[]
}

function ShippingList({ shippingProfiles }: ShippingListProps) {
    const { values, setFieldValue } = useProductForm()

    console.log({ shippingProfiles })

    const shippingProfileOptions = shippingProfiles.map((profile) => ({
        name: `${profile.name} (${profile.zones.length} zones)`,
        value: profile._id
    }))

    return (
        <Flex direction='column' gap={4}>

            <AppSelect
                items={shippingProfileOptions}
                selectProps={{
                    placeholder: 'Shipping Profile',
                    value: values.shippingType,
                    onChange: (value) => setFieldValue('shippingType', value)
                }}
            />
            <InteractiveText
                to='/analytics/shipping-management'
                justifyContent="center"
                gap={2}
                border="1px solid"
                borderColor="neutral.gray.800"
                borderRadius={8}
                padding="12px 16px"
                fontSize={16}
            >
                <EditLg color='currentColor' />
                New Shipping Profile
            </InteractiveText>
        </Flex>
    )
}

export default ShippingList
