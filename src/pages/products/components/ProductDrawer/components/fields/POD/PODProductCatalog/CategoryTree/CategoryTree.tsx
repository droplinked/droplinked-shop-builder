import { Flex } from '@chakra-ui/react'
import { PODCategory } from 'lib/apis/pod/interfaces'
import { podCategoryService } from 'lib/apis/pod/services'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import LoadingPlaceholder from '../../../../common/LoadingPlaceholder'
import BackButton from '../BackButton'
import CategoryList from './CategoryList'

interface CategoryTreeProps {
    onCategorySelect: (categoryId: number) => void
}

function CategoryTree({ onCategorySelect }: CategoryTreeProps) {
    const { data, isFetching } = useQuery({
        queryKey: ['POD_CATEGORIES'],
        queryFn: () => podCategoryService({}),
        staleTime: 1000 * 60 * 60 * 24, // Data is fresh for 24 hours
        cacheTime: 1000 * 60 * 60 * 24 * 7, // Cache persists for 7 days
    })

    const [currentCategories, setCurrentCategories] = useState<PODCategory[]>([])
    const [history, setHistory] = useState<PODCategory[][]>([])
    const categories: PODCategory[] = data?.data?.data?.data || []
    const displayedCategories = currentCategories.length ? currentCategories : categories

    const handleSelect = (category: PODCategory) => {
        if (category.sub_categories?.length > 0) {
            setHistory(prev => [...prev, currentCategories.length ? currentCategories : categories])
            setCurrentCategories(category.sub_categories)
        }
        else onCategorySelect(category.id)
    }

    const handleBack = () => {
        if (history.length === 0) return
        const newHistory = [...history]
        const previousCategories = newHistory.pop()
        setCurrentCategories(previousCategories || [])
        setHistory(newHistory)
    }

    if (isFetching) {
        return (
            <LoadingPlaceholder
                numberOfSkeletons={4}
                containerProps={{ columns: 2 }}
                skeletonProps={{ h: '74px' }}
            />
        )
    }

    return (
        <Flex direction="column" gap={4}>
            {history.length > 0 && <BackButton onBackClick={handleBack} />}
            <CategoryList
                categories={displayedCategories}
                onSelect={handleSelect}
                isFirstLevel={history.length === 0}
            />
        </Flex>
    )
}

export default CategoryTree