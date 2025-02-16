import { useState } from 'react';
import { useMutation } from 'react-query';
import useAppToast from 'functions/hooks/toast/useToast';
import { improveTitle, improveDescription } from 'lib/apis/ai/services';
import useProductPageStore from '../stores/ProductPageStore';

interface UseImproveAIProps {
    fieldValue: string;
    title?: string;
    onSuccess: (newValue: string) => void;
    type: 'title' | 'description';
}

export const useImproveAI = ({ fieldValue, title, onSuccess, type }: UseImproveAIProps) => {
    const [selectedItem, setSelectedItem] = useState("");
    const [revertData, setRevertData] = useState("");
    const { isAiGenerateLoading } = useProductPageStore()
    const { showToast } = useAppToast();

    const { mutateAsync, isLoading, isSuccess } = useMutation(
        (tone: string) => {
            if (type === 'title') {
                return improveTitle({ title: fieldValue, tone });
            }
            return improveDescription({ description: fieldValue, title, tone });
        },
        {
            onSuccess: (response) => {
                onSuccess(response.data);
            },
            onError: () => {
                showToast({ message: "Oops! Something went wrong. Please try again.", type: "error" });
            }
        }
    );

    const handleSelectItem = async (item: string) => {
        setSelectedItem(item);
        setRevertData(fieldValue);
        await mutateAsync(item.toUpperCase());
    };

    const handleTryAgain = () => mutateAsync(selectedItem.toUpperCase());

    const handleRevert = () => {
        onSuccess(revertData);
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
