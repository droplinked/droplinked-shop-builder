import { Box } from '@chakra-ui/react';
import * as React from 'react';
import NewsLetter from './components/newsLetter/NewsLetter';
import IconsSection from './components/iconsSection/IconsSection';
import LinksSection from './components/links/LinksSection';
import Copyright from './components/copyright/Copyright';

function Footer() {
    return (
        <Box width={"100%"}>
            <NewsLetter />
            <Box px={{ sm: "2rem", md: "6rem" }} background={"#000"} display={"flex"} py={"4rem"} flexDirection={{ sm: "column", md: "column", lg: "row" }} justifyContent={"space-around"} alignItems={"start"} width={"100%"}>
                <IconsSection />
                <LinksSection />
            </Box>
            <Copyright />
        </Box>
    );
}

export default Footer;