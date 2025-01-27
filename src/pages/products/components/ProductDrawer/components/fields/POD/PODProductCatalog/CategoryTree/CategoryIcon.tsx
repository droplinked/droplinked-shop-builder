import { Center } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'

interface Props {
    category: string
}

const iconMap: Record<string, JSX.Element> = {
    "Men's clothing": <AppIcons.MenClothing />,
    "Women's clothing": <AppIcons.WomenClothing />,
    "Kids' & youth clothing": <AppIcons.KidClothing />,
    "Hats": <AppIcons.Hat />,
    "Accessories": <AppIcons.Watch />,
    "Home & living": <AppIcons.Furniture />,
}

function CategoryIcon({ category }: Props) {
    return (
        <Center w={12} h={12} borderRadius={4} bgColor="#1C1C1C">
            {iconMap[category] || null}
        </Center>
    )
}

export default CategoryIcon