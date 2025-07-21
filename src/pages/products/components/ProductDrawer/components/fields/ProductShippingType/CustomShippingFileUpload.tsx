import { Button, Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import MessageBox from 'components/redesign/message-box/MessageBox'
import { getFileSizeInMB } from 'utils/helpers'
import { parseShippingFileData } from 'pages/products/utils/shippingFileParser'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useEffect, useState } from 'react'
import FileUpload from '../../common/FileUpload'
import SelectedFileCard from '../../common/SelectedFileCard'
import SectionHeader from './SectionHeader'

interface Props {
    onFileParsed: (data: any) => void
}

function CustomShippingFileUpload({ onFileParsed }: Props) {
    const { t } = useLocaleResources('products')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileRemove = () => {
        setSelectedFile(null)
        onFileParsed(null)
    }

    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const parsedData = parseShippingFileData(e.target.result as ArrayBufferLike)
                onFileParsed(parsedData)
            }
            reader.readAsArrayBuffer(selectedFile)
        }
    }, [selectedFile, onFileParsed])

    return (
        <Flex direction="column" gap={4}>
            <SectionHeader
                title={t('CustomShippingFileUpload.title')}
                description={t('CustomShippingFileUpload.description')}
            />

            <FileUpload
                onFileChange={(file) => setSelectedFile(file)}
                icon={<AppIcons.FileUpload />}
                accept={{ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }}
                text={{ footerText: 'xlsx' }}
            />

            {selectedFile && (
                <SelectedFileCard
                    fileName={selectedFile.name}
                    fileSize={getFileSizeInMB(selectedFile)}
                >
                    <Button onClick={handleFileRemove}>
                        <AppIcons.RedTrash width={20} height={20} />
                    </Button>
                </SelectedFileCard>
            )}

            <MessageBox
                title={t('CustomShippingFileUpload.sampleFile.title')}
                description={t('CustomShippingFileUpload.sampleFile.description')}
            >
                <InteractiveText
                    mt={1}
                    fontSize={12}
                    to="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/622e15c810c2e7fb08c93b7ffa185228feb223ea821a3a596dfdd64c63854597_or.xlsx"
                    target="_blank"
                >
                    {t('CustomShippingFileUpload.sampleFile.downloadTemplate')}
                </InteractiveText>
            </MessageBox>
        </Flex>
    )
}

export default CustomShippingFileUpload