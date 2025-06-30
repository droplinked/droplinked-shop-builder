// import useProductPageStore from 'pages/products/stores/ProductPageStore'
// import UrlInput from './UrlInput'
// import RecentTasks from './RecentTasks'
import { Box, Center, Flex, ModalBody } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import { UseImportWithUrl } from 'pages/products/hooks/useImportWithUrl'
import React from 'react'
import { getFileSizeInMB } from 'utils/helpers'
import FileUpload from './FileUpload'


interface Props {
    file: File | null
    onFileChange: (file: File | null) => void
    importWithUrl?: UseImportWithUrl
}

export default function ImportProductModalBody({ file, onFileChange, importWithUrl }: Props) {
    // const { crawlerError } = useProductPageStore()
    // const { recentTasks, recentTasksLoading, getProducts, getProductsLoading } = importWithUrl

    return (
        <ModalBody
            display="flex"
            flexDirection="column"
            gap={4}
            paddingBlock={{ lg: '48px !important', md: '32px !important', base: '16px !important' }}
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor="neutral.gray.800"
        >
            <FileUpload onFileChange={onFileChange} />
            {file && <FilePreview file={file} onFileChange={onFileChange} />}
            {/* <UrlInput isDisabled={!!file} crawlerError={crawlerError} /> */}
            {/* <RecentTasks
                isLoading={recentTasksLoading}
                recentTasks={recentTasks}
                getProducts={getProducts}
                getProductsLoading={getProductsLoading}
            /> */}
        </ModalBody>
    )
}

function FilePreview({ file, onFileChange }: Props) {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={8}
            padding={3}
            paddingRight={5}
        >
            <Flex alignItems="center" gap={4}>
                <Center width={14} height={14} borderRadius={4} bgColor="neutral.gray.800">
                    <AppIcons.Document />
                </Center>
                <Box>
                    <AppTypography fontWeight={500} color="#fff">
                        {file.name}
                    </AppTypography>
                    <AppTypography mt={2} fontSize={12} color="text.subtext.placeholder.dark">
                        {getFileSizeInMB(file)} MB
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