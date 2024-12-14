import { Button, Flex, Link, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import MessageBox from 'components/redesign/message-box/MessageBox'
import { fileSizeInMB } from 'lib/utils/helpers/helpers'
import React from 'react'
import FileUpload from '../../common/FileUpload'
import SelectedFileCard from '../../common/SelectedFileCard'

interface Props {
    selectedFile?: File
    onFileChange: (file: File) => void
}

function CustomShippingFileUpload({ selectedFile, onFileChange }: Props) {
    const handleFileRemove = () => onFileChange(null)

    return (
        <Flex direction="column" gap={4}>
            <Flex flexDirection="column" gap={1}>
                <Text fontSize={14} fontWeight={500} color="#FFF">File</Text>
                <Text fontSize={14} color="#7B7B7B">Upload Shipping Details File.</Text>
            </Flex>

            <FileUpload
                onFileChange={onFileChange}
                icon={<AppIcons.FileUpload />}
                accept={{ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }}
                text={{ footerText: 'xlsx' }}
            />

            {selectedFile && (
                <SelectedFileCard
                    fileName={selectedFile.name}
                    fileSize={fileSizeInMB(selectedFile)}
                >
                    <Button onClick={handleFileRemove}>
                        <AppIcons.RedTrash width={20} height={20} />
                    </Button>
                </SelectedFileCard>
            )}

            <MessageBox
                title="Sample File"
                description="Use the sample template to ensure correct file format and details."
            >
                <Link
                    mt={1}
                    href="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/622e15c810c2e7fb08c93b7ffa185228feb223ea821a3a596dfdd64c63854597_or.xlsx"
                    textDecoration="underline"
                    fontSize={12}
                    fontWeight={500}
                    color="#179EF8"
                    cursor="pointer"
                    download="Droplinked-Shipping-Template.xlsx"
                >
                    Download Template
                </Link>
            </MessageBox>
        </Flex>
    )
}

export default CustomShippingFileUpload