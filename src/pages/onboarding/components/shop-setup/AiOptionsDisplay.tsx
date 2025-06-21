import { Box, Button, Flex, Grid, Image, Spinner, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useAiGeneratedContent } from '../../hooks/useAiGeneratedContent'
import useOnboardingStore from '../../stores/useOnboardingStore'

interface AiOptionsDisplayProps {
    type: 'logos' | 'covers' | 'urls' | 'names'
    title: string
    onSelect: (value: string) => void
    selectedValue?: string
}

const AiOptionsDisplay: React.FC<AiOptionsDisplayProps> = ({
    type,
    title,
    onSelect,
    selectedValue
}) => {
    const { isLoading, generateContent } = useAiGeneratedContent()
    const { aiGeneratedContent } = useOnboardingStore()

    const options = aiGeneratedContent[type]
    const isContentLoading = isLoading[type]

    const handleRegenerate = () => {
        generateContent(type)
    }

    if (options.length === 0 && !isContentLoading) {
        return (
            <Box p={4} borderWidth="1px" borderRadius="lg" bg="gray.50">
                <VStack spacing={3}>
                    <Text fontSize="sm" color="gray.600">
                        No {title.toLowerCase()} generated yet
                    </Text>
                    <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={handleRegenerate}
                        isLoading={isContentLoading}
                    >
                        Generate {title}
                    </Button>
                </VStack>
            </Box>
        )
    }

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" bg="white">
            <Flex justify="space-between" align="center" mb={4}>
                <Text fontWeight="semibold">{title}</Text>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRegenerate}
                    isLoading={isContentLoading}
                >
                    Regenerate
                </Button>
            </Flex>

            {isContentLoading ? (
                <Flex justify="center" py={8}>
                    <Spinner />
                </Flex>
            ) : (
                <Grid
                    templateColumns={type === 'logos' || type === 'covers' ? 'repeat(auto-fit, minmax(120px, 1fr))' : '1fr'}
                    gap={3}
                >
                    {options.map((option, index) => (
                        <Box
                            key={index}
                            p={3}
                            borderWidth="1px"
                            borderRadius="md"
                            cursor="pointer"
                            bg={selectedValue === option ? 'blue.50' : 'transparent'}
                            borderColor={selectedValue === option ? 'blue.200' : 'gray.200'}
                            _hover={{ borderColor: 'blue.300' }}
                            onClick={() => onSelect(option)}
                        >
                            {type === 'logos' || type === 'covers' ? (
                                <Image
                                    src={option}
                                    alt={`${title} option ${index + 1}`}
                                    borderRadius="md"
                                    objectFit="cover"
                                    height="80px"
                                    width="100%"
                                />
                            ) : (
                                <Text fontSize="sm" textAlign="center">
                                    {option}
                                </Text>
                            )}
                        </Box>
                    ))}
                </Grid>
            )}
        </Box>
    )
}

export default AiOptionsDisplay 