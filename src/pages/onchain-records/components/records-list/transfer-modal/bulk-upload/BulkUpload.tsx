import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import FileUpload from 'components/redesign/file-upload/FileUpload'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { FilePreview } from './FilePreview'

interface Props {
    file: File;
    setFile: (file: File) => void;
}

export default function BulkUpload({ file, setFile }: Props) {
    const { t } = useLocaleResources("onchainRecords")

    return (
        <Flex flexDirection="column" gap={{ base: 4, md: 6, lg: 9 }}>
            <FileUpload
                onFileChange={(file) => setFile(file)}
                accept={{ 'text/csv': ['.csv'] }}
                icon={<AppIcons.Document />}
                text={{
                    dragActiveText: t("drag_active_text"),
                    footerText: t("uploader_footer_text")
                }}
            />

            <FilePreview file={file} onFileChange={(file) => setFile(file)} />
        </Flex>
    )
}
