import { Box, Flex, VStack } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import BasicButton from 'components/common/BasicButton/BasicButton';
import LoadingComponent from 'components/common/loading-component/LoadingComponent';
import AppModal, { IAppModal } from 'components/common/modal/AppModal';
import axiosInstance from 'lib/apis/axiosConfig';
import { ImockupGeneratorService, IpodAvailableVariantsService } from 'lib/apis/pod/interfaces';
import { mockupGeneratorService, podAvailableVariantsService } from 'lib/apis/pod/services';
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
    const [States, setStates] = useState({
        DesignMaker: null,
        TemplateId: null,
        loading: false,
        loadIframe: false
    })
    const ref = useRef<any>()
    const { refactorImage } = introductionClass
    const { uniqe, styles } = PrintfulModel

    const setState = useCallback((key: string, value: any) => setStates(prev => ({ ...prev, [key]: value })), [])

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
                onIframeLoaded: () => setInterval(() => setState('loadIframe', true), 3500),
                onTemplateSaved: async (res) => setState('TemplateId', res),
                onDesignStatusUpdate: (res) => console.log('onDesignStatusUpdate', res),
                ...printful_template_id ? { templateId: printful_template_id } : { initProduct: { productId: pod_blank_product_id.toString() } }
            });
            setState('DesignMaker', designMaker)
        } catch (error) {
            setState('loading', false)
        }
    }, [pod_blank_product_id, printful_template_id, custome_external_id])

    const generate = useCallback(async () => {
        try {
            if (!States.TemplateId) return false
            const request = await availableVariants.mutateAsync({ productId: pod_blank_product_id, provider: "PRINTFUL", templateID: States.TemplateId })
            const data = request?.data?.data

            let size = {}
            data.flatMap(el => el.sizes.map(sized => size[sized.size] = { value: sized.size, id: sized.id, caption: sized.size }))
            let sizes = []
            Object.keys(size).forEach(element => {
                sizes.push({ value: size[element].value, caption: size[element].caption, })
            });

            const mockBody = {
                params: {
                    variant_ids: data.flatMap(el => el.sizes.map(sized => sized.id)),
                    format: 'jpg',
                    product_template_id: States.TemplateId.toString()
                },
                productID: pod_blank_product_id
            }

            const mockups = await mockupGenerator.mutateAsync(mockBody)
            const mockupsData = mockups?.data?.data
            updateState("thumb", mockupsData[0])
            updateState("media", refactorImage(mockupsData))

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

    useEffect(() => {
        if (States.TemplateId) generate()
    }, [States.TemplateId])

    useEffect(() => {
        if (!States.DesignMaker) design()

        return () => {
            setState('DesignMaker', null)
        }
    }, [variants])

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://files.cdn.printful.com/embed/embed.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const save = useCallback(async () => {
        if (!States.DesignMaker) return false
        setState('loading', true)
        States.DesignMaker.sendMessage({ event: 'saveDesign' })
    }, [States.DesignMaker])

    return (
        <AppModal size="7xl" isCentered={false} title="Design Product" contentProps={{ maxWidth: "1400px", width: "95%" }} close={close} open={open}>
            <VStack align="stretch" spacing={4} paddingTop="20px">
                <div style={{ visibility: States.loadIframe ? "visible" : "hidden", height: States.loadIframe ? "auto" : "0" }} className={classes.model} ref={ref} id="printful"></div>
                {!States.loadIframe && <Flex height="300px" justifyContent="center" alignItems="center"><LoadingComponent /></Flex>}
                <Flex justifyContent="space-between">
                    <BasicButton onClick={close} variant="outline" isDisabled={States.loading}>Discard</BasicButton>
                    <BasicButton onClick={save} isDisabled={(Boolean(productID) && publish_product) || States.loading} isLoading={States.loading}>Save</BasicButton>
                </Flex>
            </VStack>
        </AppModal>
    )
}

export default Printful