import { Flex, useMediaQuery } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

export default function FakeRecordItem() {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
    const endCount = isSmallerThan768 ? 8 : 15;
    const walletAddress = "0xe29E7479c23Db494aAa0D36C93844B2d79f50c2245".slice(0, endCount) + "...";

    return (
        <Flex flexDirection={"column"} gap={3} cursor={"pointer"}>
            <AppImage
                borderRadius={"8px"}
                src='https://upload-file-droplinked.s3.amazonaws.com/e1c6a3168548e724fa69574b83807d539b262af10f86a1de35683c2d0b56f0da.png'
                alt='productImage'
                userSelect={"none"}
            />
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Flex gap={2} alignItems={"center"}>
                    <AppIcons.ETHOutlined color='#6782EB' />
                    <AppTypography color={"#fff"} fontSize={14}>EVM 1</AppTypography>
                </Flex>
                <AppTypography color={"#7b7b7b"}>{walletAddress}</AppTypography>
            </Flex>
            <AppTypography color={"#fff"} fontSize={{ base: 14, lg: 16 }} lineHeight={{ base: "20px", lg: "24px" }}>
                Meta Quest 3S 128GB - 3-Month Trial of Meta Quest+ Included
            </AppTypography>
        </Flex>
    )
}
