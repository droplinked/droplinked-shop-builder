import { Box, Flex, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import LoadingComponent from 'components/common/loading-component/LoadingComponent'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext, useMemo } from 'react'
import appUploadImageContext from '../../context'
import UploadImagesList from './parts/list/UploadImagesList'

function DefaultHoverBox() {
    const { openFile, isLoading, values, mode } = useContext(appUploadImageContext)

    const checkSingleImage = useMemo(() => ["single", "horizontal"].includes(mode) && values && values.length, [values])
    const isHorizontal = mode === "horizontal"

    return (
        <SimpleGrid columns={mode === "multi" ? 4 : 1} spacing={4}>
            <Box width={mode === "multi" ? "auto" : "100%"}>
                <Flex
                    onClick={() => openFile()}
                    justifyContent="center"
                    position="relative"
                    cursor="pointer"
                    padding={isHorizontal ? "0 20px" : "10px 10px"}
                    backgroundColor="#141414"
                    alignItems="center"
                    overflow={isHorizontal ? "hidden" : "unset"}
                    height={isHorizontal ? checkSingleImage ? "80px" : "auto" : "200px"}
                >
                    {isLoading && <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)"><LoadingComponent /></Box>}
                    {!isLoading && checkSingleImage ? (
                        <Flex width="100%" justifyContent="center"><Image position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" src={values} maxWidth="90%" maxHeight="90%" /></Flex>
                    ) : (
                        <Flex textAlign="center" gap={isHorizontal ? "20px" : "0"} alignItems="center" flexDirection={isHorizontal ? "row" : "column"} visibility={isLoading || checkSingleImage ? "hidden" : "visible"}>
                            <>
                                <Flex justifyContent="center"><AppIcons.Upload width={isHorizontal ? "24px" : "50px"} /></Flex>
                                <AppTypography size={isHorizontal ? "14px" : '16px'} textAlign={isHorizontal ? "left" : "center"} color="#666">
                                    Upload JPG, JPEG, PNG
                                    {isHorizontal ? null : <br />}
                                    (Max 5 MB)
                                </AppTypography>
                            </>
                        </Flex>
                    )}
                </Flex>
            </Box>
            {mode === "multi" && <UploadImagesList />}
        </SimpleGrid >
    )
}

export default DefaultHoverBox