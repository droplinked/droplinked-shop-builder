import { Flex, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppButton from 'components/redesign/button/AppButton'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import SectionContainer from 'pages/settings/components/common/SectionContainer'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'

function InventorySection() {
    const products = [
        "Music To Be Murdered By Side B Album",
        "Honeymoon Album",
        "New Person, Same Old Mistakes CD",
        "New Person, Same Old Mistakes CD"
    ]

    return (
        <SectionContainer title="Inventory">
            <SectionContent
                title="Recorded Products"
                description="Discover and organize recorded products and import them seamlessly."
                rightContent={
                    <AppButton variant='normal' marginLeft="auto" padding="10px 14px">Import All Products</AppButton>
                }
            />
            <RuledGrid columns={1} borderRadius={8}>
                {products.map((product, index) => (
                    <Flex key={index} alignItems="center" gap={4} padding={4}>
                        <AppImage width={10} aspectRatio={1} borderRadius={8} src={`https://picsum.photos/200/300?random=${index}`} />
                        <Text color='text.white'>{product}</Text>
                    </Flex>
                ))}
            </RuledGrid>
        </SectionContainer>
    )
}

export default InventorySection 