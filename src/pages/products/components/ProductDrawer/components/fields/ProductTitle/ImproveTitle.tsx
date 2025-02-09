import useAppToast from 'functions/hooks/toast/useToast';
import { IImproveTitle } from 'lib/apis/ai/interfaces';
import { improveTitle } from 'lib/apis/ai/services';
import useProductForm from 'pages/products/hooks/useProductForm';
import useProductPageStore from 'pages/products/stores/ProductPageStore';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import ImproveWithAi from '../../common/ImproveWithAi';

function ImproveTitle() {
    const [selectedItem, setSelectedItem] = useState("");
    const [revertData, setRevertData] = useState("");
    const { updateAiGenerationData, aiGenerationData } = useProductPageStore();
    const { setFieldValue, values: { title } } = useProductForm();
    const { showToast } = useAppToast()
    const { mutateAsync } = useMutation(
        (params: IImproveTitle) => improveTitle(params),
        {
            onMutate: () => {
                setRevertData(title)
                updateAiGenerationData({
                    ...aiGenerationData,
                    isTitleLoading: true,
                    isTitleLoaded: false
                })
            },
            onSuccess: (response) => {
                setFieldValue("title", response.data)
                updateAiGenerationData({
                    ...aiGenerationData,
                    title: response.data,
                    isTitleLoaded: true,
                    isTitleLoading: false
                })
            },
            onError: () => {
                updateAiGenerationData({ ...aiGenerationData, isTitleLoading: false, isTitleLoaded: false })
                showToast({ message: "Oops! Something went wrong. Please try again.", type: "error" })
            }
        }
    )

    const handleSelectItem = async (item: string) => {
        setSelectedItem(item)
        await mutateAsync({ title, tone: item.toUpperCase() })
    }

    const handleTryAgain = async () => {
        setSelectedItem(selectedItem)
        await mutateAsync({ title, tone: selectedItem.toUpperCase() })
    }

    const handleRevert = () => {
        setFieldValue("title", revertData);
        setSelectedItem("");
        updateAiGenerationData({ ...aiGenerationData, isTitleLoaded: false });
    }

    return (
        <ImproveWithAi
            isLoaded={aiGenerationData.isTitleLoaded}
            isDisabled={title?.length === 0}
            isLoading={aiGenerationData.isTitleLoading}
            handleSelectItem={handleSelectItem}
            handleTryAgain={handleTryAgain}
            handleRevert={handleRevert}
            BoxStyles={{ width: aiGenerationData?.isTitleLoaded && "17.1rem" }}
        />
    )
}

export default ImproveTitle
