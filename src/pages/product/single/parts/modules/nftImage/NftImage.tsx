import { VStack } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import NftImageDefault from './parts/default/NftImageDefault'
import NftImageUploaded from './parts/uploaded/NFTUploaded'

function NftImage() {
    const { state: { media } } = useContext(productContext)

    return media.length ? <NftImageUploaded /> : <NftImageDefault />
}

export default NftImage