import useAppToast from 'hooks/toast/useToast'
import axiosInstance from 'lib/axiosConfig'
import useProductForm from 'pages/products/hooks/useProductForm'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import { getUniqueItems, printfulStyles } from 'pages/products/utils/printfulHelpers'
import { useEffect, useRef, useState } from 'react'
import { generateThumbService, mockupGeneratorService, podAvailableVariantsService } from 'services/pod/services'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function useDesignMakerHooks(onClose: () => void) {
    const { values, setFieldValue } = useProductForm()
    const { variants, updateProductPageState } = useProductPageStore()
    const {
        printful_template_id,
        pod_blank_product_id,
        custome_external_id,
        technique
    } = values

    const [designMakerInstance, setDesignMakerInstance] = useState(null)
    const [templateId, setTemplateId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isIframeLoaded, setIsIframeLoaded] = useState(false)

    const iframeRef = useRef<any>(null)
    const { showToast } = useAppToast()
    const { t } = useLocaleResources('products')

    const initializeDesignMaker = async () => {
        try {
            const response = await axiosInstance.post('pod/printful/nonces', {
                external_product_id: custome_external_id,
                external_customer_id: custome_external_id
            })

            //@ts-ignore
            const designMaker = new PFDesignMaker({
                elemId: iframeRef.current?.id,
                nonce: response?.data?.data?.nonce,
                style: printfulStyles,
                onError: handleDesignMakerError,
                onIframeLoaded: () => setTimeout(() => setIsIframeLoaded(true), 3500),
                onTemplateSaved: (savedTemplateId) => setTemplateId(savedTemplateId),
                ...(printful_template_id
                    ? { templateId: printful_template_id }
                    : {
                        initProduct: {
                            productId: pod_blank_product_id.toString(),
                            technique: technique
                        }
                    })
            })

            setDesignMakerInstance(designMaker)
        }
        catch (error) {
            setIsLoading(false)
        }
    }

    const handleDesignMakerError = (error) => {
        if (error && !error.includes('valid nonce')) {
            showToast({
                message: error || t('useDesignMakerLogic.errors.designMakerError'),
                type: 'error',
            })
            setIsLoading(false)
        }
    }

    const generateMockups = async () => {
        try {
            if (!templateId) return
            setIsLoading(true)
            const response = await podAvailableVariantsService({
                productId: pod_blank_product_id,
                provider: 'PRINTFUL',
                templateID: templateId
            })

            const variantsData = response?.data?.data
            const sizes = variantsData.flatMap((variant) =>
                variant.sizes.map((size) => ({ value: size.size, caption: size.size }))
            )

            const mockupRequest = {
                params: {
                    variant_ids: variantsData.flatMap((variant) => variant.sizes.map((size) => size.id)),
                    format: 'png',
                    product_template_id: parseInt(templateId),
                    technique
                },
                productID: pod_blank_product_id
            }

            const mockupsResponse = await mockupGeneratorService(mockupRequest)
            const mockupData = mockupsResponse?.data?.data
            const printfulOptionData = mockupData?.option_data
            setFieldValue('printful_option_data', printfulOptionData)

            await generateImages(mockupData?.mockups)

            const thumbnailsResponse = await generateThumbService(
                mockupData?.printfiles.map((file) => file?.url)
            )
            const imageUrls = thumbnailsResponse?.data?.data?.originals
            setFieldValue(
                'm2m_positions_options',
                mockupData?.printfiles.map((file, index) => ({
                    ...file,
                    url: imageUrls[index]
                }))
            )

            updateProductPageState('available_variants', variantsData)
            setFieldValue('artwork', 'printful')
            setFieldValue('artwork_position', 'front')
            setFieldValue('printful_template_id', templateId)
            setFieldValue('properties', [
                {
                    value: '62a989ab1f2c2bbc5b1e7153',
                    title: 'Color',
                    items: getUniqueItems(
                        variantsData.map((variant) => ({
                            value: variant.color_code,
                            caption: variant.color
                        }))
                    ),
                    child: null
                },
                {
                    value: '62a989e21f2c2bbc5b1e7154',
                    title: 'Size',
                    items: sizes,
                    child: null
                },
            ])
            onClose()
        }
        catch (error) {
            setTemplateId(null)
            updateProductPageState('available_variants', [])
            setFieldValue('printful_template_id', null)
            showToast({ message: error.message, type: 'error' })
        }
        finally {
            setIsLoading(false)
        }
    }

    const generateImages = async (mocks: any) => {
        try {
            const response = await generateThumbService(mocks)
            const originals = response?.data?.data?.originals || []
            const thumbnails = response?.data?.data?.thumbs || []

            const images = originals.map((imgURL: string, index: number) => ({
                url: imgURL,
                thumbnail: thumbnails[index],
                isMain: index === 0,
                isMockup: true
            }))

            setFieldValue('media', images)
        }
        catch (error) {
            showToast({
                message: error?.message || t('useDesignMakerLogic.errors.designMakerError'),
                type: 'error'
            })
        }
    }

    const handleSave = async () => {
        try {
            if (!designMakerInstance) return
            setIsLoading(true)
            await designMakerInstance.sendMessage({ event: 'saveDesign' })
        }
        catch (error) {
            showToast({ message: error.message, type: 'error' })
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!designMakerInstance) initializeDesignMaker()
        return () => { setDesignMakerInstance(null) }
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

    return {
        iframeRef,
        isIframeLoaded,
        isLoading,
        handleSave,
    }
}

export default useDesignMakerHooks