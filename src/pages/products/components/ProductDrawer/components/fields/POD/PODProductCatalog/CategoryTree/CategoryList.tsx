import { Flex, SimpleGrid, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import { PODCategory } from 'lib/apis/pod/interfaces'
import React from 'react'
import CategoryLoading from './CategoryLoading'

interface Props {
    isLoading: boolean
    categories: PODCategory[]
    onSelect: (category: PODCategory) => void
}

const CategoryList = ({ isLoading, categories, onSelect }: Props) => {
    return (
        <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} gap={4}>
            {isLoading ?
                <CategoryLoading />
                :
                categories.map((category, index) => (
                    <Flex
                        key={index}
                        as="button"
                        type='button'
                        w="full"
                        alignItems="center"
                        gap={3}
                        border="1px solid #292929"
                        borderRadius={8}
                        padding={3}
                        onClick={() => onSelect(category)}
                    >
                        <AppImage w={12} h={12} borderRadius={4} bg="#1C1C1C" src={category.image_url} objectFit="cover" />
                        <Text fontSize={14} color="#FFF">{category.title}</Text>
                    </Flex>
                ))}
        </SimpleGrid>
    )
}

export default CategoryList