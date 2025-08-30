import { Flex, Text } from '@chakra-ui/react'
import { MagicwandSm } from 'assets/icons/AI/MagicWand/MagicwandSm'
import UpgradePlanModalContainer from 'components/modals/upgrade-plan-modal/UpgradePlanModalContainer'
import useUpgradeHandler from 'hooks/subscription/useUpgradeHandler'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useProductForm from 'pages/products/hooks/useProductForm'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React from 'react'
import { useMutation } from 'react-query'
import { generateTitleDescription } from 'services/ai/services'
import AnimatedBox from './AnimatedBox'

function GenerateWithAI() {
    const { t } = useLocaleResources('products');
    const { handleFeatureAccess, isUpgradeModalOpen, closeUpgradeModal } = useUpgradeHandler()
    const { values: { media }, setFieldValue } = useProductForm()
    const { updateProductPageState, isAiGenerateLoading, isGenerateDisabled } = useProductPageStore()
    const { showToast } = useAppToast()

    const { mutateAsync } = useMutation((imageUrl: string) => generateTitleDescription(imageUrl),
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
                showToast({ message: t('common:errors.oopsSomethingWentWrong'), type: "error" })
            }
        }
    )

    const handleMutate = () => {
        handleFeatureAccess(() => {
            const mainImage = media.find((item) => item.isMain)
            mutateAsync(mainImage.url)
        });
    }

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
                    <Flex gap={2}>
                        <MagicwandSm {...isDisabled ? { color: "#4F4F4F" } : { color: "#2bcfa1" }} />
                        <Flex flexDirection={"column"} gap={1}>
                            <Flex alignItems="center" gap="6px">
                                <Text background={isDisabled ? "neutral.gray.650" : "#2bcfa1"} backgroundClip="text" fontSize={14} fontWeight={500}>
                                    {t('GenerateWithAI.title')}
                                </Text>
                            </Flex>
                            <Text fontSize={12} fontWeight={400} color={isDisabled ? "neutral.gray.650" : "#FFFFFF"}>
                                {t('GenerateWithAI.description')}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </AnimatedBox>

            <UpgradePlanModalContainer
                isOpen={isUpgradeModalOpen}
                onClose={closeUpgradeModal}
            />
        </>
    )
}

export default GenerateWithAI