import React, { PropsWithChildren } from 'react'
import RightSectionWrapper from '../common/RightSectionWrapper'

interface Props extends PropsWithChildren { }

function ProductCardsContainer({ children }: Props) {
    return (
        <RightSectionWrapper>
            {children}
        </RightSectionWrapper>
    )
}

export default ProductCardsContainer