import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import { useFormikContext } from 'formik'
import { ProductFormValues } from 'pages/products/utils/formSchema'
import React, { useState } from 'react'

function ProductKeywords() {
    const { values: { keywords }, setFieldValue } = useFormikContext<ProductFormValues>()
    const [newKeyword, setNewKeyword] = useState("")

    const handleAddKeyword = () => {
        if (!newKeyword) return
        setFieldValue("keywords", [...keywords, newKeyword.trim()])
        setNewKeyword("")
    }

    const handleRemoveKeyword = (index: number) => {
        const copiedKeywords = [...keywords]
        copiedKeywords.splice(index, 1)
        setFieldValue("keywords", copiedKeywords)
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

            {keywords.length > 0 && (
                <Flex flexWrap="wrap" gap={3}>
                    {keywords.map((keyword, index) =>
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