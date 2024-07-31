import { HStack, VStack, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import CollectionCreate from 'pages/collections/parts/create/CollectionCreate'
import React from 'react'
import SkeletonProduct from '../skeleton/SkeletonProduct'
import CollectionList from './parts/list'

function Collection() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <VStack spacing={4} align={"stretch"}>
            <HStack justifyContent={"space-between"}>
                <VStack align={"stretch"}>
                    <FieldLabel label='Collections' isRequired />
                    <AppTypography color="#C2C2C2" fontSize='14px'>
                        Select a collection or create a new one to publish the product.
                    </AppTypography>
                </VStack>
                <SkeletonProduct>
                    <BasicButton onClick={onOpen} sizes="medium" variant="outline">New Collection</BasicButton>
                </SkeletonProduct>
                <CollectionCreate close={onClose} open={isOpen} refetch={fetch} />
            </HStack>
            <CollectionList />
            <HStack alignItems="center">
                <AppIcons.Info />
                <AppTypography color="#757575" fontSize='14px'>NFT gating features and ruleset management are in the Collections page. <a style={{ color: "#25BB92" }} target={"_blank"}>Learn more</a></AppTypography>
            </HStack>
        </VStack>
    )
}

export default Collection