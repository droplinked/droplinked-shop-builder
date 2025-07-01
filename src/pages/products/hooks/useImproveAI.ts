import useAppToast from 'hooks/toast/useToast';
import { improveDescription, improveTitle } from 'services/ai/services';
import { useState } from 'react';
import { useMutation } from 'react-query';
import useProductPageStore from '../stores/ProductPageStore';
import useProductForm from './useProductForm';
import useAppStore from 'stores/app/appStore';
import { useDisclosure } from '@chakra-ui/react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

export const useImproveAI = ({ type }: { type: 'title' | 'description' }) => {
    const [selectedItem, setSelectedItem] = useState("");
    const [revertData, setRevertData] = useState("");
    const { isOpen: isProTrialModalOpen, onOpen: openProTrialModal, onClose: closeProTrialModal } = useDisclosure();
    const { isAiGenerateLoading, updateProductPageState } = useProductPageStore();
    const { values: { description, title }, setFieldValue } = useProductForm();
    const { showToast } = useAppToast();
    const { hasPaidSubscription } = useAppStore();
    const { t } = useLocaleResources('common');

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
                setFieldValue(type, response.data.data);
                updateProductPageState("isGenerateDisabled", false);
            },
            onError: () => {
                updateProductPageState("isGenerateDisabled", false);
                showToast({ message: t('products.hooks.errors.improveAIError'), type: "error" });
            }
        }
    );

    const handleSelectItem = async (item: string) => {
        if (!hasPaidSubscription()) {
            openProTrialModal();
            return;
        }

        setSelectedItem(item);
        await mutateAsync(item.toUpperCase());
    };

    const handleTryAgain = () => {
        if (!hasPaidSubscription()) {
            openProTrialModal();
            return;
        }

        mutateAsync(selectedItem.toUpperCase());
    };

    const handleRevert = () => {
        setFieldValue(type, revertData);
        setSelectedItem("");
    };

    const handleCloseProTrialModal = () => {
        closeProTrialModal();
    };

    return {
        selectedItem,
        handleSelectItem,
        handleTryAgain,
        handleRevert,
        isImproveLoading: isLoading || isAiGenerateLoading,
        isLoaded: !!isSuccess && !!selectedItem,
        isProTrialModalOpen,
        handleCloseProTrialModal
    };
};
