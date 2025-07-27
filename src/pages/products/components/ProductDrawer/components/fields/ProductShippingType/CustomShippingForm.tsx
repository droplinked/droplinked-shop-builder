import { Flex } from "@chakra-ui/react"
import AppButton from "components/redesign/button/AppButton"
import AppInput from "components/redesign/input/AppInput"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useAppToast from "hooks/toast/useToast"
import { useCreateCustomShipping } from "pages/products/hooks/useShippingTypes"
import React, { useState } from "react"
import CustomShippingFileUpload from "./CustomShippingFileUpload"
import SectionHeader from "./SectionHeader"

function CustomShippingForm({ onDiscard }: { onDiscard: () => void }) {
    const { t } = useLocaleResources('products')
    const [shippingTitle, setShippingTitle] = useState("")
    const [uploadedFileData, setUploadedFileData] = useState(null)

    const { createCustomShipping, isLoading } = useCreateCustomShipping()
    const { showToast } = useAppToast()

    const handleCreate = async () => {
        try {
            const data = { title: shippingTitle, ...uploadedFileData }
            await createCustomShipping(data)
            showToast({ type: "success", message: t('CustomShippingForm.successMessage') })
            onDiscard()
        } catch (error) {
            showToast({ type: "error", message: t('common:errors.failedToCreate') })
        }
    }

    return (
        <Flex
            flexDirection="column"
            gap={6}
            mt={4}
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={8}
            padding={4}
        >
            <SectionHeader
                title={t('CustomShippingForm.title')}
                description={t('CustomShippingForm.description')}
            />

            <AppInput
                label={t('CustomShippingForm.titleLabel')}
                inputProps={{
                    fontSize: 16,
                    placeholder: t('CustomShippingForm.titlePlaceholder'),
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
                <AppButton
                    type="button"
                    variant="secondary"
                    isDisabled={isLoading}
                    onClick={onDiscard}
                >
                    {t('common:discard')}
                </AppButton>
                <AppButton
                    type="button"
                    isDisabled={!shippingTitle || !uploadedFileData || isLoading}
                    isLoading={isLoading}
                    onClick={handleCreate}
                >
                    {t('common:create')}
                </AppButton>
            </Flex>
        </Flex>
    )
}

export default CustomShippingForm