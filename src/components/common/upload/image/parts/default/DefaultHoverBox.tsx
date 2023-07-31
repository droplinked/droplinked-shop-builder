import { Box, BoxProps, Flex, HStack, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import LoadingComponent from 'components/common/loading-component/LoadingComponent'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext, useMemo } from 'react'
import appUploadImageContext from '../../context'
import UploadImagesList from './parts/list/UploadImagesList'

function DefaultHoverBox() {
    const { openFile, isLoading, values, mode } = useContext(appUploadImageContext)

    const checkSingleImage = useMemo(() => mode === "single" && values.length, [values])

    return (
        <Flex gap={4}>
            <Box width={mode === "multi" ? "300px" : "100%"}>
                <Flex
                    onClick={() => openFile()}
                    justifyContent="center"
                    position="relative"
                    cursor="pointer"
                    padding="30px 10px"
                    backgroundColor="#141414"
                    backgroundImage={!isLoading && checkSingleImage ? values : null}
                    backgroundSize="auto 90%"
                    backgroundRepeat="no-repeat"
                    backgroundPosition="center"
                >
                    {isLoading && <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)"><LoadingComponent /></Box>}
                    <VStack textAlign="center" align="stretch" visibility={isLoading || checkSingleImage ? "hidden" : "visible"}>
                        <Flex justifyContent="center"><AppIcons.upload width="50px" /></Flex>
                        <AppTypography size='16px' color="#666">
                            Upload JPG, JPEG, PNG
                            <br />
                            (Max 5 MB)
                        </AppTypography>
                    </VStack>
                </Flex>
            </Box>
            {mode === "multi" && <Box width="100%"><UploadImagesList /></Box>}
        </Flex>
    )
}

export default DefaultHoverBox