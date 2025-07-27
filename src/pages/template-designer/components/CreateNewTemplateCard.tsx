import { Center, Flex, Text } from '@chakra-ui/react'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import TemplateCardLayout from './TemplateCardLayout'

function CreateNewTemplateCard() {
    const navigate = useNavigate()

    const handleCreate = () => {
        navigate('/template-designer/create')
    }

    return (
        <TemplateCardLayout>
            <Center as="button" width="100%" height="100%" onClick={handleCreate}>
                <PlusMd />
            </Center>
            <Flex className="content" padding={3}>
                <Text className="title">Create New Template</Text>
                <Text className="subtitle">Templates</Text>
            </Flex>
        </TemplateCardLayout>
    )
}

export default CreateNewTemplateCard 