import { Flex, FlexProps } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import DroplinkedTypography from 'assets/brand-identity/DroplinkedTypography'
import React, { SVGProps } from 'react'

interface Props extends FlexProps {
    dropProps?: SVGProps<SVGSVGElement>
    typographyProps?: SVGProps<SVGSVGElement>
}

function DroplinkedBrand({ dropProps, typographyProps, ...rest }: Props) {
    return (
        <Flex alignItems="center" gap={3} {...rest}>
            <Drop3 color='#2BCFA1' width='36px' height='36px' {...dropProps} />
            <DroplinkedTypography color='#2BCFA1' width='143px' height='27px' {...typographyProps} />
        </Flex>
    )
}

export default DroplinkedBrand