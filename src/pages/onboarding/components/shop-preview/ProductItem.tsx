import { Box, Flex, GridItem } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import React from 'react'

export default function ProductItem() {
    return (
        <GridItem>
            <Flex
                flexDirection="column"
                borderRadius="8px"
                gap={2}
            >
                <Flex
                    width="100%"
                    height="120px"
                    bg="#1C1C1C"
                    borderRadius="4px"
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Drop3 color='#292929' width={"48px"} height={"48px"} />
                </Flex>
                <Box
                    width="80%"
                    height="16px"
                    bg="#1C1C1C"
                    borderRadius="2px"
                />
            </Flex>
        </GridItem>
    )
}
