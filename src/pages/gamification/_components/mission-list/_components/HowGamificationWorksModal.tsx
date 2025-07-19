import { Box, Divider, Flex, SimpleGrid } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppImage from 'components/common/image/AppImage';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

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
    const { t } = useLocaleResources("gamification")
    const steps = t("HowGamificationWorksModal.steps", { returnObjects: true })

    return (
        <AppModal open={isOpen} close={onClose} scrollBehavior="inside" size="5xl" contentProps={{ padding: 4, margin: 4 }}>
            <Flex direction={"column"} gap={4}>
                <AppTypography textAlign={"center"} fontSize={16} fontWeight={700} color={"#2BCFA1"}>{t("HowGamificationWorksModal.title")}</AppTypography>
                <Divider height={"2px"} borderColor={"neutral.gray.800"} />
                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} columnGap={4} rowGap={"80px"}>
                    <Flex direction={'column'} gap={4}>
                        <AppImage height={"205px"} objectFit={"cover"} src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/300dd99cbedab92ea74dd88f6c565985c9cce1f61040cd48071b7c4c1e9fab8b.png_or.png" />
                        <Box>
                            <AppTypography textAlign={"center"} fontSize={24} fontWeight={700} color={"#2BCFA1"}>{steps?.[0]?.title}</AppTypography>
                            <AppTypography textAlign={"center"} fontSize={16} fontWeight={500} color={"#C2C2C2"}>{steps?.[0]?.description}</AppTypography>
                        </Box>
                    </Flex>
                    <Flex direction={'column'} gap={4}>
                        <AppImage height={"205px"} objectFit={"cover"} src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/be52a45d24b3aa27fbd58bc50bdf4e97b40aad0ffb269c3ba9cb12698cc25ac8.png_or.png" />
                        <Box>
                            <AppTypography textAlign={"center"} fontSize={24} fontWeight={700} color={"#2BCFA1"}>{steps?.[1]?.title}</AppTypography>
                            <AppTypography textAlign={"center"} fontSize={16} fontWeight={500} color={"#C2C2C2"}>{steps?.[1]?.description}</AppTypography>
                        </Box>
                    </Flex>
                    <Flex direction={'column'} gap={4}>
                        <AppImage height={"205px"} objectFit={"cover"} src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/bc0ad7a33c95ebed169ebd8ded823e08570501bdd4090feb827f97d687aaa601.png_or.png" />
                        <Box>
                            <AppTypography textAlign={"center"} fontSize={24} fontWeight={700} color={"#2BCFA1"}>{steps?.[2]?.title}</AppTypography>
                            <AppTypography textAlign={"center"} fontSize={16} fontWeight={500} color={"#C2C2C2"}>{steps?.[2]?.description}</AppTypography>
                        </Box>
                    </Flex>
                </SimpleGrid>
                <BasicButton alignSelf={"center"} variant='ghost' onClick={onClose}>{t("common:close")}</BasicButton>
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