import { Editor, EditorProps } from 'droplinked-designer-configs';
import 'droplinked-designer-configs/dist/droplinked-designer-configs.css';
import { Data } from 'droplinked-designer-core';
import "droplinked-designer-core/dist/index.css";
import React from 'react';
import useAppStore from 'stores/app/appStore';
import useTemplate from '../hooks/useTemplate';
import { Flex, Spinner } from '@chakra-ui/react';
import { compressToBase64, decompressFromBase64 } from "lz-string"
import { getInitialData } from '../data/InitialData';
import { useNavigate } from 'react-router-dom';

function TemplateCreatePage() {
    const navigate = useNavigate()
    const { isLoadingTemplate, isUpdatingTemplate, templateData, updateTemplate } = useTemplate()
    const { shop: { name, shopDesign, backgroundColor, headerIcon, launchDate, logo } } = useAppStore()
    const data: Data = isLoadingTemplate ?
        {} :
        templateData ?
            JSON.parse(decompressFromBase64(templateData))
            : getInitialData({
                backgroundColor,
                headerIcon,
                launchDate,
                logo,
                shopDesign: {
                    backgroundBody: shopDesign.backgroundBody,
                    faviconURL: shopDesign.faviconURL,
                    fontfamily: shopDesign.fontfamily,
                    foreground: shopDesign.foreground,
                    iconHeaderColor: shopDesign.iconHeaderColor,
                    isLogoAsFavicon: shopDesign.isLogoAsFavicon,
                    textColorParagraphs: shopDesign.textColorParagraphs
                }
            })

    const editorProps: EditorProps = {
        initialData: data,
        shopName: name,
        onUpdate: (data: Data) => {
            console.log(data);
            updateTemplate(compressToBase64(JSON.stringify(data)))
        },
        publishLoading: isUpdatingTemplate,
        iframe: { enabled: false },
        onExit: () => navigate(-1)
    }

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