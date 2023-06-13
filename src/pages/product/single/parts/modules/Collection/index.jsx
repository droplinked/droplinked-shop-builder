import { Box, HStack, VStack, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import { collectionService } from 'lib/apis/collection/services'
import CollectionCreate from 'pages/collections/parts/create/CollectionCreate'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import SkeletonProduct from '../skeleton/SkeletonProduct'
import ListCollection from './parts/list'

function Collection() {
    const { mutate, data, isLoading } = useMutation(() => collectionService())
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => mutate(), []) // get collection from service

    return (
        <VStack width={"100%"} spacing={4} align={"stretch"}>
            <Box>
                <HStack justifyContent={"space-between"}>
                    <VStack align={"stretch"}>
                        <FieldLabel isRequired label='Collections' />
                        <AppTypography color="#C2C2C2" size='14px'>
                            Select a collection or create a new one to publish the product.
                        </AppTypography>
                    </VStack>
                    <Box>
                        <SkeletonProduct>
                            <BasicButton onClick={onOpen} sizes="medium" variant="outline">New Collection</BasicButton>
                        </SkeletonProduct>
                        <CollectionCreate close={onClose} refetch={mutate} open={isOpen} />
                    </Box>
                </HStack>
            </Box>
            <Box>
                <SkeletonProduct>
                    <ListCollection isLoading={isLoading} collections={data?.data?.data} />
                </SkeletonProduct>
            </Box>
            <HStack alignItems="center">
                <AppIcons.info />
                <AppTypography color="#757575" size='14px'>NFT gating features and ruleset management are in the Collections page. <a style={{ color: "#25BB92"}} target={"_blank"}>Learn more</a></AppTypography>
            </HStack>
        </VStack>
    )
}

export default Collection