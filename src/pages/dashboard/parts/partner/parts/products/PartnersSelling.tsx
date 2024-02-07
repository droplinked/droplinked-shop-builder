import { Flex } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppImage from 'components/common/image/AppImage'
import React from 'react'

interface IProps {
    product: any
}
function PartnersSelling({ product }: IProps) {

    return (
        <Flex>
            {product.map((el, key) => (
                <AppImage key={key} src={el.media.find(img => img?.isMain === "true")?.url} width="48px" height="48px" borderRadius="100%" boxShadow="-3px 0px 10px 0px rgba(0, 0, 0, 0.25)" marginLeft={key > 0 ? "-15px" : ''} />
            ))}
        </Flex>
    )
}

export default PartnersSelling