import { Flex, Image, Text } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import { UserTemplateCardProps } from 'pages/template-designer/types/types'
import React from 'react'
import TemplateCardLayout from './TemplateCardLayout'
import UserTemplateCardMenu from './UserTemplateCardMenu'

function UserTemplateCard(props: UserTemplateCardProps) {
    const { name, imageUrl, status, lastEdited } = props

    return (
        <TemplateCardLayout>
            <Image src={imageUrl} alt={name} />

            <Flex justifyContent="space-between" gap={2} padding={3}>
                <Flex className="content">
                    <Text className="title" isTruncated>
                        {name}
                    </Text>
                    <DotSeparatedList className="subtitle">
                        <Text {...(status === 'live' && { color: 'text.primary' })}>
                            {status}
                        </Text>
                        <Text>{lastEdited}</Text>
                    </DotSeparatedList>
                </Flex>

                <UserTemplateCardMenu template={props} />
            </Flex>
        </TemplateCardLayout>
    )
}

export default UserTemplateCard 