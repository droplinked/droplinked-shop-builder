import { Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
    onClick: () => void
    backgroundColor?: string;
    children: React.ReactNode | React.ReactNode[]
}

function ProductTileTableButton({ onClick, backgroundColor = "#292929", children }: Props) {
    return (
        <Flex
            as="button"
            align={"center"}
            gap={2}
            backgroundColor={backgroundColor}
            color="#C2C2C2"
            borderRadius={"6px"}
            p={"8px 12px"}
            fontSize={12}
            fontWeight={600}
            cursor="pointer"
            onClick={onClick}
        >
            {children}
        </Flex>
    )
}

export default ProductTileTableButton