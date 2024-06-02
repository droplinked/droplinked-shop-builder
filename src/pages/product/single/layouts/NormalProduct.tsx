import React, { useContext } from 'react'
import { productContext } from '../context'
import ProductModel from '../model'
import ButtonsProduct from '../parts/buttons/ButtonsProduct'
import CollectionProduct from '../parts/collection/CollectionProduct'
import DigitalLinks from '../parts/digital/DigitalLinks'
import General from '../parts/general/General'
import DigitalInformation from '../parts/infromation/DigitalInformation'
import ShippingProduct from '../parts/modules/shipping/ShippingProduct'
import ProductPodDesign from '../parts/podDesign/ProductPodDesign'
import ProductTile from '../parts/product-tile/ProductTile'
import Variant from '../parts/variant/Variant'
import Properties from '../parts/properties/properties'
import {App} from '../parts/properties/newFormik/NewFormikOp'

function NormalProduct() {
    const { state: { prodviderID } } = useContext(productContext)

    return (
        <>
            <General open={true} />
            <DigitalInformation />
            <DigitalLinks />
            <ShippingProduct />
            {!ProductModel.isPrintful(prodviderID) && <Variant />}
            <Properties/>
            <App/>
            <ProductPodDesign />
            {ProductModel.isPrintful(prodviderID) && <Variant />}
            {/* <CategoryProduct /> */}
            <CollectionProduct />
            <ProductTile />
            <ButtonsProduct />
        </>
    )
}

export default NormalProduct