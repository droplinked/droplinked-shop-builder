import { Box, Flex, VStack } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
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
import PrintfulModel from './model';
import classes from './style.module.scss'

interface IProps extends IAppModal {
    generate_externaID: string
}

function Printful({ close, open, generate_externaID }: IProps) {
    const { methods: { updateState }, state: { printful_template_id, publish_product, pod_blank_product_id }, productID, store: { state: { variants }, methods: { update } } } = useContext(productContext)
    const availableVariants = useMutation((params: IpodAvailableVariantsService) => podAvailableVariantsService(params))
    const mockupGenerator = useMutation((params: ImockupGeneratorService) => mockupGeneratorService(params))
    const [DesignMaker, setDesignMaker] = useState(null)
    const [TemplateId, setTemplateId] = useState(null)
    const [UUID, setUUID] = useState(null)
    const ref = useRef<any>()
    const { refactorImage } = introductionClass
    const { uniqe, styles } = PrintfulModel

    const design = useCallback(async () => {
        const data = await axiosInstance.post('pod/printful/nonces', {
            external_product_id: generate_externaID,
            external_customer_id: generate_externaID
        })

        //@ts-ignore
        const designMaker = new PFDesignMaker({
            elemId: ref.current?.id,
            nonce: data?.data?.data?.nonce,
            style: styles,
            onTemplateSaved: async (res) => {
                setTemplateId(res)
            },
            onDesignStatusUpdate: (res) => console.log('onDesignStatusUpdate', res),
            ...printful_template_id ? { templateId: printful_template_id } : { initProduct: { productId: pod_blank_product_id.toString() } }
        });

        setDesignMaker(designMaker)
    }, [pod_blank_product_id, printful_template_id, generate_externaID])

    const generate = useCallback(async () => {
        try {
            if (!TemplateId) return false
            const request = await availableVariants.mutateAsync({ productId: pod_blank_product_id, provider: "PRINTFUL", templateID: TemplateId })
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
                    product_template_id: TemplateId.toString()
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
            updateState('printful_template_id', TemplateId)
            close()
        } catch (error) {
            setTemplateId(null)
            console.log(error);
        }
    }, [pod_blank_product_id, TemplateId])

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

    const save = useCallback(async () => {
        if (!DesignMaker) return false
        DesignMaker.sendMessage({ event: 'saveDesign' })
    }, [DesignMaker])

    return (
        <AppModal size="7xl" isCentered={false} title="Design Product" contentProps={{ maxWidth: "1400px", width: "95%" }} close={close} open={open}>
            <VStack align="stretch" spacing={4} paddingTop="20px">
                <div className={classes.model} ref={ref} id="printful"></div>
                <Flex justifyContent="space-between">
                    <BasicButton onClick={close} variant="outline" isDisabled={availableVariants.isLoading || mockupGenerator.isLoading}>Discard</BasicButton>
                    <BasicButton onClick={save} isDisabled={(Boolean(productID) && publish_product) || availableVariants.isLoading || mockupGenerator.isLoading} isLoading={availableVariants.isLoading || mockupGenerator.isLoading}>Save</BasicButton>
                </Flex>
            </VStack>
        </AppModal>
    )
}

export default Printful