import { Center } from '@chakra-ui/react'
import { DresswomanclothMd } from 'assets/icons/Items/DressWomanCloth/DresswomanclothMd'
import { HatcapMd } from 'assets/icons/Items/HatCap/HatcapMd'
import { KidclothMd } from 'assets/icons/Items/KidCloth/KidclothMd'
import { SofafurnitureMd } from 'assets/icons/Items/SofaFurniture/SofafurnitureMd'
import { WaistcoatmenclothMd } from 'assets/icons/Items/WaistcoatMenCloth/WaistcoatmenclothMd'
import { WatchMd } from 'assets/icons/Items/Watch/WatchMd'
import React from 'react'

interface Props {
    category: string
}

const iconMap: Record<string, React.ReactNode> = {
    "Men's clothing": <WaistcoatmenclothMd />,
    "Women's clothing": <DresswomanclothMd />,
    "Kids' & youth clothing": <KidclothMd />,
    "Hats": <HatcapMd />,
    "Accessories": <WatchMd />,
    "Home & living": <SofafurnitureMd />,
}

function CategoryIcon({ category }: Props) {
    return (
        <Center w={12} h={12} borderRadius={4} bgColor="neutral.gray.1000">
            {iconMap[category] || null}
        </Center>
    )
}

export default CategoryIcon