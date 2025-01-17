import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useState } from 'react'

function ProductKeywords() {
    const { values: { tags }, setFieldValue } = useProductForm()
    const [newKeyword, setNewKeyword] = useState("")

    const handleAddKeyword = () => {
        if (!newKeyword) return
        setFieldValue("tags", [...tags, newKeyword.trim()])
        setNewKeyword("")
    }

    const handleRemoveKeyword = (index: number) => {
        const copiedKeywords = [...tags]
        copiedKeywords.splice(index, 1)
        setFieldValue("tags", copiedKeywords)
    }

    return (
        <Flex direction="column" gap={4}>
            <Input
                label='Keywords'
                inputProps={{
                    fontSize: 16,
                    placeholder: "Type keywords to help customers find this product...",
                    value: newKeyword,
                    onChange: (e) => setNewKeyword(e.target.value),
                    onKeyDown: (e) => e.key === "Enter" && handleAddKeyword()
                }}
            />

            {tags.length > 0 && (
                <Flex flexWrap="wrap" gap={3}>
                    {tags.map((keyword, index) =>
                        <Flex
                            key={index}
                            alignItems="center"
                            gap={3}
                            borderRadius={4}
                            padding="4px 8px"
                            backgroundColor="#222"
                            color="#FFF"
                        >
                            {keyword}
                            <AppIcons.Close cursor="pointer" onClick={() => handleRemoveKeyword(index)} />
                        </Flex>
                    )}
                </Flex>
            )}
        </Flex>
    )
}

export default ProductKeywords