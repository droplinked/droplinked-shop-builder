import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useDropzone } from 'react-dropzone'

function FileUpload({ onFileChange }: { onFileChange: (file: File) => void }) {
    const { t } = useLocaleResources('products');
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            const selectedFile = acceptedFiles[0]
            onFileChange(selectedFile)
        },
        multiple: false,
        accept: { 'text/csv': ['.csv'] }
    })

    const dropMessage = isDragActive ?
        <AppTypography fontSize={14} color="#fff">{t('FileUpload.dropHere')}</AppTypography>
        :
        <>
            <AppTypography fontSize={14} color="#fff">
                <Box as="span" fontWeight={600} color="#179EF8" textDecoration="underline">{t('FileUpload.click')}</Box> {" "}
                {t('FileUpload.dragDropText')}
            </AppTypography>
            <AppTypography color="text.subtext.placeholder.dark">{t('FileUpload.supportedFormats')}</AppTypography>
        </>


    return (
        <Flex
            height="288px"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={3}
            border="1px dashed"
            borderColor="neutral.gray.700"
            borderRadius={8}
            cursor="pointer"
            {...getRootProps()}
        >
            <input {...getInputProps()} type="file" name="file" aria-label={t('FileUpload.uploadFile')} />
            <AppIcons.HeaderImage />
            {dropMessage}
        </Flex>
    )
}

export default FileUpload