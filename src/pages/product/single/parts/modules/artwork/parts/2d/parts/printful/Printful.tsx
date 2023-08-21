import { Box, Flex, VStack } from '@chakra-ui/react';
import axios from 'axios';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppModal, { IAppModal } from 'components/common/modal/AppModal';
import axiosInstance from 'lib/apis/axiosConfig';
import { ImockupGeneratorService, IpodAvailableVariantsService } from 'lib/apis/pod/interfaces';
import { mockupGeneratorService, podAvailableVariantsService } from 'lib/apis/pod/services';
import { productContext } from 'pages/product/single/context';
import introductionClass from 'pages/product/single/parts/general/model';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query';
import classes from './style.module.scss'

interface IProps extends IAppModal { }

function Printful({ close, open }: IProps) {
    const { methods: { updateState }, state: { printful_template_id, publish_product }, productID, store: { state: { variants }, methods: { update } } } = useContext(productContext)
    const availableVariants = useMutation((params: IpodAvailableVariantsService) => podAvailableVariantsService(params))
    const mockupGenerator = useMutation((params: ImockupGeneratorService) => mockupGeneratorService(params))
    const [DesignMaker, setDesignMaker] = useState(null)
    const [TemplateId, setTemplateId] = useState(null)
    const ref = useRef<any>()
    const { refactorImage } = introductionClass

    const design = useCallback(async () => {
        const data = await axiosInstance.post('pod/printful/nonces', {
            external_product_id: variants?.blank_pod_id,
            external_customer_id: variants?.blank_pod_id
        })

        //@ts-ignore
        const designMaker = new PFDesignMaker({
            elemId: ref.current?.id,
            nonce: data?.data?.data?.nonce,
            style: {
                variables: {
                    '--pf-sys-background': 'none',
                    '--pf-sys-neutral-300-on-background': '#64748b',
                    '--pf-sys-neutral-400-on-background': '#94a3b8',
                    '--pf-sys-neutral-700-on-background': '#e2e8f0',
                    '--pf-sys-neutral-800-on-background': '#f1f5f9',
                    '--pf-comp-banner-warning-surface': '#333',
                    '--pf-sys-neutral-900-on-background': '#f8fafc',
                    '--pf-sys-primary-400-on-background': '#059669',
                    '--pf-sys-primary-700-on-background': '#6ee7b7',
                    '--pf-comp-designer-area-action-buttons-container-surface': '#333',
                    '--pf-sys-border-on-background': '#64748b',
                    '--pf-sys-link-on-background': '#93c5fd',
                    '--pf-comp-designer-mockup-area-surface': "#f1f5f9",
                    '--pf-sys-icon-on-background': '#94a3b8',
                    '--pf-sys-icon-info-on-background': '#94a3b8',
                    '--pf-sys-icon-hover-neutral-700-on-background': '#e2e8f0',
                    '--pf-sys-icon-hover-neutral-900-on-background': '#f8fafc',
                    '--pf-sys-error-on-background': '#f87171',
                    '--pf-sys-success-on-background': '#22c55e',
                    '--pf-sys-warning-on-background': '#fcd34d',
                    '--pf-sys-hover-border-color-on-background': '#64748b',
                    '--pf-sys-hover-box-shadow-on-background': '',
                    '--pf-sys-neutral-surface-50': '#1e293b',
                    '--pf-sys-neutral-surface-50-hsl': '217.24, 32.58%, 17.45%',
                    '--pf-sys-neutral-300-on-surface-50': '#64748b',
                    '--pf-sys-neutral-400-on-surface-50': '#94a3b8',
                    '--pf-sys-neutral-700-on-surface-50': '#e2e8f0',
                    '--pf-sys-neutral-900-on-surface-50': '#f8fafc',
                    '--pf-sys-neutral-surface-100': '#334155',
                    '--pf-sys-neutral-700-on-surface-100': '#e2e8f0',
                    '--pf-sys-neutral-900-on-surface-100': '#f8fafc',
                    '--pf-sys-neutral-surface-200': '#475569',
                    '--pf-sys-neutral-400-on-surface-200': '#94a3b8',
                    '--pf-sys-neutral-900-on-surface-200': '#f8fafc',
                    '--pf-sys-neutral-surface-300': '#64748b',
                    '--pf-sys-neutral-400-on-surface-300': '#94a3b8',
                    '--pf-sys-neutral-900-on-surface-300': '#f8fafc',
                    '--pf-sys-neutral-surface-400': '#94a3b8',
                    '--pf-sys-neutral-900-on-surface-400': '#f8fafc',
                    '--pf-sys-primary-surface-400': '#059669',
                    '--pf-sys-primary-surface-700': '#6ee7b7',
                    '--pf-sys-primary-on-surface-700': '#134e4a',
                    '--pf-sys-error-surface': '#991b1b',
                    '--pf-sys-error-on-surface': '#fef2f2',
                    '--pf-sys-form-control-indicator-active-surface': '#93c5fd',
                    '--pf-sys-form-control-indicator-active-on-surface': '#1e3a8a',
                    '--pf-sys-action-button-surface': '',
                    '--pf-sys-action-button-on-surface': '#f8fafc',
                    '--pf-sys-action-button-hover-surface': '#64748b',
                    '--pf-sys-action-button-hover-on-surface': '#f8fafc',
                    '--pf-sys-action-button-focus-surface': '',
                    '--pf-sys-action-button-focus-on-surface': '#f8fafc',
                    '--pf-sys-action-button-selected-surface': '#155e75',
                    '--pf-sys-action-button-selected-on-surface': '#ecfeff',
                    '--pf-sys-action-button-disabled-surface': '',
                    '--pf-sys-action-button-disabled-on-surface': '#94a3b8',
                },
            },
            onTemplateSaved: async (res) => {
                setTemplateId(res)
            },
            onDesignStatusUpdate: (res) => console.log('onDesignStatusUpdate', res),
            ...printful_template_id ? { templateId: printful_template_id } : { initProduct: { productId: variants?.blank_pod_id } }
        });

        setDesignMaker(designMaker)
    }, [variants, printful_template_id])

    const generate = useCallback(async () => {
        try {
            if (!TemplateId) return false
            const request = await availableVariants.mutateAsync({ productId: variants._id, provider: variants.provider, templateID: TemplateId })
            const data = request?.data?.data

            let size = {}
            data.flatMap(el => el.sizes.map(sized => size[sized.size] = { value: sized.size, id: sized.id, caption: sized.size }))
            let sizes = []
            Object.keys(size).forEach(element => {
                sizes.push({ value: size[element].value, caption: size[element].caption, })
            });

            const mockups = await mockupGenerator.mutateAsync({
                params: {
                    variant_ids: data.flatMap(el => el.sizes.map(sized => sized.id)),
                    format: 'jpg',
                    product_template_id: TemplateId.toString()
                },
                productID: variants?.blank_pod_id
            })
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
            updateState('printful_template_id', TemplateId)
            close()
        } catch (error) {
            console.log(error);
        }
    }, [TemplateId])

    useEffect(() => {
        if (TemplateId) generate()
    }, [TemplateId])

    useEffect(() => {
        if (!DesignMaker) design()

        return () => {
            setDesignMaker(null)
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

    const uniqe = (data) => {
        const uniqueData = [];
        const duplicates = [];
        data.forEach((obj) => {
            if (!duplicates.includes(obj.value)) {
                duplicates.push(obj.value);
                uniqueData.push(obj);
            }
        });

        return uniqueData
    }

    const save = useCallback(async () => {
        if (!DesignMaker) return false
        DesignMaker.sendMessage({ event: 'saveDesign' })
    }, [DesignMaker])

    return (
        <AppModal size="7xl" contentProps={{ maxWidth: "1400px", width: "95%" }} close={close} open={open}>
            <VStack align="stretch" spacing={4}>
                <div className={classes.model} ref={ref} id="printful"></div>
                <Flex justifyContent="space-between">
                    <BasicButton onClick={close} variant="outline" isDisabled={availableVariants.isLoading || mockupGenerator.isLoading}>Discard</BasicButton>
                    <BasicButton onClick={save} disabled={Boolean(productID) && publish_product} isLoading={availableVariants.isLoading || mockupGenerator.isLoading}>Save</BasicButton>
                </Flex>
            </VStack>
        </AppModal>
    )
}

export default Printful