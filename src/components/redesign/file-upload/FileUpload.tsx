import { Box, Flex, FlexProps, Spinner } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { Accept, useDropzone } from 'react-dropzone'
import useLocaleResources from '../../../hooks/useLocaleResources/useLocaleResources'
import localCommonEn from '../../../locales/common/en.json'
import localCommonAr from '../../../locales/common/ar.json'

interface Props {
    onFileChange: (file: File) => Promise<void> | void
    multiple?: boolean,
    isLoading?: boolean
    flexProps?: FlexProps
    icon?: React.ReactNode
    text?: { dragActiveText?: string, footerText?: string }
    accept?: Accept
}

function FileUpload({
    onFileChange,
    multiple = false,
    isLoading = false,
    flexProps = {},
    icon = <AppIcons.HeaderImage />,
    text = {
        dragActiveText: undefined,
        footerText: undefined
    },
    accept = {}
}: Props) {
    const { t } = useLocaleResources('common', { en: localCommonEn, ar: localCommonAr });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple,
        accept,
        onDrop: (acceptedFiles: File[]) => {
            const selectedFile = acceptedFiles[0]
            onFileChange(selectedFile)
        }
    })

    const dropMessage = isDragActive ?
        <AppTypography fontSize={14} color="#fff">
            {text.dragActiveText || t('fileUpload.dragActive')}
        </AppTypography>
        :
        <>
            <AppTypography fontSize={14} color="#fff">
                <Box as="span" fontWeight={500} color="#179EF8" textDecoration="underline">
                    {t('fileUpload.click')}
                </Box> {" "}
                {t('fileUpload.dragAndDrop')}
            </AppTypography>
            <AppTypography color="text.subtext.placeholder.dark">
                {text.footerText || t('fileUpload.defaultFooter')}
            </AppTypography>
        </>

    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={3}
            border="1px dashed"
            borderColor="neutral.gray.800"
            borderRadius={8}
            padding="24px 16px"
            bgColor="neutral.gray.1000"
            cursor="pointer"
            {...flexProps}
            {...getRootProps()}
        >
            <input {...getInputProps()} type="file" name="file" aria-label={t('fileUpload.ariaLabel')} />
            {
                isLoading ?
                    <Spinner width={10} height={10} thickness='2px' color="main.primary" />
                    :
                    <>
                        {icon}
                        {dropMessage}
                    </>
            }

        </Flex>
    );
}

export default FileUpload;
