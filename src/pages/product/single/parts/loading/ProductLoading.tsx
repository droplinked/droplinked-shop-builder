import FullScreenLoading from 'components/redesign/fullscreen-loading/FullScreenLoading';
import React, { useContext } from 'react';
import { productContext } from '../../context';

function ProductLoading() {
    const { sync } = useContext(productContext)

    return (
        <>
            {!sync ? <FullScreenLoading /> : null}
        </>
    )
}

export default ProductLoading