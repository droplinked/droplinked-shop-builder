import { Box, Divider, Flex, SimpleGrid } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppImage from 'components/common/image/AppImage';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

interface StepProps {
    image: string;
    title: string;
    description: string;
}

function HowGamificationWorksModal({ isOpen, onClose }: Props) {
    return (
        <AppModal open={isOpen} close={onClose} scrollBehavior="inside" size="5xl" contentProps={{ padding: 4, margin: 4 }}>
            <Flex direction={"column"} gap={4}>
                <AppTypography textAlign={"center"} fontSize={16} fontWeight={700} color={"#2BCFA1"}>How do missions work?</AppTypography>
                <Divider margin={0} height={"2px"} borderColor={"#292929"} />
                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} columnGap={4} rowGap={"80px"}>
                    <Flex direction={'column'} gap={4}>
                        <AppImage height={"205px"} objectFit={"cover"} src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/300dd99cbedab92ea74dd88f6c565985c9cce1f61040cd48071b7c4c1e9fab8b.png_or.png" />
                        <Box>
                            <AppTypography textAlign={"center"} fontSize={24} fontWeight={700} color={"#2BCFA1"}>Select and Understand Your Mission</AppTypography>
                            <AppTypography textAlign={"center"} fontSize={16} fontWeight={500} color={"#C2C2C2"}>Browse through your mission list, choose a mission, and click on "More Details" to read the requirements and tasks needed to complete it.</AppTypography>
                        </Box>
                    </Flex>
                    <Flex direction={'column'} gap={4}>
                        <AppImage height={"205px"} objectFit={"cover"} src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/be52a45d24b3aa27fbd58bc50bdf4e97b40aad0ffb269c3ba9cb12698cc25ac8.png_or.png" />
                        <Box>
                            <AppTypography textAlign={"center"} fontSize={24} fontWeight={700} color={"#2BCFA1"}>Verify Your Mission Completion</AppTypography>
                            <AppTypography textAlign={"center"} fontSize={16} fontWeight={500} color={"#C2C2C2"}>After completing the required tasks, go back to the mission's card and click on "Check Completion" to verify if you've met all the criteria.</AppTypography>
                        </Box>
                    </Flex>
                    <Flex direction={'column'} gap={4}>
                        <AppImage height={"205px"} objectFit={"cover"} src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/bc0ad7a33c95ebed169ebd8ded823e08570501bdd4090feb827f97d687aaa601.png_or.png" />
                        <Box>
                            <AppTypography textAlign={"center"} fontSize={24} fontWeight={700} color={"#2BCFA1"}>Earn Points and Track Progress</AppTypography>
                            <AppTypography textAlign={"center"} fontSize={16} fontWeight={500} color={"#C2C2C2"}>If the mission is successfully completed, you will see the amount of points earned. and your completed mission will be marked in the gamification tab.</AppTypography>
                        </Box>
                    </Flex>
                </SimpleGrid>
                <BasicButton alignSelf={"center"} variant='ghost' onClick={onClose}>Close</BasicButton>
            </Flex>
        </AppModal>
    )
}

function Step({ image, title, description }: StepProps) {
    return (
        <Flex direction={'column'} gap={4}>
            <AppImage src={image} />
            <Box>
                <AppTypography textAlign={"center"} fontSize={24} fontWeight={700} color={"#2BCFA1"}>{title}</AppTypography>
                <AppTypography textAlign={"center"} fontSize={16} fontWeight={500} color={"#C2C2C2"}>{description}</AppTypography>
            </Box>
        </Flex>
    )
}

export default HowGamificationWorksModal