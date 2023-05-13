import { Box, HStack, Text, VStack, useDisclosure, Skeleton } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import FieldLabel from 'components/shared/form/fieldLabel/FieldLabel'
import AppTypography from 'components/shared/typography/AppTypography'

import React from 'react'
import SkeletonProduct from '../skeleton/SkeletonProduct'
import ListCollection from './parts/list'
import ModalCollection from './parts/modal'

function Collection() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <VStack width={"100%"} spacing={4} align={"stretch"}>
            <Box>
                <HStack justifyContent={"space-between"}>
                    <VStack align={"stretch"}>
                        <FieldLabel isRequired label='Collections' />
                        <AppTypography size='14px'>
                            Organize your products into collections to offer discounts or gated access. Learn more
                        </AppTypography>
                    </VStack>
                    <Box>
                        <SkeletonProduct>
                            <BasicButton onClick={onOpen} variant="outline">New Collection</BasicButton>
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