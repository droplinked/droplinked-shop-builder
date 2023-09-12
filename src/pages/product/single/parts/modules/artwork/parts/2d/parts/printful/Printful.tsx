import { Flex, VStack } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import LoadingComponent from 'components/common/loading-component/LoadingComponent';
import AppModal, { IAppModal } from 'components/common/modal/AppModal';
import useAppToast from 'functions/hooks/toast/useToast';
import axiosInstance from 'lib/apis/axiosConfig';
import { ImockupGeneratorService, IpodAvailableVariantsService } from 'lib/apis/pod/interfaces';
import { generateThumbService, mockupGeneratorService, podAvailableVariantsService } from 'lib/apis/pod/services';
import { productContext } from 'pages/product/single/context';
import introductionClass from 'pages/product/single/parts/general/model';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query';
import PrintfulModel from './model';
import classes from './style.module.scss'

interface IProps extends IAppModal { }

function Printful({ close, open }: IProps) {
    const { methods: { updateState }, state: { printful_template_id, publish_product, pod_blank_product_id, custome_external_id }, productID, store: { state: { variants }, methods: { update } } } = useContext(productContext)
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
    const { refactorImage } = introductionClass
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
                    showToast(err || "Please try again", 'error', { toastId: "DesignMaker" })
                    setState('loading', false)
                },
                onIframeLoaded: () => setInterval(() => setState('loadIframe', true), 3500),
                onTemplateSaved: async (res) => setState('TemplateId', res),
                ...printful_template_id ? { templateId: printful_template_id } : { initProduct: { productId: pod_blank_product_id.toString() } }
            });
            setState('DesignMaker', designMaker)
        } catch (error) {
            setState('loading', false)
        }
    }, [pod_blank_product_id, printful_template_id, custome_external_id])

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
            const mockBody = {
                params: {
                    variant_ids: data.flatMap(el => el.sizes.map(sized => sized.id)),
                    format: 'jpg',
                    product_template_id: States.TemplateId.toString()
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

            updateState("media", refactorImage(mockupsData?.mockups))

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
            setState('loading', false)
        }
    }, [pod_blank_product_id, States.TemplateId])

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
        if (!States.DesignMaker) return false
        setState('loading', true)
        States.DesignMaker.sendMessage({ event: 'saveDesign' })
    }, [States.DesignMaker])

    return (
        <AppModal size="7xl" isCentered={false} title="Create a Product Template" contentProps={{ maxWidth: "1400px", width: "95%" }} close={() => { }} open={open}>
            <VStack align="stretch" spacing={4} paddingTop="20px">
                <div style={{ visibility: States.loadIframe ? "visible" : "hidden", height: States.loadIframe ? "auto" : "0" }} className={classes.model} ref={ref} id="printful"></div>
                {!States.loadIframe && <Flex height="300px" justifyContent="center" alignItems="center"><LoadingComponent /></Flex>}
                <Flex justifyContent="space-between">
                    <BasicButton onClick={close} variant="outline" isDisabled={States.loading}>Discard</BasicButton>
                    <BasicButton onClick={save} isDisabled={(Boolean(productID) && publish_product) || States.loading || !States.loadIframe} isLoading={States.loading}>Save</BasicButton>
                </Flex>
            </VStack>
        </AppModal>
    )
}

export default Printful