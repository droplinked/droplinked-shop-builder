import { Box, Flex, Image } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import * as React from 'react';
import { Link } from 'react-router-dom';

function IconsSection() {
    return (
        <Flex width="100%" direction="column" gap={5} sx={{ p: { fontWeight: 400 } }}>
            <Box display="flex" alignItems="center" gap={4} cursor="pointer" sx={{ svg: { path: { fill: "white" } } }}>
                <AppIcons.SidebarDroplinked width="40px" height="40px" />
                <Image src="https://upload-file-droplinked.s3.amazonaws.com/5e19eaa5a7095f55b005e12397acf5f874ec94aa3923e5e8a04f3abd8787f081.png" width="214px" height="auto" flexShrink="0" />
            </Box>

            <AppTypography fontFamily="Inter" fontWeight={"400"} fontSize={14} color="#B1B1B1">
                Commerce tools to sell and settle transparently.
            </AppTypography>
            <Flex gap={"24px"} mt="1rem">
                <Link to={"https://t.me/droplinked"} target='_blank'>
                    <Box background={"#292929"} display={"flex"} alignItems={"center"} justifyContent={"center"} width={"40px"} borderRadius={"8px"} height={"40px"}>
                        <AppIcons.TelegramOutlined />
                    </Box>
                </Link>
                <Link to={"https://twitter.com/droplinked"} target='_blank'>
                    <Box background={"#292929"} display={"flex"} alignItems={"center"} justifyContent={"center"} width={"40px"} borderRadius={"8px"} height={"40px"}>
                        <AppIcons.XOutlined />
                    </Box>
                </Link>
                <Link to={"https://www.linkedin.com/company/droplinked"} target='_blank'>
                    <Box background={"#292929"} display={"flex"} alignItems={"center"} justifyContent={"center"} width={"40px"} borderRadius={"8px"} height={"40px"}>
                        <AppIcons.LinkedInOutlined />
                    </Box>
                </Link>
                <Link to={"https://www.instagram.com/drop_linked"} target='_blank'>
                    <Box background={"#292929"} display={"flex"} alignItems={"center"} justifyContent={"center"} width={"40px"} borderRadius={"8px"} height={"40px"}>
                        <AppIcons.InstagramOutlined />
                    </Box>
                </Link>
            </Flex>
        </Flex>
    );
}

export default IconsSection;