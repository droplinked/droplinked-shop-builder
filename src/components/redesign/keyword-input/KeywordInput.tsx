import { Flex } from '@chakra-ui/react'
import { CloseMd } from 'assets/icons/Sign/Close/CloseMd'
import AppInput from 'components/redesign/input/AppInput'
import React, { useState } from 'react'

interface KeywordInputProps {
    keywords: string[]
    onKeywordsChange: (keywords: string[]) => void
    label?: string
    description?: string
    placeholder?: string
}

function KeywordInput({ keywords, onKeywordsChange, label = 'Keywords', description, placeholder }: KeywordInputProps) {
    const [newKeyword, setNewKeyword] = useState('')

    const handleAddKeyword = () => {
        if (!newKeyword.trim()) return
        onKeywordsChange([...keywords, newKeyword.trim()])
        setNewKeyword('')
    }

    const handleRemoveKeyword = (index: number) => {
        const updatedKeywords = [...keywords]
        updatedKeywords.splice(index, 1)
        onKeywordsChange(updatedKeywords)
    }

    return (
        <Flex direction="column" gap={4}>
            <AppInput
                label={label}
                description={description}
                inputProps={{
                    fontSize: 16,
                    placeholder,
                    value: newKeyword,
                    onChange: (e) => setNewKeyword(e.target.value),
                    onKeyDown: (e) => e.key === 'Enter' && handleAddKeyword()
                }}
            />
            {keywords.length > 0 && (
                <Flex flexWrap="wrap" gap={3}>
                    {keywords.map((keyword, index) => (
                        <Flex
                            key={`${keyword}-${index}`}
                            alignItems="center"
                            gap="6px"
                            borderRadius={4}
                            padding="4px 8px"
                            backgroundColor="neutral.gray.900"
                            color="text.white"
                        >
                            {keyword}
                            <button
                                type='button'
                                onClick={() => handleRemoveKeyword(index)}
                            >
                                <CloseMd color='#7b7b7b' />
                            </button>
                        </Flex>
                    ))}
                </Flex>
            )}
        </Flex>
    )
}

export default KeywordInput