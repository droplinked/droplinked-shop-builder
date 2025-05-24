import { Box } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import * as React from 'react';
import NewsLetterSubscribe from './components/NewsLetterSubscribe';

function NewsLetter() {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} width={"100%"} height={{ sm: "340px", md: "296px", lg: "272px" }} background={"#000"} borderBottom={"1px solid"} borderColor={"neutral.gray.700"}>
            <AppTypography fontWeight={"700"} fontSize={"24px"} textAlign={"center"} color={"neutral.white"} > Stay up to date</AppTypography>
            <AppTypography fontWeight={"400"} fontSize={"16px"} textAlign={"center"} color={"#B1B1B1"} marginTop={"16px"} marginBottom={"36px"} mx={"1rem"}>Join our mailing list to stay up to date with the latest news, announcements, and exclusive offers.</AppTypography>
            <Box>
                <NewsLetterSubscribe />
            </Box>
        </Box >
    );
}

export default NewsLetter;
