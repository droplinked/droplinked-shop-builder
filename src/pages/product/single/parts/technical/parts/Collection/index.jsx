import { Box, HStack, Text, VStack, useDisclosure, Skeleton } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React from 'react'
import SkeletonProduct from '../../../skeleton/SkeletonProduct'

import ListCollection from './parts/list'
import ModalCollection from './parts/modal'

function Collection() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <VStack width={"100%"} align={"stretch"}>
            <Box>
                <HStack justifyContent={"space-between"}>
                    <Box>
                        <Text fontSize={"16px"} color="#FFF">Collection</Text>
                    </Box>
                    <Box>
                        <SkeletonProduct>
                            <BasicButton onClick={onOpen} cancelType color="#777">New Collection</BasicButton>
                        </SkeletonProduct>
                        <ModalCollection open={isOpen} close={onClose} />
                    </Box>
                </HStack>
            </Box>
            <Box>
                <SkeletonProduct>
                    <ListCollection />
                </SkeletonProduct>
            </Box>
        </VStack>
    )
}

export default Collection