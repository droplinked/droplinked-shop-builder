import { Flex, Image, Text } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import React from 'react'
import { PublicTemplateCardProps } from '../types/types'
import TemplateCardLayout from './TemplateCardLayout'

function PublicTemplateCard(props: PublicTemplateCardProps) {
    const { name, imageUrl, creator, category } = props

    return (
        <TemplateCardLayout>
            <Image src={imageUrl} alt={name} />
            <Flex className="content" padding={3}>
                <Text className="title" isTruncated>
                    {name}
                </Text>
                <DotSeparatedList className="subtitle">
                    <Text>By {creator}</Text>
                    <Text>{category}</Text>
                </DotSeparatedList>
            </Flex>
        </TemplateCardLayout>
    )
}

export default PublicTemplateCard 