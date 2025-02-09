import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { IImproveDescription } from 'lib/apis/ai/interfaces'
import ImproveWithAi from '../../common/ImproveWithAi'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import useProductForm from 'pages/products/hooks/useProductForm'
import useAppToast from 'functions/hooks/toast/useToast'
import { useMutation } from 'react-query'
import { improveDescription } from 'lib/apis/ai/services'

function ImproveDescription() {
    const [selectedItem, setSelectedItem] = useState("")
    const [revertData, setRevertData] = useState("")
    const { updateAiGenerationData, aiGenerationData } = useProductPageStore()
    const { setFieldValue, values: { description, title } } = useProductForm()
    const { showToast } = useAppToast()

    const { mutateAsync } = useMutation(
        (params: IImproveDescription) => improveDescription(params),
        {
            onMutate: () => {
                setRevertData(description)
                updateAiGenerationData({
                    ...aiGenerationData,
                    isDescriptionLoading: true,
                    isDescriptionLoaded: false
                })
            },
            onSuccess: (response) => {
                setFieldValue("description", response.data)
                updateAiGenerationData({
                    ...aiGenerationData,
                    description: response.data,
                    isDescriptionLoaded: true,
                    isDescriptionLoading: false
                })
            },
            onError: () => {
                updateAiGenerationData({ ...aiGenerationData, isDescriptionLoading: false, isDescriptionLoaded: false })
                showToast({ message: "Oops! Something went wrong. Please try again.", type: "error" })
            }
        }
    )

    const handleSelectItem = async (item: string) => {
        setSelectedItem(item)
        await mutateAsync({ description, title, tone: item.toUpperCase() })
    }

    const handleTryAgain = async () => {
        setSelectedItem(selectedItem)
        await mutateAsync({ description, title, tone: selectedItem.toUpperCase() })
    }

    const handleRevert = () => {
        setFieldValue("description", revertData)
        setSelectedItem("")
        updateAiGenerationData({ ...aiGenerationData, isDescriptionLoaded: false })
    }

    return (
        <Box position="absolute" bottom={2} right={2}>
            <ImproveWithAi
                isLoaded={aiGenerationData.isDescriptionLoaded}
                isDisabled={description?.length === 0}
                isLoading={aiGenerationData.isDescriptionLoading}
                handleSelectItem={handleSelectItem}
                handleTryAgain={handleTryAgain}
                handleRevert={handleRevert}
                BoxStyles={{ zIndex: 1 }}
            />
        </Box>
    )
}

export default ImproveDescription
