import { Flex } from "@chakra-ui/react"
import Button from "components/redesign/button/Button"
import Input from "components/redesign/input/Input"
import useAppToast from "hooks/toast/useToast"
import { useCreateCustomShipping } from "pages/products/hooks/useShippingTypes"
import React, { useState } from "react"
import CustomShippingFileUpload from "./CustomShippingFileUpload"
import SectionHeader from "./SectionHeader"

function CustomShippingForm({ onDiscard }: { onDiscard: () => void }) {
    const [shippingTitle, setShippingTitle] = useState("")
    const [uploadedFileData, setUploadedFileData] = useState(null)

    const { createCustomShipping, isLoading } = useCreateCustomShipping()
    const { showToast } = useAppToast()

    const handleCreate = async () => {
        try {
            const data = { title: shippingTitle, ...uploadedFileData }
            await createCustomShipping(data)
            showToast({ type: "success", message: "Your custom shipping option has been created successfully." })
            onDiscard()
        } catch (error) {
            showToast({ type: "error", message: "Failed to create the custom shipping option. Please try again." })
        }
    }

    return (
        <Flex
            flexDirection="column"
            gap={6}
            mt={4}
            border="1px solid #292929"
            borderRadius={8}
            padding={4}
        >
            <SectionHeader
                title="Create New Custom Shipping"
                description="Add an option to provide custom shipping details."
            />

            <Input
                label="Title"
                inputProps={{
                    fontSize: 16,
                    placeholder: "e.g., Express Delivery, Standard Shipping",
                    value: shippingTitle,
                    onChange: (e) => setShippingTitle(e.target.value),
                }}
            />

            <CustomShippingFileUpload onFileParsed={setUploadedFileData} />

            <Flex
                justifyContent="flex-end"
                gap={4}
                sx={{ button: { padding: "8px 12px", fontSize: 12, fontWeight: 500 } }}
            >
                <Button
                    type="button"
                    variant="secondary"
                    isDisabled={isLoading}
                    onClick={onDiscard}
                >
                    Discard
                </Button>
                <Button
                    type="button"
                    isDisabled={!shippingTitle || !uploadedFileData || isLoading}
                    isLoading={isLoading}
                    onClick={handleCreate}
                >
                    Create
                </Button>
            </Flex>
        </Flex>
    )
}

export default CustomShippingForm