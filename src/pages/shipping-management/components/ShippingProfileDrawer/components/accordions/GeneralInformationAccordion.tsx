import useShopAddress from 'hooks/useShopAddress/useShopAddress'
import ProductFormAccordion from 'pages/products/components/ProductDrawer/components/common/ProductFormAccordion'
import React from 'react'
import ShippingProfileName from '../fields/ShippingProfileName'
import ShopAddress from '../fields/ShopAddressManager/ShopAddress'
import ShopAddressForm from '../fields/ShopAddressManager/ShopAddressForm'

function GeneralInformationAccordion() {
    const { addressBookID, data } = useShopAddress()

    return (
        <ProductFormAccordion
            label="General Information"
            defaultOpen={true}
        >
            <ShippingProfileName />
            {addressBookID ? <ShopAddress address={data} /> : <ShopAddressForm />}
        </ProductFormAccordion>
    )
}

export default GeneralInformationAccordion