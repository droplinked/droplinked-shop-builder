import { Box, Center, Flex, Text } from '@chakra-ui/react'
import { PlusLg } from 'assets/icons/Sign/Plus/PlusLg'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import TemplateCardLayout from './TemplateCardLayout'

function CreateNewTemplateCard() {
    const navigate = useNavigate()

    const handleCreate = () => navigate('create')

    return (
        <TemplateCardLayout>
            <Center
                as="button"
                className="template-image"
                position="relative"
                overflow="hidden"
                border="none"
                backgroundColor="neutral.gray.1000"
                color="neutral.gray.600"
                transition="all 0.25s ease-in-out"
                role="group"
                onClick={handleCreate}
                _hover={{
                    backgroundColor: 'label.primary',
                    color: 'text.primary'
                }}
            >
                {/* Concentric circles */}
                {[48, 88, 136, 200, 280, 376].map((diameter) => (
                    <Box
                        key={diameter}
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%,-50%)"
                        width={`${diameter}px`}
                        height={`${diameter}px`}
                        border="1px solid"
                        borderColor="neutral.gray.900"
                        borderRadius="full"
                        transition="inherit"
                        _groupHover={{ borderColor: 'label.primary' }}
                    />
                ))}
                <PlusLg color="currentColor" />
            </Center>

            <Flex className="content" padding={3}>
                <Text className="title">Create New Template</Text>
                <Text className="subtitle">Templates</Text>
            </Flex>
        </TemplateCardLayout>
    )
}

export default CreateNewTemplateCard 