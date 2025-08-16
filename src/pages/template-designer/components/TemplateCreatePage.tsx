import { Editor, EditorProps } from 'droplinked-designer-configs';
import 'droplinked-designer-configs/dist/droplinked-designer-configs.css';
import { Data } from 'droplinked-designer-core';
import "droplinked-designer-core/dist/index.css";
import React from 'react';
import { appDevelopment } from 'utils/app/variable';
import useAppStore from 'stores/app/appStore';
import useTemplate from '../hooks/useTemplate';
import { Flex, Spinner, useBreakpointValue } from '@chakra-ui/react';
import { compressToBase64, decompressFromBase64 } from "lz-string"
import { useNavigate } from 'react-router-dom';
import DesktopOnlyNotice from './DesignerPage/DesktopOnlyNotice';
import "../style/fonts.css"

function TemplateCreatePage() {
    const navigate = useNavigate()
    const { isLoadingTemplate, isUpdatingTemplate, templateData, updateTemplate } = useTemplate()
    const { shop: { name } } = useAppStore()
    const shouldShowDesktopNotice = useBreakpointValue({ base: true, lg: false })

    const data: Data = isLoadingTemplate ? {} : JSON.parse(decompressFromBase64(templateData))

    const editorProps: EditorProps = {
        initialData: data,
        shopName: name,
        onUpdate: (data: Data) => {
            console.log(data);
            updateTemplate(compressToBase64(JSON.stringify(data)))
        },
        publishLoading: isUpdatingTemplate,
        iframe: { enabled: false },
        themeName: "Theme",
        isLive: true,
        isNewTheme: false,
        onExit: () => navigate(-1),
        updateData: {
            author: "droplinked",
            changes: 1,
            lastUpdate: "Unknown",
            url: `https://${appDevelopment ? 'dev.' : ''}droplinked.io/${name}`
        }
    }

    if (shouldShowDesktopNotice) return <DesktopOnlyNotice />

    return (
        <>
            {isLoadingTemplate &&
                <Flex height="100dvh" justifyContent="center" alignItems="center">
                    <Spinner color='#fff' size="lg" />
                </Flex>
            }
            {!isLoadingTemplate && <Editor {...editorProps} />}
        </>
    )
}

export default TemplateCreatePage