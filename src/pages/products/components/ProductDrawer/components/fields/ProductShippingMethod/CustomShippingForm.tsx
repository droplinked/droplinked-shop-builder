import { Flex, Text } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import Input from 'components/redesign/input/Input'
import React, { useState } from 'react'
import CustomShippingFileUpload from './CustomShippingFileUpload'

interface Props {
    handleDiscard: () => void
}

function CustomShippingForm({ handleDiscard }: Props) {
    const [title, setTitle] = useState('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const isCreateDisabled = !title || !selectedFile

    return (
        <Flex
            flexDirection="column"
            gap={6}
            mt={4}
            border="1px solid #292929"
            borderRadius={8}
            padding={4}
        >
            <Flex flexDirection="column" gap={2}>
                <Text fontSize={14} fontWeight={500} color="#FFF">Create New Custom Shipping</Text>
                <Text fontSize={14} color="#BCBCBC">Add an option to provide custom shipping details.</Text>
            </Flex>

            <Input
                label="Title"
                inputProps={{
                    isRequired: true,
                    placeholder: 'e.g., Express Delivery, Standard Shipping',
                    fontSize: 16,
                    value: title,
                    onChange: e => setTitle(e.target.value)
                }}
            />

            <CustomShippingFileUpload selectedFile={selectedFile} onFileChange={setSelectedFile} />

            <Flex
                justifyContent="flex-end"
                gap={4}
                sx={{ button: { padding: '8px 12px', fontSize: 12, fontWeight: 500 } }}
            >
                <Button variant="secondary" onClick={handleDiscard}>Discard</Button>
                <Button isDisabled={isCreateDisabled}>Create</Button>
            </Flex>
        </Flex>
    )
}

export default CustomShippingForm