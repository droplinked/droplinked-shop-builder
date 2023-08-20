import { Box, Flex, VStack } from '@chakra-ui/react';
import axios from 'axios';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppModal, { IAppModal } from 'components/common/modal/AppModal';
import axiosInstance from 'lib/apis/axiosConfig';
import { productContext } from 'pages/product/single/context';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import classes from './style.module.scss'

interface IProps extends IAppModal { }

function Printful({ close, open }: IProps) {
    const { store: { state: { variants } } } = useContext(productContext)
    const [DesignMaker, setDesignMaker] = useState(null)
    const ref = useRef<any>()

    const test = useCallback(async () => {
        const data = await axiosInstance.post('pod/printful/nonces', {
            external_product_id: "15489",
            external_customer_id: "15489"
        })

        //@ts-ignore
        const designMaker = new PFDesignMaker({
            elemId: ref.current?.id,
            nonce: data?.data?.data?.nonce,
            onTemplateSaved: async (res) => {
                // try {
                //     const data: any = await fetch(`https://api.printful.com/product-templates/${res}`, {
                //         headers: {
                //             'Authorization': `Bearer ghkPL3XOhhx7QSoJiOIvHWdHaWKLUeOHsAGKq94o`,
                //         }
                //     })
                //     console.log(data?.data?.data?.result?.mockup_file_url);

                // } catch (error) {
                //     console.log(error);
                // }
            },
            onDesignStatusUpdate: (res) => console.log('onDesignStatusUpdate', res),
            initProduct: {
                productId: variants?.blank_pod_id,
                forceOrientation: "horizontal"
            },
        });

        setDesignMaker(designMaker)
    }, [variants])

    useEffect(() => {
        test()
    }, [])

    return (
        <AppModal size="7xl" contentProps={{ maxWidth: "1400px", width: "95%" }} close={close} open={open}>
            <VStack align="stretch" spacing={4}>
                <Flex flexDirection="row-reverse">
                    <BasicButton onClick={() => {
                        if (!DesignMaker) return false
                        DesignMaker.sendMessage({ event: 'saveDesign' })
                        // DesignMaker.({ event: 'saveDesign')
                    }}>Save</BasicButton>
                </Flex>
                <div className={classes.model} ref={ref} id="printful"></div>
            </VStack>
        </AppModal>
    )
}

export default Printful