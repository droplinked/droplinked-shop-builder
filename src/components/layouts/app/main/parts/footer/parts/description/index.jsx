import { Box, Flex, Image } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";

function Description() {
    return (
        <Flex direction="column" gap={5} sx={{ p: { fontWeight: 700 } }}>
            <Box display="flex" alignItems="center" gap={4} cursor="pointer" sx={{ svg: { path: { fill: "white" } } }}>
                <AppIcons.SidebarDroplinked width="40px" height="40px" />
                <Image src="https://upload-file-droplinked.s3.amazonaws.com/5e19eaa5a7095f55b005e12397acf5f874ec94aa3923e5e8a04f3abd8787f081.png" width="214px" height="auto" flexShrink="0" />
            </Box>

            <AppTypography fontFamily="Inter" fontSize={14} color="#B1B1B1">
                Commerce tools to sell and settle transparently
            </AppTypography>

            <a href="mailto:Support@droplinked.com">
                <AppTypography fontFamily="Avenir Next" color="lightGray">
                    Support@droplinked.com
                </AppTypography>
            </a>
        </Flex>
    )
}

export default Description