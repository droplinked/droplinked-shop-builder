import { Box, Center, Flex, ModalBody } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import { fileSizeInMB } from 'lib/utils/helpers/helpers'
import React from 'react'
import FileUpload from './FileUpload'

interface Props {
    file: File | null
    onFileChange: (file: File | null) => void
}

export default function ImportProductModalBody({ file, onFileChange }: Props) {
    return (
        <ModalBody
            display="flex"
            flexDirection="column"
            gap={4}
            paddingBlock={{ lg: '48px !important', md: '32px !important', base: '16px !important' }}
            borderTop="1px solid #292929"
            borderBottom="1px solid #292929"
        >
            <FileUpload onFileChange={onFileChange} />
            {file && <FilePreview file={file} onFileChange={onFileChange} />}
        </ModalBody>
    )
}

function FilePreview({ file, onFileChange }: Props) {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            border="1px solid #292929"
            borderRadius={8}
            padding={3}
            paddingRight={5}
        >
            <Flex alignItems="center" gap={4}>
                <Center width={14} height={14} borderRadius={4} bgColor="#292929">
                    <AppIcons.Document />
                </Center>
                <Box>
                    <AppTypography fontWeight={500} color="#fff">
                        {file.name}
                    </AppTypography>
                    <AppTypography mt={2} fontSize={12} color="#7B7B7B">
                        {fileSizeInMB(file)} MB
                    </AppTypography>
                </Box>
            </Flex>

            <Box
                as="button"
                flexShrink={0}
                padding={2}
                onClick={() => onFileChange(null)}
            >
                <AppIcons.RedTrash />
            </Box>
        </Flex>
    )
}