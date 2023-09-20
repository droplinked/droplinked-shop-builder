import React from 'react'
import ButtonsProduct from '../parts/buttons/ButtonsProduct'
import CollectionProduct from '../parts/collection/CollectionProduct'
import General from '../parts/general/General'
import ProductPodDesign from '../parts/podDesign/ProductPodDesign'
import Variant from '../parts/variant/Variant'

function PODProduct() {

    return (
        <>
            <ProductPodDesign open={true} />
            <Variant />
            <General open={false} />
            <CollectionProduct />
            <ButtonsProduct />
        </>
    )
}

export default PODProduct