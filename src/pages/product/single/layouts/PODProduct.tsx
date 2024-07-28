import React from 'react'
import ButtonsProduct from '../parts/buttons/ButtonsProduct'
import CollectionProduct from '../parts/collection/CollectionProduct'
import General from '../parts/general/General'
import LaunchDate from '../parts/launch-date/LaunchDate'
import ProductPodDesign from '../parts/podDesign/ProductPodDesign'
import ProductTile from '../parts/product-tile/ProductTile'
import Variant from '../parts/variant/Variant'

function PODProduct() {

    return (
        <>
            <ProductPodDesign open={true} />
            <Variant />
            <General open={false} />
            {/* <CategoryProduct /> */}
            <CollectionProduct />
            <ProductTile />
            <LaunchDate />
            <ButtonsProduct />
        </>
    )
}

export default PODProduct