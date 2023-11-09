import { Box, Flex, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import LoadingComponent from 'components/common/loading-component/LoadingComponent'
import AppTypography from 'components/common/typography/AppTypography'
import { getFileNameFromUrl, getImageFileSize } from 'lib/utils/heper/image'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import appUploadImageContext from '../../context'
import UploadImagesList from './parts/list/UploadImagesList'
import classes from './style.module.scss'

function DefaultHoverBox() {
    const { openFile, isLoading, values, mode } = useContext(appUploadImageContext)
    const [Size, setSize] = useState(null)

    const checkSingleImage = useMemo(() => ["single", "horizontal"].includes(mode) && values && values.length, [values])
    const isHorizontal = mode === "horizontal"

    useEffect(() => {
        if (checkSingleImage && isHorizontal && typeof values === "string") getImageFileSize(values).then((sizeKB) => setSize(sizeKB));
    }, [values, isHorizontal, checkSingleImage])


    return (
        <SimpleGrid columns={mode === "multi" ? 4 : 1} spacing={4}>
            <Box width={mode === "multi" ? "auto" : "100%"}>
                <Flex
                    onClick={() => openFile()}
                    justifyContent={isHorizontal ? "left" : "center"}
                    position="relative"
                    cursor="pointer"
                    borderRadius="8px"
                    padding={isHorizontal ? checkSingleImage ? "0" : "0 20px" : "10px 10px"}
                    backgroundColor={isHorizontal && checkSingleImage ? "none" : "#141414"}
                    alignItems="center"
                    overflow={isHorizontal ? "hidden" : "unset"}
                    height={isHorizontal ? checkSingleImage ? "80px" : "auto" : "200px"}
                >
                    {isLoading && <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)"><LoadingComponent /></Box>}
                    {!isLoading && checkSingleImage && typeof values === "string" ? (
                        <>
                            {isHorizontal ?
                                <Flex gap="18px" className={classes.iconUpload}>
                                    <Box position="relative">
                                        <Flex position="absolute" className={classes.icon} display="none" top="0" left="0" bottom="0" right="0" backgroundColor="rgba(0,0,0,.8)" justifyContent="center" alignItems="center"><AppIcons.Upload width="18px" /></Flex>
                                        <Image src={values} borderRadius="3px" border="1px solid #262626" width="48px" height="48px" />
                                    </Box>
                                    <VStack align="stretch">
                                        <AppTypography size="12px" color="#C2C2C2" weight='bolder'>{getFileNameFromUrl(values)}</AppTypography>
                                        <AppTypography size="12px" color="#808080">{Size} kb</AppTypography>
                                    </VStack>
                                </Flex>
                                : <Flex width="100%" justifyContent="center"><Image position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" src={values} maxWidth="90%" maxHeight="90%" /></Flex>}
                        </>
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