import { Box, Flex, FlexProps, Spinner } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { Accept, useDropzone } from 'react-dropzone'

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
        dragActiveText: "Drop the file here ...",
        footerText: "JPG, JPEG, PNG, MP4 and MOV (up to 10MB each)"
    },
    accept = {}
}: Props) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple,
        accept,
        onDrop: (acceptedFiles: File[]) => {
            const selectedFile = acceptedFiles[0]
            onFileChange(selectedFile)
        }
    })

    const dropMessage = isDragActive ?
        <AppTypography fontSize={14} color="#fff">{text.dragActiveText}</AppTypography>
        :
        <>
            <AppTypography fontSize={14} color="#fff">
                <Box as="span" fontWeight={500} color="#179EF8" textDecoration="underline">Click</Box> {" "}
                or drag & drop here
            </AppTypography>
            <AppTypography color="text.subtextPlaceholder.dark">{text.footerText}</AppTypography>
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
            <input {...getInputProps()} type="file" name="file" aria-label="Upload file" />
            {
                isLoading ?
                    <Spinner width={10} height={10} thickness='2px' color="primary.default" />
                    :
                    <>
                        {icon}
                        {dropMessage}
                    </>
            }

        </Flex>
    )
}

export default FileUpload