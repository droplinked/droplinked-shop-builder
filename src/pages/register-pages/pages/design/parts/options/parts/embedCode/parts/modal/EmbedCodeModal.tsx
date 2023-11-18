import { Flex, VStack } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppModal, { IAppModal } from 'components/common/modal/AppModal'
import AppScrollBar from 'components/common/scrollbar';
import { designContext, template_options_defaults } from 'pages/register-pages/pages/design/design-context';
import React, { useContext, useEffect, useState } from 'react'
import ReactJson from 'react-json-view'
import classes from './style.module.scss'

interface IProps extends IAppModal { }

function EmbedCodeModal({ close, open }: IProps) {
    const { methods: { dispatch }, state: { shop: { template_options } } } = useContext(designContext)
    const [Objects, setObjects] = useState(null)

    useEffect(() => {
        setObjects(template_options)
        return () => {
            setObjects(null)
        }
    }, [template_options])    

    return (
        <AppModal open={open} size="4xl" close={close} isCentered={false}>
            <VStack align='stretch' spacing="30px">
                <AppScrollBar className={classes.editor}>
                    <ReactJson
                        theme="google"
                        style={{ fontSize: "13px", borderRadius: "8px" }}
                        onEdit={(edit) => setObjects(edit.updated_src)}
                        onAdd={(edit) => setObjects(edit.updated_src)}
                        onDelete={(edit) => setObjects(edit.updated_src)}
                        src={Objects}
                    />
                </AppScrollBar>
                <Flex justifyContent="space-between">
                    <BasicButton variant='outline' onClick={close}>Cancel</BasicButton>
                    <Flex gap="20px">
                        <BasicButton variant='ghost' onClick={() => {
                            dispatch({ type: "updateShop", params: { template_options: template_options_defaults } })
                            close()
                        }}>reset</BasicButton>
                        <BasicButton onClick={() => {
                            dispatch({ type: "updateShop", params: { template_options: Objects } })
                            close()
                        }}>Save</BasicButton>
                    </Flex>
                </Flex>
            </VStack>
        </AppModal >
    )
}

export default EmbedCodeModal