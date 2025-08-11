import useShopAddress from 'hooks/useShopAddress/useShopAddress'
import ProductFormAccordion from 'pages/products/components/ProductDrawer/components/common/ProductFormAccordion'
import React from 'react'
import ShippingProfileName from '../ShippingProfileName'
import ShopAddress from '../ShopAddress'
import ShopAddressForm from '../ShopAddressForm'

function GeneralInformationAccordion() {
    const { addressBookID, isLoading, data } = useShopAddress()

    return (
        <ProductFormAccordion
            label="General Information"
            defaultOpen={true}
        >
            <ShippingProfileName />
            {addressBookID
                ? <ShopAddress address={data} isLoading={isLoading} />
                : <ShopAddressForm />
            }
        </ProductFormAccordion>
    )
}

export default GeneralInformationAccordion