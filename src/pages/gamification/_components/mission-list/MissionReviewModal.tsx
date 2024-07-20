import { Box, Divider, Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppImage from 'components/common/image/AppImage';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import React, { useState } from 'react';
import GamificationSpinner from './_components/gamificationSpinner/GamificationSpinner';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    selectedMission: any
}

function MissionReviewModal({ isOpen, onClose }: Props) {
    const [isLoading, setLoading] = useState(false)

    return (
        <AppModal open={isOpen} close={onClose} contentProps={{ padding: 4 }}>
            <Flex direction={"column"} gap={4}>
                <Flex alignItems={"center"} gap={"10px"}>
                    <AppImage width={"61px"} height={"61px"} borderRadius={"50%"} src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/0b8e0a77d93d97d0f33c543dce8e35aeac0a11ffa70d6e09baadc023143c92b6.png_or.png" />
                    <Flex direction={"column"} gap={"10px"} fontSize={12} fontWeight={700}>
                        <AppTypography fontSize={16} fontWeight={700} color={"#2BCFA1"}>Mission Title: <Box as='span' color={"#fff"}>Create Tile</Box></AppTypography>
                        <AppTypography fontSize={12} fontWeight={700} color={"#2BCFA1"}>Mission Category: <Box as='span' color={"#fff"}>Products</Box></AppTypography>
                    </Flex>
                </Flex>
                <Divider margin={0} height={"2px"} borderColor={"#292929"} />
                <Box position={"relative"}>
                    {isLoading && <GamificationSpinner />}
                    <AppTypography fontSize={16} fontWeight={500} color={"#C2C2C2"} filter={isLoading ? "blur(4px)" : "none"}>
                        <Box as='span' color={"#2BCFA1"}>Mission Description:</Box> {" "}
                        Design and add a unique product tile to your storefront. A product tile visually represents your product, featuring images, descriptions, and pricing information, making it easy for customers to discover and purchase your offerings. This enhances the browsing experience and drives engagement by showcasing your products in an attractive and organized manner.
                    </AppTypography>
                </Box>
                <Divider margin={0} height={"2px"} borderColor={"#292929"} />
                <AppTypography fontSize={16} fontWeight={700} color={"#2BCFA1"}>Points: <Box as='span' color={"#C2C2C2"}>25</Box></AppTypography>
                {!isLoading && <BasicButton alignSelf={"center"} onClick={() => setLoading(true)}>Review Status</BasicButton>}
                {isLoading && <BasicButton alignSelf={"center"} onClick={() => setLoading(false)}>Cancel</BasicButton>}

            </Flex>
        </AppModal>
    )
}

export default MissionReviewModal