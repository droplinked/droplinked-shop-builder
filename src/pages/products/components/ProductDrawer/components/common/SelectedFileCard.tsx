import { Center, Flex, Text } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    previewImage?: string
    fileName?: string
    fileSize?: string
}

export default function SelectedFileCard({ previewImage, fileName, fileSize, children }: Props) {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={4}
            borderRadius={8}
            border="1px solid #292929"
            padding={3}
            pr={5}
            sx={{ button: { padding: '10px', bg: 'none', _hover: { bg: 'none' } } }}
        >
            {previewImage ?
                <AppImage flexShrink={0} width={14} height={14} borderRadius={8} src={previewImage} />
                :
                <Center flexShrink={0} width={14} height={14} borderRadius={4} bg="#292929">
                    <AppIcons.Document />
                </Center>
            }
            <FileDetails fileName={fileName} fileSize={fileSize} />
            {children}
        </Flex>
    )
}

export function FileDetails({ fileName, fileSize }) {
    return (
        <Flex flex={1} direction="column" gap={2}>
            {fileName && (
                <Text fontSize={14} fontWeight={500} color="#FFF">
                    {fileName.length > 15 ? fileName.slice(0, 15) + '...' : fileName}
                </Text>
            )}
            {fileSize && (
                <Text fontSize={12} fontWeight={400} color="#7B7B7B">
                    {fileSize} MB
                </Text>
            )}
        </Flex>
    )
}