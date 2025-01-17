import { Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { PODCategory } from 'lib/apis/pod/interfaces'
import React from 'react'
import CategoryIcon from './CategoryIcon'

interface Props {
    categories: PODCategory[]
    onSelect: (category: PODCategory) => void
    isFirstLevel: boolean
}

function CategoryList({ categories, onSelect, isFirstLevel }: Props) {
    return (
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
            {categories.map((category) => (
                <Flex
                    key={category.id}
                    as="button"
                    type="button"
                    w="full"
                    alignItems="center"
                    gap={3}
                    border="1px solid #292929"
                    borderRadius={8}
                    padding={isFirstLevel ? 3 : '12px 16px'}
                    onClick={() => onSelect(category)}
                >
                    {isFirstLevel && <CategoryIcon category={category.title} />}
                    <Text fontSize={14} color="#FFF">{category.title}</Text>
                </Flex>
            ))}
        </SimpleGrid>
    )
}

export default CategoryList