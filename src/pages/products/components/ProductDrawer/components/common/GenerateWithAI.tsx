import { Flex, Text } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import useAppToast from 'functions/hooks/toast/useToast'
import { IGenerateTitleDescription } from 'lib/apis/ai/interfaces'
import { generateTitleDescription } from 'lib/apis/ai/services'
import useProductForm from 'pages/products/hooks/useProductForm'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React from 'react'
import { useMutation } from 'react-query'
import AnimatedBox from './AnimatedBox'

function GenerateWithAI() {
    const { values: { media }, setFieldValue } = useProductForm()
    const { updateProductPageState, isAiGenerateLoading, isGenerateDisabled } = useProductPageStore()
    const { showToast } = useAppToast()
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
                showToast({ message: "Oops! Something went wrong. Please try again.", type: "error" })
            }
        }
    )

    const handleMutate = () => {
        const mainImage = media.find((item) => item.isMain)
        mutateAsync({ imageUrl: mainImage.url })
    }

    const isDisabled = media.length === 0 || isAiGenerateLoading || isGenerateDisabled;

    return (
        <AnimatedBox isDisabled={isDisabled} onClick={handleMutate}>
            <Flex
                width={"100%"}
                borderRadius={8}
                padding={"12px 16px"}
                background={"#1c1c1c"}
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
                            <Text background={isDisabled ? "#4F4F4F" : "#2bcfa1"} backgroundClip="text" fontSize={14} fontWeight={500}>
                                Generate with AI
                            </Text>
                        </Flex>
                        <Text fontSize={12} fontWeight={400} color={isDisabled ? "#4F4F4F" : "#FFFFFF"}>
                            Populate a product name and description based on the chosen default image.
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </AnimatedBox>
    )
}

export default GenerateWithAI