import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import ProTrialModal from 'components/modals/pro-plan-upgrade-modal/ProPlanUpgradeModal'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { IGenerateTitleDescription } from 'services/ai/interfaces'
import { generateTitleDescription } from 'services/ai/services'
import useProductForm from 'pages/products/hooks/useProductForm'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React from 'react'
import { useMutation } from 'react-query'
import useAppStore from 'stores/app/appStore'
import AnimatedBox from './AnimatedBox'

function GenerateWithAI() {
    const { t } = useLocaleResources('products');
    const { isOpen: isProTrialModalOpen, onOpen: openProTrialModal, onClose: closeProTrialModal } = useDisclosure()
    const { values: { media }, setFieldValue } = useProductForm()
    const { updateProductPageState, isAiGenerateLoading, isGenerateDisabled } = useProductPageStore()
    const { showToast } = useAppToast()
    const { hasPaidSubscription } = useAppStore()
   
    
    const { mutateAsync } = useMutation((params: IGenerateTitleDescription) => generateTitleDescription(params),
        {
            onMutate() {
                updateProductPageState('isAiGenerateLoading', true)
            },
            onSuccess: (response) => {
                const { description, title } = response.data;
                updateProductPageState('isAiGenerateLoading', false)
                setFieldValue("title", title)
                setFieldValue("description", description)
            },
            onError: () => {
                updateProductPageState('isAiGenerateLoading', false)
                showToast({ message: t('ai.generate.errorMessage'), type: "error" })
            }
        }
    )

    const handleMutate = () => {
        if (!hasPaidSubscription()) {
            openProTrialModal();
            return;
        }

        const mainImage = media.find((item) => item.isMain)
        mutateAsync({ imageUrl: mainImage.url })
    }

    const handleCloseProTrialModal = () => {
        closeProTrialModal();
    };

    const isDisabled = media.length === 0 || isAiGenerateLoading || isGenerateDisabled;

    return (
        <>
            <AnimatedBox isDisabled={isDisabled} onClick={handleMutate}>
                <Flex
                    width={"100%"}
                    borderRadius={8}
                    padding={"12px 16px"}
                    background={"neutral.gray.1000"}
                    flexDirection={"column"}
                    justifyContent={"start"}
                    alignItems={"start"}
                    userSelect={"none"}
                    cursor={"pointer"}
                >
                    <Flex gap={2} {...isDisabled && { sx: { path: { stroke: "#4F4F4F" } } }}>
                        <AppIcons.MagicWind />
                        <Flex flexDirection={"column"} gap={1}>
                            <Flex alignItems="center" gap="6px">
                                <Text background={isDisabled ? "neutral.gray.650" : "#2bcfa1"} backgroundClip="text" fontSize={14} fontWeight={500}>
                                    {t('ai.generate.title')}
                                </Text>
                            </Flex>
                            <Text fontSize={12} fontWeight={400} color={isDisabled ? "neutral.gray.650" : "#FFFFFF"}>
                                {t('ai.generate.description')}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </AnimatedBox>
            
            <ProTrialModal
                isOpen={isProTrialModalOpen}
                onClose={handleCloseProTrialModal}
            />
        </>
    )
}

export default GenerateWithAI