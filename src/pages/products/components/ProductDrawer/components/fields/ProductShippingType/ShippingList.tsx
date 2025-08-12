import { Flex } from '@chakra-ui/react'
import { EditLg } from 'assets/icons/Action/Edit/EditLg'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import AppSelect from 'components/redesign/select/AppSelect'
import useProductForm from 'pages/products/hooks/useProductForm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { ShippingProfile } from 'pages/shipping-management/types/shipping'
import React, { useEffect } from 'react'

interface ShippingListProps {
    shippingProfiles: ShippingProfile[]
}

function ShippingList({ shippingProfiles }: ShippingListProps) {
    const { t } = useLocaleResources('products')
    const { values, setFieldValue, errors } = useProductForm()

    const shippingProfileOptions = shippingProfiles.map((profile) => {
        const zonesCount = profile.zones?.length
        const countriesCount = profile.zones?.reduce((acc, zone) => acc + zone.countries.length, 0)

        return {
            name: `${profile.name} (${countriesCount} ${countriesCount === 1 ? t('ShippingList.countrySingular') : t('ShippingList.countryPlural')} - ${zonesCount} ${zonesCount === 1 ? t('ShippingList.zoneSingular') : t('ShippingList.zonePlural')})`,
            value: profile._id
        }
    })

    useEffect(() => {
        if (shippingProfiles.length > 0) {
            setFieldValue('shippingType', shippingProfiles[0]._id)
        }
    }, [shippingProfiles])

    return (
        <Flex direction='column' gap={4}>

            <AppSelect
                items={shippingProfileOptions}
                selectProps={{
                    value: values.shippingType,
                    onChange: (value) => setFieldValue('shippingType', value)
                }}
                error={errors.shippingType}
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
                {t('ShippingList.action.newShippingProfile')}
            </InteractiveText>
        </Flex>
    )
}

export default ShippingList
