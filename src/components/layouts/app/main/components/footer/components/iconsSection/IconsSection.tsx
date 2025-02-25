import { Box, Flex, Image } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import * as React from 'react';
import { Link } from 'react-router-dom';

function IconsSection() {
    const links = [
        { href: "https://twitter.com/droplinked", icon: <AppIcons.XOutlined /> },
        { href: "https://www.linkedin.com/company/droplinked", icon: <AppIcons.LinkedInOutlined /> },
        { href: "https://www.instagram.com/drop_linked", icon: <AppIcons.InstagramOutlined /> },
        { href: "https://t.me/droplinked", icon: <AppIcons.TelegramOutlined /> },
        { href: "https://discord.com/channels/1068939465025916959/1088500920406515763", icon: <AppIcons.DiscordOutlined /> },
    ];

    return (
        <Flex width="100%" direction="column" zIndex={1} gap="36px" sx={{ p: { fontWeight: 400 } }}>
            <Box display="flex" alignItems="center" gap={4} cursor="pointer" sx={{ svg: { path: { fill: "white" } } }}>
                <AppIcons.SidebarDroplinked width="40px" height="40px" />
                <Image src="https://upload-file-droplinked.s3.amazonaws.com/5e19eaa5a7095f55b005e12397acf5f874ec94aa3923e5e8a04f3abd8787f081.png" width="214px" height="auto" flexShrink="0" />
            </Box>

            <AppTypography fontFamily="Inter" fontWeight={"400"} fontSize={14} color="#B1B1B1">
                Commerce tools to sell and settle transparently.
            </AppTypography>

            <Flex gap={"16px"}>
                {links.map(({ href, icon }, index) => (
                    <Link key={index} to={href} target='_blank'>
                        <Box background={"#292929"} display={"flex"} alignItems={"center"} justifyContent={"center"} width={"40px"} borderRadius={"8px"} height={"40px"}>
                            {icon}
                        </Box>
                    </Link>
                ))}
            </Flex>
        </Flex>
    );
}

export default IconsSection;
