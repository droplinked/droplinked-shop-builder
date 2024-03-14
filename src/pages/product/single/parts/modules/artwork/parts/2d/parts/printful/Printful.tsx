import { Flex, VStack } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import LoadingComponent from 'components/common/loading-component/LoadingComponent';
import useAppToast from 'functions/hooks/toast/useToast';
import axiosInstance from 'lib/apis/axiosConfig';
import { ImockupGeneratorService, IpodAvailableVariantsService } from 'lib/apis/pod/interfaces';
import { generateThumbService, mockupGeneratorService, podAvailableVariantsService } from 'lib/apis/pod/services';
import { productContext } from 'pages/product/single/context';
import ProductTypeModel from 'pages/product/single/parts/modules/productType/model';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import PrintfulModel from './model';
import classes from './style.module.scss';

interface IProps {
    close: any
}

function Printful({ close }: IProps) {
    const { methods: { updateState }, state: { printful_template_id, media, publish_product, pod_blank_product_id, custome_external_id, technique }, productID, store: { state: { variants }, methods: { update } } } = useContext(productContext)
    const availableVariants = useMutation((params: IpodAvailableVariantsService) => podAvailableVariantsService(params))
    const mockupGenerator = useMutation((params: ImockupGeneratorService) => mockupGeneratorService(params))
    const generateThumb = useMutation((params: any) => generateThumbService(params))
    const [States, setStates] = useState({
        DesignMaker: null,
        TemplateId: null,
        loading: false,
        loadIframe: false
    })
    const ref = useRef<any>()
    const { showToast } = useAppToast()
    const { uniqe, styles } = PrintfulModel

    const setState = useCallback((key: string, value: any) => setStates(prev => ({ ...prev, [key]: value })), [])

    // Initial PFDesignMaker
    const design = useCallback(async () => {
        try {
            const data = await axiosInstance.post('pod/printful/nonces', {
                external_product_id: custome_external_id,
                external_customer_id: custome_external_id
            })

            //@ts-ignore
            const designMaker = new PFDesignMaker({
                elemId: ref.current?.id,
                nonce: data?.data?.data?.nonce,
                style: styles,
                onError: (err) => {
                    if (err && err.search("valid nonce") <= 0) {
                        showToast({ message: err || "Please try again", type: 'error', options: { toastId: "DesignMaker" } })
                        setState('loading', false)
                    }
                },
                onIframeLoaded: () => setInterval(() => setState('loadIframe', true), 3500),
                onTemplateSaved: async (res) => setState('TemplateId', res),
                ...printful_template_id ? { templateId: printful_template_id } : {
                    initProduct: {
                        productId: pod_blank_product_id.toString(),
                        technique: technique
                    }
                }
            });
            setState('DesignMaker', designMaker)
        } catch (error) {
            setState('loading', false)
        }
    }, [pod_blank_product_id, printful_template_id, custome_external_id, technique])

    // after success PFDesignMaker and get templateID
    const generate = useCallback(async () => {
        try {
            if (!States.TemplateId) return false

            // Get available variants
            const request = await availableVariants.mutateAsync({ productId: pod_blank_product_id, provider: "PRINTFUL", templateID: States.TemplateId })
            const data = request?.data?.data

            let size = {}
            data.flatMap(el => el.sizes.map(sized => size[sized.size] = { value: sized.size, id: sized.id, caption: sized.size }))
            let sizes = []
            Object.keys(size).forEach(element => {
                sizes.push({ value: size[element].value, caption: size[element].caption, })
            });

            // mockupGenerator data body
            const mockBody: ImockupGeneratorService = {
                params: {
                    variant_ids: data.flatMap(el => el.sizes.map(sized => sized.id)),
                    format: 'png',
                    product_template_id: parseInt(States.TemplateId),
                    technique
                },
                productID: pod_blank_product_id
            }

            // Generate mock
            const mockups = await mockupGenerator.mutateAsync(mockBody)
            const mockupsData = mockups?.data?.data

            // Upload printfiles url on cdn
            const generateThumbPrintfiles = await generateThumb.mutateAsync(mockupsData?.printfiles.map(el => el?.url))
            const imagesPrintfiles = generateThumbPrintfiles?.data?.data?.originals
            updateState("m2m_positions_options", mockupsData?.printfiles.map((el, key) => ({ ...el, url: imagesPrintfiles[key] })))

            await generateImages(mockupsData?.mockups)

            const result = [
                {
                    "value": "62a989ab1f2c2bbc5b1e7153",
                    "title": "Color",
                    "items": uniqe(data.map(el => ({ value: el.color_code, caption: el.color }))),
                    "child": null
                },
                {
                    "value": "62a989e21f2c2bbc5b1e7154",
                    "title": "Size",
                    "items": sizes,
                    "child": null
                }
            ]
            update("available_variant", data)
            updateState('artwork', 'printful')
            updateState('artwork_position', 'front')
            updateState('properties', result)
            updateState('printful_template_id', States.TemplateId)
            close()
            setState('loading', false)
        } catch (error) {
            setState('TemplateId', null)
            update("available_variant", [])
            updateState("variants", [])
            setState('loading', false)
            updateState('printful_template_id', null)
            close()
            showToast({ message: error.message, type: 'error' })
        }
    }, [pod_blank_product_id, States.TemplateId, technique])

    const generateImages = useCallback(async (mocks: any) => {
        const data = await generateThumb.mutateAsync(mocks)
        const images = data?.data?.data?.originals.map((el, key) => ({
            url: el,
            thumbnail: data?.data?.data?.thumbs[key],
            isMain: media.length ? false : key === 0,
            isMockup: true
        }))
        updateState("media", [...media.filter(el => !el.isMockup), ...images].map((el, key) => ({ ...el, isMain: key === 0 })))
    }, [media])

    useEffect(() => { if (States.TemplateId) generate() }, [States.TemplateId])

    // setState DesignMaker
    useEffect(() => {
        if (!States.DesignMaker) design()
        return () => {
            setState('DesignMaker', null)
        }
    }, [variants])

    // Implement printful embed
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://files.cdn.printful.com/embed/embed.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    // onClick save
    const save = useCallback(async () => {
        try {
            if (!States.DesignMaker) return false
            setState('loading', true)
            States.DesignMaker.sendMessage({ event: 'saveDesign' })
        } catch (error) {
        }
    }, [States.DesignMaker])

    const back = useCallback(async () => {
        updateState('technique', null)
        ProductTypeModel.updateProductType({ value: pod_blank_product_id, updateState })
        updateState("media", [])
    }, [States.DesignMaker])

    return (
        <VStack align="stretch" spacing={4} paddingTop="20px">
            <div style={{ visibility: States.loadIframe ? "visible" : "hidden", height: States.loadIframe ? "auto" : "0" }} className={classes.model} ref={ref} id="printful"></div>
            {!States.loadIframe && <Flex height="300px" justifyContent="center" alignItems="center"><LoadingComponent /></Flex>}
            <Flex justifyContent="space-between">
                <Flex gap="20px">
                    <BasicButton onClick={close} variant="outline" isDisabled={States.loading}>Discard</BasicButton>
                    {!(Boolean(productID) && publish_product) ? <BasicButton onClick={back} variant="ghost" isDisabled={States.loading}>Back</BasicButton> : null}
                </Flex>
                <BasicButton onClick={save} isDisabled={(Boolean(productID) && publish_product) || States.loading || !States.loadIframe} isLoading={States.loading}>Save</BasicButton>
            </Flex>
        </VStack>
    )
}

export default Printful