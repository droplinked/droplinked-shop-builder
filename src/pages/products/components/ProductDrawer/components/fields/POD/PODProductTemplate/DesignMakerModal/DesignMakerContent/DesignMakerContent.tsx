import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import FullScreenLoading from 'components/redesign/fullscreen-loading/FullScreenLoading'
import useAppToast from 'functions/hooks/toast/useToast'
import axiosInstance from 'lib/apis/axiosConfig'
import { ImockupGeneratorService } from 'lib/apis/pod/interfaces'
import { generateThumbService, mockupGeneratorService, podAvailableVariantsService } from 'lib/apis/pod/services'
import useProductForm from 'pages/products/hooks/useProductForm'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import { getUniqueItems, printfulStyles } from 'pages/products/utils/printfulHelpers'
import React, { useEffect, useRef, useState } from 'react'
import classes from './styles.module.scss'

interface Props {
    onClose: () => void
}

function DesignMakerContent({ onClose }: Props) {
    const { values, setFieldValue } = useProductForm()
    const { printful_template_id, publish_product, pod_blank_product_id, custome_external_id, technique } = values

    const { productPageState, updateProductPageState } = useProductPageStore()
    const { variants } = productPageState

    const [designMakerInstance, setDesignMakerInstance] = useState(null)
    const [templateId, setTemplateId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isIframeLoaded, setIsIframeLoaded] = useState(false)

    const iframeRef = useRef<any>()
    const { showToast } = useAppToast()

    const initializeDesignMaker = async () => {
        try {
            const response = await axiosInstance.post('pod/printful/nonces', {
                external_product_id: custome_external_id,
                external_customer_id: custome_external_id,
            })

            const designMaker = new PFDesignMaker({
                elemId: iframeRef.current?.id,
                nonce: response?.data?.data?.nonce,
                style: printfulStyles,
                onError: (error) => {
                    if (error && !error.includes('valid nonce')) {
                        showToast({
                            message: error || 'Please try again',
                            type: 'error',
                            options: { toastId: 'DesignMaker' },
                        })
                        setIsLoading(false)
                    }
                },
                onIframeLoaded: () => setTimeout(() => setIsIframeLoaded(true), 3500),
                onTemplateSaved: async (savedTemplateId) => setTemplateId(savedTemplateId),
                ...(printful_template_id
                    ? { templateId: printful_template_id }
                    : {
                        initProduct: {
                            productId: pod_blank_product_id.toString(),
                            technique: technique,
                        },
                    }),
            })

            setDesignMakerInstance(designMaker)
        } catch (error) {
            setIsLoading(false)
        }
    }

    const generateMockups = async () => {
        try {
            if (!templateId) return

            const response = await podAvailableVariantsService({
                productId: pod_blank_product_id,
                provider: 'PRINTFUL',
                templateID: templateId,
            })

            const variantsData = response?.data?.data
            const sizes = variantsData.flatMap((variant) =>
                variant.sizes.map((size) => ({
                    value: size.size,
                    caption: size.size,
                }))
            )

            const mockupRequest: ImockupGeneratorService = {
                params: {
                    variant_ids: variantsData.flatMap((variant) =>
                        variant.sizes.map((size) => size.id)
                    ),
                    format: 'png',
                    product_template_id: parseInt(templateId),
                    technique,
                },
                productID: pod_blank_product_id,
            }

            const mockupsResponse = await mockupGeneratorService(mockupRequest)
            const mockupData = mockupsResponse?.data?.data

            const thumbnailsResponse = await generateThumbService(
                mockupData?.printfiles.map((file) => file?.url)
            )
            const imageUrls = thumbnailsResponse?.data?.data?.originals

            setFieldValue('media', imageUrls.map((url, index) => ({
                url,
                isMain: index === 0,
            }))
            )

            updateProductPageState('variants', variantsData)
            setFieldValue('printful_template_id', templateId)
            setFieldValue('artwork', 'printful')
            setFieldValue('artwork_position', 'front')
            setFieldValue('properties', [
                {
                    value: '62a989ab1f2c2bbc5b1e7153',
                    title: 'Color',
                    items: getUniqueItems(variantsData.map((variant) => ({
                        value: variant.color_code,
                        caption: variant.color,
                    }))),
                    child: null,
                },
                {
                    value: '62a989e21f2c2bbc5b1e7154',
                    title: 'Size',
                    items: sizes,
                    child: null,
                },
            ])
            onClose()
        }
        catch (error) {
            setFieldValue('printful_template_id', null)
            updateProductPageState('variants', [])
            setIsLoading(false)
            showToast({ message: error.message, type: 'error' })
        }
    }

    const handleSave = () => {
        if (!designMakerInstance) return
        setIsLoading(true)
        designMakerInstance.sendMessage({ event: 'saveDesign' })
    }

    const handleBack = () => {
        setFieldValue('technique', null)
        setFieldValue('media', [])
    }

    useEffect(() => {
        if (!designMakerInstance) initializeDesignMaker()
        return () => setDesignMakerInstance(null)
    }, [variants])

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://files.cdn.printful.com/embed/embed.js'
        script.async = true
        document.body.appendChild(script)
        return () => { document.body.removeChild(script) }
    }, [])

    useEffect(() => {
        if (templateId) generateMockups()
    }, [templateId])

    return (
        <Flex direction="column" gap={4}>
            <div ref={iframeRef} id="printful" className={classes.model} />

            {!isIframeLoaded && <FullScreenLoading />}

            <Flex justifyContent="space-between" gap={4}>
                <Button variant="secondary" isDisabled={isLoading} onClick={onClose}>
                    Discard
                </Button>

                <Flex gap={4}>
                    {!publish_product && (
                        <Button variant="outline" isDisabled={isLoading} onClick={handleBack}>
                            Back
                        </Button>
                    )}
                    <Button
                        isDisabled={isLoading || !isIframeLoaded}
                        isLoading={isLoading}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default DesignMakerContent