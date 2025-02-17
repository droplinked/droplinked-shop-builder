import { useState } from 'react';
import { useMutation } from 'react-query';
import useAppToast from 'functions/hooks/toast/useToast';
import { improveTitle, improveDescription } from 'lib/apis/ai/services';
import useProductPageStore from '../stores/ProductPageStore';
import useProductForm from './useProductForm';

export const useImproveAI = ({ type }: { type: 'title' | 'description' }) => {
    const [selectedItem, setSelectedItem] = useState("");
    const [revertData, setRevertData] = useState("");
    const { isAiGenerateLoading, updateProductPageState } = useProductPageStore();
    const { values: { description, title }, setFieldValue } = useProductForm();
    const { showToast } = useAppToast();

    const { mutateAsync, isLoading, isSuccess } = useMutation(
        (tone: string) => {
            if (type === 'title') {
                return improveTitle({ title, tone });
            }
            return improveDescription({ description, title, tone });
        },
        {
            onMutate() {
                updateProductPageState("isGenerateDisabled", true);
                setRevertData(type === "title" ? title : description);
            },
            onSuccess: (response) => {
                setFieldValue(type, response.data);
                updateProductPageState("isGenerateDisabled", false);
            },
            onError: () => {
                updateProductPageState("isGenerateDisabled", false);
                showToast({ message: "Oops! Something went wrong. Please try again.", type: "error" });
            }
        }
    );

    const handleSelectItem = async (item: string) => {
        setSelectedItem(item);
        await mutateAsync(item.toUpperCase());
    };

    const handleTryAgain = () => mutateAsync(selectedItem.toUpperCase());

    const handleRevert = () => {
        setFieldValue(type, revertData);
        setSelectedItem("");
    };

    return {
        selectedItem,
        handleSelectItem,
        handleTryAgain,
        handleRevert,
        isImproveLoading: isLoading || isAiGenerateLoading,
        isLoaded: !!isSuccess && !!selectedItem
    };
};
