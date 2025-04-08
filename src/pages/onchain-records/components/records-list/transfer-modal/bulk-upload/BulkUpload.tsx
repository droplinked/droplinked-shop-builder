import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import ExternalLink from 'components/redesign/external-link/ExternalLink'
import FileUpload from 'components/redesign/file-upload/FileUpload'
import React from 'react'
import { FilePreview } from './FilePreview'

interface Props {
    file: File;
    setFile: (file: File) => void;
}

export default function BulkUpload({ file, setFile }: Props) {

    return (
        <Flex flexDirection={"column"} gap={{ base: 4, md: 6, lg: 9 }}>
            <FileUpload
                onFileChange={(file) => setFile(file)}
                accept={{ 'text/csv': ['.csv'] }}
                dropDescription='CSV (Up to 1MB)'
                icon={<AppIcons.Document />}
                boxProps={{
                    padding: 12
                }}
                title={
                    <Flex gap={1}>
                        <ExternalLink fontSize={14}>Click</ExternalLink>
                        <AppTypography fontSize={14} color={"#fff"}>
                            or drag & drop here
                        </AppTypography>
                    </Flex>
                }
            />

            <FilePreview file={file} onFileChange={(file) => setFile(file)} />
        </Flex>
    )
}
