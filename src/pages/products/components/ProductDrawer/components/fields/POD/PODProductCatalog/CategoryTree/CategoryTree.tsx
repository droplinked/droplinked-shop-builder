import { Flex } from '@chakra-ui/react'
import { PODCategory } from 'lib/apis/pod/interfaces'
import { podCategoryService } from 'lib/apis/pod/services'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import BackButton from '../BackButton'
import CategoryList from './CategoryList'

const CategoryTree = ({ onCategorySelect }) => {
    const { data, isFetching } = useQuery({
        queryKey: ['POD_CATEGORIES'],
        queryFn: () => podCategoryService({})
    })

    const categories = data?.data?.data?.data || []
    const [currentCategories, setCurrentCategories] = useState<PODCategory[]>([])
    const [history, setHistory] = useState<PODCategory[][]>([])

    const handleSelect = (category: PODCategory) => {
        if (category.sub_categories && category.sub_categories.length > 0) {
            setHistory(prev => [...prev, currentCategories.length ? currentCategories : categories])
            setCurrentCategories(category.sub_categories)
        }
        else onCategorySelect(category.id)
    }

    const handleBack = () => {
        const newHistory = [...history]
        const previousCategories = newHistory.pop()
        if (previousCategories) {
            setCurrentCategories(previousCategories)
            setHistory(newHistory)
        }
    }

    const displayedCategories = currentCategories.length ? currentCategories : categories

    return (
        <Flex direction="column" gap={4}>
            {history.length > 0 && <BackButton onBackClick={handleBack} />}

            <CategoryList
                isLoading={isFetching}
                categories={displayedCategories}
                onSelect={handleSelect}
            />
        </Flex>
    )
}

export default CategoryTree