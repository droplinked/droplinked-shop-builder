import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import droplinkFull from "assest/image/droplinkFull.svg";
import AppTypography from "components/common/typography/AppTypography";
import { Link } from "react-router-dom";
import AppIcons from "assest/icon/Appicons";

function Description() {
    return (
        <VStack align="stretch" spacing={5} width={"full"}>
            <Link to="/#banner">
                <Box display="flex" alignItems="center" gap="16px" cursor={"pointer"}>
                    <Box width={"40px"} height={"40px"} sx={{ svg: { path: { fill: "white" } } }}>
                        <AppIcons.SidebarDroplinked width="40px" height="40px" />
                    </Box>
                    <Image src="https://upload-file-droplinked.s3.amazonaws.com/5e19eaa5a7095f55b005e12397acf5f874ec94aa3923e5e8a04f3abd8787f081.png" width="214px" height="auto" flexShrink="0" />
                </Box>
            </Link>
            <AppTypography width={"full"} fontFamily={"Inter"} fontSize="14px" fontWeight="400" color={"#B1B1B1"}>
                Commerce tools to sell and settle transparently.
            </AppTypography>

            <a href="mailto:Support@droplinked.com">
                <Text fontFamily="Avenir Next" fontSize="12px" fontWeight="500" color="lightGray">
                    Support@droplinked.com
                </Text>
            </a>
        </VStack>
    );
}

export default Description;
