import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { useDropzone } from 'react-dropzone'

function FileUpload({ onFileChange }: { onFileChange: (file: File) => void }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            const selectedFile = acceptedFiles[0]
            onFileChange(selectedFile)
        },
        multiple: false,
        accept: { 'text/csv': ['.csv'] }
    })

    const dropMessage = isDragActive ?
        <AppTypography fontSize={14} color="#fff">Drop the file here ...</AppTypography>
        :
        <>
            <AppTypography fontSize={14} color="#fff">
                <Box as="span" fontWeight={600} color="#179EF8" textDecoration="underline">Click</Box> {" "}
                to add a new file or drag and drop it here.
            </AppTypography>
            <AppTypography color="text.subtextPlaceholder.dark">Just CSV (Up to 1MB)</AppTypography>
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
            <input {...getInputProps()} type="file" name="file" aria-label="Upload file" />
            <AppIcons.HeaderImage />
            {dropMessage}
        </Flex>
    )
}

export default FileUpload