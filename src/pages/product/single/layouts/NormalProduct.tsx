import React, { useContext } from 'react'
import { productContext } from '../context'
import ProductModel from '../model'
import ButtonsProduct from '../parts/buttons/ButtonsProduct'
import CollectionProduct from '../parts/collection/CollectionProduct'
import DigitalLinks from '../parts/digital/DigitalLinks'
import General from '../parts/general/General'
import DigitalInformation from '../parts/infromation/DigitalInformation'
import LaunchDate from '../parts/launch-date/LaunchDate'
import ShippingProduct from '../parts/modules/shipping/ShippingProduct'
import ProductPodDesign from '../parts/podDesign/ProductPodDesign'
import ProductTile from '../parts/product-tile/ProductTile'
import Variant from '../parts/variant/Variant'

function NormalProduct() {
    const { state: { prodviderID } } = useContext(productContext)

    return (
        <>
            <General open={true} />
            <DigitalInformation />
            <DigitalLinks />
            <ShippingProduct />
            {!ProductModel.isPrintful(prodviderID) && <Variant />}
            <ProductPodDesign />
            {ProductModel.isPrintful(prodviderID) && <Variant />}
            <CollectionProduct />
            <ProductTile />
            <LaunchDate />
            <ButtonsProduct />
        </>
    )
}

export default NormalProduct